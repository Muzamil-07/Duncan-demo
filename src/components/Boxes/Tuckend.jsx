/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { SRGBColorSpace } from 'three'

export function Tuckend (props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(
    '/assets/models/tuckend/tuckend.glb'
  )
  const { actions } = useAnimations(animations, group)

  const outsideBaseTexture = useTexture(
    '/assets/models/tuckend/coated_white/outside_cmyk_2spot_metflo.jpg'
  )
  outsideBaseTexture.flipY = false
  outsideBaseTexture.colorSpace = SRGBColorSpace

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='Armature' position={[0, -0.01, 0]} scale={0.073}>
          <group name='Mesh_0004'>
            <skinnedMesh
              name='Mesh_0004_1'
              castShadow
              geometry={nodes.Mesh_0004_1.geometry}
              // material={materials.Material_color_outside}
              skeleton={nodes.Mesh_0004_1.skeleton}
            >
              <meshStandardMaterial
                map={outsideBaseTexture}
              ></meshStandardMaterial>
            </skinnedMesh>
            <skinnedMesh
              castShadow
              name='Mesh_0004_2'
              geometry={nodes.Mesh_0004_2.geometry}
              material={materials.Material_color_inside}
              skeleton={nodes.Mesh_0004_2.skeleton}
            />
            <skinnedMesh
              castShadow
              name='Mesh_0004_3'
              geometry={nodes.Mesh_0004_3.geometry}
              material={materials.Material_side}
              skeleton={nodes.Mesh_0004_3.skeleton}
            />
            <skinnedMesh
              castShadow
              name='Mesh_0004_4'
              geometry={nodes.Mesh_0004_4.geometry}
              material={materials.finishing_gold_foil}
              skeleton={nodes.Mesh_0004_4.skeleton}
            />
            <skinnedMesh
              castShadow
              name='Mesh_0004_5'
              geometry={nodes.Mesh_0004_5.geometry}
              material={materials.finishing_spot_gloss}
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

useGLTF.preload('/assets/models/tuckend/tuckend.glb')
