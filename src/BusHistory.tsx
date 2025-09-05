export default function BusHistory() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-cyan-700">
        History of London Buses
      </h1>
      <img
        src="https://media.istockphoto.com/id/157193276/photo/red-london-double-decker-bus.jpg?s=612x612&w=0&k=20&c=_svBufJcecRZsTqVbtkQTIdNB_IBbmG1hGvLwhoYRKw="
        alt="London Bus"
        className="mb-4 rounded shadow"
      />
      <p className="mb-4">
        London buses have been an iconic part of the city since the 19th
        century. The first motor buses appeared in 1902, and the famous red
        double-decker Routemaster was introduced in 1956.
      </p>
      <h2 className="text-xl font-semibold mb-2">Origins of TfL</h2>
      <p className="mb-4">
        Transport for London (TfL) was formed in 2000 to manage the city's
        transport network, including buses, trains, and more. TfL oversees over
        9,000 buses and 675 bus routes, serving thousands of stops across
        Greater London.
      </p>
      <h2 className="text-xl font-semibold mb-2">Modern Bus Fleet</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Over 9,000 buses in service</li>
        <li>More than 675 bus routes</li>
        <li>Nearly 19,000 bus stops</li>
        <li>Hybrid and electric buses for cleaner air</li>
        <li>Accessible buses for all passengers</li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">Fun Facts</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>The red double-decker is a global symbol of London</li>
        <li>London buses carry over 2 billion passengers a year</li>
        <li>Night buses run throughout the city for late travelers</li>
      </ul>
      <button
        className="bg-cyan-600 text-white px-4 py-2 rounded"
        onClick={() => (window.location.href = "/")}
      >
        Back to Bus Arrivals
      </button>
    </div>
  );
}
