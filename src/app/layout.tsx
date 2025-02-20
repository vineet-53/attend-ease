import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import logo from "@/app/attendease_logo.webp";
import { experimental__simple } from "@clerk/themes";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PrimaryContainer from "@/components/PrimaryContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "./globals.css";
import BreadCrumb from "@/components/BreadCrumb";
import { Suspense } from "react";

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
          <PrimaryContainer>
            <nav className="w-full flex justify-between">
              <Link className="cursor-pointer" href={"/"}>
                <img
                  width={50}
                  className="rounded-md"
                  height={50}
                  src={logo.src}
                  alt="logo"
                />
              </Link>

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
            <BreadCrumb />
            {children}
          </PrimaryContainer>
        </body>
      </html>
    </ClerkProvider>
  );
}
