import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useAppSelector } from '../../../lib/store/hooks'
import { selectZoom } from '../../../lib/store/features/general/generalSlice'

const ZoomEffect = () => {
  const { camera } = useThree()
  const zoom = useAppSelector(selectZoom)

  useEffect(() => {
    // Adjust the calculation of targetZoom to suit your zoom prop range and desired camera zoom.
    // This example assumes zoom is a value between 0 and 100.
    let baseZoom = 2 // Base zoom level when zoom prop is at a midpoint, e.g., 50.
    let targetZoom = baseZoom + (zoom - 50) * 0.02 // Adjust this formula as needed.
    targetZoom = Math.max(targetZoom, 0.1) // Ensure there's a minimum zoom level, adjust as needed.

    camera.zoom = targetZoom
    camera.updateProjectionMatrix()
  }, [zoom, camera])
  return null // This component does not render anything itself
}

export default ZoomEffect
