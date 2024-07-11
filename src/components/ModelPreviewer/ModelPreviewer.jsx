/* eslint-disable react/no-unknown-property */

import React from 'react'

const ModelPreviewer = ({ children, planePositionY }) => {
  return (
    <group>
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position-y={planePositionY}
      >
        <planeGeometry args={[170, 170]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>

      {children}
    </group>
  )
}

export default ModelPreviewer
