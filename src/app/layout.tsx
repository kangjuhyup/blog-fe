import './globals.css'
import { Inter } from 'next/font/google'
import HeaderComponent from '@/common/component/header'
import { HEADER_HEIGHT } from '@/common/const'
import FooterComponent from '@/common/component/footer'
import RootProvider from './provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ width: "100%", height: `calc(100vh - ${HEADER_HEIGHT})`, marginTop: HEADER_HEIGHT, background: "linear-gradient(black,gray)" }} className={inter.className}>
        <RootProvider>
          <HeaderComponent title='pentaclog' />
          {children}
          <FooterComponent />
        </RootProvider>
      </body>
    </html>
  )
}
