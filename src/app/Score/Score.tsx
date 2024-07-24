"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ConnectButton from "../../components/ui/ConnectButton"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { JSX, ClassAttributes, HTMLAttributes, SVGProps, useState } from "react"
import EthModal from "@/Modals/EthModal"
import PolyModal from "@/Modals/PolyModal"
import ModeModal from "@/Modals/ModeModal"
import SolModal from "@/Modals/SolModal"
import { Dialog } from "@headlessui/react"
import { ActivityIcon, HomeIcon, PieChartIcon, SettingsIcon, WalletIcon } from "lucide-react";

export function Score() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedNetwork, setSelectedNetwork] = useState(null)

    const openModal = (network) => {
        setSelectedNetwork(network)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setSelectedNetwork(null)
        setIsModalOpen(false)
    }
    
  return (
    <>
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
            <Link href={"/Dashboard"}>
            <div className="flex items-center gap-2">
                <WalletIcon className="h-6 w-6" />
                <span className="text-lg font-bold">DeFi Dashboard</span>
            </div>
            </Link>
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
        <div className="flex flex-col gap-6 p-6 md:p-8 lg:p-10">
        <div className="bg-background rounded-lg border border-yellow-300 p-6 flex flex-col items-center justify-center gap-4">
            <div className="text-yellow-300 bg-background rounded-lg text-4xl p-6 flex flex-col items-center justify-center gap-4 font-bold">
            IDLE SCORE
            </div>
            <div className="text-yellow-300 text-4xl font-bold">870</div>
            <div className=" font-medium">Great Job! But Financial Efficeincy can be increased!</div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            <div className="bg-background rounded-lg border p-6 flex flex-col gap-2">
            <div className="text-lg font-medium">Credibility</div>
            <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">900</div>
                <div className="text-sm text-muted-foreground">High reputation and authority</div>
            </div>
            <Button variant="outline" size="sm" onClick={() => openModal('mode')}>
                View Details
            </Button>
            </div>
            <div className="bg-background rounded-lg border p-6 flex flex-col gap-2">
            <div className="text-lg font-medium">Wealth</div>
            <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">825</div>
                <div className="text-sm text-muted-foreground">Solid financial standing</div>
            </div>
            <Button variant="outline" size="sm" onClick={() => openModal('ethereum')}>
                View Details
            </Button>
            </div>
            <div className="bg-background rounded-lg border p-6 flex flex-col gap-2">
            <div className="text-lg font-medium">Traffic</div>
            <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">850</div>
                <div className="text-sm text-muted-foreground">Consistent high-volume traffic</div>
            </div>
            <Button variant="outline" size="sm"onClick={() => openModal('polygon')}>
                View Details
            </Button>
            </div>
            <div className="bg-background rounded-lg border p-6 flex flex-col gap-2">
            <div className="text-lg font-medium">Stamina</div>
            <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">810</div>
                <div className="text-sm text-muted-foreground">Resilient and adaptable</div>
            </div>
            <Button variant="outline" size="sm" onClick={() => openModal('solana')}>
                View Details
            </Button>
            </div>
        </div>
        <div className="bg-background rounded-lg border p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
            <div className="text-lg font-medium">Mode Score Breakdown</div>
            <Button variant="outline" size="sm">
                View Details
            </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <div className="text-sm font-medium text-muted-foreground">Mode Network</div>
                <div className="w-full h-4 bg-muted rounded-full mt-2">
                <div className="h-full bg-primary rounded-full" style={{ width: "92%" }} />
                </div>
            </div>
            <div>
                <div className="text-sm font-medium text-muted-foreground">Ethereum Network</div>
                <div className="w-full h-4 bg-muted rounded-full mt-2">
                <div className="h-full bg-primary rounded-full" style={{ width: "78%" }} />
                </div>
            </div>
            <div>
                <div className="text-sm font-medium text-muted-foreground">Polygon Network</div>
                <div className="w-full h-4 bg-muted rounded-full mt-2">
                <div className="h-full bg-primary rounded-full" style={{ width: "85%" }} />
                </div>
            </div>
            <div>
                <div className="text-sm font-medium text-muted-foreground">Solana Network</div>
                <div className="w-full h-4 bg-muted rounded-full mt-2">
                <div className="h-full bg-primary rounded-full" style={{ width: "81%" }} />
                </div>
            </div>
            </div>
        </div>
        <Dialog open={isModalOpen} onClose={closeModal} className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        {/* <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" /> */}
                        <div className="relative bg-background rounded max-w-3xl w-full mx-auto p-6">
                            {selectedNetwork === 'ethereum' && <EthModal />}
                            {selectedNetwork === 'polygon' && <PolyModal />}
                            {selectedNetwork === 'mode' && <ModeModal />}
                            {selectedNetwork === 'solana' && <SolModal />}
                            <Button onClick={closeModal} className="mt-4">
                                Close
                            </Button>
                        </div>
                    </div>
                </Dialog>
        </div>
    </div>
    </>
  )
}

export default Score