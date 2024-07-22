import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { EclipseIcon } from "lucide-react"



export function EthModal() {


    return (
    <div className="grid gap-4">
        <div className="flex items-center gap-4">
        <div className="bg-[#5B5B5B] rounded-md p-3 flex items-center justify-center">
            <EclipseIcon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold">Ethereum</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
        <Card>
            <CardHeader>
            <CardTitle>Ethereum Staking</CardTitle>
            <CardDescription>Earn rewards by staking your ETH tokens on the Ethereum network.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
            <div className="text-sm font-medium">APY: 6-10%</div>
            <div className="text-sm text-muted-foreground">
                Stake your ETH tokens directly on the Ethereum platform.
            </div>
            <Button size="sm">Learn More</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
            <CardTitle>Ethereum DeFi</CardTitle>
            <CardDescription>Earn rewards by providing liquidity on Ethereum's DeFi platforms.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
            <div className="text-sm font-medium">APY: 10-15%</div>
            <div className="text-sm text-muted-foreground">
                Contribute liquidity to Ethereum's DeFi pools and earn rewards.
            </div>
            <Button size="sm">Learn More</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
            <CardTitle>Ethereum Lending</CardTitle>
            <CardDescription>
                Earn interest by lending your ETH tokens on Ethereum's lending platforms.
            </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
            <div className="text-sm font-medium">APY: 4-8%</div>
            <div className="text-sm text-muted-foreground">
                Lend your ETH tokens and earn interest on Ethereum's lending platforms.
            </div>
            <Button size="sm">Learn More</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
            <CardTitle>Ethereum Governance</CardTitle>
            <CardDescription>Participate in Ethereum's governance by staking your ETH tokens.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
            <div className="text-sm font-medium">APY: 2-5%</div>
            <div className="text-sm text-muted-foreground">
                Stake your ETH tokens and vote on important Ethereum network decisions.
            </div>
            <Button size="sm">Learn More</Button>
            </CardContent>
        </Card>
        </div>
    </div>
    )
}

export default EthModal;
