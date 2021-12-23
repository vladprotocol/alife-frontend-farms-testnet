import React from 'react'
import styled from 'styled-components'

interface ImageProps {
  src: string
  alt: string
  originalLink?: string
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: 100%;
  display:flex;
  justify-content:center;
`

const StyledImage = styled.img`
  position: absolute;
  max-width: 100%;
  top: 0;
  left: 0;
  transition: opacity 1s linear;
  max-height: 100%;
  object-fit: cover;
  border-radius: 32px 32px 0 0;
  display:block;
`

const Image: React.FC<ImageProps> = ({ src, alt, originalLink }) => {
  const previewImage = <StyledImage src={src} alt={alt} />

  return (
    <Container>
      {originalLink ? (
        <a href={originalLink} target="_blank" rel="noreferrer noopener">
          {previewImage}
        </a>
      ) : (
        previewImage
      )}
    </Container>
  )
}

export default Image
