import Table from "react-bootstrap/Table";
import { getAxieMarketPlace } from "../../api/axieMarketPlace";
import { useEffect, useState } from "react";
import getAuctionsLands from "../../api/query/getAuctionsLands";
import { redirectMarketLand } from "../../util/redirect";

function SalesLands() {
  const time = new Date();
  const timeFormat = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  const [landLists, setLandLists] = useState({
    Savannah: [],
    Forest: [],
    Arctic: [],
    Mystic: [],
    Genesis: [],
  });
  const [lastUpdated, setLastUpdated] = useState(
    time.toLocaleDateString("en-US", timeFormat)
  );

  const priceBaseUnit = 1000000000000000000;

  const fetchData = async (size: string, landType: string) => {
    try {
      const response = await getAxieMarketPlace(
        getAuctionsLands(size, landType)
      );
      const data = response.data.data.lands.results;
      setLandLists((prevLandLists) => ({
        ...prevLandLists,
        [landType]: data,
      }));
      console.log(data);
      return data;
    } catch (error) {
      console.error(`Error fetching market data`, error);
    }
  };

  const landTypes = ["Savannah", "Forest", "Arctic", "Mystic", "Genesis"];

  const fetchAllLandTypes = () => {
    landTypes.forEach((land) => {
      fetchData("100", land);
    });
  };

  useEffect(() => {
    fetchAllLandTypes();

    const intervalId = setInterval(() => {
      fetchAllLandTypes();

      const time = new Date();
      setLastUpdated(time.toLocaleString("en-US", timeFormat));
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-full">
      <div className="py-24px bg-bg-asPrimary">
        <h1 className=" text-36px">Live Land Auctions</h1>
        <span>Last updated: {lastUpdated}</span>
        <hr />
      </div>
      <div className="bg-bg-asPrimary text-14px grid grid-cols-3 px-36px items-start flex-wrap gap-40px <md:flex-col">
        {landTypes.map((type, index) => {
          return (
            <div key={index}>
              <h2 className="text-24px">{type}</h2>
              <div
                key={index}
                className="text-center h-70vh overflow-y-scroll h-fit max-h-70vh"
              >
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Listed Price</th>
                      <th>Highest Offer</th>
                      <th>Owner Buy Price</th>
                      <th>Bought Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {landLists[type].map((land, index) => (
                      <tr key={index} className="whitespace-nowrap">
                        <td>{index + 1}</td>
                        {land.order ? (
                          <>
                            <td
                              onClick={() =>
                                redirectMarketLand(land.col, land.row)
                              }
                              className="cursor-pointer hover:underline"
                            >
                              {(
                                land.order?.currentPrice / priceBaseUnit
                              ).toFixed(3)}
                            </td>
                            <td className="c-text-asInverse-02!">
                              {(
                                land.highestOffer?.currentPrice / priceBaseUnit
                              ).toFixed(3)}
                            </td>
                            <td>
                              {(
                                land.transferHistory.results[0]?.withPrice /
                                priceBaseUnit
                              ).toFixed(3)}
                            </td>
                            <td>
                              {new Date(
                                land.transferHistory.results[0]?.timestamp *
                                  1000
                              ).toLocaleString()}
                            </td>
                          </>
                        ) : (
                          <>
                            <td>Not Available</td>
                            <td>Not Available</td>
                            <td>Not Available</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SalesLands;

// https://app.axieinfinity.com/marketplace/lands/-105/-144/
