'use client'

import imageLoader from '@/lib/imageLoader'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

const ImageComponent = ({
  alt = '',
  src,
  ...props
}: ImageProps) => {
  const [hasError, setHasError] = useState(false)

  const className =
    typeof props.className === 'string'
      ? props.className
      : ''

  if (hasError || !src || src === '') {
    return (
      <div
        role="img"
        aria-label={alt}
        className={className}
        style={{
          width: props.width ?? '100%',
          height: props.height ?? '100%',
          background: 'var(--cream-dark)',
          ...(props.fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : {}),
        }}
      />
    )
  }

  if (props.fill) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          alt={alt}
          src={src}
          onError={() => setHasError(true)}
          loader={imageLoader}
          {...props}
        />
      </div>
    )
  }

  return (
    <Image
      alt={alt}
      src={src}
      onError={() => setHasError(true)}
      loader={imageLoader}
      {...props}
    />
  )
}

export default ImageComponent
