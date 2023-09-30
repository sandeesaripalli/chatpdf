'use client'
import React from 'react'
import { Input } from './ui/input'
import {useChat} from 'ai/react'
type Props = {}

const ChatComponent = (props: Props) => {
    const {input, handleInputChange, handleSubmit}= useChat();
  return (
    <div className='relative max-h-screen overflow-visible'>
        <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
            <h3 className='text-xl font-bold'>Chat</h3>
        </div>

        {/* message list */}

        <form onSubmit={handleSubmit} className='sticky bottom-0 inset-x-0 px-2 py-4 bg-white'>
            <Input value = {input} onChange={handleInputChange} placeholder ="Ask away..." className='w-full'/>
        </form>
    </div>
  )
}

export default ChatComponent