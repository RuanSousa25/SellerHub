import React, { useContext, useEffect, useState } from "react";
import MultiSelect from "../../Components/MultiSelect/MultiSelect";
import "./OrderFormPage.css";
import axios from "axios";
import Logs from "../../Components/Logs/logs";
import { useAuth } from "../../Context/AuthContext";
import { useOrderFormApi } from "../../Hooks/useOrderFormApi";
import { useSellersApi } from "../../Hooks/useSellersApi";

const OrderFormFields = [
  {
    label: "Casas decimais consideradas: ",
    path: "/decimalDigitsPrecision",
    inputType: "text",
    valueType: "number",
  },
  {
    label: "Valor mínimo total no carrinho (R$): ",
    path: "/minimumValueAccumulated",
    inputType: "text",
    valueType: "number",
  },
  {
    label: "Quantidade mínima de itens no carrinho: ",
    path: "/minimumQuantityAccumulatedForItems",
    inputType: "text",
    valueType: "number",
  },
  {
    label: "Tempo de carência para cancelamento: ",
    path: "/cancellationGracePeriod",
    inputType: "text",
    valueType: "number",
  },
];

export default function OrderFormPage() {
  const { appKey, appToken, setAuth } = useAuth();
  const { getSellersList } = useSellersApi();
  const { patchOrderForm } = useOrderFormApi();
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [fieldValues, setFieldValues] = useState({});
  const [fieldChecks, setFieldChecks] = useState({});
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

  function handleSellersSelect(ids) {
    setSelectedSellers(ids);
  }

  function handleFieldValueChange(path, value) {
    setFieldValues((prev) => ({ ...prev, [path]: value }));
  }

  function handleFieldCheckChange(path, checked) {
    setFieldChecks((prev) => ({ ...prev, [path]: checked }));
  }

  function handleSubmit() {
    const patch = [];
    OrderFormFields.forEach((field) => {
      if (fieldChecks[field.path]) {
        patch.push({
          op: "replace",
          path: field.path,
          value:
            field.valueType === "number"
              ? Number(fieldValues[field.path])
              : fieldValues[field.path],
        });
      }
    });
    if (patch.length === 0 || selectedSellers.length === 0) {
      alert("Selecione ao menos um campo e um seller.");
      return;
    }
    setLoading(true);
    patchOrderForm(
      selectedSellers.map((seller) => seller.value),
      patch
    )
      .then((resp) => {
        setLogs(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  function toggleLogs() {
    setShowLogs((prevState) => !prevState);
  }

  return (
    <div className="order-form-component">
      <h1>Configurações de Pedidos</h1>
      <MultiSelect
        placeholder={loading ? "Carregando..." : "Selecione"}
        options={sellers}
        value={selectedSellers}
        onChange={handleSellersSelect}
        isDisabled={sellers.length === 0}
      />
      <section>
        <div className="input-area ">
          <div className="replace-checkbox-div section-head">
            <label>Alterar valor</label>
          </div>
          <div className="label-div section-head">
            <label>Campo a ser alterado</label>
          </div>
          <div className="input-div section-head">
            <label>Valor</label>
          </div>
        </div>

        {OrderFormFields.map((field) => (
          <div className="input-area" key={field.path}>
            <div className="replace-checkbox-div">
              <input
                type="checkbox"
                onChange={(e) =>
                  handleFieldCheckChange(field.path, e.target.checked)
                }
              />
            </div>
            <div className="label-div">
              <label>{field.label}</label>
            </div>
            <div className="input-div">
              <input
                type={field.inputType}
                disabled={!fieldChecks[field.path]}
                value={fieldValues[field.path] || ""}
                onChange={(e) =>
                  handleFieldValueChange(field.path, e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <div className="submit-buttons">
          <button onClick={handleSubmit} disabled={loading}>
            Enviar
          </button>
          <button onClick={toggleLogs} disabled={logs.length === 0 || loading}>
            Logs
          </button>
        </div>
      </section>
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
