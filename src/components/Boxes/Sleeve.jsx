import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, useTexture } from '@react-three/drei';
import { useAppSelector } from '../../lib/store/hooks';
import {
  selectBoxCoating,
  selectBoxFinishing,
  selectBoxMaterial,
  selectBoxPrint,
  selectBoxPrintSurface,
  selectBoxState,
} from '../../lib/store/features/box/boxSlice';
import { LoopOnce, RepeatWrapping, SRGBColorSpace } from 'three';
import {
  preloadMaterialTextures,
  preloadPrintTextures,
  preloadSingleModelTextures,
  preloadThisTextureForAllModels,
} from '../../lib/utils';

export function Sleeve(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/assets/models/sleeve/sleeve.glb');

  const print = useAppSelector(selectBoxPrint);
  const material = useAppSelector(selectBoxMaterial);
  const finishing = useAppSelector(selectBoxFinishing);
  const coating = useAppSelector(selectBoxCoating);
  const printSurface = useAppSelector(selectBoxPrintSurface);

  // Ref to track the previous coating and finishing values
  const previousCoatingRef = useRef(coating);
  const previousFinishingRef = useRef({ ...finishing });

  //   ********** ROTATION SCRIPT
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

  let outsideBaseTexturePath = '';
  let insideBaseTexturePath = '';
  let sideBaseTexturePath = '';

  let roughnessMapOutsideTexturePath =
    '/assets/models/sleeve/textures/base.webp';
  let roughnessMapInsideTexturePath =
    '/assets/models/sleeve/textures/base.webp';
  let roughnessMapOutside = null;
  let roughnessMapInside = null;

  if (print === 'cmyk_1spot_metflo' || print === 'cmyk_2spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/sleeve/textures/cmyk_1spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/sleeve/textures/cmyk_1spot_roughness_metflo_inside.webp';
  }
  if (print === '1spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/sleeve/textures/1spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/sleeve/textures/1spot_roughness_metflo_inside.webp';
  }
  if (print === '2spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/sleeve/textures/2spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/sleeve/textures/2spot_roughness_metflo_inside.webp';
  }

  roughnessMapOutside = useTexture(roughnessMapOutsideTexturePath);
  roughnessMapOutside.flipY = false;

  roughnessMapInside = useTexture(roughnessMapInsideTexturePath);
  roughnessMapInside.flipY = false;

  if (print !== 'none') {
    outsideBaseTexturePath = `/assets/models/sleeve/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/outside_${print}.webp`;
  } else {
    outsideBaseTexturePath = `/assets/models/sleeve/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/base.webp`;
  }

  if (print !== 'none' && printSurface === 'outside-inside') {
    insideBaseTexturePath = `/assets/models/sleeve/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/inside_${print}.webp`;
  } else {
    insideBaseTexturePath = `/assets/models/sleeve/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/base.webp`;
  }

  if (material.includes('microflute-')) {
    sideBaseTexturePath = `/assets/models/sleeve/${material}/side.webp`;
  } else {
    sideBaseTexturePath = `/assets/models/sleeve/${material}/base.webp`;
  }

  let spotgloss_opacity = 0;
  let goldFoil_opacity = 0;
  let bumpMap = null;

  const embossingTexturePath = finishing.embossing
    ? '/assets/models/sleeve/textures/embossing_OUTSIDE.webp'
    : '/assets/models/sleeve/textures/base.webp';
  const embossingTexture = useTexture(embossingTexturePath);
  embossingTexture.flipY = false;
  
  const coatingTexturePath =
  coating !== 'none'
  ? '/assets/models/sleeve/textures/outside_coating_gloss_OMR.webp'
  : '/assets/models/sleeve/textures/base.webp';
  const coatingTexture = useTexture(coatingTexturePath);
  coatingTexture.flipY = false;

  
  const spotGlossNormalTexturePath = finishing.spotGloss
    ? '/assets/models/sleeve/textures/spotgloss_Normal.webp'
    : '/assets/models/sleeve/textures/base.webp';

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

  if (!finishing.none) {
    if (finishing.goldFoil) goldFoil_opacity = 1;
    if (finishing.spotGloss) spotgloss_opacity = 1;
    if (finishing.embossing) bumpMap = embossingTexture;
  }

  let metalnessVal = 0;
  if (material === 'uncoated-white') metalnessVal = 0.3;
  else if (material.includes('kraft')) metalnessVal = 0.2;

  const outsideBaseTexture = useTexture(outsideBaseTexturePath);
  outsideBaseTexture.flipY = false;
  outsideBaseTexture.colorSpace = SRGBColorSpace;

  const insideBaseTexture = useTexture(insideBaseTexturePath);
  insideBaseTexture.flipY = false;
  insideBaseTexture.colorSpace = SRGBColorSpace;

  const sideBaseTexture = useTexture(sideBaseTexturePath);
  sideBaseTexture.flipY = false;
  sideBaseTexture.colorSpace = SRGBColorSpace;
  sideBaseTexture.wrapS = RepeatWrapping;

  // preload the applied textures and materials for all the models
  useEffect(() => {
    setTimeout(() => {
      preloadThisTextureForAllModels(outsideBaseTexturePath);
      preloadThisTextureForAllModels(insideBaseTexturePath);
      preloadThisTextureForAllModels(sideBaseTexture);
      preloadThisTextureForAllModels(roughnessMapOutsideTexturePath);
      preloadThisTextureForAllModels(roughnessMapInsideTexturePath);
      preloadThisTextureForAllModels(embossingTexturePath);
      preloadThisTextureForAllModels(coatingTexturePath);
      preloadThisTextureForAllModels(spotGlossNormalTexturePath);
    }, 0);
  }, [
    outsideBaseTexture,
    insideBaseTexturePath,
    sideBaseTexturePath,
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
      preloadSingleModelTextures('sleeve');
      // preloadPrintTextures();
      // preloadTextures()
    }, 0);
    console.log('DONE----------------------');
  }, []);

  return (
    <group {...props} dispose={null} ref={group}>
      <mesh
        geometry={nodes.Mesh_0_1.geometry}
        material={materials.Material_color_outside}
      >
        <meshPhysicalMaterial
          map={outsideBaseTexture}
          bumpMap={bumpMap}
          bumpScale={15}
          clearcoatMap={coating !== 'none' ? coatingTexture : null}
          clearcoat={clearCoat}
          clearcoatRoughness={clearCoatRoughness}
          metalness={metalnessVal}
          roughnessMap={roughnessMapOutside}
        />
      </mesh>
      <mesh
        geometry={nodes.Mesh_0_2.geometry}
        material={materials.Material_color_outside}
      >
        <meshPhysicalMaterial
          map={insideBaseTexture}
          clearcoatMap={coating !== 'none' ? coatingTexture : null}
          clearcoat={clearCoat}
          clearcoatRoughness={clearCoatRoughness}
          metalness={metalnessVal}
          roughnessMap={
            printSurface === 'outside-inside' ? roughnessMapInside : null
          }
        />
      </mesh>
      <mesh
        geometry={nodes.Mesh_0_3.geometry}
        material={materials.Material_side}
      >
        <meshStandardMaterial map={sideBaseTexture} />
      </mesh>
      <mesh
        geometry={nodes.Mesh_0_4.geometry}
        material={materials.finishing_gold_foil}
        material-transparent={true}
        material-opacity={goldFoil_opacity}
        material-metalness={0.4}
      />
      <mesh
        geometry={nodes.Mesh_0_5.geometry}
        material={materials.finishing_spot_gloss}
        material-transparent={true}
        material-opacity={spotgloss_opacity}
      />
    </group>
  );
}

useGLTF.preload('/assets/models/sleeve/sleeve.glb');
