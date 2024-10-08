import { useTexture } from '@react-three/drei'
import { useAppDispatch } from '../store/hooks'
import { TextureLoader } from 'three'

export function toCamelCase (str) {
  return str.replace(/-([a-z])/g, (match, p1) => p1.toUpperCase())
}

export const angleToRadians = angle => {
  return angle * (Math.PI / 180)
}

export function subtractVh (vhString, num) {
  // Extract the numeric part from the vhString
  const vhValue = parseFloat(vhString)

  // Subtract the number from the numeric part
  const resultValue = vhValue - num

  // Return the result as a string with 'vh' unit
  return `${resultValue}vh`
}

export function divideVh (vhString, num) {
  // Extract the numeric part from the vhString
  const vhValue = parseFloat(vhString)

  // Subtract the number from the numeric part
  const resultValue = vhValue / num

  // Return the result as a string with 'vh' unit
  return `${resultValue}vh`
}

export const preloadTextures = () => {
  Object.keys(TexturesUrls).forEach(model => {
    Object.keys(TexturesUrls[model]).forEach(material => {
      TexturesUrls[model][material].forEach(url => {
        useTexture.preload(url)
      })
    })
  })
}

const TexturesUrls = {
  tuckend: {
    kraft: [
      '/assets/models/tuckend/kraft/base.webp',
      '/assets/models/tuckend/textures/1spot_roughness_metflo_inside.webp',
      '/assets/models/tuckend/textures/1spot_roughness_metflo_outside.webp',
      '/assets/models/tuckend/textures/2spot_roughness_metflo_inside.webp',
      '/assets/models/tuckend/textures/2spot_roughness_metflo_outside.webp',
      '/assets/models/tuckend/textures/cmyk_1spot_roughness_metflo_inside.webp',
      '/assets/models/tuckend/textures/cmyk_1spot_roughness_metflo_outside.webp',
      '/assets/models/tuckend/textures/embossing_OUTSIDE.webp',
      '/assets/models/tuckend/textures/outside_coating_gloss_OMR.webp',
      '/assets/models/tuckend/kraft/inside_1spot.webp',
      '/assets/models/tuckend/kraft/inside_1spot_metflo.webp',
      '/assets/models/tuckend/kraft/inside_2spot.webp',
      '/assets/models/tuckend/kraft/inside_2spot_metflo.webp',
      '/assets/models/tuckend/kraft/inside_black.webp',
      '/assets/models/tuckend/kraft/inside_cmyk.webp',
      '/assets/models/tuckend/kraft/inside_cmyk_1spot.webp',
      '/assets/models/tuckend/kraft/inside_cmyk_1spot_metflo.webp',
      '/assets/models/tuckend/kraft/inside_cmyk_2spot.webp',
      '/assets/models/tuckend/kraft/inside_cmyk_2spot_metflo.webp',
      '/assets/models/tuckend/kraft/outside_1spot.webp',
      '/assets/models/tuckend/kraft/outside_1spot_metflo.webp',
      '/assets/models/tuckend/kraft/outside_2spot.webp',
      '/assets/models/tuckend/kraft/outside_2spot_metflo.webp',
      '/assets/models/tuckend/kraft/outside_black.webp',
      '/assets/models/tuckend/kraft/outside_cmyk.webp',
      '/assets/models/tuckend/kraft/outside_cmyk_1spot.webp',
      '/assets/models/tuckend/kraft/outside_cmyk_1spot_metflo.webp',
      '/assets/models/tuckend/kraft/outside_cmyk_2spot.webp',
      '/assets/models/tuckend/kraft/outside_cmyk_2spot_metflo.webp'
    ],
    coated_white: [
      '/assets/models/tuckend/coated-white/base.webp',
      '/assets/models/tuckend/coated-white/inside_1spot.webp',
      '/assets/models/tuckend/coated-white/inside_1spot_metflo.webp',
      '/assets/models/tuckend/coated-white/inside_2spot.webp',
      '/assets/models/tuckend/coated-white/inside_2spot_metflo.webp',
      '/assets/models/tuckend/coated-white/inside_black.webp',
      '/assets/models/tuckend/coated-white/inside_cmyk.webp',
      '/assets/models/tuckend/coated-white/inside_cmyk_1spot.webp',
      '/assets/models/tuckend/coated-white/inside_cmyk_1spot_metflo.webp',
      '/assets/models/tuckend/coated-white/inside_cmyk_2spot.webp',
      '/assets/models/tuckend/coated-white/inside_cmyk_2spot_metflo.webp',
      '/assets/models/tuckend/coated-white/outside_1spot.webp',
      '/assets/models/tuckend/coated-white/outside_1spot_metflo.webp',
      '/assets/models/tuckend/coated-white/outside_2spot.webp',
      '/assets/models/tuckend/coated-white/outside_2spot_metflo.webp',
      '/assets/models/tuckend/coated-white/outside_black.webp',
      '/assets/models/tuckend/coated-white/outside_cmyk.webp',
      '/assets/models/tuckend/coated-white/outside_cmyk_1spot.webp',
      '/assets/models/tuckend/coated-white/outside_cmyk_1spot_metflo.webp',
      '/assets/models/tuckend/coated-white/outside_cmyk_2spot.webp',
      '/assets/models/tuckend/coated-white/outside_cmyk_2spot_metflo.webp'
    ],
    uncoated_white: [
      '/assets/models/tuckend/uncoated-white/base.webp',
      '/assets/models/tuckend/uncoated-white/inside_1spot.webp',
      '/assets/models/tuckend/uncoated-white/inside_1spot_metflo.webp',
      '/assets/models/tuckend/uncoated-white/inside_2spot.webp',
      '/assets/models/tuckend/uncoated-white/inside_2spot_metflo.webp',
      '/assets/models/tuckend/uncoated-white/inside_black.webp',
      '/assets/models/tuckend/uncoated-white/inside_cmyk.webp',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_1spot.webp',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_1spot_metflo.webp',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_2spot.webp',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_2spot_metflo.webp',
      '/assets/models/tuckend/uncoated-white/outside_1spot.webp',
      '/assets/models/tuckend/uncoated-white/outside_1spot_metflo.webp',
      '/assets/models/tuckend/uncoated-white/outside_2spot.webp',
      '/assets/models/tuckend/uncoated-white/outside_2spot_metflo.webp',
      '/assets/models/tuckend/uncoated-white/outside_black.webp',
      '/assets/models/tuckend/uncoated-white/outside_cmyk.webp',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_1spot.webp',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_1spot_metflo.webp',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_2spot.webp',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_2spot_metflo.webp'
    ],
    microflute_kraft: ['/assets/models/tuckend/microflute-kraft/side.webp'],
    microflute_white: ['/assets/models/tuckend/microflute-white/side.webp']
  },
  mailer: {
    kraft: [
      '/assets/models/mailer/textures/1spot_roughness_metflo_inside.webp',
      '/assets/models/mailer/textures/1spot_roughness_metflo_outside.webp',
      '/assets/models/mailer/textures/2spot_roughness_metflo_inside.webp',
      '/assets/models/mailer/textures/2spot_roughness_metflo_outside.webp',
      '/assets/models/mailer/textures/cmyk_1spot_roughness_metflo_inside.webp',
      '/assets/models/mailer/textures/cmyk_1spot_roughness_metflo_outside.webp',
      '/assets/models/mailer/textures/base.webp',
      '/assets/models/mailer/textures/finishing_emboss_normal_map.webp',
      '/assets/models/mailer/textures/inside_coating_gloss_OMR.webp',
      '/assets/models/mailer/kraft/base.webp',
      '/assets/models/mailer/kraft/inside_1spot.webp',
      '/assets/models/mailer/kraft/inside_1spot_metflo.webp',
      '/assets/models/mailer/kraft/inside_2spot.webp',
      '/assets/models/mailer/kraft/inside_2spot_metflo.webp',
      '/assets/models/mailer/kraft/inside_black.webp',
      '/assets/models/mailer/kraft/inside_cmyk.webp',
      '/assets/models/mailer/kraft/inside_cmyk_1spot.webp',
      '/assets/models/mailer/kraft/inside_cmyk_1spot_metflo.webp',
      '/assets/models/mailer/kraft/inside_cmyk_2spot.webp',
      '/assets/models/mailer/kraft/inside_cmyk_2spot_metflo.webp',
      '/assets/models/mailer/kraft/outside_1spot.webp',
      '/assets/models/mailer/kraft/outside_1spot_metflo.webp',
      '/assets/models/mailer/kraft/outside_2spot.webp',
      '/assets/models/mailer/kraft/outside_2spot_metflo.webp',
      '/assets/models/mailer/kraft/outside_black.webp',
      '/assets/models/mailer/kraft/outside_cmyk.webp',
      '/assets/models/mailer/kraft/outside_cmyk_1spot.webp',
      '/assets/models/mailer/kraft/outside_cmyk_1spot_metflo.webp',
      '/assets/models/mailer/kraft/outside_cmyk_2spot.webp',
      '/assets/models/mailer/kraft/outside_cmyk_2spot_metflo.webp'
    ],
    coated_white: [
      '/assets/models/mailer/coated-white/base.webp',
      '/assets/models/mailer/coated-white/inside_1spot.webp',
      '/assets/models/mailer/coated-white/inside_1spot_metflo.webp',
      '/assets/models/mailer/coated-white/inside_2spot.webp',
      '/assets/models/mailer/coated-white/inside_2spot_metflo.webp',
      '/assets/models/mailer/coated-white/inside_black.webp',
      '/assets/models/mailer/coated-white/inside_cmyk.webp',
      '/assets/models/mailer/coated-white/inside_cmyk_1spot.webp',
      '/assets/models/mailer/coated-white/inside_cmyk_1spot_metflo.webp',
      '/assets/models/mailer/coated-white/inside_cmyk_2spot.webp',
      '/assets/models/mailer/coated-white/inside_cmyk_2spot_metflo.webp',
      '/assets/models/mailer/coated-white/outside_1spot.webp',
      '/assets/models/mailer/coated-white/outside_1spot_metflo.webp',
      '/assets/models/mailer/coated-white/outside_2spot.webp',
      '/assets/models/mailer/coated-white/outside_2spot_metflo.webp',
      '/assets/models/mailer/coated-white/outside_black.webp',
      '/assets/models/mailer/coated-white/outside_cmyk.webp',
      '/assets/models/mailer/coated-white/outside_cmyk_1spot.webp',
      '/assets/models/mailer/coated-white/outside_cmyk_1spot_metflo.webp',
      '/assets/models/mailer/coated-white/outside_cmyk_2spot.webp',
      '/assets/models/mailer/coated-white/outside_cmyk_2spot_metflo.webp'
    ],
    uncoated_white: [
      '/assets/models/mailer/uncoated-white/base.webp',
      '/assets/models/mailer/uncoated-white/inside_1spot.webp',
      '/assets/models/mailer/uncoated-white/inside_1spot_metflo.webp',
      '/assets/models/mailer/uncoated-white/inside_2spot.webp',
      '/assets/models/mailer/uncoated-white/inside_2spot_metflo.webp',
      '/assets/models/mailer/uncoated-white/inside_black.webp',
      '/assets/models/mailer/uncoated-white/inside_cmyk.webp',
      '/assets/models/mailer/uncoated-white/inside_cmyk_1spot.webp',
      '/assets/models/mailer/uncoated-white/inside_cmyk_1spot_metflo.webp',
      '/assets/models/mailer/uncoated-white/inside_cmyk_2spot.webp',
      '/assets/models/mailer/uncoated-white/inside_cmyk_2spot_metflo.webp',
      '/assets/models/mailer/uncoated-white/outside_1spot.webp',
      '/assets/models/mailer/uncoated-white/outside_1spot_metflo.webp',
      '/assets/models/mailer/uncoated-white/outside_2spot.webp',
      '/assets/models/mailer/uncoated-white/outside_2spot_metflo.webp',
      '/assets/models/mailer/uncoated-white/outside_black.webp',
      '/assets/models/mailer/uncoated-white/outside_cmyk.webp',
      '/assets/models/mailer/uncoated-white/outside_cmyk_1spot.webp',
      '/assets/models/mailer/uncoated-white/outside_cmyk_1spot_metflo.webp',
      '/assets/models/mailer/uncoated-white/outside_cmyk_2spot.webp',
      '/assets/models/mailer/uncoated-white/outside_cmyk_2spot_metflo.webp'
    ],
    microflute_kraft: ['/assets/models/mailer/microflute-kraft/side.webp'],
    microflute_white: ['/assets/models/mailer/microflute-white/side.webp']
  }
}
const PrintSpecUrls = {
  tuckend: {
    kraft: [
      '/assets/models/tuckend/textures/1spot_roughness_metflo_inside.webp',
      '/assets/models/tuckend/textures/1spot_roughness_metflo_outside.webp',
      '/assets/models/tuckend/textures/2spot_roughness_metflo_inside.webp',
      '/assets/models/tuckend/textures/2spot_roughness_metflo_outside.webp',
      '/assets/models/tuckend/textures/cmyk_1spot_roughness_metflo_inside.webp',
      '/assets/models/tuckend/textures/cmyk_1spot_roughness_metflo_outside.webp',
      '/assets/models/tuckend/textures/outside_coating_gloss_OMR.webp',
      '/assets/models/tuckend/kraft/inside_1spot.webp',
      '/assets/models/tuckend/kraft/inside_1spot_metflo.webp',
      '/assets/models/tuckend/kraft/inside_2spot.webp',
      '/assets/models/tuckend/kraft/inside_2spot_metflo.webp',
      '/assets/models/tuckend/kraft/inside_black.webp',
      '/assets/models/tuckend/kraft/inside_cmyk.webp',
      '/assets/models/tuckend/kraft/inside_cmyk_1spot.webp',
      '/assets/models/tuckend/kraft/inside_cmyk_1spot_metflo.webp',
      '/assets/models/tuckend/kraft/inside_cmyk_2spot.webp',
      '/assets/models/tuckend/kraft/inside_cmyk_2spot_metflo.webp',
      '/assets/models/tuckend/kraft/outside_1spot.webp',
      '/assets/models/tuckend/kraft/outside_1spot_metflo.webp',
      '/assets/models/tuckend/kraft/outside_2spot.webp',
      '/assets/models/tuckend/kraft/outside_2spot_metflo.webp',
      '/assets/models/tuckend/kraft/outside_black.webp',
      '/assets/models/tuckend/kraft/outside_cmyk.webp',
      '/assets/models/tuckend/kraft/outside_cmyk_1spot.webp',
      '/assets/models/tuckend/kraft/outside_cmyk_1spot_metflo.webp',
      '/assets/models/tuckend/kraft/outside_cmyk_2spot.webp',
      '/assets/models/tuckend/kraft/outside_cmyk_2spot_metflo.webp'
    ],
    coated_white: [
      '/assets/models/tuckend/coated-white/inside_1spot.webp',
      '/assets/models/tuckend/coated-white/inside_1spot_metflo.webp',
      '/assets/models/tuckend/coated-white/inside_2spot.webp',
      '/assets/models/tuckend/coated-white/inside_2spot_metflo.webp',
      '/assets/models/tuckend/coated-white/inside_black.webp',
      '/assets/models/tuckend/coated-white/inside_cmyk.webp',
      '/assets/models/tuckend/coated-white/inside_cmyk_1spot.webp',
      '/assets/models/tuckend/coated-white/inside_cmyk_1spot_metflo.webp',
      '/assets/models/tuckend/coated-white/inside_cmyk_2spot.webp',
      '/assets/models/tuckend/coated-white/inside_cmyk_2spot_metflo.webp',
      '/assets/models/tuckend/coated-white/outside_1spot.webp',
      '/assets/models/tuckend/coated-white/outside_1spot_metflo.webp',
      '/assets/models/tuckend/coated-white/outside_2spot.webp',
      '/assets/models/tuckend/coated-white/outside_2spot_metflo.webp',
      '/assets/models/tuckend/coated-white/outside_black.webp',
      '/assets/models/tuckend/coated-white/outside_cmyk.webp',
      '/assets/models/tuckend/coated-white/outside_cmyk_1spot.webp',
      '/assets/models/tuckend/coated-white/outside_cmyk_1spot_metflo.webp',
      '/assets/models/tuckend/coated-white/outside_cmyk_2spot.webp',
      '/assets/models/tuckend/coated-white/outside_cmyk_2spot_metflo.webp'
    ],
    uncoated_white: [
      '/assets/models/tuckend/uncoated-white/inside_1spot.webp',
      '/assets/models/tuckend/uncoated-white/inside_1spot_metflo.webp',
      '/assets/models/tuckend/uncoated-white/inside_2spot.webp',
      '/assets/models/tuckend/uncoated-white/inside_2spot_metflo.webp',
      '/assets/models/tuckend/uncoated-white/inside_black.webp',
      '/assets/models/tuckend/uncoated-white/inside_cmyk.webp',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_1spot.webp',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_1spot_metflo.webp',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_2spot.webp',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_2spot_metflo.webp',
      '/assets/models/tuckend/uncoated-white/outside_1spot.webp',
      '/assets/models/tuckend/uncoated-white/outside_1spot_metflo.webp',
      '/assets/models/tuckend/uncoated-white/outside_2spot.webp',
      '/assets/models/tuckend/uncoated-white/outside_2spot_metflo.webp',
      '/assets/models/tuckend/uncoated-white/outside_black.webp',
      '/assets/models/tuckend/uncoated-white/outside_cmyk.webp',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_1spot.webp',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_1spot_metflo.webp',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_2spot.webp',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_2spot_metflo.webp'
    ],
    microflute_kraft: ['/assets/models/tuckend/microflute-kraft/side.webp'],
    microflute_white: ['/assets/models/tuckend/microflute-white/side.webp']
  },
  mailer: {
    kraft: [
      '/assets/models/mailer/textures/1spot_roughness_metflo_inside.webp',
      '/assets/models/mailer/textures/1spot_roughness_metflo_outside.webp',
      '/assets/models/mailer/textures/2spot_roughness_metflo_inside.webp',
      '/assets/models/mailer/textures/2spot_roughness_metflo_outside.webp',
      '/assets/models/mailer/textures/cmyk_1spot_roughness_metflo_inside.webp',
      '/assets/models/mailer/textures/cmyk_1spot_roughness_metflo_outside.webp',
      '/assets/models/mailer/textures/finishing_emboss_normal_map.webp',
      '/assets/models/mailer/textures/inside_coating_gloss_OMR.webp',
      '/assets/models/mailer/kraft/inside_1spot.webp',
      '/assets/models/mailer/kraft/inside_1spot_metflo.webp',
      '/assets/models/mailer/kraft/inside_2spot.webp',
      '/assets/models/mailer/kraft/inside_2spot_metflo.webp',
      '/assets/models/mailer/kraft/inside_black.webp',
      '/assets/models/mailer/kraft/inside_cmyk.webp',
      '/assets/models/mailer/kraft/inside_cmyk_1spot.webp',
      '/assets/models/mailer/kraft/inside_cmyk_1spot_metflo.webp',
      '/assets/models/mailer/kraft/inside_cmyk_2spot.webp',
      '/assets/models/mailer/kraft/inside_cmyk_2spot_metflo.webp',
      '/assets/models/mailer/kraft/outside_1spot.webp',
      '/assets/models/mailer/kraft/outside_1spot_metflo.webp',
      '/assets/models/mailer/kraft/outside_2spot.webp',
      '/assets/models/mailer/kraft/outside_2spot_metflo.webp',
      '/assets/models/mailer/kraft/outside_black.webp',
      '/assets/models/mailer/kraft/outside_cmyk.webp',
      '/assets/models/mailer/kraft/outside_cmyk_1spot.webp',
      '/assets/models/mailer/kraft/outside_cmyk_1spot_metflo.webp',
      '/assets/models/mailer/kraft/outside_cmyk_2spot.webp',
      '/assets/models/mailer/kraft/outside_cmyk_2spot_metflo.webp'
    ],
    coated_white: [
      '/assets/models/mailer/coated-white/inside_1spot.webp',
      '/assets/models/mailer/coated-white/inside_1spot_metflo.webp',
      '/assets/models/mailer/coated-white/inside_2spot.webp',
      '/assets/models/mailer/coated-white/inside_2spot_metflo.webp',
      '/assets/models/mailer/coated-white/inside_black.webp',
      '/assets/models/mailer/coated-white/inside_cmyk.webp',
      '/assets/models/mailer/coated-white/inside_cmyk_1spot.webp',
      '/assets/models/mailer/coated-white/inside_cmyk_1spot_metflo.webp',
      '/assets/models/mailer/coated-white/inside_cmyk_2spot.webp',
      '/assets/models/mailer/coated-white/inside_cmyk_2spot_metflo.webp',
      '/assets/models/mailer/coated-white/outside_1spot.webp',
      '/assets/models/mailer/coated-white/outside_1spot_metflo.webp',
      '/assets/models/mailer/coated-white/outside_2spot.webp',
      '/assets/models/mailer/coated-white/outside_2spot_metflo.webp',
      '/assets/models/mailer/coated-white/outside_black.webp',
      '/assets/models/mailer/coated-white/outside_cmyk.webp',
      '/assets/models/mailer/coated-white/outside_cmyk_1spot.webp',
      '/assets/models/mailer/coated-white/outside_cmyk_1spot_metflo.webp',
      '/assets/models/mailer/coated-white/outside_cmyk_2spot.webp',
      '/assets/models/mailer/coated-white/outside_cmyk_2spot_metflo.webp'
    ],
    uncoated_white: [
      '/assets/models/mailer/uncoated-white/inside_1spot.webp',
      '/assets/models/mailer/uncoated-white/inside_1spot_metflo.webp',
      '/assets/models/mailer/uncoated-white/inside_2spot.webp',
      '/assets/models/mailer/uncoated-white/inside_2spot_metflo.webp',
      '/assets/models/mailer/uncoated-white/inside_black.webp',
      '/assets/models/mailer/uncoated-white/inside_cmyk.webp',
      '/assets/models/mailer/uncoated-white/inside_cmyk_1spot.webp',
      '/assets/models/mailer/uncoated-white/inside_cmyk_1spot_metflo.webp',
      '/assets/models/mailer/uncoated-white/inside_cmyk_2spot.webp',
      '/assets/models/mailer/uncoated-white/inside_cmyk_2spot_metflo.webp',
      '/assets/models/mailer/uncoated-white/outside_1spot.webp',
      '/assets/models/mailer/uncoated-white/outside_1spot_metflo.webp',
      '/assets/models/mailer/uncoated-white/outside_2spot.webp',
      '/assets/models/mailer/uncoated-white/outside_2spot_metflo.webp',
      '/assets/models/mailer/uncoated-white/outside_black.webp',
      '/assets/models/mailer/uncoated-white/outside_cmyk.webp',
      '/assets/models/mailer/uncoated-white/outside_cmyk_1spot.webp',
      '/assets/models/mailer/uncoated-white/outside_cmyk_1spot_metflo.webp',
      '/assets/models/mailer/uncoated-white/outside_cmyk_2spot.webp',
      '/assets/models/mailer/uncoated-white/outside_cmyk_2spot_metflo.webp'
    ],
    microflute_kraft: ['/assets/models/mailer/microflute-kraft/side.webp'],
    microflute_white: ['/assets/models/mailer/microflute-white/side.webp']
  }
}
const MaterialTexturesUrls = {
  tuckend: {
    kraft: ['/assets/models/tuckend/kraft/base.webp'],
    coated_white: ['/assets/models/tuckend/coated-white/base.webp'],
    uncoated_white: ['/assets/models/tuckend/uncoated-white/base.webp'],
    microflute_kraft: ['/assets/models/tuckend/microflute-kraft/side.webp'],
    microflute_white: ['/assets/models/tuckend/microflute-white/side.webp']
  },
  mailer: {
    kraft: ['/assets/models/mailer/kraft/base.webp'],
    coated_white: ['/assets/models/mailer/coated-white/base.webp'],
    uncoated_white: ['/assets/models/mailer/uncoated-white/base.webp'],
    microflute_kraft: ['/assets/models/mailer/microflute-kraft/side.webp'],
    microflute_white: ['/assets/models/mailer/microflute-white/side.webp']
  }
}

export const preloadMaterialTextures = () => {
  Object.keys(MaterialTexturesUrls).forEach(model => {
    Object.keys(MaterialTexturesUrls[model]).forEach(material => {
      MaterialTexturesUrls[model][material].forEach(url => {
        requestIdleCallback(() => {
          useTexture.preload(url)
        })
      })
    })
  })
}

export const preloadPrintTextures = () => {
  Object.keys(PrintSpecUrls).forEach(model => {
    Object.keys(PrintSpecUrls[model]).forEach(material => {
      PrintSpecUrls[model][material].forEach(url => {
        requestIdleCallback(() => {
          useTexture.preload(url)
        })
      })
    })
  })
}
