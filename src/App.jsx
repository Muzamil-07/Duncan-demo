import { Box } from '@mui/material'
import './App.css'
import Home from './pages'
import { useEffect } from 'react'
import { preloadTextures } from './lib/utils'

function App () {
  // useEffect(() => {
  //   setTimeout(() => {
  //     preloadTextures()
  //   }, 1000)
  // }, [])
  return (
    <>
      <Home />
    </>
  )
}

export default App
