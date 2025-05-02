export const patchOrderFormBatch = async (api, ids, operations) => {
  console.log(operations);
  return api.patch(
    "/vtex/batch/orderform/configuration",
    {
      ids: ids,
      patch: operations,
    },
    {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    }
  );
};
