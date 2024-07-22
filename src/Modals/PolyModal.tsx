import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { OctagonIcon } from "lucide-react"



export function PolyModal() {


    return (
    <div className="grid gap-4">
        <div className="flex items-center gap-4">
        <div className="bg-[#5B5B5B] rounded-md p-3 flex items-center justify-center">
            <OctagonIcon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold">Polygon</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
        <Card>
            <CardHeader>
            <CardTitle>Polygon Staking</CardTitle>
            <CardDescription>Earn rewards by staking your Polygon tokens on the Polygon network.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
            <div className="text-sm font-medium">APY: 6-10%</div>
            <div className="text-sm text-muted-foreground">
                Stake your Polygon tokens directly on the Polygon platform.
            </div>
            <Button size="sm">Learn More</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
            <CardTitle>Polygon DeFi</CardTitle>
            <CardDescription>Earn rewards by providing liquidity on Polygon's DeFi platforms.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
            <div className="text-sm font-medium">APY: 10-15%</div>
            <div className="text-sm text-muted-foreground">
                Contribute liquidity to Polygon's DeFi pools and earn rewards.
            </div>
            <Button size="sm">Learn More</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
            <CardTitle>Polygon Lending</CardTitle>
            <CardDescription>
                Earn interest by lending your Polygon tokens on Polygon's lending platforms.
            </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
            <div className="text-sm font-medium">APY: 4-8%</div>
            <div className="text-sm text-muted-foreground">
                Lend your Polygon tokens and earn interest on Polygon's lending platforms.
            </div>
            <Button size="sm">Learn More</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
            <CardTitle>Polygon Governance</CardTitle>
            <CardDescription>Participate in Polygon's governance by staking your Polygon tokens.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
            <div className="text-sm font-medium">APY: 2-5%</div>
            <div className="text-sm text-muted-foreground">
                Stake your Polygon tokens and vote on important Polygon network decisions.
            </div>
            <Button size="sm">Learn More</Button>
            </CardContent>
        </Card>
        </div>
    </div>
    )
}

export default PolyModal;
