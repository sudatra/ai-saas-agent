'use client'

import Link from 'next/link'
import React from 'react'
import HeaderPulse from './HeaderPulse'

const Header = () => {
  return (
    <header className='sticky top-0 z-50 left-0 right-0'>
      <div>
        <div>
          <Link href='/'>
            <HeaderPulse 
              size='small'
              color='blue'
            />

            <h1>AI SaaS</h1>
          </Link>
        </div>

        <div>

        </div>
      </div>
    </header>
  )
}

export default Header
