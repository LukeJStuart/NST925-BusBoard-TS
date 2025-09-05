import { useState } from "react";
import getLiveArrivals from "../backend/fetchArrivals";

function App() {
  const [arrivalsData, setArrivalsData] = useState<string>("");

  const handleFetchArrivals = async () => {
    try {
      const response = await getLiveArrivals();
      setArrivalsData(JSON.stringify(response, null, 2));
    } catch {
      setArrivalsData("Error fetching arrivals");
    }
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4">
        BusBoard
      </h1>
      <button onClick={handleFetchArrivals}>Get Arrivals</button>
      <div>
        <pre>{arrivalsData}</pre>
      </div>
    </div>
  );
}

export default App;
