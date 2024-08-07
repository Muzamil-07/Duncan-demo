/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { LoopOnce, RepeatWrapping, SRGBColorSpace } from 'three'
import { useAppSelector } from '../../lib/store/hooks'
import {
  selectBoxCoating,
  selectBoxFinishing,
  selectBoxMaterial,
  selectBoxPrint,
  selectBoxPrintSurface,
  selectBoxState
} from '../../lib/store/features/box/boxSlice'
import { useThree, useFrame } from '@react-three/fiber'

export function Tuckend (props) {
  const group = useRef()
  const meshRef = useRef()
  const { nodes, materials, animations } = useGLTF(
    '/assets/models/tuckend/tuckend.glb'
  )
  const { actions } = useAnimations(animations, group)

  const boxState = useAppSelector(selectBoxState)
  const print = useAppSelector(selectBoxPrint)
  const material = useAppSelector(selectBoxMaterial)
  const printSurface = useAppSelector(selectBoxPrintSurface)
  const coating = useAppSelector(selectBoxCoating)
  const finishing = useAppSelector(selectBoxFinishing)

  // Ref to track the previous coating and finishing values
  const previousCoatingRef = useRef(coating)
  const previousFinishingRef = useRef({ ...finishing })

  // ******** ANIMATION SCRIPT
  useEffect(() => {
    if (boxState === 'open') {
      actions.ArmatureAction.setLoop(LoopOnce)
      actions.ArmatureAction.clampWhenFinished = true
      actions.ArmatureAction.timeScale = 1
      actions.ArmatureAction.reset().play()
    } else if (boxState === 'close') {
      actions.ArmatureAction.setLoop(LoopOnce)
      actions.ArmatureAction.clampWhenFinished = true
      actions.ArmatureAction.timeScale = -1
      actions.ArmatureAction.paused = false
    }
  }, [boxState, actions.ArmatureAction])

  // ********** ROTATION SCRIPT
  useEffect(() => {
    const shouldRotate =
      (coating !== 'none' && previousCoatingRef.current !== coating) ||
      (finishing.goldFoil && !previousFinishingRef.current.goldFoil) ||
      (finishing.embossing && !previousFinishingRef.current.embossing) ||
      (finishing.spotGloss && !previousFinishingRef.current.spotGloss)

    if (shouldRotate) {
      // Rotate the model 360 degrees
      let rotationY = 0
      const rotationSpeed = 0.05 // Adjust the speed of rotation as needed

      const animateRotation = () => {
        if (rotationY < Math.PI * 2) {
          rotationY += rotationSpeed
          group.current.rotation.y = rotationY
          requestAnimationFrame(animateRotation)
        } else {
          group.current.rotation.y = 0 // Reset the rotation
        }
      }
      animateRotation()
    }

    previousCoatingRef.current = coating
    previousFinishingRef.current = { ...finishing }
  }, [coating, finishing])

  // ********** CONFIGURATOR SCRIPT
  let outsideBaseTexturePath = ''
  let insideBaseTexturePath = ''
  let sideTexturePath = ''

  if (print !== 'none') {
    outsideBaseTexturePath = `/assets/models/tuckend/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/outside_${print}.jpg`
  } else {
    outsideBaseTexturePath = `/assets/models/tuckend/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/base.jpg`
  }

  const outsideBaseTexture = useTexture(outsideBaseTexturePath)
  outsideBaseTexture.flipY = false
  outsideBaseTexture.colorSpace = SRGBColorSpace

  if (print !== 'none' && printSurface === 'outside-inside') {
    insideBaseTexturePath = `/assets/models/tuckend/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/inside_${print}.jpg`
  } else {
    insideBaseTexturePath = `/assets/models/tuckend/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/base.jpg`
  }

  const insideBaseTexture = useTexture(insideBaseTexturePath)
  insideBaseTexture.flipY = false
  insideBaseTexture.colorSpace = SRGBColorSpace

  if (material.includes('microflute-')) {
    sideTexturePath = `/assets/models/tuckend/${material}/side.jpg`
  } else {
    sideTexturePath = `/assets/models/tuckend/${material}/base.jpg`
  }

  const sideBaseTexture = useTexture(sideTexturePath)
  sideBaseTexture.flipY = false
  sideBaseTexture.colorSpace = SRGBColorSpace
  sideBaseTexture.wrapS = RepeatWrapping

  let goldFoil_opacity = 0
  let spotgloss_opacity = 0
  let bumpMap = null
  const embossingTexture = useTexture(
    '/assets/models/tuckend/textures/embossing_OUTSIDE.png'
  )
  embossingTexture.flipY = false
  if (!finishing.none) {
    if (finishing.goldFoil) goldFoil_opacity = 1
    if (finishing.spotGloss) spotgloss_opacity = 1
    if (finishing.embossing) bumpMap = embossingTexture
  }

  let clearCoat = 0
  let clearCoatRoughness = 0

  const coatingTexture = useTexture(
    '/assets/models/tuckend/textures/outside_coating_gloss_OMR.jpg'
  )
  coatingTexture.flipY = false

  if (coating !== 'none') {
    if (coating === 'gloss') {
      clearCoat = 1
      clearCoatRoughness = 0.15
    }
    if (coating === 'silk') {
      clearCoat = 0.8
      clearCoatRoughness = 0.2
    }
    if (coating === 'matt') {
      clearCoat = 1
      clearCoatRoughness = 0.4
    }
  }

  let roughnessMapOutsideTexturePath =
    '/assets/models/tuckend/textures/base.jpg'
  let roughnessMapInsideTexturePath = '/assets/models/tuckend/textures/base.jpg'
  let roughnessMapOutside = null
  let roughnessMapInside = null

  if (print === 'cmyk_1spot_metflo' || print === 'cmyk_2spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/tuckend/textures/cmyk_1spot_roughness_metflo_outside.jpg'
    roughnessMapInsideTexturePath =
      '/assets/models/tuckend/textures/cmyk_1spot_roughness_metflo_inside.jpg'
  }
  if (print === '1spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/tuckend/textures/1spot_roughness_metflo_outside.jpg'
    roughnessMapInsideTexturePath =
      '/assets/models/tuckend/textures/1spot_roughness_metflo_inside.jpg'
  }
  if (print === '2spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/tuckend/textures/2spot_roughness_metflo_outside.jpg'
    roughnessMapInsideTexturePath =
      '/assets/models/tuckend/textures/2spot_roughness_metflo_inside.jpg'
  }

  roughnessMapOutside = useTexture(roughnessMapOutsideTexturePath)
  roughnessMapInside = useTexture(roughnessMapInsideTexturePath)
  roughnessMapOutside.flipY = false
  roughnessMapInside.flipY = false

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='Armature' position={[0, -0.01, 0]} scale={0.073}>
          <group name='Mesh_0004'>
            <skinnedMesh
              name='outside'
              castShadow
              geometry={nodes.Mesh_0004_1.geometry}
              // material={materials.Material_color_outside}
              skeleton={nodes.Mesh_0004_1.skeleton}
              ref={meshRef}
            >
              <meshPhysicalMaterial
                map={outsideBaseTexture}
                bumpMap={bumpMap}
                bumpScale={15}
                clearcoatMap={coatingTexture}
                clearcoat={clearCoat}
                clearcoatRoughness={clearCoatRoughness}
                roughnessMap={roughnessMapOutside}
              />
            </skinnedMesh>
            <skinnedMesh
              castShadow
              name='inside'
              geometry={nodes.Mesh_0004_2.geometry}
              // material={materials.Material_color_inside
              skeleton={nodes.Mesh_0004_2.skeleton}
            >
              <meshPhysicalMaterial
                map={insideBaseTexture}
                clearcoatMap={coatingTexture}
                clearcoat={clearCoat}
                clearcoatRoughness={clearCoatRoughness}
                roughnessMap={
                  printSurface === 'outside-inside' ? roughnessMapInside : null
                }
              />
            </skinnedMesh>
            <skinnedMesh
              castShadow
              name='side'
              geometry={nodes.Mesh_0004_3.geometry}
              material={materials.Material_side}
              skeleton={nodes.Mesh_0004_3.skeleton}
            >
              <meshStandardMaterial map={sideBaseTexture} />
            </skinnedMesh>
            <skinnedMesh
              castShadow
              name='gold_foil'
              geometry={nodes.Mesh_0004_4.geometry}
              material={materials.finishing_gold_foil}
              material-transparent={true}
              material-opacity={goldFoil_opacity}
              skeleton={nodes.Mesh_0004_4.skeleton}
            />
            <skinnedMesh
              castShadow
              name='spot_gloss'
              geometry={nodes.Mesh_0004_5.geometry}
              material={materials.finishing_spot_gloss}
              material-transparent={true}
              material-opacity={spotgloss_opacity}
              skeleton={nodes.Mesh_0004_5.skeleton}
            />
          </group>
          <primitive object={nodes.main} />
          <primitive object={nodes.neutral_bone} />
        </group>
      </group>
    </group>
  )
}

// useGLTF.preload('/assets/models/tuckend/tuckend.glb')