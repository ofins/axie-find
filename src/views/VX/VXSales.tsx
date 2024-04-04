import { useEffect, useState } from "react";
import { formatDateTime, displayCurrentTime } from "@/util/formatDateTime";
import { formatMoney } from "@/util/formatMoney";
import { MoneyConfig } from "@/util/formatMoney";
import { StyledTableRow } from "@/styles/material/table";
import { redirectRoninTx } from "@/util/redirect";
import React from "react";
import { useMavisMarket } from "@/hooks/useMarket";
import ScatterChartCustom from "@/components/ScatterChartCustom";
import LoadErrorTemplate from "@/views/components/LoadErrorTemplate";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  Paper,
} from "@mui/material";

function VXSales() {
  const [lastUpdated, setLastUpdated] = useState(displayCurrentTime());
  const title = "Recent CyberKongz VX Sales";
  const dataType = "cyberKongzVXSalesQuery";

  const {
    itemLists,
    loading,
    errorMessage,
    updateFrequency,
    createMavisItemsSalesChartData,
    fetchMavisItemMarketData,
  } = useMavisMarket();

  useEffect(() => {
    fetchMavisItemMarketData(dataType);

    const intervalId = setInterval(() => {
      fetchMavisItemMarketData(dataType);
      setLastUpdated(displayCurrentTime());
    }, updateFrequency);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <LoadErrorTemplate
      lastUpdated={lastUpdated}
      title={title}
      loading={loading}
      errorMessage={errorMessage}
    >
      <div className="flex items-center justify-center px-36px pb-48px flex-wrap gap-40px <lg:grid-cols-1 <lg:px-8px">
        <Paper
          variant="outlined"
          square={true}
          sx={{ width: 600, overflow: "hidden" }}
        >
          <TableContainer sx={{ maxHeight: 600, maxWidth: 600 }}>
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
                {itemLists.map((vx, index) => (
                  <StyledTableRow key={index} className="whitespace-nowrap">
                    <TableCell>{index + 1}</TableCell>
                    <>
                      <TableCell>{formatDateTime(vx.timestamp)}</TableCell>
                      <TableCell
                        onClick={() => redirectRoninTx(vx.txHash)}
                        className="cursor-pointer hover:underline fw-700!"
                      >
                        {formatMoney(vx.realPrice, MoneyConfig.MarketUnit)}
                      </TableCell>
                    </>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <ScatterChartCustom
          width={600}
          height={400}
          data={createMavisItemsSalesChartData(itemLists)}
        />
      </div>
    </LoadErrorTemplate>
  );
}

export default VXSales;
