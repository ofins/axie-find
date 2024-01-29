import Table from "react-bootstrap/Table";
import { getAxieMarketPlace } from "../../api/axieMarketPlace";
import { useEffect, useState } from "react";
import getSalesLands from "../../api/query/getSalesLands";

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

  const [landLists, setLandLists] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(
    time.toLocaleDateString("en-US", timeFormat)
  );

  const priceBaseUnit = 1000000000000000000;

  const fetchData = async () => {
    try {
      const data = await getAxieMarketPlace(getSalesLands(300));
      setLandLists(data.data.data.settledAuctions.lands.results);
    } catch (error) {
      console.error(`Error fetching market data`, error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
      const time = new Date();
      setLastUpdated(time.toLocaleString("en-US", timeFormat));
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const filterLandLists = (type: string) => {
    return landLists.filter((land) => land.landType === type);
  };

  const landTypes = ["Savannah", "Forest", "Arctic", "Mystic", "Genesis"];

  return (
    <div className="h-full">
      <div className="py-24px bg-bg-asPrimary">
        <h1 className=" text-36px">100 Most Recent Land Transactions</h1>
        <span>Last updated: {lastUpdated}</span>
        <hr />
      </div>
      <div className="bg-bg-asPrimary text-14px flex justify-center items-start gap-40px <md:flex-col">
        {landTypes.map((type, index) => {
          const filteredLand = filterLandLists(type);

          return (
            <div>
              <h2 className="text-24px">{type}</h2>
              <div
                key={index}
                className="text-center h-70vh overflow-y-scroll h-fit max-h-70vh"
              >
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Timestamp</th>
                      <th>Sold Price (ETH)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLand.map((land, index) => (
                      <tr key={index} className="whitespace-nowrap">
                        <td>{index + 1}</td>
                        {land.transferHistory.results.length > 0 ? (
                          <>
                            <td>
                              {new Date(
                                land.transferHistory.results[0].timestamp * 1000
                              ).toLocaleString()}
                            </td>
                            <td className="c-text-asInverse-02!">
                              {(
                                land.transferHistory.results[0].withPrice /
                                priceBaseUnit
                              ).toFixed(3)}
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
