// import Table from "react-bootstrap/Table";
import { getAxieMarketPlace } from "../../api/axieMarketPlace";
import { useEffect, useState } from "react";
import getAuctionsLands from "../../api/query/getAuctionsLands";
import { redirectMarketLand, redirectProfile } from "../../util/redirect";
import { formatDateTime, displayCurrentTime } from "../../util/formatDateTime";
import { formatMoney } from "../../util/formatMoney";
import { MoneyConfig } from "../../util/formatMoney";
import { customSortArray } from "../../util/sortOrder";
import Loading from "../Loading";
import { AXIE_WHALES_MP, AXIE_PROFILE } from "../../settings";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { StyledTableRow } from "@/styles/table";

function SalesLands() {
  const [landLists, setLandLists] = useState({
    Savannah: [],
    Forest: [],
    Arctic: [],
    Mystic: [],
    Genesis: [],
  });
  const [lastUpdated, setLastUpdated] = useState(displayCurrentTime());
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (size: string, landType: string) => {
    setLoading(true);
    try {
      const response = await getAxieMarketPlace(
        getAuctionsLands(size, landType)
      );
      const data = response.data.data.lands.results;
      setLandLists((prevLandLists) => ({
        ...prevLandLists,
        [landType]: data,
      }));
      return data;
    } catch (error) {
      console.error(`Error fetching market data`, error);
    } finally {
      setLoading(false);
    }
  };

  const landTypes = ["Savannah", "Forest", "Arctic", "Mystic", "Genesis"];

  const fetchAllLandTypes = () => {
    landTypes.forEach((land) => {
      fetchData("100", land);
    });
  };

  // const updateSortLandLists = (landType) => {
  //   console.log('1')
  //   const data = customSortArray(landLists[landType]?.highestOffer.currentPrice);
  //   setLandLists((prevLandList) => ({
  //     ...prevLandList,
  //     [landType]: data,
  //   }));
  // };

  useEffect(() => {
    fetchAllLandTypes();

    const intervalId = setInterval(() => {
      fetchAllLandTypes();

      setLastUpdated(displayCurrentTime());
    }, 60000 * 5);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-full">
      <div className="py-24px bg-bg-asPrimary">
        <h1 className=" text-36px">Live Land Auctions</h1>
        <span>Last updated: {lastUpdated}</span>
        <hr />
      </div>
      <div className="grid grid-cols-2 px-36px pb-48px items-start flex-wrap gap-40px <md:flex-col">
        {landTypes.map((type, index) => {
          return (
            <div key={index}>
              <h2 className="text-24px">{type}</h2>
              <div
                key={index}
                className="text-center h-70vh overflow-y-scroll h-fit max-h-70vh"
              >
                <Paper
                  variant="outlined"
                  square={false}
                  sx={{ width: "100%", overflow: "hidden" }}
                >
                  <TableContainer>
                    <Table stickyHeader size="small" aria-label="sticky table">
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
                                    land.transferHistory.results[0]?.withPrice,
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
                  </TableContainer>
                </Paper>
                {/* <Table
                  striped
                  bordered
                  hover
                  variant="dark"
                  className="border-collapse"
                >
                  {loading ? (
                    <Loading />
                  ) : (
                    <>
                      <thead>
                        <tr className="sticky top--1%">
                          <th>#</th>
                          <th>Listed Price</th>
                          <th>Listed DateTime</th>
                          <th>Seller</th>
                          <th>Highest Offer</th>
                          <th>Owner Buy Price</th>
                          <th>Bought Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {landLists[type].map((land, index) => (
                          <tr key={index} className="whitespace-nowrap">
                            <td>{index + 1}</td>
                            {land.order ? (
                              <>
                                <td
                                  onClick={() =>
                                    redirectMarketLand(land.col, land.row)
                                  }
                                  className="cursor-pointer hover:underline c-text-asInverse-02!"
                                >
                                  {formatMoney(
                                    land.order?.currentPrice,
                                    MoneyConfig.AxieUnit
                                  )}
                                </td>
                                <td>{formatDateTime(land.order?.startedAt)}</td>
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
                                <td>
                                  {formatMoney(
                                    land.highestOffer?.currentPrice,
                                    MoneyConfig.AxieUnit
                                  )}
                                </td>
                                <td>
                                  {formatMoney(
                                    land.transferHistory.results[0]?.withPrice,
                                    MoneyConfig.AxieUnit
                                  )}
                                </td>
                                <td>
                                  {formatDateTime(
                                    land.transferHistory.results[0]?.timestamp
                                  )}
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
