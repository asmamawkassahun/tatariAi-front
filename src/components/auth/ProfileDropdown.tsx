// "use client";

// import * as React from "react";
// import { useTheme } from "next-themes";
// import { useRouter } from "next/navigation";
// import { useTypedDispatch } from "@/hooks/useTypedDispatch";
// import { logout } from "@/store/feature/auth/authThunks";
// import { SerializableUser } from "@/types/auth";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
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
// } from "lucide-react";

// interface ProfileDropdownProps {
//     user: SerializableUser;
// }

// export function ProfileDropdown({ user }: ProfileDropdownProps) {
//     const { theme, setTheme } = useTheme();
//     const router = useRouter();
//     const dispatch = useTypedDispatch();
//     const [mounted, setMounted] = React.useState(false);

//     React.useEffect(() => {
//         setMounted(true);
//     }, []);

//     const displayName = user.displayName || "User";
//     const email = user.email || "";
//     const firstName = displayName.split(" ")[0];
//     const firstLetter = displayName.charAt(0).toUpperCase();

//     const handleThemeToggle = () => {
//         setTheme(theme === "dark" ? "light" : "dark");
//     };

//     const handleSignOut = async () => {
//         try {
//             await dispatch(logout()).unwrap();
//             router.push("/");
//         } catch (error) {
//             console.error("Logout failed:", error);
//             // Still redirect to home page even if logout fails
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
//                     className="flex items-center gap-1 border-none rounded-[0.375rem] hover:bg-accent/50  transition-colors cursor-pointer"
//                 >
//                     <span className="text-sm  rounded-[0.3125rem] w-6 h-6 flex bg-red-500  hover:bg-red-400 items-center justify-center text-accent font-medium">
//                         {firstLetter}
//                     </span>
//                     <span className=" hidden sm:block text-primary dark:text-accent text-xs font-medium leading-5">
//                         {firstName}'s lovable
//                     </span>
//                 </Button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent
//                 align="end"
//                 className="w-80 bg-background border-border shadow-lg"
//                 sideOffset={8}
//             >
//                 {/* Header */}
//                 {/* User Info Section */}
//                 <DropdownMenuGroup>
//                     <div className="flex items-center gap-3 px-4 py-3">
//                         <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
//                             <span className="text-white text-lg font-bold">{firstLetter}</span>
//                         </div>
//                         <div className="flex-1">
//                             <div className="text-sm font-medium text-secondary">
//                                 {displayName}
//                             </div>
//                             <div className="text-xs text-muted-foreground">
//                                 {email}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Upgrade Section */}
//                     <div className="flex items-center justify-between px-4 py-2">
//                         <div className="flex items-center gap-2">
//                             <Crown className="h-4 w-4 text-yellow-500" />
//                             <span className="text-sm font-medium text-foreground">Turn Pro</span>
//                         </div>
//                         <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
//                             Upgrade
//                         </Button>
//                     </div>

//                     <DropdownMenuSeparator />

//                     {/* Credits Section */}
//                     <div className="px-4 py-2">
//                         <div className="flex items-center justify-between mb-2">
//                             <span className="text-sm font-medium text-foreground">Credits</span>
//                             <span className="text-sm text-muted-foreground">4.4 left</span>
//                         </div>
//                         <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
//                             <div
//                                 className="bg-blue-500 h-2 rounded-full"
//                                 style={{ width: "85%" }}
//                             ></div>
//                         </div>
//                         <p className="text-xs text-muted-foreground">
//                             Daily credits reset at midnight UTC
//                         </p>
//                     </div>

//                     <DropdownMenuSeparator />

//                     {/* Action Buttons */}
//                     <div className="flex px-4 py-2 space-x-2">
//                         <Button variant="outline" className="w-full justify-start gap-2 cursor-pointer w-fit px-2">
//                             <Settings className="h-4 w-4" />
//                             Settings
//                         </Button>
//                         <Button variant="outline" className="w-full justify-start gap-2 cursor-pointer w-fit px-2">
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
//                         <div className="flex items-center gap-2 p-2 rounded-md bg-accent">
//                             <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
//                                 <span className="text-white text-xs font-bold">{firstLetter}</span>
//                             </div>
//                             <span className="flex-1 text-sm text-secondary">
//                                 {displayName}
//                             </span>
//                             <span className="text-xs bg-muted text-white px-2 py-1 rounded">
//                                 FREE
//                             </span>
//                             <Check className="h-4 w-4 text-green-500" />
//                         </div>
//                         <Button variant="ghost" className="w-full justify-start gap-2 mt-2 text-secondary hover:text-secondary-foreground cursor-pointer">
//                             <ArrowUpRight className="h-4 w-4" />
//                             Create new workspace
//                         </Button>
//                     </div>

