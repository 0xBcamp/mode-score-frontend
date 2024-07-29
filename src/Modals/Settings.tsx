// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"

// export default function Settings() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Open Settings</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[480px]">
//         <DialogHeader>
//           <DialogTitle>Settings</DialogTitle>
//           <DialogDescription>Customize your app preferences.</DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Theme</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Select>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select theme" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="light">Light</SelectItem>
//                   <SelectItem value="dark">Dark</SelectItem>
//                   <SelectItem value="system">System</SelectItem>
//                 </SelectContent>
//               </Select>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Notifications</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center justify-between">
//                 <span>Receive notifications</span>
//                 <Switch id="notifications" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Account</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-2">
//                 <div>
//                   <Label htmlFor="name">Name</Label>
//                   <Input id="name" defaultValue="John Doe" />
//                 </div>
//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input id="email" defaultValue="john@example.com" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         <DialogFooter>
//           <div>
//             <Button variant="outline">Close</Button>
//           </div>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }