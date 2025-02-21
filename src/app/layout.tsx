import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { experimental__simple } from "@clerk/themes";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import "./globals.css";
import PrimaryContainer from "@/components/PrimaryContainer";
import BreadCrumb from "@/components/BreadCrumb";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Toaster } from "sonner";
import ProgressBar from "@/components/ProgessBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Attend Ease",
  description: "easy attendance taking web application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: experimental__simple,
      }}
    >
      <html lang="en">
        <body className="dark text-white font-mono">
          <ProgressBar />
          <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <section className="flex flex-1 flex-col">
              <PrimaryContainer>
                <header>
                  <nav className="flex justify-between">
                    <Logo />
                    <div>
                      <div className="flex gap-2">
                        <SignedOut>
                          <Link href="/sign-in">
                            <Button variant="outline">login</Button>
                          </Link>
                          <Link href="/sign-up">
                            <Button>register</Button>
                          </Link>
                        </SignedOut>
                      </div>
                      <SignedIn>
                        <UserButton />
                      </SignedIn>
                    </div>
                  </nav>
                </header>
                <BreadCrumb />
                {children}
                <Toaster />
              </PrimaryContainer>
            </section>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
