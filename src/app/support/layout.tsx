import Footer from '@/components/footer'
import Header from '@/components/header'
import React, { ReactNode } from 'react'

const layout = ({children}: {children:ReactNode}) => {
  return (
    <div>
        <Header/>
        {children}
        <Footer/>
    </div>
  )
}

export default layout