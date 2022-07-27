import { Route, Routes } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import History from './pages/History'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}
