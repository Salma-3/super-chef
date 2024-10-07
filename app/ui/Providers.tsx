'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

type Props = {
    children: React.ReactNode,
    params: any
}

function Providers({ children, params }: Props) {
  return (
    <SessionProvider session={params.session}>
        {children}
    </SessionProvider>
  )
}

export default Providers