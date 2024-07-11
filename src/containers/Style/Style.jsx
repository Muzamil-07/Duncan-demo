import React, { useState } from 'react'
import SubMenu from '../../components/Menu/Sub'
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks'
import {
  selectBoxStyle,
  setBoxStyle
} from '../../lib/store/features/box/boxSlice'

const OPTIONS = [
  { image: '/assets/texture/style/mailer.png', name: 'mailer' },
  { image: '/assets/texture/style/BufferLid.png', name: 'buffer-lid' },
  { image: '/assets/texture/style/CLB.png', name: 'crash-lock-base' },
  { image: '/assets/texture/style/RTE.png', name: 'tuckend' },
  { image: '/assets/texture/style/skillet.png', name: 'skillet' },
  { image: '/assets/texture/style/sleeve.png', name: 'sleeve' },
  { image: '/assets/texture/style/sltray.png', name: 'selef-lock-tray' },
  { image: '/assets/texture/style/lidandbase.png', name: 'lid-and-base' },
  { image: '/assets/texture/style/headercard.png', name: 'header-card' },
  { image: '/assets/texture/style/other-ques.png', name: 'other' }
]
const Style = () => {
  const dispatch = useAppDispatch()
  const style = useAppSelector(selectBoxStyle)
  const handleSelectStyle = value => {
    dispatch(setBoxStyle(value))
  }
  return (
    <SubMenu
      options={OPTIONS}
      handleSelector={handleSelectStyle}
      selectedValue={style}
    />
  )
}

export default Style
