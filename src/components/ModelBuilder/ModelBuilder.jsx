import React, { Suspense } from 'react'
import { useAppSelector } from '../../lib/store/hooks'
import { selectBoxStyle } from '../../lib/store/features/box/boxSlice'
import ModelPreviewer from '../ModelPreviewer'
import { MailerBox } from '../Boxes/MailerBox'
import { angleToRadians } from '../../lib/utils'
import { Tuckend } from '../Boxes/Tuckend'
import { MailerBoxGltf } from '../Boxes/MailerBoxGltf'
import ModelLoader from '../ModelLoader'

const ModelBuilder = () => {
  const style = useAppSelector(selectBoxStyle)

  if (style === 'mailer')
    return (
      // <ModelPreviewer planePositionY={-0.95}>
      <Suspense fallback={<ModelLoader />}>
        <MailerBoxGltf
          scale={9}
          position={[0, -0.95, 0]}
          rotation={[0, angleToRadians(205), 0]}
        />
      </Suspense>
      // </ModelPreviewer>
    )
  else if (style === 'tuckend')
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
  else return <></>
}

export default ModelBuilder
