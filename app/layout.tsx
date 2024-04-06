import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const font = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Airbnb | The unofficial Fullstack Clone",
  description: "Holiday rentals, cabins, beach houses & more",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
