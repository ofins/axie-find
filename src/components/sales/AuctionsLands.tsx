import Table from "react-bootstrap/Table";
import { getAxieMarketPlace } from "../../api/axieMarketPlace";
import { useEffect, useState } from "react";
import getAuctionsLands from "../../api/query/getAuctionsLands";

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

  const fetchData = async (size: string, landType: string) => {
    try {
      const response = await getAxieMarketPlace(
        getAuctionsLands(size, landType)
      );
      const data = response.data.data.lands.results;
      setLandLists(data);
      console.log(data);
      return data;
    } catch (error) {
      console.error(`Error fetching market data`, error);
    }
  };

  useEffect(() => {
    fetchData("100", "Savannah");

    const intervalId = setInterval(() => {
      fetchData("100", "Savannah");
      const time = new Date();
      setLastUpdated(time.toLocaleString("en-US", timeFormat));
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const landTypes = ["Savannah"];

  return (
    <div className="h-full">
      <div className="py-24px bg-dark">
        <h1 className=" text-36px">Live Land Auctions</h1>
        <span>Last updated: {lastUpdated}</span>
        <hr />
      </div>
      <div className="bg-dark text-14px flex justify-center items-start gap-40px <md:flex-col">
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
                    </tr>
                  </thead>
                  <tbody>
                    {landLists.map((land, index) => (
                      <tr key={index} className="whitespace-nowrap">
                        <td>{index + 1}</td>
                        {land.order ? (
                          <>
                            <td>
                              {(
                                land.order?.currentPrice / priceBaseUnit
                              ).toFixed(3)}
                            </td>
                            <td className="c-blue!">
                              {(
                                land.highestOffer?.currentPrice / priceBaseUnit
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
