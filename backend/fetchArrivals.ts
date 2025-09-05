import axios from 'axios';

export type Arrival = {
  id: string;
  lineName: string;
  destinationName: string;
  timeToStation: number; // seconds
};

export type ArrivalSummary = {
  route: string;
  destination: string;
  minutesToArrival: number;
};

export type StopPoint = {
  id: string;
  commonName: string;
};

interface TfLStopPoint {
    id: string;
    commonName: string;
    distance: number;
}

// Get coordinates from postcode
export async function getCoordinatesFromPostcode(postcode: string): Promise<{ latitude: number; longitude: number } | null> {
  try {
    const response = await axios.get(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
    const result = response.data.result;
    return { latitude: result.latitude, longitude: result.longitude };
  } catch {
    return null;
  }
}

// Get nearest bus stops from coordinates
export async function getNearestBusStops(lat: number, lon: number, count = 2): Promise<StopPoint[]> {
  try {
    const url = `https://api.tfl.gov.uk/StopPoint?lat=${lat}&lon=${lon}&stopTypes=NaptanPublicBusCoachTram&radius=500`;
    const response = await axios.get(url);
    const stopPoints = response.data.stopPoints as TfLStopPoint[];
    // Sort by distance and take first 'count'
    return stopPoints
      .sort((a, b) => a.distance - b.distance)
      .slice(0, count)
      .map(sp => ({ id: sp.id, commonName: sp.commonName }));
  } catch {
    return [];
  }
}

export async function fetchArrivals(stopCode: string): Promise<ArrivalSummary[]> {
  const url = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals`;
  try {
    const response = await axios.get(url);
    const arrivals: Arrival[] = response.data;
    // Sort by soonest arrival
    const sorted = arrivals.sort((a, b) => a.timeToStation - b.timeToStation);
    // Map to summary and take first 5
    return sorted.slice(0, 5).map(arrival => ({
      route: arrival.lineName,
      destination: arrival.destinationName,
      minutesToArrival: Math.round(arrival.timeToStation / 60)
    }));
  } catch {
    return [];
  }
}