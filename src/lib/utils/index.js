import { useTexture } from '@react-three/drei'

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

const PrintSpecUrls = {
  tuckend: {
    kraft: [
      '/assets/models/tuckend/textures/1spot_roughness_metflo_inside.jpg',
      '/assets/models/tuckend/textures/1spot_roughness_metflo_outside.jpg',
      '/assets/models/tuckend/textures/2spot_roughness_metflo_inside.jpg',
      '/assets/models/tuckend/textures/2spot_roughness_metflo_outside.jpg',
      '/assets/models/tuckend/textures/cmyk_1spot_roughness_metflo_inside.jpg',
      '/assets/models/tuckend/textures/cmyk_1spot_roughness_metflo_outside.jpg',
      '/assets/models/tuckend/textures/outside_coating_gloss_OMR.jpg',
      '/assets/models/tuckend/kraft/inside_1spot.jpg',
      '/assets/models/tuckend/kraft/inside_1spot_metflo.jpg',
      '/assets/models/tuckend/kraft/inside_2spot.jpg',
      '/assets/models/tuckend/kraft/inside_2spot_metflo.jpg',
      '/assets/models/tuckend/kraft/inside_black.jpg',
      '/assets/models/tuckend/kraft/inside_cmyk.jpg',
      '/assets/models/tuckend/kraft/inside_cmyk_1spot.jpg',
      '/assets/models/tuckend/kraft/inside_cmyk_1spot_metflo.jpg',
      '/assets/models/tuckend/kraft/inside_cmyk_2spot.jpg',
      '/assets/models/tuckend/kraft/inside_cmyk_2spot_metflo.jpg',
      '/assets/models/tuckend/kraft/outside_1spot.jpg',
      '/assets/models/tuckend/kraft/outside_1spot_metflo.jpg',
      '/assets/models/tuckend/kraft/outside_2spot.jpg',
      '/assets/models/tuckend/kraft/outside_2spot_metflo.jpg',
      '/assets/models/tuckend/kraft/outside_black.jpg',
      '/assets/models/tuckend/kraft/outside_cmyk.jpg',
      '/assets/models/tuckend/kraft/outside_cmyk_1spot.jpg',
      '/assets/models/tuckend/kraft/outside_cmyk_1spot_metflo.jpg',
      '/assets/models/tuckend/kraft/outside_cmyk_2spot.jpg',
      '/assets/models/tuckend/kraft/outside_cmyk_2spot_metflo.jpg'
    ],
    coated_white: [
      '/assets/models/tuckend/coated-white/inside_1spot.jpg',
      '/assets/models/tuckend/coated-white/inside_1spot_metflo.jpg',
      '/assets/models/tuckend/coated-white/inside_2spot.jpg',
      '/assets/models/tuckend/coated-white/inside_2spot_metflo.jpg',
      '/assets/models/tuckend/coated-white/inside_black.jpg',
      '/assets/models/tuckend/coated-white/inside_cmyk.jpg',
      '/assets/models/tuckend/coated-white/inside_cmyk_1spot.jpg',
      '/assets/models/tuckend/coated-white/inside_cmyk_1spot_metflo.jpg',
      '/assets/models/tuckend/coated-white/inside_cmyk_2spot.jpg',
      '/assets/models/tuckend/coated-white/inside_cmyk_2spot_metflo.jpg',
      '/assets/models/tuckend/coated-white/outside_1spot.jpg',
      '/assets/models/tuckend/coated-white/outside_1spot_metflo.jpg',
      '/assets/models/tuckend/coated-white/outside_2spot.jpg',
      '/assets/models/tuckend/coated-white/outside_2spot_metflo.jpg',
      '/assets/models/tuckend/coated-white/outside_black.jpg',
      '/assets/models/tuckend/coated-white/outside_cmyk.jpg',
      '/assets/models/tuckend/coated-white/outside_cmyk_1spot.jpg',
      '/assets/models/tuckend/coated-white/outside_cmyk_1spot_metflo.jpg',
      '/assets/models/tuckend/coated-white/outside_cmyk_2spot.jpg',
      '/assets/models/tuckend/coated-white/outside_cmyk_2spot_metflo.jpg'
    ],
    uncoated_white: [
      '/assets/models/tuckend/uncoated-white/inside_1spot.jpg',
      '/assets/models/tuckend/uncoated-white/inside_1spot_metflo.jpg',
      '/assets/models/tuckend/uncoated-white/inside_2spot.jpg',
      '/assets/models/tuckend/uncoated-white/inside_2spot_metflo.jpg',
      '/assets/models/tuckend/uncoated-white/inside_black.jpg',
      '/assets/models/tuckend/uncoated-white/inside_cmyk.jpg',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_1spot.jpg',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_1spot_metflo.jpg',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_2spot.jpg',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_2spot_metflo.jpg',
      '/assets/models/tuckend/uncoated-white/outside_1spot.jpg',
      '/assets/models/tuckend/uncoated-white/outside_1spot_metflo.jpg',
      '/assets/models/tuckend/uncoated-white/outside_2spot.jpg',
      '/assets/models/tuckend/uncoated-white/outside_2spot_metflo.jpg',
      '/assets/models/tuckend/uncoated-white/outside_black.jpg',
      '/assets/models/tuckend/uncoated-white/outside_cmyk.jpg',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_1spot.jpg',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_1spot_metflo.jpg',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_2spot.jpg',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_2spot_metflo.jpg'
    ],
    microflute_kraft: ['/assets/models/tuckend/microflute-kraft/side.jpg'],
    microflute_white: ['/assets/models/tuckend/microflute-white/side.jpg']
  },
  mailer: {
    kraft: [
      '/assets/models/mailer/textures/1spot_roughness_metflo_inside.jpg',
      '/assets/models/mailer/textures/1spot_roughness_metflo_outside.jpg',
      '/assets/models/mailer/textures/2spot_roughness_metflo_inside.jpg',
      '/assets/models/mailer/textures/2spot_roughness_metflo_outside.jpg',
      '/assets/models/mailer/textures/cmyk_1spot_roughness_metflo_inside.jpg',
      '/assets/models/mailer/textures/cmyk_1spot_roughness_metflo_outside.jpg',
      '/assets/models/mailer/textures/finishing_emboss_normal_map.jpg',
      '/assets/models/mailer/textures/inside_coating_gloss_OMR.jpg',
      '/assets/models/mailer/kraft/inside_1spot.jpg',
      '/assets/models/mailer/kraft/inside_1spot_metflo.jpg',
      '/assets/models/mailer/kraft/inside_2spot.jpg',
      '/assets/models/mailer/kraft/inside_2spot_metflo.jpg',
      '/assets/models/mailer/kraft/inside_black.jpg',
      '/assets/models/mailer/kraft/inside_cmyk.jpg',
      '/assets/models/mailer/kraft/inside_cmyk_1spot.jpg',
      '/assets/models/mailer/kraft/inside_cmyk_1spot_metflo.jpg',
      '/assets/models/mailer/kraft/inside_cmyk_2spot.jpg',
      '/assets/models/mailer/kraft/inside_cmyk_2spot_metflo.jpg',
      '/assets/models/mailer/kraft/outside_1spot.jpg',
      '/assets/models/mailer/kraft/outside_1spot_metflo.jpg',
      '/assets/models/mailer/kraft/outside_2spot.jpg',
      '/assets/models/mailer/kraft/outside_2spot_metflo.jpg',
      '/assets/models/mailer/kraft/outside_black.jpg',
      '/assets/models/mailer/kraft/outside_cmyk.jpg',
      '/assets/models/mailer/kraft/outside_cmyk_1spot.jpg',
      '/assets/models/mailer/kraft/outside_cmyk_1spot_metflo.jpg',
      '/assets/models/mailer/kraft/outside_cmyk_2spot.jpg',
      '/assets/models/mailer/kraft/outside_cmyk_2spot_metflo.jpg'
    ],
    coated_white: [
      '/assets/models/mailer/coated-white/inside_1spot.jpg',
      '/assets/models/mailer/coated-white/inside_1spot_metflo.jpg',
      '/assets/models/mailer/coated-white/inside_2spot.jpg',
      '/assets/models/mailer/coated-white/inside_2spot_metflo.jpg',
      '/assets/models/mailer/coated-white/inside_black.jpg',
      '/assets/models/mailer/coated-white/inside_cmyk.jpg',
      '/assets/models/mailer/coated-white/inside_cmyk_1spot.jpg',
      '/assets/models/mailer/coated-white/inside_cmyk_1spot_metflo.jpg',
      '/assets/models/mailer/coated-white/inside_cmyk_2spot.jpg',
      '/assets/models/mailer/coated-white/inside_cmyk_2spot_metflo.jpg',
      '/assets/models/mailer/coated-white/outside_1spot.jpg',
      '/assets/models/mailer/coated-white/outside_1spot_metflo.jpg',
      '/assets/models/mailer/coated-white/outside_2spot.jpg',
      '/assets/models/mailer/coated-white/outside_2spot_metflo.jpg',
      '/assets/models/mailer/coated-white/outside_black.jpg',
      '/assets/models/mailer/coated-white/outside_cmyk.jpg',
      '/assets/models/mailer/coated-white/outside_cmyk_1spot.jpg',
      '/assets/models/mailer/coated-white/outside_cmyk_1spot_metflo.jpg',
      '/assets/models/mailer/coated-white/outside_cmyk_2spot.jpg',
      '/assets/models/mailer/coated-white/outside_cmyk_2spot_metflo.jpg'
    ],
    uncoated_white: [
      '/assets/models/mailer/uncoated-white/inside_1spot.jpg',
      '/assets/models/mailer/uncoated-white/inside_1spot_metflo.jpg',
      '/assets/models/mailer/uncoated-white/inside_2spot.jpg',
      '/assets/models/mailer/uncoated-white/inside_2spot_metflo.jpg',
      '/assets/models/mailer/uncoated-white/inside_black.jpg',
      '/assets/models/mailer/uncoated-white/inside_cmyk.jpg',
      '/assets/models/mailer/uncoated-white/inside_cmyk_1spot.jpg',
      '/assets/models/mailer/uncoated-white/inside_cmyk_1spot_metflo.jpg',
      '/assets/models/mailer/uncoated-white/inside_cmyk_2spot.jpg',
      '/assets/models/mailer/uncoated-white/inside_cmyk_2spot_metflo.jpg',
      '/assets/models/mailer/uncoated-white/outside_1spot.jpg',
      '/assets/models/mailer/uncoated-white/outside_1spot_metflo.jpg',
      '/assets/models/mailer/uncoated-white/outside_2spot.jpg',
      '/assets/models/mailer/uncoated-white/outside_2spot_metflo.jpg',
      '/assets/models/mailer/uncoated-white/outside_black.jpg',
      '/assets/models/mailer/uncoated-white/outside_cmyk.jpg',
      '/assets/models/mailer/uncoated-white/outside_cmyk_1spot.jpg',
      '/assets/models/mailer/uncoated-white/outside_cmyk_1spot_metflo.jpg',
      '/assets/models/mailer/uncoated-white/outside_cmyk_2spot.jpg',
      '/assets/models/mailer/uncoated-white/outside_cmyk_2spot_metflo.jpg'
    ],
    microflute_kraft: ['/assets/models/mailer/microflute-kraft/side.jpg'],
    microflute_white: ['/assets/models/mailer/microflute-white/side.jpg']
  }
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
      '/assets/models/tuckend/kraft/base.jpg',
      '/assets/models/tuckend/textures/1spot_roughness_metflo_inside.jpg',
      '/assets/models/tuckend/textures/1spot_roughness_metflo_outside.jpg',
      '/assets/models/tuckend/textures/2spot_roughness_metflo_inside.jpg',
      '/assets/models/tuckend/textures/2spot_roughness_metflo_outside.jpg',
      '/assets/models/tuckend/textures/cmyk_1spot_roughness_metflo_inside.jpg',
      '/assets/models/tuckend/textures/cmyk_1spot_roughness_metflo_outside.jpg',
      '/assets/models/tuckend/textures/embossing_OUTSIDE.png',
      '/assets/models/tuckend/textures/outside_coating_gloss_OMR.jpg',
      '/assets/models/tuckend/kraft/inside_1spot.jpg',
      '/assets/models/tuckend/kraft/inside_1spot_metflo.jpg',
      '/assets/models/tuckend/kraft/inside_2spot.jpg',
      '/assets/models/tuckend/kraft/inside_2spot_metflo.jpg',
      '/assets/models/tuckend/kraft/inside_black.jpg',
      '/assets/models/tuckend/kraft/inside_cmyk.jpg',
      '/assets/models/tuckend/kraft/inside_cmyk_1spot.jpg',
      '/assets/models/tuckend/kraft/inside_cmyk_1spot_metflo.jpg',
      '/assets/models/tuckend/kraft/inside_cmyk_2spot.jpg',
      '/assets/models/tuckend/kraft/inside_cmyk_2spot_metflo.jpg',
      '/assets/models/tuckend/kraft/outside_1spot.jpg',
      '/assets/models/tuckend/kraft/outside_1spot_metflo.jpg',
      '/assets/models/tuckend/kraft/outside_2spot.jpg',
      '/assets/models/tuckend/kraft/outside_2spot_metflo.jpg',
      '/assets/models/tuckend/kraft/outside_black.jpg',
      '/assets/models/tuckend/kraft/outside_cmyk.jpg',
      '/assets/models/tuckend/kraft/outside_cmyk_1spot.jpg',
      '/assets/models/tuckend/kraft/outside_cmyk_1spot_metflo.jpg',
      '/assets/models/tuckend/kraft/outside_cmyk_2spot.jpg',
      '/assets/models/tuckend/kraft/outside_cmyk_2spot_metflo.jpg'
    ],
    coated_white: [
      '/assets/models/tuckend/coated-white/base.jpg',
      '/assets/models/tuckend/coated-white/inside_1spot.jpg',
      '/assets/models/tuckend/coated-white/inside_1spot_metflo.jpg',
      '/assets/models/tuckend/coated-white/inside_2spot.jpg',
      '/assets/models/tuckend/coated-white/inside_2spot_metflo.jpg',
      '/assets/models/tuckend/coated-white/inside_black.jpg',
      '/assets/models/tuckend/coated-white/inside_cmyk.jpg',
      '/assets/models/tuckend/coated-white/inside_cmyk_1spot.jpg',
      '/assets/models/tuckend/coated-white/inside_cmyk_1spot_metflo.jpg',
      '/assets/models/tuckend/coated-white/inside_cmyk_2spot.jpg',
      '/assets/models/tuckend/coated-white/inside_cmyk_2spot_metflo.jpg',
      '/assets/models/tuckend/coated-white/outside_1spot.jpg',
      '/assets/models/tuckend/coated-white/outside_1spot_metflo.jpg',
      '/assets/models/tuckend/coated-white/outside_2spot.jpg',
      '/assets/models/tuckend/coated-white/outside_2spot_metflo.jpg',
      '/assets/models/tuckend/coated-white/outside_black.jpg',
      '/assets/models/tuckend/coated-white/outside_cmyk.jpg',
      '/assets/models/tuckend/coated-white/outside_cmyk_1spot.jpg',
      '/assets/models/tuckend/coated-white/outside_cmyk_1spot_metflo.jpg',
      '/assets/models/tuckend/coated-white/outside_cmyk_2spot.jpg',
      '/assets/models/tuckend/coated-white/outside_cmyk_2spot_metflo.jpg'
    ],
    uncoated_white: [
      '/assets/models/tuckend/uncoated-white/base.jpg',
      '/assets/models/tuckend/uncoated-white/inside_1spot.jpg',
      '/assets/models/tuckend/uncoated-white/inside_1spot_metflo.jpg',
      '/assets/models/tuckend/uncoated-white/inside_2spot.jpg',
      '/assets/models/tuckend/uncoated-white/inside_2spot_metflo.jpg',
      '/assets/models/tuckend/uncoated-white/inside_black.jpg',
      '/assets/models/tuckend/uncoated-white/inside_cmyk.jpg',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_1spot.jpg',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_1spot_metflo.jpg',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_2spot.jpg',
      '/assets/models/tuckend/uncoated-white/inside_cmyk_2spot_metflo.jpg',
      '/assets/models/tuckend/uncoated-white/outside_1spot.jpg',
      '/assets/models/tuckend/uncoated-white/outside_1spot_metflo.jpg',
      '/assets/models/tuckend/uncoated-white/outside_2spot.jpg',
      '/assets/models/tuckend/uncoated-white/outside_2spot_metflo.jpg',
      '/assets/models/tuckend/uncoated-white/outside_black.jpg',
      '/assets/models/tuckend/uncoated-white/outside_cmyk.jpg',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_1spot.jpg',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_1spot_metflo.jpg',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_2spot.jpg',
      '/assets/models/tuckend/uncoated-white/outside_cmyk_2spot_metflo.jpg'
    ],
    microflute_kraft: ['/assets/models/tuckend/microflute-kraft/side.jpg'],
    microflute_white: ['/assets/models/tuckend/microflute-white/side.jpg']
  },
  mailer: {
    kraft: [
      '/assets/models/mailer/textures/1spot_roughness_metflo_inside.jpg',
      '/assets/models/mailer/textures/1spot_roughness_metflo_outside.jpg',
      '/assets/models/mailer/textures/2spot_roughness_metflo_inside.jpg',
      '/assets/models/mailer/textures/2spot_roughness_metflo_outside.jpg',
      '/assets/models/mailer/textures/cmyk_1spot_roughness_metflo_inside.jpg',
      '/assets/models/mailer/textures/cmyk_1spot_roughness_metflo_outside.jpg',
      '/assets/models/mailer/textures/base.jpg',
      '/assets/models/mailer/textures/finishing_emboss_normal_map.jpg',
      '/assets/models/mailer/textures/inside_coating_gloss_OMR.jpg',
      '/assets/models/mailer/kraft/base.jpg',
      '/assets/models/mailer/kraft/inside_1spot.jpg',
      '/assets/models/mailer/kraft/inside_1spot_metflo.jpg',
      '/assets/models/mailer/kraft/inside_2spot.jpg',
      '/assets/models/mailer/kraft/inside_2spot_metflo.jpg',
      '/assets/models/mailer/kraft/inside_black.jpg',
      '/assets/models/mailer/kraft/inside_cmyk.jpg',
      '/assets/models/mailer/kraft/inside_cmyk_1spot.jpg',
      '/assets/models/mailer/kraft/inside_cmyk_1spot_metflo.jpg',
      '/assets/models/mailer/kraft/inside_cmyk_2spot.jpg',
      '/assets/models/mailer/kraft/inside_cmyk_2spot_metflo.jpg',
      '/assets/models/mailer/kraft/outside_1spot.jpg',
      '/assets/models/mailer/kraft/outside_1spot_metflo.jpg',
      '/assets/models/mailer/kraft/outside_2spot.jpg',
      '/assets/models/mailer/kraft/outside_2spot_metflo.jpg',
      '/assets/models/mailer/kraft/outside_black.jpg',
      '/assets/models/mailer/kraft/outside_cmyk.jpg',
      '/assets/models/mailer/kraft/outside_cmyk_1spot.jpg',
      '/assets/models/mailer/kraft/outside_cmyk_1spot_metflo.jpg',
      '/assets/models/mailer/kraft/outside_cmyk_2spot.jpg',
      '/assets/models/mailer/kraft/outside_cmyk_2spot_metflo.jpg'
    ],
    coated_white: [
      '/assets/models/mailer/coated-white/base.jpg',
      '/assets/models/mailer/coated-white/inside_1spot.jpg',
      '/assets/models/mailer/coated-white/inside_1spot_metflo.jpg',
      '/assets/models/mailer/coated-white/inside_2spot.jpg',
      '/assets/models/mailer/coated-white/inside_2spot_metflo.jpg',
      '/assets/models/mailer/coated-white/inside_black.jpg',
      '/assets/models/mailer/coated-white/inside_cmyk.jpg',
      '/assets/models/mailer/coated-white/inside_cmyk_1spot.jpg',
      '/assets/models/mailer/coated-white/inside_cmyk_1spot_metflo.jpg',
      '/assets/models/mailer/coated-white/inside_cmyk_2spot.jpg',
      '/assets/models/mailer/coated-white/inside_cmyk_2spot_metflo.jpg',
      '/assets/models/mailer/coated-white/outside_1spot.jpg',
      '/assets/models/mailer/coated-white/outside_1spot_metflo.jpg',
      '/assets/models/mailer/coated-white/outside_2spot.jpg',
      '/assets/models/mailer/coated-white/outside_2spot_metflo.jpg',
      '/assets/models/mailer/coated-white/outside_black.jpg',
      '/assets/models/mailer/coated-white/outside_cmyk.jpg',
      '/assets/models/mailer/coated-white/outside_cmyk_1spot.jpg',
      '/assets/models/mailer/coated-white/outside_cmyk_1spot_metflo.jpg',
      '/assets/models/mailer/coated-white/outside_cmyk_2spot.jpg',
      '/assets/models/mailer/coated-white/outside_cmyk_2spot_metflo.jpg'
    ],
    uncoated_white: [
      '/assets/models/mailer/uncoated-white/base.jpg',
      '/assets/models/mailer/uncoated-white/inside_1spot.jpg',
      '/assets/models/mailer/uncoated-white/inside_1spot_metflo.jpg',
      '/assets/models/mailer/uncoated-white/inside_2spot.jpg',
      '/assets/models/mailer/uncoated-white/inside_2spot_metflo.jpg',
      '/assets/models/mailer/uncoated-white/inside_black.jpg',
      '/assets/models/mailer/uncoated-white/inside_cmyk.jpg',
      '/assets/models/mailer/uncoated-white/inside_cmyk_1spot.jpg',
      '/assets/models/mailer/uncoated-white/inside_cmyk_1spot_metflo.jpg',
      '/assets/models/mailer/uncoated-white/inside_cmyk_2spot.jpg',
      '/assets/models/mailer/uncoated-white/inside_cmyk_2spot_metflo.jpg',
      '/assets/models/mailer/uncoated-white/outside_1spot.jpg',
      '/assets/models/mailer/uncoated-white/outside_1spot_metflo.jpg',
      '/assets/models/mailer/uncoated-white/outside_2spot.jpg',
      '/assets/models/mailer/uncoated-white/outside_2spot_metflo.jpg',
      '/assets/models/mailer/uncoated-white/outside_black.jpg',
      '/assets/models/mailer/uncoated-white/outside_cmyk.jpg',
      '/assets/models/mailer/uncoated-white/outside_cmyk_1spot.jpg',
      '/assets/models/mailer/uncoated-white/outside_cmyk_1spot_metflo.jpg',
      '/assets/models/mailer/uncoated-white/outside_cmyk_2spot.jpg',
      '/assets/models/mailer/uncoated-white/outside_cmyk_2spot_metflo.jpg'
    ],
    microflute_kraft: ['/assets/models/mailer/microflute-kraft/side.jpg'],
    microflute_white: ['/assets/models/mailer/microflute-white/side.jpg']
  }
}

const MaterialTexturesUrls = {
  tuckend: {
    kraft: ['/assets/models/tuckend/kraft/base.jpg'],
    coated_white: ['/assets/models/tuckend/coated-white/base.jpg'],
    uncoated_white: ['/assets/models/tuckend/uncoated-white/base.jpg'],
    microflute_kraft: ['/assets/models/tuckend/microflute-kraft/side.jpg'],
    microflute_white: ['/assets/models/tuckend/microflute-white/side.jpg']
  },
  mailer: {
    kraft: ['/assets/models/mailer/kraft/base.jpg'],
    coated_white: ['/assets/models/mailer/coated-white/base.jpg'],
    uncoated_white: ['/assets/models/mailer/uncoated-white/base.jpg'],
    microflute_kraft: ['/assets/models/mailer/microflute-kraft/side.jpg'],
    microflute_white: ['/assets/models/mailer/microflute-white/side.jpg']
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
