import Provider from './components/Provider'
import Sidebar from './components/layouts/Sidebar'

import './globals.css'
import { Rubik } from 'next/font/google'

const inter = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}