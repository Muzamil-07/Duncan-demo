import { useEffect } from 'react'
import { preloadTextures } from '../utils'

const usePreload = () => {
  // Material customization
  useEffect(() => {
    const loadTextures = () => {
      preloadTextures()
    }

    // Using setTimeout to ensure it doesn't block initial rendering
    const timeoutId = setTimeout(() => {
      loadTextures()
    }, 0) // Or delay it further if needed

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  // Return anything that might be needed from this hook
  return null
}

export default usePreload
