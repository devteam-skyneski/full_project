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

    <html lang="en">
<<<<<<< HEAD
      <body className={montserrat.variable + ' min-h-screen'}>
        <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
          {children}
        </ClickSpark>
      </body>
=======
      <body>{children}</body>
>>>>>>> 0423e909de49da4ac4530ed69bd56e687b20c424
    </html>

  )

}