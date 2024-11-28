import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import {
  preloadMaterialTextures,
  preloadPrintTextures,
  preloadSingleModelTextures,
} from '../../lib/utils';
/* eslint-disable react/no-unknown-property */
import { LoopOnce } from 'three';
import { useAppSelector } from '../../lib/store/hooks';
import { selectBoxState } from '../../lib/store/features/box/boxSlice';
import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';

export function BufferLidSkeleton(props) {
  const group = React.useRef();
  const { scene, animations } = useGLTF(
    '/assets/models/buffer-lid/buffer-lid.glb'
  );

  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  const boxState = useAppSelector(selectBoxState);

  // ******** ANIMATION SCRIPT
  useEffect(() => {
    if (boxState === 'open') {
      actions['ArmatureAction.001'].setLoop(LoopOnce);
      actions['ArmatureAction.001'].clampWhenFinished = true;
      actions['ArmatureAction.001'].timeScale = 1;
      actions['ArmatureAction.001'].reset().play();
    } else if (boxState === 'close') {
      actions['ArmatureAction.001'].setLoop(LoopOnce);
      actions['ArmatureAction.001'].clampWhenFinished = true;
      actions['ArmatureAction.001'].timeScale = -1;
      actions['ArmatureAction.001'].paused = false;
    }
  }, [boxState, actions['ArmatureAction.001']]);

  useEffect(() => {
    setTimeout(() => {
      console.log('SETTIMEOUT DONE----------------------');
      preloadMaterialTextures();
      preloadSingleModelTextures('bufferLid');
      // preloadPrintTextures();
      // preloadTextures()
    }, 0);
    console.log('DONE----------------------');
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" scale={0.119}>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.neutral_bone} />
          <group name="Mesh_0">
            <skinnedMesh
              name="Mesh_0_1"
              geometry={nodes.Mesh_0_1.geometry}
              material={materials.Material_color_outside}
              skeleton={nodes.Mesh_0_1.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Mesh_0_2"
              geometry={nodes.Mesh_0_2.geometry}
              material={materials.Material_color_inside}
              skeleton={nodes.Mesh_0_2.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Mesh_0_3"
              geometry={nodes.Mesh_0_3.geometry}
              material={materials.Material_side}
              skeleton={nodes.Mesh_0_3.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Mesh_0_4"
              geometry={nodes.Mesh_0_4.geometry}
              material={materials.finishing_gold_foil}
              skeleton={nodes.Mesh_0_4.skeleton}
              material-transparent={true}
              material-opacity={0}
              castShadow
            />
            <skinnedMesh
              name="Mesh_0_5"
              geometry={nodes.Mesh_0_5.geometry}
              material={materials.finishing_spot_gloss}
              skeleton={nodes.Mesh_0_5.skeleton}
              material-transparent={true}
              material-opacity={0}
              castShadow
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/assets/models/buffer-lid/buffer-lid.glb');
