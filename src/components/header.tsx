// "use client";

// import Link from "next/link";
// import * as React from "react";
// import { Button } from "./ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
// import { Menu, User } from "lucide-react";
// import { LoginModal } from "./auth/Login";
// import { LogoutButton } from "./auth/LogoutButton";
// import { ProfileDropdown } from "./auth/ProfileDropdown";
// import { useAuth } from "../hooks/useAuth";
// import Gift from "./icons/Gift";
// import Inbox from "./icons/Inbox";
// import { useTheme } from "next-themes";

// const Headers = [
//   { id: 1, name: "Community", href: "#" },
//   { id: 2, name: "Pricing", href: "#" },
//   { id: 3, name: "Learn", href: "#" },
//   { id: 4, name: "Lounched", href: "#" },
// ];

// const Header = () => {
//   const [open, setOpen] = React.useState(false);
//   const { user, isAuthenticated, loading } = useAuth();
//   const { resolvedTheme } = useTheme();

//   const isDark = resolvedTheme === "dark";
//   let color = isDark ? "#5B5B5B" : "#fcfbf8";

//   return (
//     <header className="sm:px-0 sticky top-0 z-50 transition-all duration-200 ease-out border-muted/25 bg-background/75 backdrop-blur-xl">
//       <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-2 ">
//         <div className="flex items-center gap-6 sm:gap-8 lg:gap-[4.4375rem]">
//           <div>Logo</div>
//           <div className="hidden sm:flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-foreground text-sm">
//             {Headers.map((header) => (
//               <Link key={header.id} href={header.href}>
//                 {header.name}
//               </Link>
//             ))}
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           {loading ? (
//             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
//           ) : isAuthenticated ? (
//             <div className="flex items-center gap-2">
//               <Gift color={color} />
//               <Inbox color={color} />
//               {user && <ProfileDropdown user={user} />}
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <LoginModal mode="login">
//                 <Button className="bg-accent text-foreground hover:bg-accent/50 rounded-[0.375rem] border border-[#ECEAE4] cursor-pointer">
//                   Log in
//                 </Button>
//               </LoginModal>
//               <LoginModal mode="signup">
//                 <Button className="bg-foreground text-background-secondary rounded-[0.375rem] cursor-pointer">
//                   Get Started
//                 </Button>
//               </LoginModal>
//             </div>
//           )}

//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild className="sm:hidden">
//               <Button variant="ghost" size="icon">
//                 <Menu className="h-8 w-8 cursor-pointer" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="">
//               <nav className="flex flex-col gap-6 bg mt-6">
//                 {Headers.map((header) => (
//                   <Link
//                     key={header.id}
//                     href={header.href}
//                     className="text-foreground text-lg font-medium hover:text-foreground/80 transition-colors"
//                     onClick={() => setOpen(false)}
//                   >
//                     {header.name}
//                   </Link>
//                 ))}

//                 {/* Mobile Auth Section */}
//                 <div className="pt-6 border-t border-border px-3">
//                   {isAuthenticated ? (
//                     <div className="flex flex-col gap-4">
//                       <div className="flex items-center gap-2 text-sm text-foreground">
//                         <User className="w-4 h-4" />
//                         <span>{user?.email}</span>
//                       </div>
//                       <LogoutButton variant="outline" className=" px-5" />
//                     </div>
//                   ) : (
//                     <div className="flex flex-col gap-3">
//                       <LoginModal mode="login">
//                         <Button
//                           className="w-full bg-accent text-foreground hover:bg-accent/50 rounded-[0.375rem] border border-[#ECEAE4] cursor-pointer"
//                           onClick={() => setOpen(false)}
//                         >
//                           Log in
//                         </Button>
//                       </LoginModal>
//                       <LoginModal mode="signup">
//                         <Button
//                           className="w-full bg-foreground text-background-secondary rounded-[0.375rem] cursor-pointer"
//                           onClick={() => setOpen(false)}
//                         >
//                           Get Started
//                         </Button>
//                       </LoginModal>
//                     </div>
//                   )}
//                 </div>
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;







"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, User } from "lucide-react";
import { LoginModal } from "./auth/Login";
import { LogoutButton } from "./auth/LogoutButton";
import { ProfileDropdown } from "./auth/ProfileDropdown";
import { useAuth } from "../hooks/useAuth";
import Gift from "./icons/Gift";
import Inbox from "./icons/Inbox";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";

const Headers = [
  { id: 1, name: "Community", href: "#" },
  { id: 2, name: "Pricing", href: "#" },
  { id: 3, name: "Learn", href: "#" },
  { id: 4, name: "Lounched", href: "#" },
];

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const { user, isAuthenticated, loading, authMethod } = useAuth();
  const { resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll state
  const headerRef = useRef<HTMLElement>(null); // Ref to measure header height

  // Debug logging in development
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔐 Header auth state:', {
        isAuthenticated,
        loading,
        authMethod,
        userEmail: user?.email,
        userUID: user?.uid
      });
    }
  }, [isAuthenticated, loading, authMethod, user]);

  const isDark = resolvedTheme === "dark";
  let color = isDark ? "#F7F4ED" : "#5F5F5D";

  // Calculate header height and handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight; // Get header height
        setIsScrolled(window.scrollY > headerHeight); // Change background when scrolled past header height
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  return (
    <header
      ref={headerRef}
      className={`sm:px-0 sticky top-0 z-50 transition-all duration-200 ease-out  ${
        isScrolled
          ? "bg-background/75 backdrop-blur-xl" // Opaque background when scrolled
          : "bg-transparent" // Transparent initially
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-2">
        <div className="flex items-center gap-6 sm:gap-8 lg:gap-[4.4375rem]">
          <div>Logo</div>
          <div className="hidden sm:flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-foreground dark:text-accent text-sm">
            {Headers.map((header) => (
              <Link key={header.id} href={header.href}>
                {header.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className=" cursor-pointer hover:bg-primary/5 rounded-md p-1"><Gift color={color}  /></div>
              <div className=" cursor-pointer hover:bg-primary/5 rounded-md p-1"><Inbox color={color} /></div>
              
              {user && <ProfileDropdown user={user} />}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <LoginModal mode="login">
                <Button className="bg-accent text-foreground  hover:bg-accent/85 rounded-[0.375rem] border border-[#ECEAE4] cursor-pointer">
                  Log in
                </Button>
              </LoginModal>
              <LoginModal mode="signup">
                <Button className="bg-foreground text-background-secondary rounded-[0.375rem] cursor-pointer">
                  Get Started
                </Button>
              </LoginModal>
            </div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-8 w-8 cursor-pointer" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="">
              <nav className="flex flex-col gap-6 mt-6">
                {Headers.map((header) => (
                  <Link
                    key={header.id}
                    href={header.href}
                    className="text-foreground text-lg font-medium hover:text-foreground/80 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {header.name}
                  </Link>
                ))}

                {/* Mobile Auth Section */}
                <div className="pt-6 border-t border-border px-3">
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <User className="w-4 h-4" />
                        <span>{user?.email}</span>
                      </div>
                      <LogoutButton variant="outline" className="px-5" />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <LoginModal mode="login">
                        <Button
                          className="w-full bg-accent text-foreground hover:bg-accent/50 rounded-[0.375rem] border border-[#ECEAE4] cursor-pointer"
                          onClick={() => setOpen(false)}
                        >
                          Log in
                        </Button>
                      </LoginModal>
                      <LoginModal mode="signup">
                        <Button
                          className="w-full bg-foreground text-background-secondary rounded-[0.375rem] cursor-pointer"
                          onClick={() => setOpen(false)}
                        >
                          Get Started
                        </Button>
                      </LoginModal>
                    </div>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;