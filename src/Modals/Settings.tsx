// // components/Settings.tsx
// import * as React from 'react';
// import { useTheme } from '@/context/ThemeContext';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Switch } from '@/components/ui/switch';

// interface SettingsProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function Settings({ isOpen, onClose }: SettingsProps) {
//   const { theme, toggleTheme } = useTheme();

//   if (!isOpen) return null;

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
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
//               <div className="flex items-center justify-between">
//                 <span>Dark Mode</span>
//                 <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose}>Close</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
