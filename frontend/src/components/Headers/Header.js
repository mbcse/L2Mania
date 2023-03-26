

// reactstrap components
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import axios from "axios";
import config from "config";

const Header = () => {

  const [chainData, setChainData] = useState([])

  const getAllChainData = async () => {
    const chainData = await axios.get(`${config.BACKEND_URL}/data/chain/all`);
    console.log(chainData)
    setChainData(chainData.data.data)
  }
  useEffect(()=>{
    getAllChainData()
  },[])

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}

          <Row className="m-1">
            {
              chainData.map((chain, index) => {
                if(index <3)
                return (<Col lg="6" xl="4">
                          <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-red text-bold mb-0"
                                  >
                                    {chain.name}
                                  </CardTitle>
                                  <span className="h4 font-weight-bold mb-0">
                                    Mainnet Gasprice: {chain.gasFee.mainnet? `${((chain.gasFee.mainnet/(10**9)).toFixed(4))} gwei` : 'Not Available'} 
                                    <br/>
                                    Testnet Gasprice: {chain.gasFee.testnet? `${((chain.gasFee.testnet/(10**9)).toFixed(4))} gwei` : 'Not Available'} gwei
                                  </span>
                                </div>
                                <Col className="col-auto text-bold">
                                    {chain.chainType}
                                </Col>
                              </Row>
                              {/* <p className="mt-3 mb-0 text-muted text-sm">
                                <span className="text-success mr-2">
                                  <i className="fa fa-arrow-up" /> 3.48%
                                </span>{" "}
                                <span className="text-nowrap">Since last month</span>
                              </p> */}
                            </CardBody>
                          </Card>
                        </Col>
                )      
              })
            }
          </Row>

          <Row className="">
          {
              chainData.map((chain, index) => {
                if(index > 2)
                return (<Col lg="6" xl="4" className="mb-1 mt-1">
                          <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-green text-bold mb-0"
                                  >
                                    {chain.name}
                                  </CardTitle>
                                  <span className="h4 font-weight-bold mb-0">
                                    Mainnet Gasprice: {chain.gasFee.mainnet? `${((chain.gasFee.mainnet/(10**9)).toFixed(4))} gwei` : 'Not Available'} 
                                    <br/>
                                    Testnet Gasprice: {chain.gasFee.testnet? `${((chain.gasFee.testnet/(10**9)).toFixed(4))} gwei` : 'Not Available'} gwei
                                  </span>
                                </div>
                                <Col className="col-auto">
                                    {chain.chainType}
                                </Col>
                              </Row>
                              <p className="mt-3 mb-0 text-muted text-sm">
                                <h4 className="text-blue text-bold">
                                  Rollup Type: {chain.l2Type}
                                </h4>{" "}
                              </p>
                            </CardBody>
                          </Card>
                        </Col>
                )      
              })
            }
          </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
