// Simple script to extract a palette from the EdLight logo
const Vibrant = require('node-vibrant/node')
const path = require('path')

async function run() {
  const logoPath = path.resolve(__dirname, '..', 'public', 'EdLight_Website_Logo.png')
  try {
    const palette = await Vibrant.from(logoPath).maxColorCount(16).getPalette()
    const toHex = (swatch) => (swatch ? swatch.getHex() : null)
    const out = {
      Vibrant: toHex(palette.Vibrant),
      Muted: toHex(palette.Muted),
      DarkVibrant: toHex(palette.DarkVibrant),
      DarkMuted: toHex(palette.DarkMuted),
      LightVibrant: toHex(palette.LightVibrant),
      LightMuted: toHex(palette.LightMuted),
      Population: Object.fromEntries(
        Object.entries(palette).map(([k, v]) => [k, v ? v.getPopulation() : 0])
      ),
    }
    console.log(JSON.stringify(out, null, 2))
  } catch (e) {
    console.error('Failed to extract palette:', e.message)
    process.exit(1)
  }
}
run()
