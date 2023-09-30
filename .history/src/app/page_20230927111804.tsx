import { Button } from '@/components/ui/button'
import { UserButton, auth } from '@clerk/nextjs'
import { LogIn } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';

export default async function Home() {
  const {userId} = await auth();
  const isAuthenticated = !!userId
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center">
          <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
          <UserButton afterSignOutUrl="/"/>

        </div>
        <div className='flex mt-2'>
        {isAuthenticated && <Button>Go to Chats</Button>}
        </div>
        <h3 className="text-2xl">Unlock the Power of Knowledge with Our Chat PDF Tool</h3>
        <p className="max-w-xl mt-1 text-md text-slate-600">Join the future of research and discovery. Experience the convenience, efficiency, and simplicity of our Chat PDF Tool today. Your quest for knowledge begins here.</p>
        <div className=" w-full mt-4">
          {isAuthenticated ? (<h1>Fileupload</h1>):(
            <Link href="/sign-in">
            <Button>Log in to get started <LogIn className="w-4 h-4 ml-2"/></Button>
            </Link>
          )}
        </div>
      </div>
      </div>

    </div>)
}
     