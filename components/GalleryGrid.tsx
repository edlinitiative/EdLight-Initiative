import React from 'react'
import Image from 'next/image'

interface GalleryImage {
  src: string
  alt: string
}

interface GalleryGridProps {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
}

export default function GalleryGrid({ images, columns = 3 }: GalleryGridProps) {
  const colClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }

  return (
    <div className={`grid ${colClasses[columns]} gap-4`}>
      {images.map((image, index) => (
        <div key={index} className="relative aspect-square overflow-hidden rounded-lg group">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  )
}
