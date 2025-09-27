// "use client";

// import * as React from "react";
// import { useTheme } from "next-themes";
// import { useRouter } from "next/navigation";
// import { useTypedDispatch } from "@/hooks/useTypedDispatch";
// import { logout } from "@/store/feature/auth/authThunks";
// import { toast } from "sonner";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
//     DropdownMenuSub,
//     DropdownMenuSubTrigger,
//     DropdownMenuSubContent,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import {
//     Gift,
//     Crown,
//     ArrowUpRight,
//     Settings,
//     UserPlus,
//     HelpCircle,
//     Monitor,
//     LogOut,
//     Check,
//     Sun,
//     Moon,
//     MonitorSmartphone,
//     Plus,
// } from "lucide-react";
// import { User } from "@/types/api";

// interface ProfileDropdownProps {
//     user: User;
// }

// export function ProfileDropdown({ user }: ProfileDropdownProps) {
//     const { theme, setTheme } = useTheme();
//     const router = useRouter();
//     const dispatch = useTypedDispatch();
//     const [mounted, setMounted] = React.useState(false);

//     React.useEffect(() => {
//         setMounted(true);
//     }, []);

//     const displayName = user.firstName || "User";
//     const email = user.email || "";
//     const firstName = displayName.split(" ")[0];
//     const firstLetter = displayName.charAt(0).toUpperCase();

//     const handleSignOut = async () => {
//         try {
//             const result = await dispatch(logout()).unwrap();
//             toast.success(result.message || "Successfully logged out!");
//             router.push("/");
//         } catch (error: any) {
//             console.error("Logout failed:", error);
//             toast.error(error?.message || "Failed to log out");
//             router.push("/");
//         }
//     };

//     if (!mounted) {
//         return null;
//     }

//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button
//                     variant="ghost"
//                     className="flex items-center gap-1 border-none rounded-[0.375rem] bg-primary dark:bg-accent hover:bg-primary/80 dark:hover:bg-accent/80 transition-colors cursor-pointer"
//                 >
//                     <span className="text-sm rounded-[0.3125rem] w-6 h-6 flex bg-accent dark:bg-primary text-primary dark:text-accent items-center justify-center font-medium">
//                         {firstLetter}
//                     </span>
//                     <span className="hidden sm:block text-accent dark:text-primary text-xs font-medium leading-5">
//                         {firstName}'s lovable
//                     </span>
//                 </Button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent
//                 align="end"
//                 className=" bg-background border-border py-5 px-2.5 shadow-lg !max-w-[25rem] w-full"
//                 sideOffset={8}
//             >
//                 <DropdownMenuGroup>
//                     {/* User Info Section */}
//                     <div className="flex items-center gap-3 mb-6">
//                         <div className="w-6 h-6  rounded-[0.375rem] bg-primary flex items-center justify-center">
//                             <span className="text-white text-lg font-bold">{firstLetter}</span>
//                         </div>
//                         <div className="flex-1">
//                             <div className="text-sm font-medium text-primary">
//                                 {displayName}'s Lovable
//                             </div>
//                             <div className="text-xs text-secondary">
//                                 {email}
//                             </div>
//                         </div>
//                     </div>


//                     <div className="flex flex-col p-4 gap-4 space-y-2 bg-primary rounded-lg mb-5">
//                         <div>
//                             <p className="font-semibold text-accent text-base ">You’re using free plan</p>
//                             <p className="text-secondary text-base ">You can add components to your app by upgrading to the next plan.</p>
//                         </div>
//                         <Button className="bg-accent text-primary hover:bg-accent/90">
//                             Upgrade
//                         </Button>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex px-4 py-2 space-x-2">
//                         <Button variant="outline" className="w-fit justify-start text-primary hover:text-primary gap-2 cursor-pointer px-2">
//                             <Settings className="h-4 w-4" />
//                             Settings
//                         </Button>
//                         <Button variant="outline" className="w-fit justify-start text-primary hover:text-primary gap-2 cursor-pointer px-2">
//                             <UserPlus className="h-4 w-4" />
//                             Invite
//                         </Button>
//                     </div>

//                     <DropdownMenuSeparator />

