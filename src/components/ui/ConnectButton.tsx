// src/components/ui/ConnectButton.tsx

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation' // Use next/navigation instead of next/router
import { useAccount } from 'wagmi'

const ConnectButton = () => {
  const router = useRouter()
  const { isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard') // Redirect to the Dashboard page
    }
  }, [isConnected, router])

  return <w3m-button />
}

export default ConnectButton
