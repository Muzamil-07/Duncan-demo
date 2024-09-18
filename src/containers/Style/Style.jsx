import React, { useState } from 'react'
import SubMenu from '../../components/Menu/Sub'
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks'
import {
  selectBoxStyle,
  setBoxStyle
} from '../../lib/store/features/box/boxSlice'
import usePreload from '../../lib/hooks/usePreload'
import { preloadTextures } from '../../lib/utils'

const OPTIONS = [
  { image: '/assets/texture/style/mailer.webp', name: 'mailer' },
  { image: '/assets/texture/style/BufferLid.webp', name: 'buffer-lid' },
  { image: '/assets/texture/style/CLB.webp', name: 'crash-lock-base' },
  { image: '/assets/texture/style/RTE.webp', name: 'tuckend' },
  { image: '/assets/texture/style/skillet.webp', name: 'skillet' },
  { image: '/assets/texture/style/sleeve.webp', name: 'sleeve' },
  { image: '/assets/texture/style/sltray.webp', name: 'selef-lock-tray' },
  { image: '/assets/texture/style/lidandbase.webp', name: 'lid-and-base' },
  { image: '/assets/texture/style/headercard.webp', name: 'header-card' },
  { image: '/assets/texture/style/other-ques.webp', name: 'other' }
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
      styled={true}
    />
  )
}

export default Style
