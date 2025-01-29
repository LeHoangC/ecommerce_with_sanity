import type { Metadata } from 'next'
import {} from 'next/font/google'
import '../globals.css'
import Header from '@/components/Header'
import { ClerkProvider } from '@clerk/nextjs'
import localFont from 'next/font/local'
import Footer from '@/components/Footer'

const raleway = localFont({
    src: '../../fonts/Raleway.woff2',
    variable: '--font-raleway',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${raleway.variable} antialiased`}>
                    <Header />
                    {children}
                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    )
}
