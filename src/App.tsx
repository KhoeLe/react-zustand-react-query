import './App.css'
import CardBox from './components/card'
import { useUsers } from './hooks/useUsers'
import BeatLoader from 'react-spinners/BeatLoader'
import reactQuery from "./assets/react-query.svg"
import { useState } from 'react'
import { useDebounce } from './lib/debounce'

function App() {
  const [searchTerm, setSearchTerm] = useState('' as string)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { error, isLoading, data: users } = useUsers(debouncedSearchTerm)

  console.log(debouncedSearchTerm)
  return (
    <div className='py-12 px-12 relative'>
      <div className="flex flex-col items-center gap-6 text-center px-4 py-12 lg:py-24">
        <div className="flex gap-2 lg:gap-4 items-center">
          <div className="w-[60px] md:w-[80px] lg:w-[120px]">
            <img src={reactQuery}
              alt="TanStack Logo" />
          </div>
          <h1 className="inline-block font-black text-5xl md:text-6xl lg:text-8xl">
            <span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-violet-500 underline decoration-4 md:decoration-8 underline-offset-[.5rem] md:underline-offset-[1rem] decoration-gray-200 dark:decoration-gray-800 mb-2">Welcome to Vite + React + Tailwind CSS + Zustand + TypeScript starter!</span>
          </h1>
        </div>
        <h2 className="font-bold text-2xl max-w-md md:text-3xl lg:text-5xl lg:max-w-2xl">
          High-quality open-source software for
          <span className="underline decoration-dashed decoration-yellow-500 decoration-3 underline-offset-2"> web
            developers.</span>
        </h2>
        <p className="text opacity-90 max-w-sm lg:text-xl lg:max-w-2xl">
          Headless, type-safe, &amp; powerful utilities for State Management,
          Routing, Data Visualization, Charts, Tables, and more.
        </p>
      </div>
      
      <>
        <div className='flex justify-center'>
          <BeatLoader color='#10B981' loading={isLoading} size={24} />
        </div>
        {error && <div className='text-red-500 text-center'>{error.message}</div>}
        <CardBox setSearchTerm={setSearchTerm}  users={users} />
      </>
    </div>
  )
}

export default App
