import { useState } from "react";
import { fetchArrivals } from "../backend/fetchArrivals";
import type { ArrivalSummary } from "../backend/fetchArrivals";

function App() {
  const [stopCode, setStopCode] = useState<string>("490008660N");
  const [arrivals, setArrivals] = useState<ArrivalSummary[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchArrivals = async () => {
    setLoading(true);
    const result = await fetchArrivals(stopCode);
    setArrivals(result);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4">
        BusBoard
      </h1>
      <div className="flex flex-col items-center mb-4">
        <label htmlFor="stopCode" className="mb-2">Enter Stop Code:</label>
        <input
          id="stopCode"
          type="text"
          value={stopCode}
          onChange={e => setStopCode(e.target.value)}
          className="border p-2 mb-2 rounded"
        />
        <button onClick={handleFetchArrivals} className="bg-cyan-600 text-white px-4 py-2 rounded">
          {loading ? "Loading..." : "Get Arrivals"}
        </button>
      </div>
      <div className="flex justify-center">
        {arrivals.length > 0 ? (
          <table className="table-auto border-collapse border border-gray-400">
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
                  <td className="border px-4 py-2">{bus.minutesToArrival}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No arrivals found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
