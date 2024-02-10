import React, { useState, useEffect } from "react";
import { useItem } from "@/hooks/useMarket";
import { displayCurrentTime, formatDateTime } from "@/util/formatDateTime";
import LoadErrorTemplate from "@/views/components/LoadErrorTemplate";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  Paper,
} from "@mui/material";
import { StyledTableRow } from "@/styles/material/table";
import { MoneyConfig, formatMoney } from "@/util/formatMoney";

const ItemSales = () => {
  const [lastUpdated, setLastUpdated] = useState<string>(displayCurrentTime());

  const {
    itemLists,
    updateFrequency,
    loading,
    errorMessage,
    fetchItemSalesData,
  } = useItem();

  const title = "Recent Items Sold (coco)";

  useEffect(() => {
    fetchItemSalesData();

    const intervalId = setInterval(() => {
      fetchItemSalesData();

      setLastUpdated(displayCurrentTime());
    }, updateFrequency);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(itemLists);
  return (
    <LoadErrorTemplate
      lastUpdated={lastUpdated}
      title={title}
      loading={loading}
      errorMessage={errorMessage}
    >
      <Paper
        variant="outlined"
        square={true}
        sx={{ width: "50%", height: 900, overflow: "scroll" }}
      >
        <TableContainer>
          <Table
            stickyHeader
            aria-label="sticky table"
            size="small"
            className="whitespace-nowrap"
          >
            <TableHead>
              <StyledTableRow>
                <TableCell>#</TableCell>
                <TableCell>Date Time</TableCell>
                <TableCell>Settled Price</TableCell>
                <TableCell>Settled Qty</TableCell>
                <TableCell>Details</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {itemLists.map((item, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {formatDateTime(item.transferHistory.results[0].timestamp)}
                  </TableCell>
                  <TableCell>
                    {formatMoney(
                      item.transferHistory.results[0].withPrice,
                      MoneyConfig.SmallNum
                    )}
                  </TableCell>
                  <TableCell>
                    {item.transferHistory.results[0].settleQuantity}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-between">
                      <span className="w-100px text-ellipsis whitespace-nowrap overflow-x-hidden">
                        {item.transferHistory.results[0].fromProfile.name}
                      </span>
                      <span className="w-fit">➡️</span>
                      <span className="w-100px text-ellipsis whitespace-nowrap overflow-x-hidden">
                        {item.transferHistory.results[0].toProfile.name}
                      </span>
                    </div>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </LoadErrorTemplate>
  );
};

export default ItemSales;
