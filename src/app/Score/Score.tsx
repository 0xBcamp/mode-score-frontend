"use client";

import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import ConnectButton from "../../components/ui/ConnectButton";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Dialog } from "@headlessui/react";
import { ActivityIcon, HomeIcon, PieChartIcon, SettingsIcon, WalletIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import CredModal from "@/Modals/CredModal";
import TrafficModal from "@/Modals/TrafficModal";
import WealthModal from "@/Modals/WealthModal";
import StaminaModal from "@/Modals/StaminaModal";
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import Spinner from "@/components/ui/Spinner";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import Settings from '@/Modals/Settings';

const Score: React.FC = () => {
    const { isConnected } = useAccount();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [parsedResult, setParsedResult] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const openSettingsModal = () => setIsSettingsModalOpen(true);
    const closeSettingsModal = () => setIsSettingsModalOpen(false);

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
                    console.log("result", resultData);
                    setParsedResult(resultData);
                    setLoading(false);  // Stop loading when data is parsed
                } catch (error) {
                    console.error('Failed to parse result:', error);
                    setLoading(false);  // Stop loading on error
                }
            } else {
                setLoading(false);  // Stop loading if no result in searchParams
            }
        } else {
            setLoading(false);  // Stop loading if no searchParams
        }
    }, [searchParams]);

    // Redirect user to dashboard if wallet is changed
    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            const handleChainChanged = (chainId: string) => {
                console.log("Network changed to:", chainId);
                window.location.href = '/Dashboard';
            };

            window.ethereum.on('chainChanged', handleChainChanged);

            // Cleanup function
            return () => {
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            };
        }
    }, []);

    const openModal = (network: string) => {
        setSelectedNetwork(network);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedNetwork(null);
        setIsModalOpen(false);
    };

    if (loading) {
        return <Spinner />;
    }

    if (!parsedResult) {
        return <p>No data available</p>;
    }

    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/dashboard" className="group flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8" prefetch={false}>
                                    <HomeIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Home</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Home</TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <Link href="/Dashboard#Transactions" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base" prefetch={false}>
                                        <WalletIcon className="h-4 w-4 text-white transition-all group-hover:scale-110" />
                                        <span className="sr-only">Transactions</span>
                                    </Link>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="right">Transactions</TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="#" className="group flex h-9 w-9 items-center rounded-lg bg-accent justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8" prefetch={false}>
                                    <ActivityIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Score</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Score</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/Dashboard#Assets" className="group flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8" prefetch={false}>
                                    <PieChartIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Assets</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Assets</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div onClick={openSettingsModal}>
                                    <Link href="#" className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8" prefetch={false}>
                                        <SettingsIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                                        <span className="sr-only">Settings</span>
                                    </Link>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="right">Settings</TooltipContent>
                            <Settings isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>
            
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-right" style={{ paddingLeft: '35px' }}>Score Details</span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <ConnectButton />
                    </div>
                </header>
                <div className="flex flex-col gap-6 p-6 md:p-8 lg:p-10">
                    <div className="bg-background rounded-lg border border-yellow-300 p-6 flex flex-col items-center justify-center gap-4">
                        <div className="text-gray-800 bg-gradient-to-tr w-full from-yellow-400 via-yellow-400 to-white rounded-lg text-4xl p-6 flex flex-col items-center justify-center gap-4 font-bold">
                            MODE SCORE
                        </div>
                        <div className="text-yellow-300 text-4xl font-bold">{parsedResult.feedback?.score?.quality || 'N/A'}</div>
                        <div className="text-yellow-300 text-4xl font-bold">{parsedResult.score || 'N/A' }</div>
                        <div className="font-medium">{parsedResult.message}</div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                        <div className="bg-background rounded-lg border p-6 flex flex-col gap-2">
                            <div className="text-lg font-medium">Credibility</div>
                            <Button variant="outline" size="sm" onClick={() => openModal('credibility')}>
                                View Details
                            </Button>
                        </div>
                        <div className="bg-background rounded-lg border p-6 flex flex-col gap-2">
                            <div className="text-lg font-medium">Wealth</div>
                            <Button variant="outline" size="sm" onClick={() => openModal('wealth')}>
                                View Details
                            </Button>
                        </div>
                        <div className="bg-background rounded-lg border p-6 flex flex-col gap-2">
                            <div className="text-lg font-medium">Traffic</div>
                            <Button variant="outline" size="sm" onClick={() => openModal('traffic')}>
                                View Details
                            </Button>
                        </div>
                        <div className="bg-background rounded-lg border p-6 flex flex-col gap-2">
                            <div className="text-lg font-medium">Stamina</div>
                            <Button variant="outline" size="sm" onClick={() => openModal('stamina')}>
                                View Details
                            </Button>
                        </div>
                    </div>
                    <Card className=" bg-gradient-to-tr w-full from-yellow-400 via-yellow-400 to-white rounded-lg border p-6 flex flex-col gap-2">
                        <CardHeader>
                            <CardTitle className="text-gray-800 font-bold text-4xl">Recommendations</CardTitle>
                        </CardHeader>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                            <Card className="p-4">
                                <CardTitle>Credibility:</CardTitle>
                                <Card className="m-4">
                                  <CardDescription className="flex justify-center p-2 text-xl">
                                      {parsedResult.recommendations?.credibility?.map((rec: any, index: number) => (
                                          <div key={index}>
                                            <p className="pt-2">{rec.message}</p>
                                            <p className="pt-2">Current Value: {rec.current_value}</p>
                                            <p className="pt-2">Target Value: {rec.target_value}</p>
                                          </div>
                                      )) || 'No recommendations available.'}
                                  </CardDescription>
                                </Card>
                            </Card>
                            <Card className="p-4">
                                <CardTitle>Stamina:</CardTitle>
                                  <Card className="m-4">
                                    <CardDescription className="flex justify-center p-2 text-xl">                                   
                                        {parsedResult.recommendations?.stamina?.map((rec: any, index: number) => (
                                            <div key={index}>
                                              <p className="pt-2">{rec.message}</p>
                                              <p className="pt-2">Current Value: {rec.current_value}</p>
                                              <p className="pt-2">Target Value: {rec.target_value}</p>
                                            </div>
                                        )) || 'No recommendations available.'}
                                    </CardDescription>
                                  </Card>
                            </Card>
                            <Card className="p-4">
                                <CardTitle>Traffic:</CardTitle>
                                <Card className="m-4">
                                  <CardDescription className="flex justify-center p-2 text-xl">
                                      {parsedResult.recommendations?.traffic?.map((rec: any, index: number) => (
                                          <div key={index}>
                                            <p className="pt-2">{rec.message}</p>
                                            <p className="pt-2">Current Value: {rec.current_value}</p>
                                            <p className="pt-2">Target Value: {rec.target_value}</p>
                                          </div>
                                      )) || 'No recommendations available.'}
                                  </CardDescription>
                                </Card>
                            </Card>
                            <Card className="p-4">
                                <CardTitle>Wealth:</CardTitle>
                                <Card className="m-4">
                                  <CardDescription className="flex justify-center p-2 text-xl">
                                      {parsedResult.recommendations?.wealth?.map((rec: any, index: number) => (
                                          <div key={index}>
                                            <p className="pt-2">{rec.message}</p>
                                            <p className="pt-2">Current Value: {rec.current_value}</p>
                                            <p className="pt-2">Target Value: {rec.target_value}</p></div>
                                      )) || 'No recommendations available.'}
                                  </CardDescription>
                                </Card>
                            </Card>
                        </div>
                    </Card>

                    <Dialog open={isModalOpen} onClose={closeModal} className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="fixed inset-0 bg-black opacity-30" onClick={closeModal}></div>
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <div className="relative bg-background rounded max-w-3xl w-full mx-auto p-6 border-4">
                                {selectedNetwork === 'credibility' && <CredModal data={parsedResult} />}
                                {selectedNetwork === 'traffic' && <TrafficModal data={parsedResult} />}
                                {selectedNetwork === 'wealth' && <WealthModal data={parsedResult} />}
                                {selectedNetwork === 'stamina' && <StaminaModal data={parsedResult} />}
                                <Button onClick={closeModal} variant="outline" className="mt-4">
                                    Close
                                </Button>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Score;
