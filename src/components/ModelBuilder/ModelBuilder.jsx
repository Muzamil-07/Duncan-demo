import React from 'react'
import { useAppSelector } from '../../lib/store/hooks'
import {
  selectBoxPrint,
  selectBoxStyle
} from '../../lib/store/features/box/boxSlice'
import ModelPreviewer from '../ModelPreviewer'
import { MailerBox } from '../Boxes/MailerBox'
import { angleToRadians } from '../../lib/utils'
import { Tuckend } from '../Boxes/Tuckend'
import { useGLTF } from '@react-three/drei'

const ModelBuilder = () => {
  const style = useAppSelector(selectBoxStyle)

  if (style === 'mailer') {
    // if (print !== 'none') {
    return (
      <MailerBox
        scale={9}
        position={[0, -0.95, 0]}
        rotation={[0, angleToRadians(205), 0]}
      />
    )
    // } else {
    //   return (
    //     <MailerBoxSkeleton
    //       scale={9}
    //       position={[0, -0.95, 0]}
    //       rotation={[0, angleToRadians(205), 0]}
    //     />
    //   )
    // }
  } else if (style === 'tuckend')
    return (
      // <ModelPreviewer planePositionY={-0.95}>
      <Tuckend
        scale={9.5}
        position={[0, 0.15, 0]}
        rotation={[0, angleToRadians(30), 0]}
      />
      // </ModelPreviewer>
    )
  else return <></>
}

export default ModelBuilder
