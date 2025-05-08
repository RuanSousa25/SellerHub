import React, { useEffect, useState } from "react";
import "./AuthPage.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthApi } from "../../Hooks/useAuthApi";
import { useAuth } from "../../Context/AuthContext";

export default function AuthPage() {
  return <h1>Página inicial</h1>;
}
