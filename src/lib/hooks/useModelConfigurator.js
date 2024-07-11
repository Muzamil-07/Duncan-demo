import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Color, DoubleSide, MeshPhysicalMaterial } from 'three'
import { useAppSelector } from '../store/hooks'
import {
  selectBoxCoating,
  selectBoxColor,
  selectBoxColorType,
  selectBoxGradient,
  selectBoxPattern,
  selectBoxPrinting
} from '../store/features/boxes/boxSlice'
import {
  selectCoatings,
  selectPatterns
} from '../store/features/textures/textureSlice'
import { isEmpty } from 'lodash'
// Adjust the import path to match your project structure

/**
 * Custom hook to configure model animations and materials.
 * @param {Object} params Parameters to configure the model.
 * @param {string[]} params.animationNames Names of the animations to control.
 * @param {string[]} params.materialNames Names of the materials to update.
 * @returns {Object} Refs and other utilities for the configured model.
 */
const useModelConfigurator = ({ meshNames }) => {
  const printingType = useAppSelector(selectBoxPrinting)
  const patternType = useAppSelector(selectBoxPattern)
  const patterns = useAppSelector(selectPatterns)
  const color = useAppSelector(selectBoxColor)
  const coatings = useAppSelector(selectCoatings)
  const coatingType = useAppSelector(selectBoxCoating)
  const colorType = useAppSelector(selectBoxColorType)

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

        if (
          printingType !== 'none' &&
          patternType !== 'none' &&
          !isEmpty(patterns) &&
          patterns[printingType][patternType]
        ) {
          materialProps.map = patterns[printingType][patternType]
        } else if (color && color.hex) {
          materialProps.color = new Color(color.hex.substring(0, 7))
          // materialProps.color = new Color('#ff2211')
        }
        String().substring
        // These properties are set regardless of the condition, so we extract them outside.
        materialProps.side = DoubleSide

        if (coatingType !== 'none') {
          materialProps.clearcoatMap = coatings[coatingType].base
          materialProps.clearcoatRoughness =
            coatings[coatingType].clearcoatRoughness
          materialProps.clearcoat = coatings[coatingType].clearcoat
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
  }, [
    patternType,
    color,
    meshNames,
    patterns,
    scene,
    printingType,
    coatings,
    coatingType
  ])

  // Return anything that might be needed from this hook
  return {}
}

export default useModelConfigurator
