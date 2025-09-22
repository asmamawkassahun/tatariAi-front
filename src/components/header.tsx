"use client"

import Link from "next/link"
import * as React from "react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"

const Headers = [
  { id: 1, name: "Community", href: "#" },
  { id: 2, name: "Pricing", href: "#" },
  { id: 3, name: "Learn", href: "#" },
  { id: 4, name: "Lounched", href: "#" },
]

const Header = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="container mx-auto flex items-center justify-between py-4 px-2 sm:px-0">
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
        <div className="flex items-center gap-2">
          <Button className="bg-accent text-foreground hover:bg-accent/50 rounded-[0.375rem] border border-[#ECEAE4] cursor-pointer">Log in</Button>
          <Button className="bg-foreground text-background-secondary rounded-[0.375rem] cursor-pointer">Get Started</Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="sm:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-8 w-8 cursor-pointer" />
             </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
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
              
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Header
