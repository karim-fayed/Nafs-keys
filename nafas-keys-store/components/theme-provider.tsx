'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // When mounted on client, now we can render
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by only rendering the theme provider when mounted on the client
  return <NextThemesProvider {...props}>{mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}</NextThemesProvider>
}
