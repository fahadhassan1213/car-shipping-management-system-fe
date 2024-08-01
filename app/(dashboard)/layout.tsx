"use client";

import Link from "next/link";
import { Home, Package, PanelLeft } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shared/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/shared/breadcrumb";
import { Button } from "@/components/shared/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/shared/sheet";
import { NavItem } from "@/components/shared/nav-item";
import Providers from "@/components/shared/providers";
import RequireAuth from "@/hooks/RequireAuth";
import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/lib/context/AuthContext";
import { useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const authContext = useContext(AuthContext);
  const queryClient = new QueryClient();

  return (
    <RequireAuth>
      <Providers>
        <main className="flex min-h-screen w-full flex-col bg-muted/40">
          <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
              <NavItem href="/cars" label="Dashboard">
                <Home
                  className="h-5 w-5"
                  color={pathname === "/cars" ? "blue" : "black"}
                />
              </NavItem>
              <NavItem href="/bookings" label="Shipments">
                <Package
                  className="h-5 w-5"
                  color={pathname === "/bookings" ? "blue" : "black"}
                />
              </NavItem>
            </nav>
          </aside>
          <div className=" flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="w-full sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs bg-white">
                  <nav className="grid gap-6 text-lg font-medium bg-white">
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="h-5 w-5" />
                      Cars
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Package className="h-5 w-5" />
                      Shipments
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <div className="flex justify-between w-full">
                <Breadcrumb className="hidden md:flex">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href="/cars">Dashboard</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={pathname} className="capitalize">
                          {pathname.split("/")[1]}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="overflow-hidden rounded-full"
                    >
                      <Image
                        src="/placeholder-user.jpg"
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <button onClick={() => authContext?.logout()}>
                        Sign Out
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
            <QueryClientProvider client={queryClient}>
              <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
                {children}
              </main>
            </QueryClientProvider>
          </div>
        </main>
      </Providers>
    </RequireAuth>
  );
};

export default observer(DashboardLayout);
