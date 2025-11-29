import { useState, useEffect } from "react";
import axios from "axios";

function StockNews({ symbol }) {
  const [newsList, setnews] = useState([]);

  useEffect(()=>{
    async function fetch_stk_news() {
      const {data} = await axios.get(`http://127.0.0.1:8000/news/${symbol}`);
      setnews(data);
    }
    fetch_stk_news();
  }, [])

  if (!newsList || newsList.length === 0) return null;

  return (
  <div
    className="p-3 mb-4 bg-light rounded"
    style={{
      height: "100%",      
      maxHeight: "100%",
      overflowY: "auto",
      overflowX: "hidden"
    }}
  >
    <h5 className="mb-2">Latest News</h5>

    {newsList?.map((item, idx) => (
      <div key={idx} className="mb-3">
        <strong>{item.title}</strong>
        <p className="mb-0 text-muted" style={{ fontSize: "0.9em" }}>
          {item.source} · {item.time}
        </p>
      </div>
    ))}
  </div>
);

}

export default StockNews;