import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'


interface Props {
  children?: React.ReactNode
}

function ReactQueryProvider({ children }: Props) {

  
const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
        {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider