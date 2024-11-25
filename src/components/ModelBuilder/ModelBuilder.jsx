import React, { Suspense } from 'react';
import { useAppSelector } from '../../lib/store/hooks';
import {
  selectBoxPrint,
  selectBoxStyle,
} from '../../lib/store/features/box/boxSlice';
import ModelPreviewer from '../ModelPreviewer';
import { MailerBox } from '../Boxes/MailerBox';
import { angleToRadians } from '../../lib/utils';
import { Tuckend } from '../Boxes/Tuckend';
import { MailerBoxGltf } from '../Boxes/MailerBoxGltf';
import ModelLoader from '../ModelLoader';
import { MailerBoxSkeleton } from '../Boxes/MailerSkeleton';
import { selectIsDefaultMode } from '../../lib/store/features/general/generalSlice';
import { TuckendSkeleton } from '../Boxes/TuckendSkeleton';
import { CrashLockBaseSkeleton } from '../Boxes/CrashLockBaseSkeleton';
import { CrashLockBase } from '../Boxes/CrashLockBase';
import { SkilletSkeleton } from '../Boxes/SkilletSkeleton';
import { Skillet } from '../Boxes/Skillet';
import { BufferLid } from '../Boxes/BufferLid';
import { BufferLidSkeleton } from '../Boxes/BufferLidSkeleton';
import { Sleeve } from '../Boxes/Sleeve';
import { SleeveSkeleton } from '../Boxes/SleeveSkeleton';
import { SelefLockTray } from '../Boxes/SelefLockTray';
import { SelefLockTraySkeleton } from '../Boxes/SelefLockTraySkeleton';
import { LidAndBase } from '../Boxes/LidAndBase';
import { LidAndBaseSkeleton } from '../Boxes/LidAndBaseSkeleton';
import { HeaderCard } from '../Boxes/HeaderCard';
import { HeaderCardSkeleton } from '../Boxes/HeaderCardSkeleton';

const ModelBuilder = () => {
  const style = useAppSelector(selectBoxStyle);
  const isDefaultMode = useAppSelector(selectIsDefaultMode);


  if (style === 'mailer') {
    if (!isDefaultMode)
      return (
        // <ModelPreviewer planePositionY={-0.95}>
        <Suspense fallback={<ModelLoader />}>
          {console.log('---------------Worked!')}
          <MailerBoxGltf
            scale={9}
            position={[0, -0.95, 0]}
            rotation={[0, angleToRadians(205), 0]}
          />
        </Suspense>
        // </ModelPreviewer>
      );
    else
      return (
        <Suspense fallback={<ModelLoader />}>
          <MailerBoxSkeleton
            scale={9}
            position={[0, -0.95, 0]}
            rotation={[0, angleToRadians(205), 0]}
          />
        </Suspense>
      );
  } else if (style === 'tuckend') {
    if (!isDefaultMode)
      return (
        // <ModelPreviewer planePositionY={-0.95}>
        <Suspense fallback={<ModelLoader />}>
          <Tuckend
            scale={9.5}
            position={[0, 0.15, 0]}
            rotation={[0, angleToRadians(30), 0]}
          />
        </Suspense>
        // </ModelPreviewer>
      );
    else
      return (
        <Suspense fallback={<ModelLoader />}>
          <TuckendSkeleton
            scale={9.5}
            position={[0, 0.15, 0]}
            rotation={[0, angleToRadians(30), 0]}
          />
        </Suspense>
      );
  } else if (style === 'crash-lock-base') {
    if (!isDefaultMode)
      return (
        // <ModelPreviewer planePositionY={-0.95}>
        <Suspense fallback={<ModelLoader />}>
          <CrashLockBase
            scale={14.5}
            position={[0, 0.15, 0]}
            rotation={[0, angleToRadians(210), 0]}
          />
        </Suspense>
        // </ModelPreviewer>
      );
    else
      return (
        <Suspense fallback={<ModelLoader />}>
          <CrashLockBaseSkeleton
            scale={14.5}
            position={[0, 0.15, 0]}
            rotation={[0, angleToRadians(210), 0]}
          />
        </Suspense>
      );
  } else if (style === 'skillet') {
    if (!isDefaultMode)
      return (
        <Suspense fallback={<ModelLoader />}>
          <Skillet
            scale={9.5}
            position={[0, 0.15, 0]}
            rotation={[0, angleToRadians(30), 0]}
          />
        </Suspense>
      );
    else
      return (
        <Suspense fallback={<ModelLoader />}>
          <SkilletSkeleton
            scale={9.5}
            position={[0, 0.15, 0]}
            rotation={[0, angleToRadians(30), 0]}
          />
        </Suspense>
      );
  } else if (style === 'buffer-lid') {
    if (!isDefaultMode)
      return (
        <Suspense fallback={<ModelLoader />}>
          <BufferLid
            scale={9.5}
            position={[0, -0.75, 0]}
            rotation={[0, angleToRadians(120), 0]}
          />
        </Suspense>
      );
    else
      return (
        <Suspense fallback={<ModelLoader />}>
          <BufferLidSkeleton
            scale={9.5}
            position={[0, -0.75, 0]}
            rotation={[0, angleToRadians(120), 0]}
          />
        </Suspense>
      );
  } else if (style === 'sleeve') {
    if (!isDefaultMode)
      return (
        <Suspense fallback={<ModelLoader />}>
          <Sleeve
            scale={9.5}
            position={[0, -0.1, 0]}
            rotation={[0, angleToRadians(120), 0]}
          />
        </Suspense>
      );
    else
      return (
        <Suspense fallback={<ModelLoader />}>
          <SleeveSkeleton
            scale={9.5}
            position={[0, -0.1, 0]}
            rotation={[0, angleToRadians(120), 0]}
          />
        </Suspense>
      );
  }
  else if (style === 'selef-lock-tray') {
    if (!isDefaultMode) {
      return (
        <SelefLockTray
          position={[0, -0.7, 0]}
          scale={9.5}
          rotation={[0, angleToRadians(120), 0]}
        />
      );
    } else {
      return (
        <SelefLockTraySkeleton
          position={[0, -0.7, 0]}
          scale={9.5}
          rotation={[0, angleToRadians(120), 0]}
        />
      );
    }
  }
  else if (style === 'lid-and-base') {
    if (!isDefaultMode) {
      return (
        <LidAndBase
          position={[0, -0.7, 0]}
          scale={9.5}
          rotation={[0, angleToRadians(120), 0]}
        />
      );
    } else {
      return (
        <LidAndBaseSkeleton
          position={[0, -0.7, 0]}
          scale={9.5}
          rotation={[0, angleToRadians(120), 0]}
        />
      );
    }
  }
  else if (style === 'header-card') {
    if (!isDefaultMode) {
      return (
        <HeaderCard
          position={[0, -0.7, 0]}
          scale={9.5}
          rotation={[0, angleToRadians(120), 0]}
        />
      );
    } else {
      return (
        <HeaderCardSkeleton
          position={[0, -0.7, 0]}
          scale={9.5}
          rotation={[0, angleToRadians(120), 0]}
        />
      );
    }
  }

  else return <></>;
};

export default ModelBuilder;
