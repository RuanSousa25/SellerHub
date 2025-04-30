import React from "react";
import "./Logs.css";
import Log from "./Log";

export default function Logs({ show = false, logs = [] }) {
  return (
    <div className={`logs ${show ? "active" : ""}`}>
      {logs.map((log) => (
        <Log log={log} />
      ))}
    </div>
  );
}
