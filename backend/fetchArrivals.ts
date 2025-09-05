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