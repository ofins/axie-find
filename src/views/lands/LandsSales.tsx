import { useEffect, useState } from "react";
import { redirectMarketLand } from "@/util/redirect";
import { formatDateTime, displayCurrentTime } from "@/util/formatDateTime";
import { formatMoney } from "@/util/formatMoney";
import { MoneyConfig } from "@/util/formatMoney";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { AXIE_WHALES_MP } from "@/settings";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTableRow } from "@/styles/material/table";
import AppTitle from "@/components/AppTitle";
import { useLand } from "@/hooks/useMarket";
import React from "react";
import ScatterChartCustom from "../../components/ScatterChartCustom";

function LandsSales() {
  const {
    landTypes,
    landIcons,
    loading,
    errorMessage,
    landLists,
    updateFrequency,
    fetchAllLandsData,
    createLandSalesChartData,
  } = useLand();

  const [lastUpdated, setLastUpdated] = useState<string>(displayCurrentTime());
  const title = "Recent Land Sales";

  useEffect(() => {
    fetchAllLandsData("sales");

    const intervalId = setInterval(() => {
      fetchAllLandsData("sales");

      setLastUpdated(displayCurrentTime());
    }, updateFrequency);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-100vh">
      <AppTitle title={title} lastUpdated={lastUpdated} />
      {loading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Loading />
        </div>
      ) : errorMessage ? (
        <div className="h-full w-full flex justify-center items-center">
          <Error error={errorMessage} />
        </div>
      ) : (
        <>
          <div className="text-14px grid grid-cols-3 items-center gap-10px <lg:grid-cols-1">
            {landTypes.map((landType, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-center items-start <lg:items-center gap-10px"
                >
                  <h2 className="text-24px">
                    {landType} {landIcons[index]}
                  </h2>
                  <ScatterChartCustom
                    data={createLandSalesChartData()[landType]}
                  />
                  <Paper
                    variant="outlined"
                    square={true}
                    sx={{ width: "100%", height: 350, overflow: "hidden" }}
                  >
                    <TableContainer sx={{ maxHeight: 350 }}>
                      <Table
                        stickyHeader
                        aria-label="sticky table"
                        size="small"
                        className="whitespace-nowrap"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Sold</TableCell>
                            <TableCell>Details</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {landLists[landType].map((land, index) => (
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
                                      MoneyConfig.MarketUnit
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
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default LandsSales;
