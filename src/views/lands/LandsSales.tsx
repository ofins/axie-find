import { getAxieMarketPlace } from "@/api/axieMarketPlace";
import { useEffect, useState } from "react";
import getLandsSales from "@/api/query/getLandsSales";
import { redirectMarketLand } from "@/util/redirect";
import { formatDateTime, displayCurrentTime } from "@/util/formatDateTime";
import { formatMoney } from "@/util/formatMoney";
import { MoneyConfig } from "@/util/formatMoney";
import Loading from "../../components/Loading";
import { AXIE_WHALES_MP } from "@/settings";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { StyledTableRow } from "@/styles/material/table";
import AppTitle from "../../components/AppTitle";
import { useMarket } from "@/hooks/useMarket";
import { ScatterChart } from "@mui/x-charts/ScatterChart";

function LandsSales() {
  const [landLists, setLandLists] = useState<[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>(displayCurrentTime());
  const [loading, setLoading] = useState<boolean>(false);
  const title = "Recently Sold Lands";

  const data = [
    { x: 1, y: 0.148, id: 1 },
    { x: 2, y: 0.159, id: 2 },
    { x: 3, y: 0.3, id: 3 },
    { x: 4, y: 0.2, id: 4 },
    { x: 4, y: 0.185, id: 5 },
    { x: 5, y: 0.25, id: 6 },
  ];

  const { landTypes, landIcons } = useMarket();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAxieMarketPlace(getLandsSales(300));
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
    }, 300000);

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

  return (
    <div className="h-full">
      <AppTitle title={title} lastUpdated={lastUpdated} />
      {/* <ScatterChart
        width={500}
        height={300}
        series={[{ data, label: "pv", id: "pvId" }]}
        xAxis={[{ min: 0 }]}
      /> */}
      <div className="text-14px grid grid-cols-3 gap-10px <lg:grid-cols-1">
        {landTypes.map((type, index) => {
          const filteredLand = filterLandLists(type);

          return (
            <div key={index}>
              <h2 className="text-24px">
                {type} {landIcons[index]}
              </h2>
              {/* <div className="text-center h-70vh  h-fit max-h-70vh"> */}
              <Paper
                variant="outlined"
                square={true}
                sx={{ width: "100%", height: 350, overflow: "hidden" }}
              >
                <TableContainer sx={{ maxHeight: 350 }}>
                  {loading ? (
                    <div className="h-350px flex justify-center items-center">
                      <Loading />
                    </div>
                  ) : (
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      size="small"
                      className="whitespace-nowrap"
                    >
                      <TableHead>
                        <TableCell>#</TableCell>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Sold</TableCell>
                        <TableCell>Details</TableCell>
                      </TableHead>
                      <TableBody>
                        {filteredLand.map((land, index) => (
                          <StyledTableRow
                            key={index}
                            className="whitespace-nowrap"
                          >
                            <TableCell>{index + 1}</TableCell>
                            {land.transferHistory.results.length > 0 ? (
                              <>
                                <TableCell>
                                  {formatDateTime(
                                    land.transferHistory.results[0].timestamp
                                  )}
                                </TableCell>
                                <TableCell
                                  className="fw-700! hover:underline cursor-pointer"
                                  onClick={() =>
                                    redirectMarketLand(land.col, land.row)
                                  }
                                >
                                  {formatMoney(
                                    land.transferHistory.results[0].withPrice,
                                    MoneyConfig.AxieUnit
                                  )}
                                </TableCell>
                                <TableCell
                                  className={`${
                                    AXIE_WHALES_MP.some(
                                      (whale) =>
                                        whale.owner ===
                                        land.transferHistory.results[0]
                                          .fromProfile.addresses.ronin
                                    )
                                      ? ""
                                      : ""
                                  }`}
                                >
                                  <div className="flex justify-between">
                                    <span className="w-100px text-ellipsis whitespace-nowrap overflow-x-hidden">
                                      {
                                        land.transferHistory.results[0]
                                          .fromProfile.name
                                      }
                                    </span>
                                    <span className="w-fit">➡️</span>
                                    <span className="w-100px text-ellipsis whitespace-nowrap overflow-x-hidden">
                                      {land.ownerProfile?.name}
                                    </span>
                                  </div>
                                </TableCell>

                                {/* <TableCell>{land.ownerProfile?.name}</TableCell> */}
                              </>
                            ) : (
                              <>
                                <TableCell>Not Available</TableCell>
                                <TableCell>Not Available</TableCell>
                                <TableCell>Not Available</TableCell>
                              </>
                            )}
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TableContainer>
              </Paper>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LandsSales;
