import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LandsListed from './components/LandsListed';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LandsListed/>
    </>
  )
}

export default App
