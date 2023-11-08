import CardBox from 'components/card'
import './App.css'

// https://jsonplaceholder.typicode.com/todos
function App() {

  return (
    <div className='py-12 px-12 relative'>
      <div className='flex flex-col'>
        <h1 className="text-4xl font-bold text-center text-indigo-400">
          Welcome to Vite + React + Tailwind CSS + Zustand + TypeScript starter!
        </h1>
        <div className=' flex justify-center mb-4 py-6'>
          <img src='https://github.com/pmndrs/zustand/raw/main/bear.jpg' alt='' />
        </div>
      </div>

      <div className='px-12 py-12 flex flex-1 justify-center content-center'>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
        </div>
      </div>
    </div>
  )
}

export default App