//                     <DropdownMenuSeparator />

//                     {/* Menu Items */}
//                     <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
//                         <Gift className="h-4 w-4" />
//                         <span>Get free credits</span>
//                     </DropdownMenuItem>

//                     <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
//                         <HelpCircle className="h-4 w-4" />
//                         <span>Help Center</span>
//                     </DropdownMenuItem>

//                     <DropdownMenuItem
//                         className="flex items-center justify-between cursor-pointer"
//                         onClick={handleThemeToggle}
//                     >
//                         <div className="flex items-center gap-2">
//                             <Monitor className="h-4 w-4" />
//                             <span>Appearance</span>
//                         </div>
//                         <ArrowUpRight className="h-4 w-4" />
//                     </DropdownMenuItem>

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
} from "lucide-react";
import { User } from "@/types/api";

interface ProfileDropdownProps {
    user: User;
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const dispatch = useTypedDispatch();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const displayName = user.firstName || "User";
    const email = user.email || "";
    const firstName = displayName.split(" ")[0];
    const firstLetter = displayName.charAt(0).toUpperCase();

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

    if (!mounted) {
        return null;
    }

    return (
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
                className="w-80 bg-background border-border shadow-lg"
                sideOffset={8}
            >
                <DropdownMenuGroup>
                    {/* User Info Section */}
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg font-bold">{firstLetter}</span>
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-secondary">
                                {displayName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {email}
                            </div>
                        </div>
                    </div>

                    {/* Upgrade Section */}
                    <div className="flex items-center justify-between px-4 py-2">
                        <div className="flex items-center gap-2">
                            <Crown className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium text-foreground">Turn Pro</span>
                        </div>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                            Upgrade
                        </Button>
                    </div>

                    <DropdownMenuSeparator />

                    {/* Credits Section */}
                    <div className="px-4 py-2">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">Credits</span>
                            <span className="text-sm text-muted-foreground">4.4 left</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                            <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: "85%" }}
                            ></div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Daily credits reset at midnight UTC
                        </p>
                    </div>

                    <DropdownMenuSeparator />

                    {/* Action Buttons */}
                    <div className="flex px-4 py-2 space-x-2">
                        <Button variant="outline" className="w-fit justify-start gap-2 cursor-pointer px-2">
                            <Settings className="h-4 w-4" />
                            Settings
                        </Button>
                        <Button variant="outline" className="w-fit justify-start gap-2 cursor-pointer px-2">
                            <UserPlus className="h-4 w-4" />
                            Invite
                        </Button>
                    </div>

                    <DropdownMenuSeparator />

                    {/* Workspaces Section */}
                    <div className="px-4 py-2">
                        <div className="text-sm font-medium text-foreground mb-2">
                            Workspaces (1)
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md bg-accent">
                            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">{firstLetter}</span>
                            </div>
                            <span className="flex-1 text-sm text-secondary">
                                {displayName}
                            </span>
                            <span className="text-xs bg-muted text-white px-2 py-1 rounded">
                                FREE
                            </span>
                            <Check className="h-4 w-4 text-green-500" />
                        </div>
                        <Button variant="ghost" className="w-full justify-start gap-2 mt-2 text-secondary hover:text-secondary-foreground cursor-pointer">
                            <ArrowUpRight className="h-4 w-4" />
                            Create new workspace
                        </Button>
                    </div>

                    <DropdownMenuSeparator />

                    {/* Menu Items */}
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <Gift className="h-4 w-4" />
                        <span>Get free credits</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <HelpCircle className="h-4 w-4" />
                        <span>Help Center</span>
                    </DropdownMenuItem>

                    {/* Theme Selection */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center gap-2  cursor-pointer">
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
    );
}