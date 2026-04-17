import type { StaticImageData } from 'next/image'
import { env } from './env'

export function resolveImageSrc(
  img: string | StaticImageData | { src: string } | undefined | null
): string {
  if (!img) return ''
  if (typeof img === 'string') return img
  if (typeof img === 'object' && 'src' in img) return (img as { src: string }).src
  return ''
}

export function getImageUrl(src: string, options?: { width?: number; quality?: number }): string {
  if (!src) return src

  try {
    const q = options?.quality ?? 70
    const baseUrl = env.NEXT_PUBLIC_IMAGE_BASE_URL

    if (!baseUrl) {
      return src
    }

    // Remove existing query params from the source URL
    let cleanSrc = src.replace(/\?.*$/, '')

    // If already includes the base URL, just append transformations
    if (cleanSrc.startsWith(baseUrl)) {
      const params = options?.width
        ? `w-${options.width},f-webp,q-${q}`
        : `f-webp,q-${q}`
      return `${cleanSrc}?tr=${params}`
    }

    const params = options?.width
      ? `w-${options.width},f-webp,q-${q}`
      : `f-webp,q-${q}`

    // External absolute URLs: proxy through CDN using the /tr: path pattern
    if (cleanSrc.startsWith('http://') || cleanSrc.startsWith('https://')) {
      return `${baseUrl}/tr:${params}/${cleanSrc}`
    }

    // Relative/internal paths: strip any accidental protocol and prepend baseUrl
    cleanSrc = cleanSrc.replace(/^https?:\/\//, '')
    return `${baseUrl}${cleanSrc}?tr=${params}`
  } catch {
    return src || ''
  }
}

const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return getImageUrl(src, { width, quality: quality ?? 75 })
}

export default imageLoader