//                     {/* Workspaces Section */}
//                     <div className="px-4 py-2">
//                         <div className="text-sm font-medium text-foreground mb-2">
//                             Workspaces (1)
//                         </div>
//                         <div className="flex items-center justify-center gap-2 p-2 rounded-md">
//                             <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
//                                 <span className="text-accent text-xs font-bold">{firstLetter}</span>
//                             </div>
//                             <span className="flex-1 text-sm text-primary">
//                                 {displayName}'s lovable
//                             </span>
//                             {/* <span className="text-xs bg-muted text-white px-2 py-1 rounded">
//                                 FREE
//                             </span>
//                             <Check className="h-4 w-4 text-green-500" /> */}
//                         </div>
//                         <Button variant="ghost" className="w-full justify-start gap-2 mt-2 text-secondary hover:text-secondary-foreground cursor-pointer">
//                             <Plus className="h-4 w-4" />
//                             Create new workspace
//                         </Button>
//                     </div>

//                     <DropdownMenuSeparator />

//                     {/* Menu Items */}
//                     <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
//                         <Gift className="h-4 w-4" />
//                         <span>Get free credits</span>
//                     </DropdownMenuItem>

//                     <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
//                         <HelpCircle className="h-4 w-4" />
//                         <span>Help Center</span>
//                     </DropdownMenuItem>

//                     {/* Theme Selection */}
//                     <DropdownMenuSub>
//                         <DropdownMenuSubTrigger className="flex items-center gap-3  cursor-pointer">
//                             <Monitor className="h-4 w-4" />
//                             <span>Appearance</span>
//                         </DropdownMenuSubTrigger>
//                         <DropdownMenuSubContent>
//                             <DropdownMenuItem
//                                 className="flex items-center gap-2 cursor-pointer"
//                                 onClick={() => setTheme("light")}
//                             >
//                                 <Sun className="h-4 w-4" />
//                                 <span>Light</span>
//                                 {theme === "light" && <Check className="h-4 w-4 ml-auto" />}
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                                 className="flex items-center gap-2 cursor-pointer"
//                                 onClick={() => setTheme("dark")}
//                             >
//                                 <Moon className="h-4 w-4" />
//                                 <span>Dark</span>
//                                 {theme === "dark" && <Check className="h-4 w-4 ml-auto" />}
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                                 className="flex items-center gap-2 cursor-pointer"
//                                 onClick={() => setTheme("system")}
//                             >
//                                 <MonitorSmartphone className="h-4 w-4" />
//                                 <span>System</span>
//                                 {theme === "system" && <Check className="h-4 w-4 ml-auto" />}
//                             </DropdownMenuItem>
//                         </DropdownMenuSubContent>
//                     </DropdownMenuSub>

//                     <DropdownMenuSeparator />

//                     <DropdownMenuItem
//                         className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400 hover:text-red-600 dark:hover:text-red-400"
//                         onClick={handleSignOut}
//                     >
//                         <LogOut className="h-4 w-4" />
//                         <span>Sign out</span>
//                     </DropdownMenuItem>
//                 </DropdownMenuGroup>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     );
// }





// Updated ProfileDropdown component with modal integration
// "use client";

// import * as React from "react";
// import { useTheme } from "next-themes";
// import { useRouter } from "next/navigation";
// import { useTypedDispatch } from "@/hooks/useTypedDispatch";
// import { logout } from "@/store/feature/auth/authThunks";
// import { toast } from "sonner";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
//     DropdownMenuSub,
//     DropdownMenuSubTrigger,
//     DropdownMenuSubContent,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import {
//     Gift,
//     Crown,
//     ArrowUpRight,
//     Settings,
//     UserPlus,
//     HelpCircle,
//     Monitor,
//     LogOut,
//     Check,
//     Sun,
//     Moon,
//     MonitorSmartphone,
//     Plus,
// } from "lucide-react";
// import { User } from "@/types/api";
// import { WorkspaceSettingsModal } from "@/components/setting/workspace-settings-modal";

// interface ProfileDropdownProps {
//     user: User;
// }

