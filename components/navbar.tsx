"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ui/toggle";

function Navbar() {
  return (
    <header className="p-4 shadow-md flex justify-between items-center border-b bg-black/80 backdrop-blur-md sticky top-0 z-50">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-white">No Fap App</h1>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6 text-white">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="https://www.youtube.com/watch?v=uDiFKRR9RbE&list=RDMM&start_radio=1&rv=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Motivation
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <ModeToggle />
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="text-white h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="bg-black text-white">
            <div className="mt-10 space-y-4 text-lg font-semibold ml-5">
              <Link href="/" className="block">Home</Link>
              <Link href="/dashboard" className="block">Dashboard</Link>
              <Link
                href="https://www.youtube.com/watch?v=uDiFKRR9RbE&list=RDMM&start_radio=1&rv=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                Motivation
              </Link>
              <div className="pt-4">
                <ModeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navbar;
