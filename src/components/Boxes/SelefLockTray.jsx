import React, { useEffect, useRef } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useAppSelector } from '../../lib/store/hooks';
import {
  selectBoxCoating,
  selectBoxFinishing,
  selectBoxMaterial,
  selectBoxPrint,
  selectBoxPrintSurface,
} from '../../lib/store/features/box/boxSlice';
import { RepeatWrapping, SRGBColorSpace } from 'three';
import {
  preloadMaterialTextures,
  preloadPrintTextures,
  preloadSingleModelTextures,
  preloadThisTextureForAllModels,
} from '../../lib/utils';

export function SelefLockTray(props) {
  const { nodes, materials } = useGLTF(
    '/assets/models/selef-lock-tray/selef-lock-tray.glb'
  );

  const group = useRef();
  const material = useAppSelector(selectBoxMaterial);
  const print = useAppSelector(selectBoxPrint);
  const coating = useAppSelector(selectBoxCoating);
  const finishing = useAppSelector(selectBoxFinishing);
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

  let outsideTexturePath = '';
  let insideTexturePath = '';
  let sideTexturePath = '';

  if (print !== 'none') {
    outsideTexturePath = `/assets/models/selef-lock-tray/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/outside_${print}.webp`;
  } else {
    outsideTexturePath = `/assets/models/selef-lock-tray/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/base.webp`;
  }

  if (print !== 'none' && printSurface === 'outside-inside') {
    insideTexturePath = `/assets/models/selef-lock-tray/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/inside_${print}.webp`;
  } else {
    insideTexturePath = `/assets/models/selef-lock-tray/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/base.webp`;
  }

  if (material.includes('microflute')) {
    sideTexturePath = `/assets/models/selef-lock-tray/${material}/side.webp`;
  } else {
    sideTexturePath = `/assets/models/selef-lock-tray/${material}/base.webp`;
  }

  const outsideTexture = useTexture(outsideTexturePath);
  outsideTexture.flipY = false;
  outsideTexture.wrapT = RepeatWrapping;
  outsideTexture.colorSpace = SRGBColorSpace;

  const insideTexture = useTexture(insideTexturePath);
  insideTexture.flipY = false;
  insideTexture.wrapT = RepeatWrapping;
  insideTexture.colorSpace = SRGBColorSpace;

  const sideTexture = useTexture(sideTexturePath);
  sideTexture.flipY = false;
  sideTexture.wrapT = RepeatWrapping;

  let metalnessVal = 0;

  if (material === 'uncoated-white') metalnessVal = 0.3;
  else if (material.includes('craft')) metalnessVal = 0.2;

  let clearCoat = 0;
  let clearCoatRoughness = 0;

  const coatingTexturePath =
    coating !== 'none'
      ? '/assets/models/selef-lock-tray/textures/outside_coating_gloss_OMR.webp'
      : '/assets/models/selef-lock-tray/textures/base.webp';
  const coatingTexture = useTexture(coatingTexturePath);
  coatingTexture.flipY = false;

  const embossingTexturePath = finishing.embossing
    ? '/assets/models/selef-lock-tray/textures/embossing_OUTSIDE.webp'
    : '/assets/models/selef-lock-tray/textures/base.webp';
  const embossingTexture = useTexture(embossingTexturePath);
  embossingTexture.flipY = false;

  let roughnessMapOutsideTexturePath =
    '/assets/models/selef-lock-tray/textures/base.webp';
  let roughnessMapInsideTexturePath =
    '/assets/models/selef-lock-tray/textures/base.webp';
  let roughnessMapOutside = null;
  let roughnessMapInside = null;

  if (print === 'cmyk_1spot_metflo' || print === 'cmyk_2spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/selef-lock-tray/textures/cmyk_1spot_roughness_metflo_outside.webp';
  }
  if (print === '1spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/selef-lock-tray/textures/1spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/selef-lock-tray/textures/1spot_roughness_metflo_inside.webp';
  }
  if (print === '2spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/selef-lock-tray/textures/2spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/selef-lock-tray/textures/2spot_roughness_metflo_inside.webp';
  }

  roughnessMapInside = useTexture(roughnessMapInsideTexturePath);
  roughnessMapInside.flipY = false;
  roughnessMapOutside = useTexture(roughnessMapOutsideTexturePath);
  roughnessMapInside.flipY = false;

  embossingTexture.flipY = false;
  embossingTexture.wrapT = RepeatWrapping;
  embossingTexture.wrapS = RepeatWrapping;

  coatingTexture.flipY = false;

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

  let spotgloss_opacity = 0;
  let goldFoil_opacity = 0;
  let bumpMap = null;

  if (!finishing.none) {
    if (finishing.goldFoil) {
      goldFoil_opacity = 1;
    }
    if (finishing.spotGloss) {
      spotgloss_opacity = 1;
    }
    if (finishing.embossing) {
      bumpMap = embossingTexture;
    }
  }

  // preload the applied textures and materials for all the models
  useEffect(() => {
    setTimeout(() => {
      preloadThisTextureForAllModels(outsideTexturePath);
      preloadThisTextureForAllModels(insideTexturePath);
      preloadThisTextureForAllModels(sideTexturePath);
      preloadThisTextureForAllModels(roughnessMapOutsideTexturePath);
      preloadThisTextureForAllModels(roughnessMapInsideTexturePath);
      preloadThisTextureForAllModels(coatingTexture);
      preloadThisTextureForAllModels(embossingTexture);
    }, 0);
  }, [
    outsideTexturePath,
    insideTexturePath,
    sideTexturePath,
    roughnessMapOutsideTexturePath,
    roughnessMapInsideTexturePath,
    coatingTexture,
  ]);
  // preload this model all textures and materials
  useEffect(() => {
    setTimeout(() => {
      console.log('SETTIMEOUT DONE----------------------');
      preloadMaterialTextures();
      preloadSingleModelTextures('selefLockTray');
      // preloadPrintTextures();
      // preloadTextures()
    }, 0);
    console.log('DONE----------------------');
  }, []);

  return (
    <group {...props} dispose={null} ref={group}>
      <mesh
        geometry={nodes.Mesh_0_1.geometry}
        //  material={materials.Material_color_outside}
      >
        <meshPhysicalMaterial
          map={outsideTexture}
          metalness={metalnessVal}
          clearcoatMap={coating !== 'none' ? coatingTexture : null}
          clearcoat={clearCoat}
          clearcoatRoughness={clearCoatRoughness}
          bumpMap={bumpMap}
          roughnessMap={roughnessMapOutside}
          bumpScale={15}
        />
      </mesh>
      <mesh
        geometry={nodes.Mesh_0_2.geometry}
        //  material={materials.Material_color_outside}
      >
        <meshPhysicalMaterial
          map={insideTexture}
          metalness={metalnessVal}
          clearcoatMap={coating !== 'none' ? coatingTexture : null}
          clearcoat={clearCoat}
          clearcoatRoughness={clearCoatRoughness}
          roughnessMap={
            printSurface === 'outside-inside' ? roughnessMapInside : null
          }
        />
      </mesh>
      <mesh
        geometry={nodes.Mesh_0_3.geometry}
        //  material={materials.Material_side}
      >
        <meshStandardMaterial map={sideTexture} />
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

useGLTF.preload('/assets/models/selef-lock-tray/selef-lock-tray.glb');