// export function ProfileDropdown({ user }: ProfileDropdownProps) {
//     const { theme, setTheme } = useTheme();
//     const router = useRouter();
//     const dispatch = useTypedDispatch();
//     const [mounted, setMounted] = React.useState(false);
//     const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

//     React.useEffect(() => {
//         setMounted(true);
//     }, []);

//     const displayName = user.firstName || "User";
//     const email = user.email || "";
//     const firstName = displayName.split(" ")[0];
//     const firstLetter = displayName.charAt(0).toUpperCase();

//     // Mock workspace data - replace with actual data from your API
//     const workspaceData = {
//         name: `${displayName}'s lovable`,
//         description: "A workspace for building amazing applications",
//         avatar: undefined,
//         allowUnprotectedSamples: true,
//         allowInvites: false,
//     };

//     const handleSignOut = async () => {
//         try {
//             const result = await dispatch(logout()).unwrap();
//             toast.success(result.message || "Successfully logged out!");
//             router.push("/");
//         } catch (error: any) {
//             console.error("Logout failed:", error);
//             toast.error(error?.message || "Failed to log out");
//             router.push("/");
//         }
//     };

//     if (!mounted) {
//         return null;
//     }

//     return (
//         <>
//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                     <Button
//                         variant="ghost"
//                         className="flex items-center gap-1 border-none rounded-[0.375rem] bg-primary dark:bg-accent hover:bg-primary/80 dark:hover:bg-accent/80 transition-colors cursor-pointer"
//                     >
//                         <span className="text-sm rounded-[0.3125rem] w-6 h-6 flex bg-accent dark:bg-primary text-primary dark:text-accent items-center justify-center font-medium">
//                             {firstLetter}
//                         </span>
//                         <span className="hidden sm:block text-accent dark:text-primary text-xs font-medium leading-5">
//                             {firstName}'s lovable
//                         </span>
//                     </Button>
//                 </DropdownMenuTrigger>

//                 <DropdownMenuContent
//                     align="end"
//                     className=" bg-background border-border py-5 px-2.5 shadow-lg !max-w-[25rem] w-full"
//                     sideOffset={8}
//                 >
//                     <DropdownMenuGroup>
//                         {/* User Info Section */}
//                         <div className="flex items-center gap-3 mb-6">
//                             <div className="w-6 h-6  rounded-[0.375rem] bg-primary flex items-center justify-center">
//                                 <span className="text-white text-lg font-bold">{firstLetter}</span>
//                             </div>
//                             <div className="flex-1">
//                                 <div className="text-sm font-medium text-primary">
//                                     {displayName}'s Lovable
//                                 </div>
//                                 <div className="text-xs text-secondary">
//                                     {email}
//                                 </div>
//                             </div>
//                         </div>


//                         <div className="flex flex-col p-4 gap-4 space-y-2 bg-primary rounded-lg mb-5">
//                             <div>
//                                 <p className="font-semibold text-accent text-base ">You're using free plan</p>
//                                 <p className="text-secondary text-base ">You can add components to your app by upgrading to the next plan.</p>
//                             </div>
//                             <Button className="bg-accent text-primary hover:bg-accent/90">
//                                 Upgrade
//                             </Button>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex px-4 py-2 space-x-2">
//                             <Button
//                                 variant="outline"
//                                 className="w-fit justify-start text-primary hover:text-primary gap-2 cursor-pointer px-2"
//                                 onClick={() => setIsSettingsOpen(true)}
//                             >
//                                 <Settings className="h-4 w-4" />
//                                 Settings
//                             </Button>
//                             <Button variant="outline" className="w-fit justify-start text-primary hover:text-primary gap-2 cursor-pointer px-2">
//                                 <UserPlus className="h-4 w-4" />
//                                 Invite
//                             </Button>
//                         </div>

//                         <DropdownMenuSeparator />

//                         {/* Workspaces Section */}
//                         <div className="px-4 py-2">
//                             <div className="text-sm font-medium text-foreground mb-2">
//                                 Workspaces (1)
//                             </div>
//                             <div className="flex items-center justify-center gap-2 p-2 rounded-md">
//                                 <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
//                                     <span className="text-accent text-xs font-bold">{firstLetter}</span>
//                                 </div>
//                                 <span className="flex-1 text-sm text-primary">
//                                     {displayName}'s lovable
//                                 </span>
//                             </div>
//                             <Button variant="ghost" className="w-full justify-start gap-2 mt-2 text-secondary hover:text-secondary-foreground cursor-pointer">
//                                 <Plus className="h-4 w-4" />
//                                 Create new workspace
//                             </Button>
//                         </div>

