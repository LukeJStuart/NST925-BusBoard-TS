import axios from 'axios';

async function getLiveArrivals() {
  const stopId = '490008660N';
  const url = `https://api.tfl.gov.uk/StopPoint/${stopId}/Arrivals`;
  try {
    const response = await axios.get(url);
    console.log(response.data); // This will log the array of arrivals
    return response.data;
  } catch (error) {
    console.error('Error fetching arrivals:', error);
    throw error;
  }
}

export default getLiveArrivals;