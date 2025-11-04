import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import './globals.css'
import ClickSpark from '@/components/ClickSpark'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})



export const metadata: Metadata = {

  title: 'EduLearn - Transform Your Future with World-Class Education',

  description: 'Access premium courses from top universities worldwide. Learn at your own pace or pursue university registration for recognized degrees.',

}



export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en">
      <body className={montserrat.variable + ' min-h-screen'}>
        <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
          {children}
        </ClickSpark>
      </body>
    </html>

  )

}