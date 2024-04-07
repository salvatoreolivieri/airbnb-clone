import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

import { Navbar } from "@/components/navbar"
import { ModalProvider } from "@/providers/modal-provider"

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
        <Toaster position="bottom-right" richColors />
        <ModalProvider />
        <Navbar />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
