import React from 'react'
import styled from 'styled-components'

interface ImageProps {
  src: string
  alt: string
  originalLink?: string
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  position: center;
  overflow: hidden;
`

const StyledImage = styled.img`
  position: center;
  height: 500px;
  max-width:100%
  border-radius: 32px 32px 0 0;
  margin:auto;
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
