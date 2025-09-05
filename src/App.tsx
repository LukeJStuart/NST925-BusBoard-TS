import { useState } from "react";
import {
  fetchArrivals,
  getCoordinatesFromPostcode,
  getNearestBusStops,
} from "../backend/fetchArrivals";
import type { ArrivalSummary, StopPoint } from "../backend/fetchArrivals";

function App() {
  const [postcode, setPostcode] = useState<string>("NW5 1TL");
  const [arrivals, setArrivals] = useState<
    { stop: StopPoint; arrivals: ArrivalSummary[] }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFetchByPostcode = async () => {
    setLoading(true);
    setError("");
    setArrivals([]);
    try {
      const coords = await getCoordinatesFromPostcode(postcode);
      if (!coords) {
        setError("Invalid postcode or unable to fetch coordinates.");
        setLoading(false);
        return;
      }
      const stops = await getNearestBusStops(
        coords.latitude,
        coords.longitude,
        2
      );
      const arrivalsList = await Promise.all(
        stops.map(async (stop) => ({
          stop,
          arrivals: await fetchArrivals(stop.id),
        }))
      );
      setArrivals(arrivalsList);
    } catch {
      setError("Failed to fetch data. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4">
        BusBoard
      </h1>
      <div className="flex flex-col items-center mb-4">
        <label htmlFor="postcode" className="mb-2">
          Enter Postcode:
        </label>
        <input
          id="postcode"
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="border p-2 mb-2 rounded"
        />
        <button
          onClick={handleFetchByPostcode}
          className="bg-cyan-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Loading..." : "Find Nearest Bus Arrivals"}
        </button>
      </div>
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      <div className="flex flex-col items-center">
        {arrivals.length > 0 ? (
          arrivals.map(({ stop, arrivals }) => (
            <div key={stop.id} className="mb-8 w-full max-w-xl">
              <h2 className="text-xl font-semibold mb-2 text-cyan-700">
                {stop.commonName}
              </h2>
              {arrivals.length > 0 ? (
                <table className="table-auto border-collapse border border-gray-400 w-full">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Route</th>
                      <th className="border px-4 py-2">Destination</th>
                      <th className="border px-4 py-2">Arrives In (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrivals.map((bus, idx) => (
                      <tr key={idx}>
                        <td className="border px-4 py-2">{bus.route}</td>
                        <td className="border px-4 py-2">{bus.destination}</td>
                        <td className="border px-4 py-2">
                          {bus.minutesToArrival}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No arrivals found for this stop.</p>
              )}
            </div>
          ))
        ) : (
          <p>No bus stops or arrivals found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
