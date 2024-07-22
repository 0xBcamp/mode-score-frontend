"use client";

// import axios from "axios";
import React, { useEffect, useState } from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { CartesianGrid, XAxis, Line, LineChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"
import { JSX, ClassAttributes, HTMLAttributes, SVGProps } from "react"
import ConnectButton from "../../components/ui/ConnectButton"
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import CovalentForm from "@/components/CovalentForms";
import { getUserAssets, getUserTransactions } from '../utils/covalentAPI';
import CreditScoreForm from '@/components/CovalentForms';
import CreditScoreResult from '@/components/CreditScoreResults';



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



export function Dashboard() {

  const { address } = useAccount(); // Get the connected wallet address from Wagmi
  const [assets, setAssets] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      router.push('landing');
    }
  }, [isConnected, router]);

  useEffect(() => {
    const fetchAssetsAndTransactions = async () => {
      if (address) {
        try {
          setLoading(true);
          const [assetsData, transactionsData] = await Promise.all([
            getUserAssets(address),
            getUserTransactions(address),
          ]);
          setAssets(assetsData.data.items);
          setTransactions(transactionsData.data.items); // Adjust based on the actual response structure
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    // const groupTransactionsByDate = (transactions: any[]) => {
    //   return transactions.reduce((acc: { [key: string]: any[] }, transaction) => {
    //     const date = new Date(transaction.block_signed_at).toLocaleDateString();
    //     if (!acc[date]) {
    //       acc[date] = [];
    //     }
    //     acc[date].push(transaction);
    //     return acc;
    //   }, {});
    // };

    fetchAssetsAndTransactions();
  }, [address]);

  // useEffect(() => {
  //   const fetchEthPrice = async () => {
  //     try {
  //       const response = await axios.get('https://');
  //       setEthPrice(response.data.ethereum.usd);
  //     } catch (error) {
  //       console.error('Error fetching the Ethereum price:', error);
  //     }
  //   };

  //   fetchEthPrice();
  // }, []);

  // Placeholder for asset value (you should replace this with the actual value from assets)
  const groupedTransactions = groupTransactionsByDate(transactions);
  
  
  const totalPortfolioValue = assets.reduce((acc, asset) => acc + asset.quote, 0);


  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      
      <aside className="absolute top-0 left-1/2 transform -translate-x-1/2">

  
  
</aside>

      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <WalletIcon className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">DeFi Dashboard</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <HomeIcon className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <ActivityIcon className="h-5 w-5" />
                  <span className="sr-only">Transactions</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Transactions</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <PieChartIcon className="h-5 w-5" />
                  <span className="sr-only">Assets</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Assets</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <SettingsIcon className="h-5 w-5" />
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
          <div className="flex items-center gap-2">
            <WalletIcon className="h-6 w-6" />
            <span className="text-lg font-bold">DeFi Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
          <ConnectButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <img
                  src="/placeholder.svg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </header>
        <main className="flex-1 grid gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <CovalentForm setResult={setResult} setError={setError}/>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <Card className="h-full flex flex-col">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
      <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="text-2xl font-bold">${totalPortfolioValue}</div>
      {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
    </CardContent>
  </Card>
  <Link href="/Score" passHref>
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Idle Score</CardTitle>
        <PieChartIcon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-2xl font-bold">
          <CreditScoreResult result={result} error={error} />
        </div>
      </CardContent>
    </Card>
  </Link>
  <Card className="h-full flex flex-col">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">Earnings</CardTitle>
      <ActivityIcon className="w-4 h-4 text-muted-foreground" />
    </CardHeader>
    <CardContent className="flex-grow">
      <LinechartChart className="aspect-[4/3]" />
    </CardContent>
  </Card>
</div>

          <Card>
            <CardHeader className="px-7">
              <CardTitle>Asset Breakdown</CardTitle>
              <CardDescription>Your current asset holdings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Staked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full w-6 h-6 bg-[#55efc4] flex items-center justify-center text-sm font-medium">
                          BTC
                        </div>
                        <span className="font-medium">Bitcoin</span>
                      </div>
                    </TableCell>
                    <TableCell>0.5234</TableCell>
                    <TableCell>$15,000.00</TableCell>
                    <TableCell>0.2345</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full w-6 h-6 bg-[#00b894] flex items-center justify-center text-sm font-medium">
                          ETH
                        </div>
                        <span className="font-medium">Ethereum</span>
                      </div>
                    </TableCell>
                    <TableCell>2.3456</TableCell>
                    <TableCell>$7,500.00</TableCell>
                    <TableCell>1.2345</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full w-6 h-6 bg-[#ffeaa7] flex items-center justify-center text-sm font-medium">
                          USDC
                        </div>
                        <span className="font-medium">USD Coin</span>
                      </div>
                    </TableCell>
                    <TableCell>5,000.00</TableCell>
                    <TableCell>$5,000.00</TableCell>
                    <TableCell>2,500.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full w-6 h-6 bg-[#ff7979] flex items-center justify-center text-sm font-medium">
                          LINK
                        </div>
                        <span className="font-medium">Chainlink</span>
                      </div>
                    </TableCell>
                    <TableCell>50.0000</TableCell>
                    <TableCell>$7,500.00</TableCell>
                    <TableCell>25.0000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="px-7">
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest DeFi transactions.</CardDescription>
            </CardHeader>
            <CardContent>
            {Object.keys(groupedTransactions).map((date) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Amount</TableHead>
                    {/* <TableHead>Value</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                {groupedTransactions[date].map((transaction) => (
                  <TableRow>
                    <TableCell>{new Date(transaction.block_signed_at).toLocaleString()}</TableCell>
                    <TableCell>Deposit</TableCell>
                    <TableCell>
                      ETH
                    </TableCell>
                    <TableCell>{transaction.value / 10 ** 18} </TableCell>
                    {/* <TableCell>{transaction.value}</TableCell> */}
                  </TableRow>
                  ))}  
                </TableBody>
              </Table>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

function ActivityIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  )
}


function DollarSignIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}


function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function LinechartChart(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}


function PieChartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  )
}


function SettingsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function WalletIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  )
}


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}