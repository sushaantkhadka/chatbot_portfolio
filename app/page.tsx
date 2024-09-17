'use client'
import React from 'react'
import Chat from './components/Chat'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='mx-5'>
      <div className='flex justify-between my-4'>
        <Image src="/logo.png" alt='site logo' className='h-[40px] w-[160px] ' width={150} height={50} />
        <p className='text-lg font-semibold'>Talk to <span className='bg-gradient-to-r from-[#dc9e87] to-[#ead061] inline-block text-transparent bg-clip-text'>Peek_A-Boo</span></p>
      </div>
      <Chat />
    </div>
  )
}
