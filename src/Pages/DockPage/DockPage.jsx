import React, { useEffect, useState } from "react";
import "./DockPage.css";
import { useAuth } from "../../Context/AuthContext";
import { useSellersApi } from "../../Hooks/useSellersApi";
import MultiSelect from "../../Components/MultiSelect/MultiSelect";
import Logs from "../../Components/Logs/logs";
import useLogisticsApi from "../../Hooks/useLogisticsApi";

export default function DockPage() {
  const { appKey, appToken, setAuth } = useAuth();
  const { getSellersList } = useSellersApi();
  const { saveDockBatch } = useLogisticsApi();
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  useEffect(() => {
    if (appToken === null || appKey === null) return;
    setLoading(true);
    getSellersList()
      .then((resp) => {
        const sllrs = resp.data.map((s) => ({
          value: s.sellerId,
          label: s.name,
        }));
        setSellers(sllrs);
        setLoading(false);
      })
      .catch(() => {
        console.error;
        setLoading(false);
      });
  }, [appKey, appToken]);
  function handleCreateDocksSubmit() {
    if (selectedSellers.length === 0)
      alert("Selecione ao menos um campo e um seller.");
    setLoading(true);
    console.log("loading true");
    saveDockBatch(selectedSellers.map((sel) => sel.value))
      .then((resp) => {
        setLoading(false);
        setLogs(resp.data);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }
  function handleSellersSelect(ids) {
    setSelectedSellers(ids);
  }
  function toggleLogs() {
    setShowLogs((prevState) => !prevState);
  }
  return (
    <div className="dock-component">
      <h1>Logística</h1>
      <MultiSelect
        placeholder={loading ? "Carregando..." : "Selecione"}
        options={sellers}
        value={selectedSellers}
        onChange={handleSellersSelect}
        isDisabled={sellers.length === 0}
      />
      <section>
        <span>
          Criar Docas <button onClick={handleCreateDocksSubmit}>Criar</button>
        </span>
      </section>
      <div>
        <button onClick={toggleLogs} disabled={logs.length === 0}>
          Logs
        </button>
      </div>
      <div className="app-token-key">
        <div className="appKey input-div-app">
          <label>AppKey</label>
          <input
            type="text"
            value={appKey || ""}
            onChange={(e) => {
              setAuth({ appToken: appToken, appKey: e.target.value });
            }}
          />
        </div>
        <div className="appToken input-div-app">
          <label>AppToken</label>
          <input
            type="text"
            value={appToken || ""}
            onChange={(e) => {
              setAuth({ appKey: appKey, appToken: e.target.value });
            }}
          />
        </div>
      </div>
      <Logs show={showLogs} logs={logs} />
    </div>
  );
}
