import './App.css'
import CardBox from './components/card'
import { Button } from './components/ui/button'
import { useToast } from './components/ui/use-toast'

// https://jsonplaceholder.typicode.com/todos
function App() {

  const { toast } = useToast()
  const body = {

    "emailTo": "ngockhoe.le@kepland.com.vn",
    "token": "YnKePgTZVn9ohthTwAfQxQL0Fu1zWnQfKbJmFJGTV7HW73XQ9FUA",
    "requestedBy": "Khoe Le",
    "emailCC": "ngockhoe.le@kepland.com.vn",
    "approvalPerson": "A. Thien",
    "requestCode": "azkxfk3k2k32k",
    "requestDescription": "ke ba tao diii",
    "categoryName": "ví duu",
    "requestDisplayName": "ai biet",
    "linkOfRequest": "https://portal.keppland.com.vn",
    "type": 2
  }

  const url = 'https://klvportalapidev.azurewebsites.net/api/Common/EASSendEmail'

  const handleSendEmail = async () => {
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(body),
      });

      const data = await res.json();
      toast({
        variant: 'success',
        title: 'Send Email.',
        description: 'Send Email Success.',
      });

      console.log(res);
      console.log(data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Send Email.',
        description: 'Send Email error.',
      });
    }
  };

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

      <div>
        <Button onClick={handleSendEmail}>Send Email</Button>
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
