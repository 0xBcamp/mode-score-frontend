"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useChainId } from 'wagmi';
import CreditScoreResult from '@/components/CreditScoreResults';
import { getCreditScore, getTransactions, getAssets } from '@/services/covalentServices';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import ConnectButton from '@/components/ui/ConnectButton';
import { ActivityIcon, DollarSignIcon, HomeIcon, PieChartIcon, SettingsIcon, WalletIcon } from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { getTokenBalances, getTokenTransfers, getDeFiTokens } from '@/services/covalentServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

interface Token {
  contract_ticker_symbol: string;
  contract_address: string;
  // other properties can be added here as needed
}

interface DeFiToken {
  contract_address: string;
}

interface Transfer {
  transfer_type: string;
  delta_quote: string;
}

interface TransferItem {
  block_signed_at: string;
  transfers: Transfer[];
}

interface TransfersResponse {
  data: {
      items: TransferItem[];
  };
}

interface MonthlyEarnings {
  month: string;
  earnings: number;
}

const groupTransactionsByDate = (transactions: any[]) => {
  return transactions.reduce((acc: { [key: string]: any[] }, transaction) => {
    const date = new Date(transaction.block_signed_at).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});
};

interface Asset {
  quote: number | null;
  contract_ticker_symbol: string;
  balance: string;
  contract_name: string;
  logo_url: string;
}

