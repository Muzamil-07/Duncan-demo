import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Color, DoubleSide, MeshPhysicalMaterial, TextureLoader } from 'three'
import { useAppSelector } from '../store/hooks'
import { isEmpty } from 'lodash'
import { selectBoxPrint, selectBoxStyle } from '../store/features/box/boxSlice'
// Adjust the import path to match your project structure

const useModelConfigurator = ({ meshNames }) => {
  const style = useAppSelector(selectBoxStyle)
  const print = useAppSelector(selectBoxPrint)

  const { actions, scene } = useThree()

  // Animation control

  // Function to update material of a mesh
  const updateMeshMaterial = (mesh, materialProps) => {
    const newMaterial = new MeshPhysicalMaterial(materialProps)
    mesh.material = newMaterial
  }

  // Material customization
  useEffect(() => {
    meshNames.forEach(meshName => {
      const mesh = scene.getObjectByName(meshName)

      if (mesh) {
        const materialProps = {}

        if (style && print) {
          materialProps.map = new TextureLoader('')
        }

        // This function call is common to both branches, so it's moved outside as well.
        if (
          materialProps.map ||
          materialProps.color ||
          materialProps.clearcoatMap
        ) {
          updateMeshMaterial(mesh, materialProps)
        }
      }
    })
  }, [])

  // Return anything that might be needed from this hook
  return {}
}

export default useModelConfigurator
