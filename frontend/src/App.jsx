import { useState } from 'react'
import { ClerkProviderWithRoutes } from "./auth/ClerkProviderWithRoutes.jsx"
import { Route, Routes } from 'react-router-dom'
import { layout } from './layout/Layout.jsx'
import { ChallengeGenerator } from './challenge/ChallengeGenerator.jsx'
import { HistoryPanel } from './history/HistoryPanel.jsx'
import { AuthenticationPage } from './auth/AuthenticationPage.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return
  <ClerkProviderWithRoutes>
    <Routes>
      <Route path="/sign-in/*" element={<AuthenticationPage />} />
      <Route path="/sign-up" element={<AuthenticationPage />} />

      <Route element={<layout />}>
        <Route path="/" element={<ChallengeGenerator />} />
        <Route path="/history" element={<HistoryPanel />} />
      </Route>

    </Routes>
  </ClerkProviderWithRoutes>
}

export default App
//if you want to go sign in page then render AuthenticationPage.jssx