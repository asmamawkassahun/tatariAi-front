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

const Headers = [
  { id: 1, name: "Community", href: "#" },
  { id: 2, name: "Pricing", href: "#" },
  { id: 3, name: "Learn", href: "#" },
  { id: 4, name: "Lounched", href: "#" },
];

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const { user, isAuthenticated, loading } = useAuth();
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  let color = isDark ? "#5B5B5B" : "#fcfbf8";

  return (
    <header className="container mx-auto flex items-center justify-between py-4 px-2 sm:px-0 sticky top-0 bg-background z-50">
      <div className="flex items-center gap-6 sm:gap-8 lg:gap-[4.4375rem]">
        <div>Logo</div>
        <div className="hidden sm:flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-foreground text-sm">
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
          <div className="flex items-center gap-2">
            <Gift color={color} />
            <Inbox color={color} />
            {user && <ProfileDropdown user={user} />}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <LoginModal mode="login">
              <Button className="bg-accent text-foreground hover:bg-accent/50 rounded-[0.375rem] border border-[#ECEAE4] cursor-pointer">
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
            <nav className="flex flex-col gap-6 bg mt-6">
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
                    <LogoutButton variant="outline" className=" px-5" />
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
    </header>
  );
};

export default Header;
