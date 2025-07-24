import React, { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [tripPlan, setTripPlan] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setTripPlan(data);
    } catch (err) {
      setError("Failed to get trip plan.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>City Trip Planner</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          placeholder="e.g., I want to go to Delhi for 5 days"
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "400px", padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>
          Get Plan
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {tripPlan && (
        <div style={{ marginTop: "20px" }}>
          <h3>Your Trip Plan:</h3>
          <pre>{JSON.stringify(tripPlan, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
