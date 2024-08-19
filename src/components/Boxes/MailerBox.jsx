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
import { useGraph } from '@react-three/fiber'
import { SkeletonUtils } from 'three-stdlib'

export function MailerBox (props) {
  const group = useRef()

  const boxState = useAppSelector(selectBoxState)
  const print = useAppSelector(selectBoxPrint)
  const material = useAppSelector(selectBoxMaterial)
  const printSurface = useAppSelector(selectBoxPrintSurface)
  const coating = useAppSelector(selectBoxCoating)
  const finishing = useAppSelector(selectBoxFinishing)
  // const { scene, animations } = useGLTF('/assets/models/mailer/mailer-box.glb')
  const { scene, animations } = useGLTF('/assets/models/mailer/mailer-box.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  // Ref to track the previous coating and finishing values
  const previousCoatingRef = useRef(coating)
  const previousFinishingRef = useRef({ ...finishing })

  // ******** ANIMATION SCRIPT
  useEffect(() => {
    if (boxState === 'open') {
      actions.Animation.setLoop(LoopOnce)
      actions.Animation.clampWhenFinished = true
      actions.Animation.timeScale = 1
      actions.Animation.reset().play()
    } else if (boxState === 'close') {
      actions.Animation.setLoop(LoopOnce)
      actions.Animation.clampWhenFinished = true
      actions.Animation.timeScale = -1
      actions.Animation.paused = false
    }
  }, [boxState, actions.Animation])

  // ********** ROTATION SCRIPT
  // useEffect(() => {
  //   const shouldRotate =
  //     (coating !== 'none' && previousCoatingRef.current !== coating) ||
  //     (finishing.goldFoil && !previousFinishingRef.current.goldFoil) ||
  //     (finishing.embossing && !previousFinishingRef.current.embossing) ||
  //     (finishing.spotGloss && !previousFinishingRef.current.spotGloss)

  //   if (shouldRotate) {
  //     // Rotate the model 360 degrees
  //     let rotationY = 0
  //     const rotationSpeed = 0.05 // Adjust the speed of rotation as needed

  //     const animateRotation = () => {
  //       if (rotationY < Math.PI * 2) {
  //         rotationY += rotationSpeed
  //         group.current.rotation.y = rotationY
  //         requestAnimationFrame(animateRotation)
  //       } else {
  //         group.current.rotation.y = 0 // Reset the rotation
  //       }
  //     }
  //     animateRotation()
  //   }

  //   previousCoatingRef.current = coating
  //   previousFinishingRef.current = { ...finishing }
  // }, [coating, finishing])

  // let outsideBaseTexturePath = ''
  // let insideBaseTexturePath = ''
  // let sideTexturePath = ''

  // if (print !== 'none') {
  //   outsideBaseTexturePath = `/assets/models/mailer/${
  //     material.includes('white')
  //       ? material.replaceAll('microflute-', 'coated-')
  //       : material.replaceAll('microflute-', '')
  //   }/outside_${print}.jpg`
  // } else {
  //   outsideBaseTexturePath = `/assets/models/mailer/${
  //     material.includes('white')
  //       ? material.replaceAll('microflute-', 'coated-')
  //       : material.replaceAll('microflute-', '')
  //   }/base.jpg`
  // }

  // const outsideBaseTexture = useTexture(outsideBaseTexturePath)
  // outsideBaseTexture.flipY = false
  // outsideBaseTexture.colorSpace = SRGBColorSpace

  // if (print !== 'none' && printSurface === 'outside-inside') {
  //   insideBaseTexturePath = `/assets/models/mailer/${
  //     material.includes('white')
  //       ? material.replaceAll('microflute-', 'coated-')
  //       : material.replaceAll('microflute-', '')
  //   }/inside_${print}.jpg`
  // } else {
  //   insideBaseTexturePath = `/assets/models/mailer/${
  //     material.includes('white')
  //       ? material.replaceAll('microflute-', 'coated-')
  //       : material.replaceAll('microflute-', '')
  //   }/base.jpg`
  // }

  // const insideBaseTexture = useTexture(insideBaseTexturePath)
  // insideBaseTexture.flipY = false
  // insideBaseTexture.colorSpace = SRGBColorSpace

  // if (material.includes('microflute-')) {
  //   sideTexturePath = `/assets/models/mailer/${material}/side.jpg`
  // } else {
  //   sideTexturePath = `/assets/models/mailer/${material}/base.jpg`
  // }

  // const sideBaseTexture = useTexture(sideTexturePath)
  // sideBaseTexture.flipY = false
  // sideBaseTexture.colorSpace = SRGBColorSpace
  // sideBaseTexture.wrapS = RepeatWrapping

  // let goldFoil_opacity = 0
  // let spotgloss_opacity = 0
  // let bumpMap = null
  // const embossingTexture = useTexture(
  //   '/assets/models/mailer/textures/finishing_emboss_normal_map.jpg'
  // )
  // embossingTexture.flipY = false
  // if (!finishing.none) {
  //   if (finishing.goldFoil) goldFoil_opacity = 1
  //   if (finishing.spotGloss) spotgloss_opacity = 1
  //   if (finishing.embossing) bumpMap = embossingTexture
  // }

  // let clearCoat = 0
  // let clearCoatRoughness = 0

  // const coatingTexture = useTexture(
  //   '/assets/models/mailer/textures/inside_coating_gloss_OMR.jpg'
  // )
  // coatingTexture.flipY = false

  // if (coating !== 'none') {
  //   if (coating === 'gloss') {
  //     clearCoat = 1
  //     clearCoatRoughness = 0.15
  //   }
  //   if (coating === 'silk') {
  //     clearCoat = 0.8
  //     clearCoatRoughness = 0.2
  //   }
  //   if (coating === 'matt') {
  //     clearCoat = 1
  //     clearCoatRoughness = 0.4
  //   }
  // }

  // let roughnessMapOutsideTexturePath = '/assets/models/mailer/textures/base.jpg'
  // let roughnessMapInsideTexturePath = '/assets/models/mailer/textures/base.jpg'
  // let roughnessMapOutside = null
  // let roughnessMapInside = null

  // if (print === 'cmyk_1spot_metflo' || print === 'cmyk_2spot_metflo') {
  //   roughnessMapOutsideTexturePath =
  //     '/assets/models/mailer/textures/cmyk_1spot_roughness_metflo_outside.jpg'
  //   roughnessMapInsideTexturePath =
  //     '/assets/models/mailer/textures/cmyk_1spot_roughness_metflo_inside.jpg'
  // }
  // if (print === '1spot_metflo') {
  //   roughnessMapOutsideTexturePath =
  //     '/assets/models/mailer/textures/1spot_roughness_metflo_outside.jpg'
  //   roughnessMapInsideTexturePath =
  //     '/assets/models/mailer/textures/1spot_roughness_metflo_inside.jpg'
  // }
  // if (print === '2spot_metflo') {
  //   roughnessMapOutsideTexturePath =
  //     '/assets/models/mailer/textures/2spot_roughness_metflo_outside.jpg'
  //   roughnessMapInsideTexturePath =
  //     '/assets/models/mailer/textures/2spot_roughness_metflo_inside.jpg'
  // }

  // roughnessMapOutside = useTexture(roughnessMapOutsideTexturePath)
  // roughnessMapInside = useTexture(roughnessMapInsideTexturePath)
  // roughnessMapOutside.flipY = false
  // roughnessMapInside.flipY = false

  // let metalnessVal = 0
  // if (material === 'uncoated-white') metalnessVal = 0.3
  // else if (material.includes('kraft')) metalnessVal = 0.2

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='Armature001' rotation={[Math.PI, 0, Math.PI]}>
          <primitive object={nodes.Bone008} />
          <primitive object={nodes.neutral_bone} />
        </group>
        <group name='material_print001' rotation={[-Math.PI, 0, -Math.PI]}>
          <skinnedMesh
            castShadow
            name='outside'
            geometry={nodes.material_print001_1.geometry}
            material={materials.Material_color_outside}
            skeleton={nodes.material_print001_1.skeleton}
          >
            {/* <meshPhysicalMaterial
              map={outsideBaseTexture}
              bumpMap={bumpMap}
              bumpScale={10}
              clearcoatMap={coatingTexture}
              clearcoat={clearCoat}
              clearcoatRoughness={clearCoatRoughness}
              roughnessMap={roughnessMapOutside}
              metalness={metalnessVal}
            /> */}
          </skinnedMesh>
          <skinnedMesh
            castShadow
            name='inside'
            geometry={nodes.material_print001_2.geometry}
            material={materials.Material_color_inside}
            skeleton={nodes.material_print001_2.skeleton}
          >
            {/* <meshPhysicalMaterial
              map={insideBaseTexture}
              clearcoatMap={coatingTexture}
              clearcoat={clearCoat}
              clearcoatRoughness={clearCoatRoughness}
              roughnessMap={
                printSurface === 'outside-inside' ? roughnessMapInside : null
              }
              metalness={metalnessVal}
            /> */}
          </skinnedMesh>
          <skinnedMesh
            castShadow
            name='side'
            geometry={nodes.material_print001_3.geometry}
            material={materials.Material_side}
            skeleton={nodes.material_print001_3.skeleton}
          >
            {/* <meshStandardMaterial map={sideBaseTexture} /> */}
          </skinnedMesh>
          <skinnedMesh
            castShadow
            name='gold_foil'
            geometry={nodes.material_print001_4.geometry}
            material={materials.finishing_gold_foil}
            skeleton={nodes.material_print001_4.skeleton}
            material-transparent={true}
            material-opacity={0}
          />
          <skinnedMesh
            castShadow
            name='spot_gloss'
            geometry={nodes.material_print001_5.geometry}
            material={materials.finishing_spot_gloss}
            skeleton={nodes.material_print001_5.skeleton}
            material-transparent={true}
            material-opacity={0}
          />{' '}
        </group>
      </group>
    </group>
  )
}

// useGLTF.preload('/assets/models/mailer/mailer-box.glb')
