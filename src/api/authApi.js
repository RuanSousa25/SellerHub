export const exchangeToken = async (api, code) => {
  return api.post("/auth/exchange", {
    code,
  });
};
export const validityToken = async (api, token) => {
  return api.post(`/auth/check/${token}`);
};
