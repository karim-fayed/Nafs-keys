import type React from "react"
import { CartProvider } from "@/components/providers/cart-provider"
import { SessionProvider } from "@/components/providers/session-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "@/app/globals.css"
import { Navbar } from "@/components/navbar"
import FloatingCartButton from "@/components/FloatingCartButton"


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SessionProvider>
            <CartProvider>
              <Navbar />
              {children}
              <FloatingCartButton />
              <Toaster />
            </CartProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
