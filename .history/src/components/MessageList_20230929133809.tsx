import { cn } from '@/lib/utils'
import { Message } from 'ai/react'
import React from 'react'

type Props = {
    messages: Message[]
}

const MessageList = ({messages}: Props) => {
    if(!messages) return <></>
  return (

    <div className="flex felx-col gap-2 px-4">
        {messages.map(message=>{
            return (<div key={message.id} className={
                cn('flex', {
                    'justify-end pl-10': message.role === 'user',
                    'justify-start pr-10': message.role === 'assistant'
                })
            }>

            </div>)
        })}
    </div>
  )
}

export default MessageList