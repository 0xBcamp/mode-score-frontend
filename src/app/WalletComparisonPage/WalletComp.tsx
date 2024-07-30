"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useAccount } from 'wagmi';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import ConnectButton from '@/components/ui/ConnectButton';
import { ActivityIcon, HomeIcon, PieChartIcon, SettingsIcon, WalletIcon } from 'lucide-react';
import Link from 'next/link';
import Spinner from "@/components/ui/Spinner";
import PeerCreditScoreForm from '../../components/PeerCreditForm';

interface Score {
    data: {
        score: number;
        feedback: {
            score: {
                quality: string;
            };
        };
        explanation: {
            credibility: {
                verified: boolean;
                longevity_days: number;
            };
            stamina: {
                methods_volume: number;
                coins_count: number;
                count_smart_trades: number;
            };
            traffic: {
                count_credit_txns: number;
                volume_credit_txns: number;
                count_debit_txns: number;
                volume_debit_txns: number;
                legit_txn_ratio: number;
                avg_running_balance_best_token: number;
                txn_frequency: number;
            };
            wealth: {
                cum_balance_now: number;
                cum_balance_now_adjusted: number;
                avg_volume_per_txn: number;
            };
        };
    };
}

export default function Component({ data }: Score) {
    const { isConnected } = useAccount();
    const [result, setResult] = useState<any>(null);
    const [peerResult, setPeerResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [peerLoading, setPeerLoading] = useState<boolean>(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [parsedResult, setParsedResult] = useState<any>(data);

    const cred = parsedResult?.explanation?.credibility;
    const stam = parsedResult?.explanation?.stamina;
    const weal = parsedResult?.explanation?.wealth;
    const traf = parsedResult?.explanation?.traffic;

    useEffect(() => {
        if (!isConnected) {
          router.push('landing');
        }
    }, [isConnected, router]);

    useEffect(() => {
        if (searchParams) {
            const result = searchParams.get('result');
            if (result) {
                try {
                    const resultData = JSON.parse(result);
                    setParsedResult(resultData);
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to parse result:', error);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            const handleChainChanged = (chainId: string) => {
                window.location.href = '/Dashboard';
            };

            window.ethereum.on('chainChanged', handleChainChanged);

            return () => {
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            };
        }
    }, []);

    const formatNumber = (value: number | undefined, decimals = 2) => {
        if (value === undefined) return 'N/A';
        return typeof value === 'number' ? value.toFixed(decimals) : value;
    };

    const formatCurrency = (value: number | undefined) => {
        if (value === undefined) return 'N/A';
        return `$${formatNumber(value)}`;
    };

    const formatAmount = (amount: number | undefined) => {
        return amount !== undefined ? `$${amount.toFixed(2)}` : 'N/A';
    };

    if (loading) {
        return <Spinner />;
    }

    const handleScoreClick = () => {
        if (result) {
          const query = new URLSearchParams({ result: JSON.stringify(result) }).toString();
          router.push(`/Score?${query}`);
        }
    };

    const handleReset = () => {
        setPeerResult(null);
        setError(null);
        setPeerLoading(false);
    };

    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
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
                                    </Link>
                                </div>
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
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-right" style={{ paddingLeft: '35px' }}>Compare Crypto Wallets</span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <ConnectButton />
                    </div>
                </header>
            </div>
            <div className="flex justify-center items-start gap-6">
                <div className="flex-1">
                    <Card id="UserScore" className="w-full">
                        <div className="bg-background w=full rounded-lg border-4 p-6 flex flex-col items-center justify-center gap-4 h-full">
                            <Card className="w=full">
                                <CardHeader className="w=full bg-background rounded-lg text-4xl p-6 flex flex-col items-center justify-center gap-4 font-bold">
                                    MY MODE SCORE
                                </CardHeader>
                                <CardHeader className="flex flex-col items-center">
                                    <div className="text-4xl font-bold">{parsedResult?.score || 'N/A'}</div>
                                    {/* <CardContent>
                                        <div className="text-4xl font-bold">{parsedResult?.feedback?.score?.quality || 'N/A'}</div>
                                    </CardContent> */}
                                </CardHeader>
                            </Card>
                            <div className="flex items-center gap-4">
                                <h3 className="text-xl font-semibold">Credibility</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Credibility Verified</CardTitle>
                                        <CardDescription>{cred?.verified ? 'Yes' : 'No'}</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Longevity Days</CardTitle>
                                        <CardDescription>{cred?.longevity_days || 'N/A'}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                            <h3 className="text-xl font-semibold">Stamina</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Methods Volume</CardTitle>
                                        <CardDescription>{stam?.methods_volume}</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Coins Count</CardTitle>
                                        <CardDescription>{stam?.coins_count}</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Smart Trades Count</CardTitle>
                                        <CardDescription>{stam?.count_smart_trades}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                            <div className="flex items-center gap-4">
                                <h3 className="text-xl font-semibold">Traffic</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Credit Transactions Count</CardTitle>
                                        <CardDescription>{formatNumber(traf?.count_credit_txns, 0)}</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Credit Transactions Volume</CardTitle>
                                        <CardDescription>{formatCurrency(traf?.volume_credit_txns)}</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Debit Transactions Count</CardTitle>
                                        <CardDescription>{formatNumber(traf?.count_debit_txns, 0)}</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Debit Transactions Volume</CardTitle>
                                        <CardDescription>{formatCurrency(traf?.volume_debit_txns)}</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Legit Transaction Ratio</CardTitle>
                                        <CardDescription>{formatNumber(traf?.legit_txn_ratio)}</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Average Running Balance (Best Token)</CardTitle>
                                        <CardDescription>{formatCurrency(traf?.avg_running_balance_best_token)}</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Transaction Frequency</CardTitle>
                                        <CardDescription>{formatNumber(traf?.txn_frequency)}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                            <div className="flex items-center gap-4">
                                <h3 className="text-xl font-semibold">Wealth</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Current Balance</CardTitle>
                                        <CardDescription>{formatAmount(weal?.cum_balance_now)}</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Adjusted Balance</CardTitle>
                                        <CardDescription>{formatAmount(weal?.cum_balance_now_adjusted)}</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Average Volume Per Transaction</CardTitle>
                                        <CardDescription>{formatAmount(weal?.avg_volume_per_txn)}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        </div>
                    </Card>
                </div>
                <h1 className="text-4xl flex flex-col items-center justify-center">
                    VS
                </h1>
                <div className="flex-1">
                    <Card id="PeerScore" className="h-full">
                        <div className="bg-background rounded-lg border-4 p-6 flex flex-col items-center justify-center gap-4 h-full">
                            <Card>
                                <CardHeader className="bg-background w-full rounded-lg text-4xl p-6 flex flex-col items-center justify-center gap-4 font-bold">
                                    PEER MODE SCORE
                                </CardHeader>
                                <CardHeader className="flex flex-col items-center">
                                        <div className="text-4xl font-bold">{peerResult?.score || 'N/A'}</div>
                                    {/* <CardContent>
                                        <div className="text-4xl font-bold">{peerResult?.feedback?.score?.quality || 'N/A'}</div>
                                    </CardContent> */}
                                </CardHeader>
                            </Card>
                            {peerLoading ? (
                                <Spinner />
                            ) : peerResult ? (
                                <>
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-xl font-semibold">Credibility</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Credibility Verified</CardTitle>
                                                <CardDescription>{peerResult.explanation?.credibility?.verified ? 'Yes' : 'No'}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Longevity Days</CardTitle>
                                                <CardDescription>{peerResult.explanation?.credibility?.longevity_days || 'N/A'}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </div>
                                    <h3 className="text-xl font-semibold">Stamina</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Methods Volume</CardTitle>
                                                <CardDescription>{peerResult.explanation?.stamina?.methods_volume}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Coins Count</CardTitle>
                                                <CardDescription>{peerResult.explanation?.stamina?.coins_count}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Smart Trades Count</CardTitle>
                                                <CardDescription>{peerResult.explanation?.stamina?.count_smart_trades}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-xl font-semibold">Traffic</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Credit Transactions Count</CardTitle>
                                                <CardDescription>{formatNumber(peerResult.explanation?.traffic?.count_credit_txns, 0)}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Credit Transactions Volume</CardTitle>
                                                <CardDescription>{formatCurrency(peerResult.explanation?.traffic?.volume_credit_txns)}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Debit Transactions Count</CardTitle>
                                                <CardDescription>{formatNumber(peerResult.explanation?.traffic?.count_debit_txns, 0)}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Debit Transactions Volume</CardTitle>
                                                <CardDescription>{formatCurrency(peerResult.explanation?.traffic?.volume_debit_txns)}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Legit Transaction Ratio</CardTitle>
                                                <CardDescription>{formatNumber(peerResult.explanation?.traffic?.legit_txn_ratio)}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Average Running Balance (Best Token)</CardTitle>
                                                <CardDescription>{formatCurrency(peerResult.explanation?.traffic?.avg_running_balance_best_token)}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Transaction Frequency</CardTitle>
                                                <CardDescription>{formatNumber(peerResult.explanation?.traffic?.txn_frequency)}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-xl font-semibold">Wealth</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Current Balance</CardTitle>
                                                <CardDescription>{formatAmount(peerResult.explanation?.wealth?.cum_balance_now)}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Adjusted Balance</CardTitle>
                                                <CardDescription>{formatAmount(peerResult.explanation?.wealth?.cum_balance_now_adjusted)}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Average Volume Per Transaction</CardTitle>
                                                <CardDescription>{formatAmount(peerResult.explanation?.wealth?.avg_volume_per_txn)}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </div>
                                    <Button onClick={handleReset}>Reset</Button>
                                </>
                            ) : (
                                <CardContent>
                                    <PeerCreditScoreForm
                                        setResult={setPeerResult}
                                        setError={setError}
                                        setLoading={setPeerLoading}
                                    />
                                    {error && <div className="text-red-500 mt-2">{error}</div>}
                                </CardContent>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
