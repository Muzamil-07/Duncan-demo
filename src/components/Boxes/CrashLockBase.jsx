import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, useTexture } from '@react-three/drei';
import { LoopOnce, RepeatWrapping, SRGBColorSpace } from 'three';
import { useAppSelector } from '../../lib/store/hooks';
import {
  selectBoxCoating,
  selectBoxFinishing,
  selectBoxMaterial,
  selectBoxPrint,
  selectBoxPrintSurface,
  selectBoxState,
} from '../../lib/store/features/box/boxSlice';
import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';
import {
  preloadMaterialTextures,
  preloadPrintTextures,
  preloadSingleModelTextures,
  preloadThisTextureForAllModels,
} from '../../lib/utils';

export function CrashLockBase(props) {
  // useEffect(() => {
  //   preloadTextures()
  // }, [])
  const group = React.useRef();
  const { scene, animations } = useGLTF(
    '/assets/models/crash-lock-base/crash-lock-base.glb'
  );
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  const boxState = useAppSelector(selectBoxState);
  const print = useAppSelector(selectBoxPrint);
  const material = useAppSelector(selectBoxMaterial);
  const printSurface = useAppSelector(selectBoxPrintSurface);
  const coating = useAppSelector(selectBoxCoating);
  const finishing = useAppSelector(selectBoxFinishing);

  // Ref to track the previous coating and finishing values
  const previousCoatingRef = useRef(coating);
  const previousFinishingRef = useRef({ ...finishing });

  // ******** ANIMATION SCRIPT
  useEffect(() => {
    if (boxState === 'open') {
      actions.ArmatureAction.setLoop(LoopOnce);
      actions.ArmatureAction.clampWhenFinished = true;
      actions.ArmatureAction.timeScale = 1;
      actions.ArmatureAction.reset().play();
    } else if (boxState === 'close') {
      actions.ArmatureAction.setLoop(LoopOnce);
      actions.ArmatureAction.clampWhenFinished = true;
      actions.ArmatureAction.timeScale = -1;
      actions.ArmatureAction.paused = false;
    }
  }, [boxState, actions.ArmatureAction]);

  // ********** ROTATION SCRIPT
  useEffect(() => {
    const shouldRotate =
      (coating !== 'none' && previousCoatingRef.current !== coating) ||
      (finishing.goldFoil && !previousFinishingRef.current.goldFoil) ||
      (finishing.embossing && !previousFinishingRef.current.embossing) ||
      (finishing.spotGloss && !previousFinishingRef.current.spotGloss);

    if (shouldRotate) {
      // Rotate the model 360 degrees
      let rotationY = 0;
      const rotationSpeed = 0.05; // Adjust the speed of rotation as needed

      const animateRotation = () => {
        if (rotationY < Math.PI * 2) {
          rotationY += rotationSpeed;
          group.current.rotation.y = rotationY;
          requestAnimationFrame(animateRotation);
        } else {
          group.current.rotation.y = 0; // Reset the rotation
        }
      };
      animateRotation();
    }

    previousCoatingRef.current = coating;
    previousFinishingRef.current = { ...finishing };
  }, [coating, finishing]);

  // ********** CONFIGURATOR SCRIPT
  let outsideBaseTexturePath = '';
  let insideBaseTexturePath = '';
  let sideTexturePath = '';

  if (print !== 'none') {
    outsideBaseTexturePath = `/assets/models/crash-lock-base/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/outside_${print}.webp`;
  } else {
    outsideBaseTexturePath = `/assets/models/crash-lock-base/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/base.webp`;
  }

  console.log('OUTSIDE BASE TEXT PATH:', outsideBaseTexturePath);
  const outsideBaseTexture = useTexture(outsideBaseTexturePath);

  outsideBaseTexture.flipY = false;
  outsideBaseTexture.colorSpace = SRGBColorSpace;

  if (print !== 'none' && printSurface === 'outside-inside') {
    insideBaseTexturePath = `/assets/models/crash-lock-base/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/inside_${print}.webp`;
  } else {
    insideBaseTexturePath = `/assets/models/crash-lock-base/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/base.webp`;
  }

  const insideBaseTexture = useTexture(insideBaseTexturePath);
  insideBaseTexture.flipY = false;
  insideBaseTexture.colorSpace = SRGBColorSpace;

  if (material.includes('microflute-')) {
    sideTexturePath = `/assets/models/crash-lock-base/${material}/side.webp`;
  } else {
    sideTexturePath = `/assets/models/crash-lock-base/${material}/base.webp`;
  }

  const sideBaseTexture = useTexture(sideTexturePath);
  sideBaseTexture.flipY = false;
  sideBaseTexture.colorSpace = SRGBColorSpace;
  sideBaseTexture.wrapS = RepeatWrapping;
  // sideBaseTexture.wrapT = RepeatWrapping

  let goldFoil_opacity = 0;
  let spotgloss_opacity = 0;
  let bumpMap = null;


  
  const embossingTexturePath = finishing.embossing
    ? '/assets/models/crash-lock-base/textures/embossing_OUTSIDE.webp'
    : '/assets/models/crash-lock-base/textures/base.webp';

  const coatingTexturePath = coating !== 'none'
    ? '/assets/models/crash-lock-base/textures/outside_coating_gloss_OMR.webp'
    : '/assets/models/crash-lock-base/textures/base.webp';

  const spotGlossNormalTexturePath = finishing.spotGloss
    ? '/assets/models/crash-lock-base/textures/spotgloss_Normal.webp'
    : '/assets/models/crash-lock-base/textures/base.webp';

  const embossingTexture = useTexture(embossingTexturePath);
  const coatingTexture = useTexture(coatingTexturePath);
  const spotGlossNormalTexture = useTexture(spotGlossNormalTexturePath);

  embossingTexture.flipY = false;
  coatingTexture.flipY = false;
  spotGlossNormalTexture.flipY = false;



  if (!finishing.none) {
    if (finishing.goldFoil) goldFoil_opacity = 1;
    if (finishing.spotGloss) spotgloss_opacity = 1;
    if (finishing.embossing) bumpMap = embossingTexture;
  }

  let clearCoat = 0;
  let clearCoatRoughness = 0;



  if (coating !== 'none') {
    if (coating === 'gloss') {
      clearCoat = 1;
      clearCoatRoughness = 0.15;
    }
    if (coating === 'silk') {
      clearCoat = 0.8;
      clearCoatRoughness = 0.2;
    }
    if (coating === 'matt') {
      clearCoat = 1;
      clearCoatRoughness = 0.4;
    }
  }

  let roughnessMapOutsideTexturePath =
    '/assets/models/crash-lock-base/textures/base.webp';
  let roughnessMapInsideTexturePath =
    '/assets/models/crash-lock-base/textures/base.webp';
  let roughnessMapOutside = null;
  let roughnessMapInside = null;

  if (print === 'cmyk_1spot_metflo' || print === 'cmyk_2spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/crash-lock-base/textures/cmyk_1spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/crash-lock-base/textures/cmyk_1spot_roughness_metflo_inside.webp';
  }
  if (print === '1spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/crash-lock-base/textures/1spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/crash-lock-base/textures/1spot_roughness_metflo_inside.webp';
  }
  if (print === '2spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/crash-lock-base/textures/2spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/crash-lock-base/textures/2spot_roughness_metflo_inside.webp';
  }

  roughnessMapOutside = useTexture(roughnessMapOutsideTexturePath);
  roughnessMapInside = useTexture(roughnessMapInsideTexturePath);
  roughnessMapOutside.flipY = false;
  roughnessMapInside.flipY = false;

  let metalnessVal = 0;
  if (material === 'uncoated-white') metalnessVal = 0.3;
  else if (material.includes('kraft')) metalnessVal = 0.2;

  // preload the applied textures and materials for all the models
  useEffect(() => {
    setTimeout(() => {
      preloadThisTextureForAllModels(outsideBaseTexturePath);
      preloadThisTextureForAllModels(insideBaseTexturePath);
      preloadThisTextureForAllModels(sideTexturePath);
      preloadThisTextureForAllModels(roughnessMapOutsideTexturePath);
      preloadThisTextureForAllModels(roughnessMapInsideTexturePath);
      preloadThisTextureForAllModels(embossingTexturePath);
      preloadThisTextureForAllModels(coatingTexturePath);
      preloadThisTextureForAllModels(spotGlossNormalTexturePath);
    }, 0);
  }, [
    outsideBaseTexture,
    insideBaseTexturePath,
    sideTexturePath,
    roughnessMapOutsideTexturePath,
    roughnessMapInsideTexturePath,
    coatingTexture,
    spotGlossNormalTexturePath
  ]);
  // preload this model all textures and materials
  useEffect(() => {
    setTimeout(() => {
      console.log('SETTIMEOUT DONE----------------------');
      preloadMaterialTextures();
      preloadSingleModelTextures('crashLockBase');
      // preloadPrintTextures();
      // preloadTextures()
    }, 0);
    console.log('DONE----------------------');
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" position={[0, -0.08, 0]} scale={0.124}>
          <group name="box">
            <skinnedMesh
              name="outside"
              geometry={nodes.Mesh_0.geometry}
              // material={materials.Material_color_outside}
              skeleton={nodes.Mesh_0.skeleton}
              castShadow
            >
              <meshPhysicalMaterial
                map={outsideBaseTexture}
                bumpMap={bumpMap}
                bumpScale={15}
                clearcoatMap={coatingTexture}
                clearcoat={clearCoat}
                clearcoatRoughness={clearCoatRoughness}
                roughnessMap={roughnessMapOutside}
                metalness={metalnessVal}
              />
            </skinnedMesh>
            <skinnedMesh
              name="inside"
              geometry={nodes.Mesh_0_1.geometry}
              // material={materials.Material_color_inside}
              skeleton={nodes.Mesh_0_1.skeleton}
              castShadow
            >
              <meshPhysicalMaterial
                map={insideBaseTexture}
                clearcoatMap={coatingTexture}
                clearcoat={clearCoat}
                clearcoatRoughness={clearCoatRoughness}
                roughnessMap={
                  printSurface === 'outside-inside' ? roughnessMapInside : null
                }
                metalness={metalnessVal}
              />
            </skinnedMesh>
            <skinnedMesh
              name="side"
              geometry={nodes.Mesh_0_2.geometry}
              // material={materials.Material_side}
              skeleton={nodes.Mesh_0_2.skeleton}
              castShadow
            >
              <meshStandardMaterial map={sideBaseTexture} />
            </skinnedMesh>
            <skinnedMesh
              name="gold_foil"
              geometry={nodes.Mesh_0_3.geometry}
              material={materials.finishing_gold_foil}
              skeleton={nodes.Mesh_0_3.skeleton}
              material-transparent={true}
              material-opacity={goldFoil_opacity}
              material-metalness={0.6}
              castShadow
            />
            <skinnedMesh
              name="spot_gloss"
              geometry={nodes.Mesh_0_4.geometry}
              material={materials.finishing_spot_gloss}
              skeleton={nodes.Mesh_0_4.skeleton}
              material-transparent={true}
              material-opacity={spotgloss_opacity}
              material-normalMap={spotGlossNormalTexture}
              material-normalScale= {[0, 0.1]}
              castShadow
            />
          </group>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.neutral_bone} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/assets/models/crash-lock-base/crash-lock-base.glb');
