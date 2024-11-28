import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useAppSelector } from '../../lib/store/hooks'
import { LoopOnce } from 'three';
import {
  selectBoxState,
} from '../../lib/store/features/box/boxSlice';
import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';
import { preloadMaterialTextures, preloadSingleModelTextures } from '../../lib/utils';

export function LidAndBaseSkeleton(props) {
  const { scene, animations } = useGLTF('/assets/models/lid-and-base/lid-and-base-1.glb');
  const group = useRef();
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  const boxState = useAppSelector(selectBoxState);

  // ******** ANIMATION SCRIPT
  useEffect(() => {
    if (boxState === 'open') {
      actions['Mesh_0.001Action'].setLoop(LoopOnce);
      actions['Mesh_0.001Action'].clampWhenFinished = true;
      actions['Mesh_0.001Action'].timeScale = 1;
      actions['Mesh_0.001Action'].play();
    } else if (boxState === 'close') {
      actions['Mesh_0.001Action'].setLoop(LoopOnce);
      actions['Mesh_0.001Action'].clampWhenFinished = true;
      actions['Mesh_0.001Action'].timeScale = -1;
      actions['Mesh_0.001Action'].paused = false;

    }
  }, [boxState, actions['Mesh_0.001Action']]);

  useEffect(() => {
    setTimeout(() => {
      console.log('SETTIMEOUT DONE----------------------');
      preloadMaterialTextures();
      preloadSingleModelTextures('lidAndBase');
      // preloadPrintTextures();
      // preloadTextures()
    }, 0);
    console.log('DONE----------------------');
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Mesh_0">
          <mesh
            name="Mesh_0_1"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0_1.geometry}
            material={materials.Material_color_base_outside}
          />
          <mesh
            name="Mesh_0_2"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0_2.geometry}
            material={materials.Material_color_base_inside}
          />
          <mesh
            name="Mesh_0_3"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0_3.geometry}
            material={materials.Material_side}
          />
        </group>
        <group name="Mesh_0001">
          <mesh
            name="Mesh_0001_1"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0001_1.geometry}
            material={materials.Material_color_lid_outside}
          />
          <mesh
            name="Mesh_0001_2"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0001_2.geometry}
            material={materials.Material_color_lid_inside}
          />
          <mesh
            name="Mesh_0001_3"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0001_3.geometry}
            material={materials.Material_side}
          />
          <mesh
            name="Mesh_0001_4"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0001_4.geometry}
            material={materials.finishing_gold_foil}
            material-transparent={true}
            material-opacity={0}
          />
          <mesh
            name="Mesh_0001_5"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0001_5.geometry}
            material={materials.finishing_spot_gloss}
            material-transparent={true}
            material-opacity={0}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/lid-and-base/lid-and-base-1.glb')