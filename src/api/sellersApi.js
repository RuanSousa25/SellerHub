export const getSellersList = async (api) => {
  return api.get("/vtex/sellers");
};
