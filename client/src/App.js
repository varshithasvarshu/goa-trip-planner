import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [tripPlan, setTripPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateTripPlan = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/generate-trip");
      const data = response.data;
      setTripPlan(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate trip plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2>🌴 Goa Trip Planner</h2>
      <button
        onClick={generateTripPlan}
        style={{ padding: '10px 20px' }}
        disabled={loading}
      >
        {loading ? 'Planning...' : 'Generate Plan'}
      </button>
      {tripPlan && (
        <div style={{ marginTop: '20px' }}>
          <h3>🗺️ Trip Plan:</h3>
          <pre>{JSON.stringify(tripPlan, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
