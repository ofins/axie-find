export const getMavisMarketPlace = async (query: string) => {
    try {
      const response = await fetch(
        "https://axie-find-server.onrender.com/mavis-marketplace",
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
  