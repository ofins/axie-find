import getGenkaiSales from "@/api/query/getGenkaiSales";
import { getMavisMarketPlace } from "@/api/mavisMarketPlace";
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
import { redirectRoninTx } from "@/util/redirect";
import React from "react";
import { useGenkai } from "@/hooks/useMarket";
import ScatterChartCustom from "@/components/ScatterChartCustom";

function GenkaiSales() {
  const [lastUpdated, setLastUpdated] = useState(displayCurrentTime());
  const title = "Recent Genkai Sales";
  const { genkaiLists, chartData, loading, fetchGenkaiSales } = useGenkai();

  useEffect(() => {
    fetchGenkaiSales();

    const intervalId = setInterval(() => {
      setLastUpdated(displayCurrentTime());
    }, 300000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-full w-full">
      <AppTitle title={title} lastUpdated={lastUpdated} />
      <div className="flex items-center justify-center px-36px pb-48px flex-wrap gap-40px <lg:grid-cols-1 <lg:px-8px">
        <Paper
          variant="outlined"
          square={true}
          sx={{ width: 600, overflow: "hidden" }}
        >
          <TableContainer sx={{ maxHeight: 600, maxWidth: 600 }}>
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
                    <TableCell align="left">DateTime</TableCell>
                    <TableCell align="left">Sold</TableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {genkaiLists?.map((genkai, index) => (
                    <StyledTableRow key={index} className="whitespace-nowrap">
                      <TableCell>{index + 1}</TableCell>
                      {genkai.txHash ? (
                        <>
                          <TableCell>
                            {formatDateTime(genkai?.timestamp)}
                          </TableCell>
                          <TableCell
                            onClick={() => redirectRoninTx(genkai?.txHash)}
                            className="cursor-pointer hover:underline fw-700!"
                          >
                            {formatMoney(
                              genkai?.realPrice,
                              MoneyConfig.MavisUnit
                            )}
                          </TableCell>
                        </>
                      ) : (
                        <>
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
        <ScatterChartCustom width={600} height={400} data={chartData} />
      </div>
    </div>
  );
}

export default GenkaiSales;