//                         <DropdownMenuSeparator />

//                         {/* Menu Items */}
//                         <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
//                             <Gift className="h-4 w-4" />
//                             <span>Get free credits</span>
//                         </DropdownMenuItem>

//                         <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
//                             <HelpCircle className="h-4 w-4" />
//                             <span>Help Center</span>
//                         </DropdownMenuItem>

//                         {/* Theme Selection */}
//                         <DropdownMenuSub>
//                             <DropdownMenuSubTrigger className="flex items-center gap-3  cursor-pointer">
//                                 <Monitor className="h-4 w-4" />
//                                 <span>Appearance</span>
//                             </DropdownMenuSubTrigger>
//                             <DropdownMenuSubContent>
//                                 <DropdownMenuItem
//                                     className="flex items-center gap-2 cursor-pointer"
//                                     onClick={() => setTheme("light")}
//                                 >
//                                     <Sun className="h-4 w-4" />
//                                     <span>Light</span>
//                                     {theme === "light" && <Check className="h-4 w-4 ml-auto" />}
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem
//                                     className="flex items-center gap-2 cursor-pointer"
//                                     onClick={() => setTheme("dark")}
//                                 >
//                                     <Moon className="h-4 w-4" />
//                                     <span>Dark</span>
//                                     {theme === "dark" && <Check className="h-4 w-4 ml-auto" />}
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem
//                                     className="flex items-center gap-2 cursor-pointer"
//                                     onClick={() => setTheme("system")}
//                                 >
//                                     <MonitorSmartphone className="h-4 w-4" />
//                                     <span>System</span>
//                                     {theme === "system" && <Check className="h-4 w-4 ml-auto" />}
//                                 </DropdownMenuItem>
//                             </DropdownMenuSubContent>
//                         </DropdownMenuSub>

//                         <DropdownMenuSeparator />

//                         <DropdownMenuItem
//                             className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400 hover:text-red-600 dark:hover:text-red-400"
//                             onClick={handleSignOut}
//                         >
//                             <LogOut className="h-4 w-4" />
//                             <span>Sign out</span>
//                         </DropdownMenuItem>
//                     </DropdownMenuGroup>
//                 </DropdownMenuContent>
//             </DropdownMenu>

//             <WorkspaceSettingsModal
//                 open={isSettingsOpen}
//                 onOpenChange={setIsSettingsOpen}
//                 workspace={workspaceData}
//                 user={{ firstName: displayName, email }}
//             />
//         </>
//     );
// }






// "use client";

// import * as React from "react";
// import { useTheme } from "next-themes";
// import { useRouter } from "next/navigation";
// import { useTypedDispatch } from "@/hooks/useTypedDispatch";
// import { logout } from "@/store/feature/auth/authThunks";
// import { toast } from "sonner";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
//     DropdownMenuSub,
//     DropdownMenuSubTrigger,
//     DropdownMenuSubContent,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import {
//     Gift,
//     Crown,
//     ArrowUpRight,
//     Settings,
//     UserPlus,
//     HelpCircle,
//     Monitor,
//     LogOut,
//     Check,
//     Sun,
//     Moon,
//     MonitorSmartphone,
//     Plus,
// } from "lucide-react";
// import { User } from "@/types/api";
// import { WorkspaceSettingsModal } from "@/components/setting/workspace-settings-modal";

// interface ProfileDropdownProps {
//     user: User;
// }

// export function ProfileDropdown({ user }: ProfileDropdownProps) {
//     const { theme, setTheme } = useTheme();
//     const router = useRouter();
//     const dispatch = useTypedDispatch();
//     const [mounted, setMounted] = React.useState(false);
//     const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

//     React.useEffect(() => {
//         setMounted(true);
//     }, []);

