export const getAxieMarketPlace = async (query: string) => {
  try {
    const response = await fetch(
      "https://axie-find-server.onrender.com/axie-marketplace",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};
