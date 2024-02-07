import { useEffect, useState } from "react";
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
import { useLand } from "@/hooks/useMarket";
import React from "react";
import LandAuctionsBidAskChart from "@/components/LandAuctionsBidAskChart";

function LandsAuctions() {
  const [lastUpdated, setLastUpdated] = useState(displayCurrentTime());
  const title = "Live Land Auctions";
  const {
    landTypes,
    landIcons,
    loading,
    landLists,
    updateFrequency,
    fetchAllLandsData,
    createLandAuctionsChartData,
  } = useLand();

  useEffect(() => {
    fetchAllLandsData("auctions");

    const intervalId = setInterval(() => {
      fetchAllLandsData("auctions");

      setLastUpdated(displayCurrentTime());
    }, updateFrequency);

    return () => clearInterval(intervalId);
  }, []);

  const chartData = createLandAuctionsChartData();

  return (
    <div className="h-full">
      <AppTitle title={title} lastUpdated={lastUpdated} />
      <div className="grid grid-cols-2 px-36px pb-48px items-start flex-wrap gap-40px <lg:grid-cols-1 <lg:px-8px">
        {landTypes.map((type, index) => {
          return (
            <div key={index}>
              <h2 className="text-24px text-start">
                {type} {landIcons[index]}
              </h2>
              <LandAuctionsBidAskChart data={chartData[type]} />
              <div
                key={index}
                className="text-center h-70vh overflow-y-scroll h-fit max-h-70vh"
              >
                <Paper
                  variant="outlined"
                  square={true}
                  sx={{ width: "100%", overflow: "hidden" }}
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
                          <StyledTableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Listed Price</TableCell>
                            <TableCell align="left">Listed DateTime</TableCell>
                            <TableCell align="left">Seller</TableCell>
                            <TableCell align="left">Highest Offer</TableCell>
                            <TableCell align="left">Owner Buy Price</TableCell>
                            <TableCell align="left">Bought Date</TableCell>
                          </StyledTableRow>
                        </TableHead>
                        <TableBody>
                          {landLists[type]?.map((land, index) => (
                            <StyledTableRow
                              key={index}
                              className="whitespace-nowrap"
                            >
                              <TableCell>{index + 1}</TableCell>
                              {land.order ? (
                                <>
                                  <TableCell
                                    onClick={() =>
                                      redirectMarketLand(land.col, land.row)
                                    }
                                    className="cursor-pointer hover:underline fw-700!"
                                  >
                                    {formatMoney(
                                      land.order?.currentPrice,
                                      MoneyConfig.AxieUnit
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {formatDateTime(land.order?.startedAt)}
                                  </TableCell>
                                  {/* Seller */}
                                  <TableCell
                                    className={`max-w-120px overflow-x-hidden
                                    ${
                                      AXIE_WHALES_MP.some(
                                        (whale) => whale.owner === land.owner
                                      )
                                        ? "italic"
                                        : ""
                                    }`}
                                  >
                                    {land.ownerProfile?.name}
                                  </TableCell>
                                  <TableCell>
                                    {formatMoney(
                                      land.highestOffer?.currentPrice,
                                      MoneyConfig.AxieUnit
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {formatMoney(
                                      land.transferHistory.results[0]
                                        ?.withPrice,
                                      MoneyConfig.AxieUnit
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {formatDateTime(
                                      land.transferHistory.results[0]?.timestamp
                                    )}
                                  </TableCell>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LandsAuctions;
