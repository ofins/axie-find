import { useEffect, useState } from "react";
import { formatDateTime, displayCurrentTime } from "@/util/formatDateTime";
import { formatMoney } from "@/util/formatMoney";
import { MoneyConfig } from "@/util/formatMoney";
import Loading from "../../components/Loading";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { StyledTableRow } from "@/styles/material/table";
import AppTitle from "@/components/AppTitle";
import { redirectGenkai } from "@/util/redirect";
import React from "react";
import { useGenkai } from "@/hooks/useMarket";
import AuctionsBidAskChart from "@/components/AuctionsBidAskChart";

const GenkaiAuctions = () => {
  const {
    genkaiLists,
    loading,
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
  }, []);

  const chartData = createGenkaiAuctionsChartData();

  return (
    <div className="h-full w-full">
      <AppTitle title={title} lastUpdated={lastUpdated} />
      <Paper variant="outlined" square={true} sx={{ overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          {loading ? (
            <div className="h-600px flex justify-center items-center">
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
                    {genkai?.order ? (
                      <>
                        <TableCell className="flex items-center justify-center">
                          <img src={genkai?.image} className="h-50px mt-10px" />
                        </TableCell>
                        <TableCell
                          className="fw-700! cursor-pointer hover:underline"
                          onClick={() =>
                            redirectGenkai(
                              genkai?.order.assets[0].address,
                              genkai?.order.assets[0].id
                            )
                          }
                        >
                          {formatMoney(
                            genkai?.order.currentPrice,
                            MoneyConfig.MavisUnit
                          )}
                        </TableCell>
                        <TableCell>
                          {formatDateTime(genkai?.order.startedAt)}
                        </TableCell>
                        <TableCell>
                          {formatMoney(
                            genkai?.offers[0]?.currentPrice,
                            MoneyConfig.MavisUnit
                          )}
                        </TableCell>
                        <TableCell>
                          {formatMoney(
                            genkai?.transferHistory?.results[0]?.withPrice,
                            MoneyConfig.MavisUnit
                          )}
                        </TableCell>
                        <TableCell>
                          {formatDateTime(
                            genkai?.transferHistory?.results[0]?.timestamp
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
          )}
        </TableContainer>
      </Paper>
      <div className="mt-100px">
        <AuctionsBidAskChart data={chartData} width={1000} height={700} />
      </div>
    </div>
  );
};

export default GenkaiAuctions;