export function Dashboard() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId().toString();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [initialRender, setInitialRender] = useState(true);
  const [earningsData, setEarningsData] = useState<MonthlyEarnings[]>([]);
  const [defiTokens, setDefiTokens] = useState([]);

  useEffect(() => {
    if (!isConnected) {
      router.push('landing');
    }
  }, [isConnected, router]);

  useEffect(() => {
    const fetchCreditScore = async () => {
      if (address && chainId) {
        setLoading(true);
        try {
          const response = await getCreditScore({ eth_address: address, chain_id: chainId });
          console.log('Credit Score Response:', response);
          setResult(response);
        } catch (error) {
          console.error('Failed to fetch credit score:', error);
          setError('Failed to fetch credit score.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCreditScore();
  }, [address, chainId]);

  useEffect(() => {
    const fetchAssets = async () => {
      if (address && chainId) {
        try {
          const response = await getAssets({ eth_address: address, chain_id: chainId });
          console.log('Assets Response:', response);
          setAssets(response.data.items);
        } catch (error) {
          console.error('Failed to fetch assets:', error);
          setError('Failed to fetch assets.');
        }
      }
    };

    fetchAssets();
  }, [address, chainId]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (address && chainId) {
        try {
          const response = await getTransactions({ eth_address: address, chain_id: chainId });
          console.log('Transactions Response:', response);
          setTransactions(response.data.items);
        } catch (error) {
          console.error('Failed to fetch transactions:', error);
          setError('Failed to fetch transactions.');
        }
      }
    };

    fetchTransactions();
  }, [address, chainId]);

  const handleScoreClick = () => {
    if (result) {
      const query = new URLSearchParams({ result: JSON.stringify(result) }).toString();
      router.push(`/Score?${query}`);
    }
  };

  const groupedTransactions = groupTransactionsByDate(transactions);

  const totalWalletBalance = assets.reduce((acc, asset) => acc + (asset.quote || 0), 0);

  const getTokenDetails = (transaction: { log_events: any[]; }) => {
    const logEvent = transaction.log_events.find(event => event.decoded && event.decoded.name === 'Transfer');
    if (logEvent) {
      const tokenName = logEvent.decoded.params.find((param: { name: string; }) => param.name === 'tokenSymbol')?.value || 'Unknown Token';
      return { tokenName };
    }
    return { tokenName: 'Unknown Token' };
  };

  const etherscanUrl = (hash: string) => `https://etherscan.io/tx/${hash}`;

  
    /**
     * This Section takes care of calculating data used to display the chart
     *
     * 
     */
    useEffect(() => {
      const fetchDeFiTokens = async () => {
        try {
          const tokens = await getDeFiTokens();
          setDefiTokens(tokens);
        } catch (error) {
          console.error('Failed to fetch DeFi tokens:', error);
        }
      };
  
      fetchDeFiTokens();
  }, []);

  useEffect(() => {
      const fetchDeFiEarnings = async () => {
          if (address && chainId && defiTokens.length > 0) {
          try {
              // Step 1: Get token balances
              const balancesResponse = await getTokenBalances({ eth_address: address, chain_id: chainId });
              const userDefiTokens: DeFiToken[] = identifyDeFiTokens(balancesResponse.data.items, defiTokens);

              // Step 2: Get transfers for each DeFi token
              const allTransfers = await Promise.all(
              userDefiTokens.map((token: DeFiToken) => 
                  getTokenTransfers({ 
                  eth_address: address, 
                  chain_id: chainId, 
                  contract_address: token.contract_address 
                  })
              )
              );

              // Step 3: Process transfers to estimate earnings
              const processedData: MonthlyEarnings[] = processDefiTransfers(allTransfers, userDefiTokens);
              setEarningsData(processedData);
          } catch (error) {
              console.error('Failed to fetch DeFi earnings data:', error);
          }
          }
      };

      fetchDeFiEarnings();
  }, [address, chainId, defiTokens]);

  const identifyDeFiTokens = (tokens: Token[], defiTokenList: string[]): DeFiToken[] => {
      return tokens.filter(token => defiTokenList.includes(token.contract_ticker_symbol))
                   .map(token => ({ contract_address: token.contract_address }));
  };

  const processDefiTransfers = (allTransfers: TransfersResponse[], defiTokens: DeFiToken[]): MonthlyEarnings[] => {
      const monthlyEarnings: { [key: string]: number } = {};
    
      allTransfers.forEach((transfersResponse, index) => {
        const token = defiTokens[index];
        transfersResponse.data.items.forEach(transfer => {
          // Simplification: consider all incoming transfers as earnings
          if (transfer.transfers[0].transfer_type === 'IN') {
            const date = new Date(transfer.block_signed_at);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
            if (!monthlyEarnings[monthKey]) {
              monthlyEarnings[monthKey] = 0;
            }
            monthlyEarnings[monthKey] += Number(transfer.transfers[0].delta_quote || 0);
          }
        });
      });
    
      return Object.entries(monthlyEarnings)
        .map(([month, earnings]) => ({
          month: month.split('-')[1], // Just use month number for simplicity
          earnings: parseFloat(earnings.toFixed(2))
        }))
        .sort((a, b) => parseInt(a.month) - parseInt(b.month))
        .slice(-6); // Last 6 months
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className="group flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <HomeIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>

            
          <Tooltip>
            <TooltipTrigger asChild>
            <div>
            <Link
              href="#Transactions"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <WalletIcon className="h-4 w-4 text-white transition-all group-hover:scale-110" />
              <span className="sr-only">Transactions</span>
            </Link>
            </div>
            </TooltipTrigger>
            <TooltipContent side="right">Transactions</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div onClick={handleScoreClick}> 
                <Link
                  href="#"
                  className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <ActivityIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Score</span>
                </Link></div>
              </TooltipTrigger>
              <TooltipContent side="right">Score</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#Assets"
                  className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <PieChartIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Assets</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Assets</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#Settings"
                  className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <SettingsIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex items-center gap-2" >
          <span className="text-lg font-bold text-right" style={{ paddingLeft: '35px' }}>DeFi Dashboard</span>

          </div>

          <div className="ml-auto flex items-center gap-2">
            <ConnectButton />
          </div>
        </header>
        <main className="flex-1 grid gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Wallet Balance</CardTitle>
                <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-2xl font-bold">${totalWalletBalance.toFixed(2)}</div>
              </CardContent>
            </Card>
            <div
              onClick={handleScoreClick}
              className={`h-full flex flex-col transition-transform transform ${
                result ? 'hover:scale-105 hover:shadow-lg cursor-pointer' : 'cursor-not-allowed'
              }`}
            >
              <Card className="h-full flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Idle Score</CardTitle>
                  <PieChartIcon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CreditScoreResult result={result} error={error} loading={loading} />
                </CardContent>
              </Card>
            </div>
            <Card className="h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">DeFi Earnings (Last 6 Months)</CardTitle>
                <ActivityIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex-grow">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    {/*<Tooltip />*/}
                    <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <Card id = "Assets">
            <CardHeader className="px-7">
              <CardTitle>Asset Breakdown</CardTitle>
              <CardDescription>Your current asset holdings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Contract Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.contract_ticker_symbol}>
                      <TableCell><img src={asset.logo_url} alt={asset.contract_ticker_symbol} width="20" height="20" /></TableCell>
                      <TableCell>{asset.contract_ticker_symbol}</TableCell>
                      <TableCell>{(parseFloat(asset.balance) / Math.pow(10, 18)).toFixed(4)}</TableCell>
                      <TableCell>${asset.quote ? asset.quote.toFixed(2) : 'N/A'}</TableCell>
                      <TableCell>{asset.contract_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card id = "Transactions">
            <CardHeader className="px-7">
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest DeFi transactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>USD Value</TableHead>
                    <TableHead>Transaction Hash</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.keys(groupedTransactions).map((date) =>
                    groupedTransactions[date].map((transaction) => {
                      return (
                        <TableRow key={transaction.tx_hash}>
                          <TableCell>{new Date(transaction.block_signed_at).toLocaleString()}</TableCell>
                          <TableCell>${transaction.value_quote.toFixed(2)}</TableCell>
                          <TableCell>{transaction.tx_hash}</TableCell>
                          <TableCell>
                            <a
                              href={etherscanUrl(transaction.tx_hash)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              More Details
                            </a>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
