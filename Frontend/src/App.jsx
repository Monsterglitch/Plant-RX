import { useState } from 'react';
import './App.css'
import Home from './components/Home';
import { ContextProvider } from './context/context';
import { useEffect } from 'react';
import Preloader from './components/Preloader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MedicinalPlants from './components/MedicinalPlants';
import Maps from './components/Maps';
import CustChatBot from './components/CustChatBot';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  })

  if (loading) {
    return (
      <Preloader />
    )
  }

  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/med-plants' element={<MedicinalPlants />} />
          <Route path='/maps' element={<Maps />} />
          <Route path='/chat-bot' element={<CustChatBot/>} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App;
