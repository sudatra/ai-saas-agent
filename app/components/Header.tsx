'use client'

import Link from 'next/link'
import React from 'react'
import HeaderPulse from './HeaderPulse'

const Header = () => {
  return (
    <header className='sticky top-0 z-50 left-0 right-0 px-4 md:px-0 bg-white/80 backdrop-blur-sm 
    border-b border-gray-200'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between h-16'>
          <Link 
            href='/'
            className='flex gap-4 items-center'
          >
            <HeaderPulse 
              size='small'
              color='blue'
            />

            <h1 className='text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>AI SaaS</h1>
          </Link>
        </div>

        <div>

        </div>
      </div>
    </header>
  )
}

export default Header
