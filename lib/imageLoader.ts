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

  if (src.endsWith('.svg')) return src

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

    // External absolute URLs that the CDN can't proxy — return with original params
    if (cleanSrc.startsWith('http://') || cleanSrc.startsWith('https://')) {
      try {
        const url = new URL(cleanSrc)
        // Only proxy through CDN if the host is on the same CDN domain
        if (baseUrl && url.hostname.endsWith('hivedeck.com')) {
          return `${baseUrl.replace(/\/+$/, '')}/tr:${params}/${cleanSrc}`
        }
      } catch {
        // Invalid URL — fall through
      }
      // For external URLs (e.g. Unsplash), use native params
      const sep = src.includes('?') ? '&' : '?'
      return options?.width ? `${src}${sep}w=${options.width}&q=${q}` : src
    }

    // Relative/internal paths: prepend site origin for CDN proxying
    const siteOrigin = env.NEXT_PUBLIC_BASE_URL || ''
    if (siteOrigin) {
      cleanSrc = cleanSrc.startsWith('/') ? cleanSrc : `/${cleanSrc}`
      const trimmedBaseUrl = baseUrl.replace(/\/+$/, '')
      const trimmedSiteOrigin = siteOrigin.replace(/\/+$/, '')
      return `${trimmedBaseUrl}/${trimmedSiteOrigin}${cleanSrc}?tr=${params}`
    } else {
      return src
    }
  } catch {
    return src || ''
  }
}

const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return getImageUrl(src, { width, quality: quality ?? 75 })
}

export default imageLoader
