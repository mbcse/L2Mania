
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  FormGroup,
  Form,
  InputGroup,
  InputGroupAddon,
  DropdownMenu,
  InputGroupText,
  Col,
  Input,
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
  Button,
  Modal,
  ModalBody, 
  ModalFooter, ModalHeader
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from 'axios';
import config from "../../config";

import { useAccount , useSigner} from "wagmi";
import { depositERC20, withdrawERC20, setup} from '../../../../l2maniaSdk/src/services/l2Services/optimisim'
import { bridgeToZkEvm, withdrawFromZkEvm} from '../../../../l2maniaSdk/src/services/l2Services/polygon-zkevm'

const L2Assets = () => {
  const { address, isConnected } = useAccount()
  let [l2AssetData, updateL2AssetData] = useState([])
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const assetData = []

  const getChainData = async (chainId, userAddress) => {
    const chainData = await axios.post(`${config.BACKEND_URL}/data/token`, {chainId, userAddress});
    return chainData.data.data
  }

  const { data: signer, isError, isLoading } = useSigner()
  const [fromChain, setFromChain] = useState("")
  const [toChain, setToChain] = useState("")
  const [tokenAddress, setTokenAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [bridgeAmount, setBridgeAmount] = useState(0)
  const onBridgeAsset = async () => {
    await setup(signer)
    if(fromChain === 'polygon_zkevm' && toChain === 'optimism'){
      withdrawFromZkEvm(address, tokenAddress, amount) //withdraw from zkevm to eth
      depositERC20(tokenAddress) // transfer to optimisim by deposting eth
    }
    toggle()
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
          <div className="col mt-5">
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

                            <Button className="btn-danger" onClick={(e)=>{
                              e.preventDefault()
                              setTokenAddress(asset.contract_address)
                              setFromChain(chainData.chain_name)
                              toggle()
                            }}>Withdraw/Transfer</Button>
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
        <div className="col mt-5">
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

                            <Button className="btn-danger" onClick={toggle}>Withdraw/Transfer</Button>
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
      <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                  Bridge/Transfer Asset
                </ModalHeader>
                <ModalBody>
                <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
              <h1 className="text-center">Transfer Asset</h1>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Enter Details</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-dollar-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Amount" type="text" onChange={setBridgeAmount(e.target.value)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                    <Input type="select" name="select" id="exampleSelect" >
                    <option onClick={setToChain("Optimism")}
                    >Optimism</option>
                    <option onClick={setToChain("ethereum")}>Ethereum</option>
                    <option onClick={setToChain("ZkSync Era")}>ZkSync Era</option>
                    <option onClick={setToChain("taiko")}>Taiko</option>
                    <option onClick={setToChain("polygon_zkevm")}>Polygon ZkEvm</option>
                    <option onClick={setToChain("gnosis")}>Gnosis</option>
                    <option onClick={setToChain("mantle")}>Mantle</option>
                    <option onClick={setToChain("polygon")}>Polygon</option>
                    <option onClick={setToChain("scroll")}>Scroll</option>
                  </Input>
              </FormGroup>
              {/* <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup> */}
             
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button"  onClick={onBridgeAsset}>
                  Transfer
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
    </>
  );
};

export default L2Assets;
