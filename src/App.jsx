import { Box } from '@mui/material'
import './App.css'
import Home from './pages'
import { Suspense, useEffect } from 'react'

function App () {
  return (
    <Suspense fallback={<Box> LOADING......................</Box>}>
      <Home />
    </Suspense>
  )
}

export default App
