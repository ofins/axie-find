import Table from "react-bootstrap/Table";
import { getAxieMarketPlace } from "../../api/axieMarketPlace";
import { useEffect, useState } from "react";
import getSalesLands from "../../api/query/getSalesLands";
import { redirectMarketLand } from "../../util/redirect";
import { formatDateTime, displayCurrentTime } from "../../util/formatDateTime";
import { formatMoney } from "../../util/formatMoney";
import { MoneyConfig } from "../../util/formatMoney";
import Loading from "../Loading";
import { AXIE_WHALES_MP } from "../../settings";

function SalesLands() {
  const [landLists, setLandLists] = useState<[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>(displayCurrentTime());
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAxieMarketPlace(getSalesLands(300));
      setLandLists(data.data.data.settledAuctions.lands.results);
    } catch (error) {
      console.error(`Error fetching market data`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
      setLastUpdated(displayCurrentTime());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const filterLandLists = (type: string) => {
    return landLists.filter((land) => land.landType === type);
  };

  // TODO: check same day to tally sales frequency
  const isSameDay = (dateToCheck: Date) => {
    const today = new Date();

    return (
      dateToCheck.getFullYear() === today.getFullYear() &&
      dateToCheck.getMonth() === today.getMonth() &&
      dateToCheck.getDate() === today.getDate()
    );
  };

  const landTypes = ["Savannah", "Forest", "Arctic", "Mystic", "Genesis"];

  return (
    <div className="h-full">
      <div className="p-2rem bg-bg-asPrimary">
        <h1 className=" text-36px">100 Latest Land Sales</h1>
        <span>Last updated: {lastUpdated}</span>
        <hr />
      </div>
      <div className="bg-bg-asPrimary text-14px flex flex-wrap justify-center items-start justify-start gap-40px <md:flex-col">
        {landTypes.map((type, index) => {
          const filteredLand = filterLandLists(type);

          return (
            <div key={index}>
              <h2 className="text-24px">{type}</h2>
              <div className="text-center h-70vh overflow-y-scroll h-fit max-h-70vh">
                <Table
                  striped
                  bordered
                  hover
                  variant="dark"
                  className="min-w-323px"
                >
                  {loading ? (
                    <Loading />
                  ) : (
                    <>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Timestamp</th>
                          <th>Sold Price (ETH)</th>
                          <th>Seller</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLand.map((land, index) => (
                          <tr key={index} className="whitespace-nowrap">
                            <td>{index + 1}</td>
                            {land.transferHistory.results.length > 0 ? (
                              <>
                                <td>
                                  {formatDateTime(
                                    land.transferHistory.results[0].timestamp
                                  )}
                                </td>
                                <td
                                  className="c-text-asInverse-02! hover:underline cursor-pointer"
                                  onClick={() =>
                                    redirectMarketLand(land.col, land.row)
                                  }
                                >
                                  {formatMoney(
                                    land.transferHistory.results[0].withPrice,
                                    MoneyConfig.AxieUnit
                                  )}
                                </td>
                                <td
                                  className={
                                    AXIE_WHALES_MP.some(
                                      (whale) => whale.owner === land.owner
                                    )
                                      ? "c-primary!"
                                      : ""
                                  }
                                >
                                  {land.ownerProfile?.name}
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
                    </>
                  )}
                </Table>
                {/* <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Transaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{index + 1}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SalesLands;
