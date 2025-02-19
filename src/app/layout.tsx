import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import logo from "@/app/attendease_logo.webp";
import { dark } from "@clerk/themes";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import PrimaryContainer from "@/components/PrimaryContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Attend Ease",
  description: "Easy attendance taking web application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
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
            </nav>{" "}
            {children}
          </PrimaryContainer>
        </body>
      </html>
    </ClerkProvider>
  );
}
