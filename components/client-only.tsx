"use client"

import React, { useState, useEffect } from "react"

interface ClientOnlyProps {
  children: React.ReactNode
}

export const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return <>{children}</>
}
