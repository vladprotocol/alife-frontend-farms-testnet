export type DataResponse = {
  name: string
  description: string
  image: string
  rarity: string

  // TODO: Fill in the error type
  error: any
}

/**
 * Get NFT data for a specific tokenURI
 */
const getNftDetailData = async (tokenURI: string): Promise<DataResponse> => {
  try {
    const response = await fetch(tokenURI)
    const data = await response.json()

    return data
  } catch (error) {
    throw new Error(error)
  }
}

export default getNftDetailData
