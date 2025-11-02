const ColorThief = require('colorthief')
const path = require('path')

async function run() {
  const logoPath = path.resolve(__dirname, '..', 'public', 'EdLight_Website_Logo.png')
  try {
    const dominant = await ColorThief.getColor(logoPath)
    const palette = await ColorThief.getPalette(logoPath, 8)
    const toHex = ([r,g,b]) => '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('')
    console.log(JSON.stringify({
      dominant: toHex(dominant),
      palette: palette.map(toHex)
    }, null, 2))
  } catch (e) {
    console.error('Failed to extract colors:', e.message)
    process.exit(1)
  }
}
run()
