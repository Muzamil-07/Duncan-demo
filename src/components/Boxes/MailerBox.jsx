/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { SRGBColorSpace } from 'three'

export function MailerBox (props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(
    '/assets/models/mailer/mailer-box.glb'
  )
  const { actions } = useAnimations(animations, group)
  const outsideBaseTexture = useTexture(
    '/assets/models/mailer/coated_white/outside_cmyk_1spot_metflo.jpg'
  )
  outsideBaseTexture.flipY = false
  outsideBaseTexture.colorSpace = SRGBColorSpace

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='Armature001' rotation={[Math.PI, 0, Math.PI]}>
          <group name='material_print001'>
            <skinnedMesh
              castShadow
              name='material_print001_1'
              geometry={nodes.material_print001_1.geometry}
              material={materials.Material_color_outside}
              skeleton={nodes.material_print001_1.skeleton}
            >
              <meshStandardMaterial
                map={outsideBaseTexture}
              ></meshStandardMaterial>
            </skinnedMesh>
            <skinnedMesh
              castShadow
              name='material_print001_2'
              geometry={nodes.material_print001_2.geometry}
              material={materials.Material_color_inside}
              skeleton={nodes.material_print001_2.skeleton}
            />
            <skinnedMesh
              castShadow
              name='material_print001_3'
              geometry={nodes.material_print001_3.geometry}
              material={materials.Material_side}
              skeleton={nodes.material_print001_3.skeleton}
            />
            <skinnedMesh
              castShadow
              name='material_print001_4'
              geometry={nodes.material_print001_4.geometry}
              material={materials.finishing_gold_foil}
              skeleton={nodes.material_print001_4.skeleton}
            />
            <skinnedMesh
              castShadow
              name='material_print001_5'
              geometry={nodes.material_print001_5.geometry}
              material={materials.finishing_spot_gloss}
              skeleton={nodes.material_print001_5.skeleton}
            />
          </group>
          <primitive object={nodes.Bone008} />
          <primitive object={nodes.neutral_bone} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/mailer/mailer-box.glb')