//     const displayName = user.firstName || "User";
//     const email = user.email || "";
//     const firstName = displayName.split(" ")[0];
//     const firstLetter = displayName.charAt(0).toUpperCase();

//     const workspaceData = {
//         name: `${displayName}'s lovable`,
//         description: "A workspace for building amazing applications",
//         avatar: undefined,
//         allowUnprotectedSamples: true,
//         allowInvites: false,
//     };

//     const handleSignOut = async () => {
//         try {
//             const result = await dispatch(logout()).unwrap();
//             toast.success(result.message || "Successfully logged out!");
//             router.push("/");
//         } catch (error: any) {
//             console.error("Logout failed:", error);
//             toast.error(error?.message || "Failed to log out");
//             router.push("/");
//         }
//     };

//     const handleHelpCenterClick = () => {
//         router.push("/support");
//     };

//     if (!mounted) {
//         return null;
//     }

//     return (
//         <>
//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                     <Button
//                         variant="ghost"
//                         className="flex items-center gap-1 border-none rounded-[0.375rem] bg-primary dark:bg-accent hover:bg-primary/80 dark:hover:bg-accent/80 transition-colors cursor-pointer"
//                     >
//                         <span className="text-sm rounded-[0.3125rem] w-6 h-6 flex bg-accent dark:bg-primary text-primary dark:text-accent items-center justify-center font-medium">
//                             {firstLetter}
//                         </span>
//                         <span className="hidden sm:block text-accent dark:text-primary text-xs font-medium leading-5">
//                             {firstName}'s lovable
//                         </span>
//                     </Button>
//                 </DropdownMenuTrigger>

//                 <DropdownMenuContent
//                     align="end"
//                     className="bg-background border-border py-5 px-2.5 shadow-lg !max-w-[25rem] w-full"
//                     sideOffset={8}
//                 >
//                     <DropdownMenuGroup>
//                         <div className="flex items-center gap-3 mb-6">
//                             <div className="w-6 h-6 rounded-[0.375rem] bg-primary flex items-center justify-center">
//                                 <span className="text-white text-lg font-bold">{firstLetter}</span>
//                             </div>
//                             <div className="flex-1">
//                                 <div className="text-sm font-medium text-primary">
//                                     {displayName}'s Lovable
//                                 </div>
//                                 <div className="text-xs text-secondary">
//                                     {email}
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="flex flex-col p-4 gap-4 space-y-2 bg-primary rounded-lg mb-5">
//                             <div>
//                                 <p className="font-semibold text-accent text-base">You're using free plan</p>
//                                 <p className="text-secondary text-base">You can add components to your app by upgrading to the next plan.</p>
//                             </div>
//                             <Button className="bg-accent text-primary hover:bg-accent/90">
//                                 Upgrade
//                             </Button>
//                         </div>

//                         <div className="flex px-4 py-2 space-x-2">
//                             <Button
//                                 variant="outline"
//                                 className="w-fit justify-start text-primary hover:text-primary gap-2 cursor-pointer px-2"
//                                 onClick={() => setIsSettingsOpen(true)}
//                             >
//                                 <Settings className="h-4 w-4" />
//                                 Settings
//                             </Button>
//                             <Button variant="outline" className="w-fit justify-start text-primary hover:text-primary gap-2 cursor-pointer px-2">
//                                 <UserPlus className="h-4 w-4" />
//                                 Invite
//                             </Button>
//                         </div>

//                         <DropdownMenuSeparator />

//                         <div className="px-4 py-2">
//                             <div className="text-sm font-medium text-foreground mb-2">
//                                 Workspaces (1)
//                             </div>
//                             <div className="flex items-center justify-center gap-2 p-2 rounded-md">
//                                 <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
//                                     <span className="text-accent text-xs font-bold">{firstLetter}</span>
//                                 </div>
//                                 <span className="flex-1 text-sm text-primary">
//                                     {displayName}'s lovable
//                                 </span>
//                             </div>
//                             <Button variant="ghost" className="w-full justify-start gap-2 mt-2 text-secondary hover:text-secondary-foreground cursor-pointer">
//                                 <Plus className="h-4 w-4" />
//                                 Create new workspace
//                             </Button>
//                         </div>

