import axios from "axios";
import { useState, useEffect } from "react";



function AiInsights({ symbol }) {
  const [insights, setinsights] = useState(null);

  useEffect(()=>{
    async function fetchinsights() {
      const {data} = await axios.get(`http://127.0.0.1:8000/insights/${symbol}`);
      setinsights(data);
      console.log("AI INSIGHTS DATA:", data);
    }
    fetchinsights();

  },
  []);


  if (!insights) return null;

  return (
    <div
      className="p-3 mb-4 bg-light rounded"
        style={{
        height: "100%",          // fill parent column
        maxHeight: "100%",       // avoid overflow
        overflowY: "auto",       // scroll when long
        overflowX: "hidden",
      }}
    >
      <h5 className="mb-2">AI Insights</h5>

      <p className="text-muted">{insights.summary}</p>

      {insights?.map((item, idx) => (
        <div key={idx} className="mb-3">
          <p className="mb-0">{item.ai_insights}</p>
        </div>
      ))}
    </div>
  );
}

export default AiInsights;