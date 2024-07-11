import React from 'react'
import SubMenu from '../../components/Menu/Sub/SubMenu'
import {
  selectBoxFinishing,
  setBoxFinishing
} from '../../lib/store/features/box/boxSlice'
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks'
import _ from 'lodash'
const FINISH_OPTIONS = [
  { image: '/assets/texture/Finish/thumb/none.png', name: 'none' },
  { image: '/assets/texture/Finish/thumb/embossing.png', name: 'embossing' },
  { image: '/assets/texture/Finish/thumb/gold-foil.png', name: 'gold-foil' },
  { image: '/assets/texture/Finish/thumb/spot-gloss.png', name: 'spot-gloss' },
  { image: '/assets/texture/Finish/thumb/other.png', name: 'other' }
]

const Finishing = () => {
  const finishing = useAppSelector(selectBoxFinishing)
  const dispatch = useAppDispatch()
  const handleSelectFinishing = value => {
    // dispatch(setBoxFinishing(value))
    let obj = _.cloneDeep(finishing)
    if (value === 'embossing') {
      obj.embossing = !obj.embossing
      obj.none = false

      dispatch(setBoxFinishing(obj))
    } else if (value === 'gold-foil') {
      obj.goldFoil = !obj.goldFoil
      obj.none = false

      dispatch(setBoxFinishing(obj))
    } else if (value === 'spot-gloss') {
      obj.spotGloss = !obj.spotGloss
      obj.none = false

      dispatch(setBoxFinishing(obj))
    } else if (value === 'none') {
      obj.embossing = false
      obj.goldFoil = false
      obj.spotGloss = false
      obj.none = true
      dispatch(setBoxFinishing(obj))
    }
  }
  return (
    <SubMenu
      options={FINISH_OPTIONS}
      handleSelector={handleSelectFinishing}
      selectedValue={finishing}
      multiselect
    />
  )
}

export default Finishing
