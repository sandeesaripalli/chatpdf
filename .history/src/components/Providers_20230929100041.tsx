'use client'
import React from 'react'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
type Props = {
    children: React.ReactNode
}

const Providers = ({children}: Props) => {
    const queryClient = new QueryClient()
  return (
    <h1></h1>
    //<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default Providers