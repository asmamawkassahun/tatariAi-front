"use client";

import Link from "next/link";
import * as React from "react";

const Headers = [
  { id: 1, name: "Community", href: "#" },
  { id: 2, name: "Pricing", href: "#" },
  { id: 3, name: "Learn", href: "#" },
  { id: 4, name: "Lounched", href: "#" },
]

const Header = () => {
  return (
    <div className="bg-background text-foreground sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <div>
        <div>LOGO</div>
        <div>
          {Headers.map((header) => (
            <Link key={header.id} href={header.href}>{header.name}</Link>
          ))}
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};

export default Header;