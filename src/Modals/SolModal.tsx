import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { CloudSunIcon } from "lucide-react"



export function SolModal() {


    return (
    <div className="grid gap-4">
        <div className="flex items-center gap-4">
        <div className="bg-[#5B5B5B] rounded-md p-3 flex items-center justify-center">
            <CloudSunIcon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold">Solana</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
        <Card>
            <CardHeader>
            <CardTitle>Solana Staking</CardTitle>
            <CardDescription>Earn rewards by staking your SOL tokens on the Solana network.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
            <div className="text-sm font-medium">APY: 6-10%</div>
            <div className="text-sm text-muted-foreground">
                Stake your SOL tokens directly on the Solana platform.
            </div>
            <Button size="sm">Learn More</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
            <CardTitle>Solana DeFi</CardTitle>
            <CardDescription>Earn rewards by providing liquidity on Solana's DeFi platforms.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
            <div className="text-sm font-medium">APY: 10-15%</div>
            <div className="text-sm text-muted-foreground">
                Contribute liquidity to Solana's DeFi pools and earn rewards.
            </div>
            <Button size="sm">Learn More</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
            <CardTitle>Solana Lending</CardTitle>
            <CardDescription>
                Earn interest by lending your SOL tokens on Solana's lending platforms.
            </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
            <div className="text-sm font-medium">APY: 4-8%</div>
            <div className="text-sm text-muted-foreground">
                Lend your SOL tokens and earn interest on Solana's lending platforms.
            </div>
            <Button size="sm">Learn More</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
            <CardTitle>Solana Governance</CardTitle>
            <CardDescription>Participate in Solana's governance by staking your SOL tokens.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
            <div className="text-sm font-medium">APY: 2-5%</div>
            <div className="text-sm text-muted-foreground">
                Stake your SOL tokens and vote on important Solana network decisions.
            </div>
            <Button size="sm">Learn More</Button>
            </CardContent>
        </Card>
        </div>
    </div>
    )
}

export default SolModal;
