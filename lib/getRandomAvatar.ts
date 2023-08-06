import { randpix, RandpixColorScheme, Symmetry } from "randpix"

const types = [
  RandpixColorScheme.NEUTRAL,
  RandpixColorScheme.MAGENTA,
  RandpixColorScheme.MAGENTA_SEPIA,
  RandpixColorScheme.LIGHT_GREEN,
  RandpixColorScheme.SEPIA,
  RandpixColorScheme.MAGMA,
  RandpixColorScheme.ICE,
  RandpixColorScheme.DARK_SEPIA,
  RandpixColorScheme.SOLARIZE,
  RandpixColorScheme.DARKULA,
  RandpixColorScheme.BLUE,
  RandpixColorScheme.RETROWAVE,
  RandpixColorScheme.BLOOD,
  RandpixColorScheme.PURPUR,
  RandpixColorScheme.GRAYSCALE_MAGENTA,
  RandpixColorScheme.NIGHT_SKY,
  RandpixColorScheme.SUNSET,
  RandpixColorScheme.TOXIC_LIME,
  RandpixColorScheme.SKY,
  RandpixColorScheme.BROWNSCALE,
  RandpixColorScheme.LIGHT_SEPIA,
  RandpixColorScheme.SUN,
  RandpixColorScheme.PURPLE_SOLARIZED,
  RandpixColorScheme.CYBERPUNK,
  RandpixColorScheme.DIAMOND_BLACK,
  RandpixColorScheme.CYBER_BLACK,
  RandpixColorScheme.DIAMOND,
  RandpixColorScheme.BLOOD_MOON,
  RandpixColorScheme.GERMANY,
  RandpixColorScheme.GOLD_ORE,
  RandpixColorScheme.LAVA_POOL,
  RandpixColorScheme.CREAM,
]

export const getRandomAvatar = async () => {
  const randomIndex = Math.floor(Math.random() * types.length)
  const randomType = types[randomIndex]

  const generate = randpix({
    colorScheme: randomType,
    size: 8,
    scale: 32,
    symmetry: Symmetry.VERTICAL,
    colorBias: 15,
    grayscaleBias: false,
  })

  const art = generate() // Generating the pixel art

  return art.toDataURL()
}
