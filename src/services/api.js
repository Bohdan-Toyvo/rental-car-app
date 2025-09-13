import axios from 'axios'

const BASE_URL = 'https://car-rental-api.goit.global'

export const getCars = async (filters = {},page = 1, limit = 12) => {
  try {
    const response = await axios.get(`${BASE_URL}/cars`, {
      params: {
        ...filters,
        page,
        limit
      }

    })
    return response.data
  } catch (error) {
    console.error('Error fetching cars:', error)
    throw error
  }
}

export const getCarById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/cars/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching car:', error)
    throw error
  }
}

export const getBrands = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/brands`)
    return response.data 
  } catch (error) {
    console.error('Error fetching brands:', error)
    throw error
  }
}

