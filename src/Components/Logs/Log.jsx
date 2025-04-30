import React from "react";
import "./Log.css";
export default function Log({ log }) {
  return (
    <div className={`log ${log.success ? "success" : "error"}`}>
      <h2 className="log-title">{log.sellerId}</h2>
      <p className="log-message">{log.message}</p>
    </div>
  );
}
