import { useState } from 'react'
import { ClerkProviderWithRoutes } from "./auth/ClerkProviderWithRoutes.jsx"
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return
  <ClerkProviderWithRoutes>
    <Routes></Routes>
  </ClerkProviderWithRoutes>
}

export default App
