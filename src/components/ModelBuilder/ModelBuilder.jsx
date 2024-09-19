import React, { Suspense } from 'react'
import { useAppSelector } from '../../lib/store/hooks'
import {
  selectBoxPrint,
  selectBoxStyle
} from '../../lib/store/features/box/boxSlice'
import ModelPreviewer from '../ModelPreviewer'
import { MailerBox } from '../Boxes/MailerBox'
import { angleToRadians } from '../../lib/utils'
import { Tuckend } from '../Boxes/Tuckend'
import { MailerBoxGltf } from '../Boxes/MailerBoxGltf'
import ModelLoader from '../ModelLoader'
import { MailerBoxSkeleton } from '../Boxes/MailerSkeleton'
import { selectIsDefaultMode } from '../../lib/store/features/general/generalSlice'
import { TuckendSkeleton } from '../Boxes/TuckendSkeleton'

const ModelBuilder = () => {
  const style = useAppSelector(selectBoxStyle)
  const isDefaultMode = useAppSelector(selectIsDefaultMode)
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
      )
    else
      return (
        <Suspense fallback={<ModelLoader />}>
          <MailerBoxSkeleton
            scale={9}
            position={[0, -0.95, 0]}
            rotation={[0, angleToRadians(205), 0]}
          />
        </Suspense>
      )
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
      )
    else
      return (
        <Suspense fallback={<ModelLoader />}>
          <TuckendSkeleton
            scale={9.5}
            position={[0, 0.15, 0]}
            rotation={[0, angleToRadians(30), 0]}
          />
        </Suspense>
      )
  } else return <></>
}

export default ModelBuilder
