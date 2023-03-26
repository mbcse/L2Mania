
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from 'axios';
import config from "../../config";

import { useAccount } from "wagmi";

const L2Assets = () => {
  const { address, isConnected } = useAccount()
  let [l2AssetData, updateL2AssetData] = useState([])

  const assetData = []

  const getChainData = async (chainId, userAddress) => {
    const chainData = await axios.post(`${config.BACKEND_URL}/data/token`, {chainId, userAddress});
    return chainData.data.data
  }



  useEffect(() => {
    async function getAllChainData() {
      const chains = config.TOKEN_CHAINS_SUPPORTED
      const data = await Promise.all(chains.map(async (chainId) => {
        const chainData = await getChainData(chainId, address)
        assetData.push(chainData)
        return
      }))
      updateL2AssetData(assetData)
    }
    getAllChainData()
  },[address])


  console.log(l2AssetData)

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        {
          l2AssetData.map((chainData, index) => {
            console.log(index)
            if(index%2 === 0){
              return (
                <Row key={index}>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0 text-danger">Your {chainData.chain_name} ( chainId: {chainData.chain_id}) Assets</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Token Name</th>
                    <th scope="col">Token Symbol</th>
                    <th scope="col">Decimal</th>
                    <th scope="col">Contract Address</th>
                    <th scope="col">balance</th>
                    <th scope="col">Transfer/Withdraw</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    chainData.items.map((asset, i) => {
                      return (
                        <tr>
                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#s"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src={asset.logo_url}
                                />
                              </a>
                              <Media>
                                <span className="mb-0 text-sm">
                                  {asset.contract_name}
                                </span>
                              </Media>
                            </Media>
                          </th>
                          <td>{asset.contract_ticker_symbol}</td>
                          <td>
                            <Badge color="" className="mb-0 text-sm">
                              <i className="bg-warning" />
                              {asset.contract_decimals}
                            </Badge>
                          </td>
                          <td>
                            {asset.contract_address.substring(0,6)}...{asset.contract_address.substring(37,42)}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">{asset.balance/(10**asset.contract_decimals)}</span>
                            </div>
                          </td>
                          <td className="text-right">
                            {/* <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Action
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Another action
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Something else here
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown> */}

                            <Button className="btn-danger">Withdraw/Transfer</Button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
              )
            }else {
              return (
        <Row className="mt-5">
        <div className="col">
          <Card className="bg-default shadow">
            <CardHeader className="bg-transparent border-0">
              <h3 className="text-white mb-0">Your {chainData.chain_name} ( chainId: {chainData.chain_id}) Assets</h3>
            </CardHeader>
            <Table
              className="align-items-center table-dark table-flush"
              responsive
            >
              <thead className="thead-dark">
              <th scope="col">Token Name</th>
                  <th scope="col">Token Symbol</th>
                  <th scope="col">Decimal</th>
                  <th scope="col">Contract Address</th>
                  <th scope="col">balance</th>
                  <th scope="col">Transfer/Withdraw</th>
                  <th scope="col" />
              </thead>
              <tbody>
                  {
                    chainData.items.map((asset, i) => {
                      return (
                        <tr>
                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#s"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src={asset.logo_url}
                                />
                              </a>
                              <Media>
                                <span className="mb-0 text-sm">
                                  {asset.contract_name}
                                </span>
                              </Media>
                            </Media>
                          </th>
                          <td>{asset.contract_ticker_symbol}</td>
                          <td>
                            <Badge color="" className="mb-0 text-sm">
                              <i className="bg-warning" />
                              {asset.contract_decimals}
                            </Badge>
                          </td>
                          <td>
                            {asset.contract_address.substring(0,6)}...{asset.contract_address.substring(37,42)}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">{asset.balance/(10**asset.contract_decimals)}</span>
                            </div>
                          </td>
                          <td className="text-right">
                            {/* <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Action
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Another action
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Something else here
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown> */}

                            <Button className="btn-danger">Withdraw/Transfer</Button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
            </Table>
          </Card>
        </div>
      </Row>
                )

            }
            
          })
        }
        
      
      </Container>
    </>
  );
};

export default L2Assets;
