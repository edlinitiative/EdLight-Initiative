import path from 'node:path'
import fs from 'node:fs/promises'
import sharp from 'sharp'

const publicDir = path.resolve('public')

const targets = [
  { file: 'edlight_academy_group.jpg', width: 1920 },
  { file: 'labs_pics.png', width: 1920 },
  { file: 'nexus_pic.png', width: 1920 },
  { file: 'about_us.png', width: 1920 },
  { file: 'hero.jpg', width: 1920 },
  { file: 'EdLight_Academy.jpg', width: 1920 },
  { file: 'Best_Participant_Award.jpg', width: 1920 },
  { file: 'ESLP_Cultural_Performances.jpg', width: 1920 },
  { file: 'Graduation_Pics.jpg', width: 1920 },
]

const quality = 72

const convertToWebP = async (inputPath, outputPath, width) => {
  const result = await sharp(inputPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toFile(outputPath)

  return result
}

async function optimize() {
  for (const target of targets) {
    const inputPath = path.join(publicDir, target.file)
    const outputPath = inputPath.replace(/\.[^.]+$/, '.webp')

    try {
      await fs.access(inputPath)
    } catch (error) {
      console.warn(`Skipping missing file: ${target.file}`)
      continue
    }

    try {
      const info = await convertToWebP(inputPath, outputPath, target.width)

      console.log(
        `${target.file} -> ${path.basename(outputPath)} (${Math.round(info.size / 1024)} kB, ${info.width}x${info.height})`
      )
    } catch (error) {
      console.warn(`Failed to optimize ${target.file}: ${error.message}`)
    }
  }
}

optimize().catch((error) => {
  console.error('Image optimization failed:', error)
  process.exitCode = 1
})