//                         <DropdownMenuSeparator />

//                         <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
//                             <Gift className="h-4 w-4" />
//                             <span>Get free credits</span>
//                         </DropdownMenuItem>

//                         <DropdownMenuItem className="flex items-center gap-3 cursor-pointer" onClick={handleHelpCenterClick}>
//                             <HelpCircle className="h-4 w-4" />
//                             <span>Help Center</span>
//                         </DropdownMenuItem>

//                         <DropdownMenuSub>
//                             <DropdownMenuSubTrigger className="flex items-center gap-3 cursor-pointer">
//                                 <Monitor className="h-4 w-4" />
//                                 <span>Appearance</span>
//                             </DropdownMenuSubTrigger>
//                             <DropdownMenuSubContent>
//                                 <DropdownMenuItem
//                                     className="flex items-center gap-2 cursor-pointer"
//                                     onClick={() => setTheme("light")}
//                                 >
//                                     <Sun className="h-4 w-4" />
//                                     <span>Light</span>
//                                     {theme === "light" && <Check className="h-4 w-4 ml-auto" />}
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem
//                                     className="flex items-center gap-2 cursor-pointer"
//                                     onClick={() => setTheme("dark")}
//                                 >
//                                     <Moon className="h-4 w-4" />
//                                     <span>Dark</span>
//                                     {theme === "dark" && <Check className="h-4 w-4 ml-auto" />}
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem
//                                     className="flex items-center gap-2 cursor-pointer"
//                                     onClick={() => setTheme("system")}
//                                 >
//                                     <MonitorSmartphone className="h-4 w-4" />
//                                     <span>System</span>
//                                     {theme === "system" && <Check className="h-4 w-4 ml-auto" />}
//                                 </DropdownMenuItem>
//                             </DropdownMenuSubContent>
//                         </DropdownMenuSub>

//                         <DropdownMenuSeparator />

//                         <DropdownMenuItem
//                             className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400 hover:text-red-600 dark:hover:text-red-400"
//                             onClick={handleSignOut}
//                         >
//                             <LogOut className="h-4 w-4" />
//                             <span>Sign out</span>
//                         </DropdownMenuItem>
//                     </DropdownMenuGroup>
//                 </DropdownMenuContent>
//             </DropdownMenu>

//             <WorkspaceSettingsModal
//                 open={isSettingsOpen}
//                 onOpenChange={setIsSettingsOpen}
//                 workspace={workspaceData}
//                 user={{ firstName: displayName, email }}
//             />
//         </>
//     );
// }








"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useTypedDispatch } from "@/hooks/useTypedDispatch";
import { logout } from "@/store/feature/auth/authThunks";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    Gift,
    Crown,
    ArrowUpRight,
    Settings,
    UserPlus,
    HelpCircle,
    Monitor,
    LogOut,
    Check,
    Sun,
    Moon,
    MonitorSmartphone,
    Plus,
} from "lucide-react";
import { User } from "@/types/api";
import { WorkspaceSettingsModal } from "@/components/setting/workspace-settings-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreateWorkspaceModal } from "@/components/CreateWorkspaceModal";

interface ProfileDropdownProps {
    user: User;
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const dispatch = useTypedDispatch();
    const [mounted, setMounted] = React.useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
    const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const displayName = user.firstName || "User";
    const email = user.email || "";
    const firstName = displayName.split(" ")[0];
    const firstLetter = displayName.charAt(0).toUpperCase();

    const workspaceData = {
        name: `${displayName}'s lovable`,
        description: "A workspace for building amazing applications",
        avatar: undefined,
        allowUnprotectedSamples: true,
        allowInvites: false,
    };

    const handleSignOut = async () => {
        try {
            const result = await dispatch(logout()).unwrap();
            toast.success(result.message || "Successfully logged out!");
            router.push("/");
        } catch (error: any) {
            console.error("Logout failed:", error);
            toast.error(error?.message || "Failed to log out");
            router.push("/");
        }
    };

    const handleHelpCenterClick = () => {
        router.push("/support");
    };

