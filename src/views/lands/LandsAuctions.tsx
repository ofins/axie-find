import { useEffect, useState } from "react";
import { redirectMarketLand } from "@/util/redirect";
import { formatDateTime, displayCurrentTime } from "@/util/formatDateTime";
import { formatMoney } from "@/util/formatMoney";
import { MoneyConfig } from "@/util/formatMoney";
import { StyledTableRow } from "@/styles/material/table";
import { useLand } from "@/hooks/useMarket";
import React from "react";
import AuctionsBidAskChart from "@/components/AuctionsBidAskChart";
import LoadErrorTemplate from "@/views/components/LoadErrorTemplate";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  Paper,
} from "@mui/material";

function LandsAuctions() {
  const [lastUpdated, setLastUpdated] = useState(displayCurrentTime());
  const title = "Live Land Auctions";

  const {
    landTypes,
    landIcons,
    loading,
    errorMessage,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoadErrorTemplate
      lastUpdated={lastUpdated}
      title={title}
      loading={loading}
      errorMessage={errorMessage}
    >
      <div className="grid grid-cols-2 px-36px pb-48px items-start flex-wrap gap-40px <lg:grid-cols-1 <lg:px-8px">
        {landTypes.map((type, index) => {
          return (
            <div key={index}>
              <h2 className="text-24px text-start">
                {type} {landIcons[index]}
              </h2>
              <AuctionsBidAskChart data={createLandAuctionsChartData()[type]} />
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
                        {landLists[type].map((land, index) => (
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
                                    land.order.currentPrice,
                                    MoneyConfig.MarketUnit,
                                  )}
                                </TableCell>
                                <TableCell>
                                  {formatDateTime(land.order.startedAt)}
                                </TableCell>
                                <TableCell
                                  className={`max-w-120px overflow-x-hidden
                                    `}
                                >
                                  {land.ownerProfile.name}
                                </TableCell>
                                <TableCell>
                                  {formatMoney(
                                    land.highestOffer?.currentPrice,
                                    MoneyConfig.MarketUnit,
                                  )}
                                </TableCell>
                                <TableCell>
                                  {formatMoney(
                                    land.transferHistory.results[0]?.withPrice,
                                    MoneyConfig.MarketUnit,
                                  )}
                                </TableCell>
                                <TableCell>
                                  {formatDateTime(
                                    land.transferHistory.results[0]?.timestamp,
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
                  </TableContainer>
                </Paper>
              </div>
            </div>
          );
        })}
      </div>
    </LoadErrorTemplate>
  );
}

export default LandsAuctions;
