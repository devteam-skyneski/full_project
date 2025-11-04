import type { Metadata } from 'next'

import './globals.css'
import ClickSpark from '@/components/ClickSpark'



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

    <html lang="en" className="overflow-x-hidden">
      <body className="min-h-screen overflow-x-hidden w-full max-w-full">
        <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
          {children}
        </ClickSpark>
      </body>
    </html>

  )

}