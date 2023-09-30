'use client'
import React from 'react'
import { Input } from './ui/input'

type Props = {}

const ChatComponent = (props: Props) => {
  return (
    <div className='relative max-h-screen overflow-visible'>
        <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
            <h3 className='text-xl font-bold'>Chat</h3>
        </div>

        {/* message list */}

        <form>
            <Input />
        </form>
    </div>
  )
}

export default ChatComponent