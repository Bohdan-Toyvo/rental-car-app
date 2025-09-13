const formatAddress = (address) => {
  const parts = address.split(',').map(part => part.trim())
  const lastTwo = parts.slice(-2)
  return lastTwo.join(', ')
}

export default formatAddress