    if (!mounted) {
        return null;
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex items-center gap-1 border-none rounded-[0.375rem] bg-primary dark:bg-accent hover:bg-primary/80 dark:hover:bg-accent/80 transition-colors cursor-pointer"
                    >
                        <span className="text-sm rounded-[0.3125rem] w-6 h-6 flex bg-accent dark:bg-primary text-primary dark:text-accent items-center justify-center font-medium">
                            {firstLetter}
                        </span>
                        <span className="hidden sm:block text-accent dark:text-primary text-xs font-medium leading-5">
                            {firstName}'s lovable
                        </span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="bg-background border-border py-5 px-2.5 shadow-lg !max-w-[25rem] w-full"
                    sideOffset={8}
                >
                    <DropdownMenuGroup>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-6 h-6 rounded-[0.375rem] bg-primary flex items-center justify-center">
                                <span className="text-white text-lg font-bold">{firstLetter}</span>
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-primary">
                                    {displayName}'s Lovable
                                </div>
                                <div className="text-xs text-secondary">
                                    {email}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col p-4 gap-4 space-y-2 bg-primary rounded-lg mb-5">
                            <div>
                                <p className="font-semibold text-accent text-base">You're using free plan</p>
                                <p className="text-secondary text-base">You can add components to your app by upgrading to the next plan.</p>
                            </div>
                            <Button className="bg-accent text-primary hover:bg-accent/90">
                                Upgrade
                            </Button>
                        </div>

                        <div className="flex px-4 py-2 space-x-2">
                            <Button
                                variant="outline"
                                className="w-fit justify-start text-primary hover:text-primary gap-2 cursor-pointer px-2"
                                onClick={() => setIsSettingsOpen(true)}
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </Button>
                            <Button variant="outline" className="w-fit justify-start text-primary hover:text-primary gap-2 cursor-pointer px-2">
                                <UserPlus className="h-4 w-4" />
                                Invite
                            </Button>
                        </div>

                        <DropdownMenuSeparator />

                        <div className="px-4 py-2">
                            <div className="text-sm font-medium text-foreground mb-2">
                                Workspaces (1)
                            </div>
                            <div className="flex items-center justify-center gap-2 p-2 rounded-md">
                                <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
                                    <span className="text-accent text-xs font-bold">{firstLetter}</span>
                                </div>
                                <span className="flex-1 text-sm text-primary">
                                    {displayName}'s lovable
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 mt-2 text-secondary hover:text-secondary-foreground cursor-pointer"
                                onClick={() => setIsCreateWorkspaceOpen(true)}
                            >
                                <Plus className="h-4 w-4" />
                                Create new workspace
                            </Button>
                        </div>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
                            <Gift className="h-4 w-4" />
                            <span>Get free credits</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center gap-3 cursor-pointer" onClick={handleHelpCenterClick}>
                            <HelpCircle className="h-4 w-4" />
                            <span>Help Center</span>
                        </DropdownMenuItem>

                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center gap-3 cursor-pointer">
                                <Monitor className="h-4 w-4" />
                                <span>Appearance</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => setTheme("light")}
                                >
                                    <Sun className="h-4 w-4" />
                                    <span>Light</span>
                                    {theme === "light" && <Check className="h-4 w-4 ml-auto" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => setTheme("dark")}
                                >
                                    <Moon className="h-4 w-4" />
                                    <span>Dark</span>
                                    {theme === "dark" && <Check className="h-4 w-4 ml-auto" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => setTheme("system")}
                                >
                                    <MonitorSmartphone className="h-4 w-4" />
                                    <span>System</span>
                                    {theme === "system" && <Check className="h-4 w-4 ml-auto" />}
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400 hover:text-red-600 dark:hover:text-red-400"
                            onClick={handleSignOut}
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Sign out</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <WorkspaceSettingsModal
                open={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}
                workspace={workspaceData}
                user={{ firstName: displayName, email }}
            />
            <Dialog open={isCreateWorkspaceOpen} onOpenChange={setIsCreateWorkspaceOpen}>
                <DialogContent className="max-w-md p-6">
                    <CreateWorkspaceModal user={user} onWorkspaceCreated={() => setIsCreateWorkspaceOpen(false)} />
                </DialogContent>
            </Dialog>
        </>
    );
}