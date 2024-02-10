import { useEffect, useState } from "react";
import { formatDateTime, displayCurrentTime } from "@/util/formatDateTime";
import { formatMoney } from "@/util/formatMoney";
import { MoneyConfig } from "@/util/formatMoney";
import { StyledTableRow } from "@/styles/material/table";
import { redirectGenkai } from "@/util/redirect";
import React from "react";
import { useGenkai } from "@/hooks/useMarket";
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

const GenkaiAuctions = () => {
  const {
    genkaiLists,
    loading,
    errorMessage,
    updateFrequency,
    fetchGenkaiMarketData,
    createGenkaiAuctionsChartData,
  } = useGenkai();

  const [lastUpdated, setLastUpdated] = useState(displayCurrentTime());

  const title = "Genkai Auctions Listed";
  const dataType = "genkaiAuctionsQuery";

  useEffect(() => {
    fetchGenkaiMarketData(dataType);

    const intervalId = setInterval(() => {
      fetchGenkaiMarketData(dataType);

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
      <div className="mt-16px flex items-center <lg:flex-wrap">
        <Paper variant="outlined" square={true} sx={{ overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table
              stickyHeader
              aria-label="sticky table"
              size="small"
              className="whitespace-nowrap"
            >
              <TableHead>
                <StyledTableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="left">Img</TableCell>
                  <TableCell align="left">Listed Price</TableCell>
                  <TableCell align="left">Listed Time</TableCell>
                  <TableCell align="left">Highest Offer</TableCell>
                  <TableCell align="left">Owner Buy Price</TableCell>
                  <TableCell align="left">Bought Date</TableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {genkaiLists?.map((genkai, index) => (
                  <StyledTableRow key={index} className="whitespace-nowrap">
                    <TableCell>{index + 1}</TableCell>
                    {genkai.order ? (
                      <>
                        <TableCell className="flex items-center justify-center ">
                          <img src={genkai.image} className="h-50px mt-10px " />
                        </TableCell>
                        <TableCell
                          className="fw-700! cursor-pointer hover:underline"
                          onClick={() =>
                            redirectGenkai(
                              genkai.order.assets[0].address,
                              genkai.order.assets[0].id
                            )
                          }
                        >
                          {formatMoney(
                            genkai?.order.currentPrice,
                            MoneyConfig.MarketUnit
                          )}
                        </TableCell>
                        <TableCell>
                          {formatDateTime(genkai.order.startedAt)}
                        </TableCell>
                        <TableCell>
                          {formatMoney(
                            genkai.offers[0]?.currentPrice,
                            MoneyConfig.MarketUnit
                          )}
                        </TableCell>
                        <TableCell>
                          {formatMoney(
                            genkai.transferHistory.results[0]?.withPrice,
                            MoneyConfig.MarketUnit
                          )}
                        </TableCell>
                        <TableCell>
                          {formatDateTime(
                            genkai?.transferHistory.results[0]?.timestamp
                          )}
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>N/A</TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell>N/A</TableCell>
                      </>
                    )}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <AuctionsBidAskChart
          data={createGenkaiAuctionsChartData()}
          width={600}
          height={400}
        />
      </div>
    </LoadErrorTemplate>
  );
};

export default GenkaiAuctions;
