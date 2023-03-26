
import { useContext, useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import { searchContext } from "layouts/Admin";
import axios from "axios";
import config from "config";
import { BigNumber } from "ethers";

const TransactionBar = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const txHash = useContext(searchContext);
  console.log(txHash)
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };

  const [transactionData, setTransactionData] = useState("Searching....")

  const getTxDetailsData = async (txHash) => {
    console.log()
    const txDetails = await axios.post(`${config.BACKEND_URL}/data/transaction/search`, {txHash:txHash?.trim()});
    setTransactionData(txDetails.data.data)
    console.log(transactionData)
    return txDetails.data.data
  }

  useEffect(()=>{
    getTxDetailsData(txHash)
  },[txHash])
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {transactionData?(
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="align-center">
              <h1 className="text-center text-blue">Transaction Details({txHash})</h1> 
              <h2 className="text-center text-blue">Chain: {transactionData.chainName}</h2>
              <h2 className="text-center text-blue">Chain Type: {transactionData.chainType}</h2>
              {transactionData.l2Type? (<h3 className="text-center text-blue">L2 Type: {transactionData.l2Type}</h3>) : ("")}
          
              <h1 className="text-center text-green">Transaction Status: {transactionData.status}</h1> 

              <Row>
                    <Col className="xl-6 bg-red" >
                      <h1 className="text-center text-white">L1 Details</h1> 
                      <Card className="align-center text-center">
                        <h4>From: {transactionData?.l2Data && transactionData?.l2Data.from}</h4>
                        <h4>To: {transactionData?.l2Data && transactionData?.l2Data?.to}</h4>
                        <h4>Transaction Index: {transactionData?.l2Data && transactionData?.l2Data?.transactionIndex}</h4>
                        <h4>Gas Used: {transactionData?.l2Data && BigNumber.from(transactionData.l2Data.gasUsed).toString()}</h4>
                        <h4>Block Hash: {transactionData?.l2Data && transactionData.l2Data.blockHash}</h4>
                        <h4>Block Number: {transactionData?.l2Data && transactionData.l2Data.blockNumber}</h4>
                        <h4>Confirmations: {transactionData?.l2Data && transactionData.l2Data.confirmations}</h4>
                        <h4>CumulativeGasUsed: {transactionData?.l2Data && BigNumber.from(transactionData.l2Data.cumulativeGasUsed).toString()}</h4>
                        <h4>EffectiveGasPrice: {transactionData?.l2Data && BigNumber.from(transactionData.l2Data.effectiveGasPrice).toString()}</h4>
                        <h4>Status: {transactionData?.l2Data && transactionData.l2Data.status}</h4>

                      </Card>
                    </Col>

                    <Col className="xl-6 bg-green" >
                      <h1 className="text-center text-white">L2 Details</h1> 

                      <Card className="align-center text-center">
                      {/* <h4>L1 Gas Price: {transactionData?.l2Data.l1GasPrice && BigNumber.from(transactionData.l2Data.l1GasPrice || 0).toString()}</h4>
                      <h4>L1 Gas Used: {transactionData?.l2Data.l1GasUsed && BigNumber.from(transactionData.l2Data.l1GasUsed || 0).toString()}</h4>
                      <h4>L1 Fee: {transactionData?.l2Data.l1Fees && BigNumber.from(transactionData.l2Data.l1Fee || 0).toString()}</h4> */}
                      <h4>L1 Batch Number: {transactionData.l2Data && transactionData.l2Data.l1BatchNumber}</h4>
                      <h4>L1 Batch Tx Index: {transactionData?.l2Data && transactionData.l2Data.l1BatchTxIndex}</h4>
                      <h4>Eth Commit Hash: {transactionData?.l2l1Data && transactionData.l2l1Data.ethCommitTxHash}</h4>
                      <h4>Eth Execute Hash: {transactionData?.l2l1Data && transactionData.l2l1Data.ethExecuteTxHash}</h4>
                      <h4>Eth Prove Hash: {transactionData?.l2l1Data && transactionData.l2l1Data.ethProveTxHash}</h4>
                      <h4>Fee: {transactionData?.l2l1Data && transactionData.l2l1Data.fee}</h4>
                      <h4>Initiator Address: {transactionData?.l2l1Data && transactionData.l2l1Data.initiatorAddress}</h4>
                      <h4>Is L1 Originated: {transactionData?.l2l1Data && transactionData.l2l1Data.isL1Originated}</h4>
                      <h4>Received At: {transactionData?.l2l1Data && transactionData.l2l1Data.receivedAt}</h4>
                      <h4>Status: {transactionData?.l2l1Data && transactionData.l2l1Data.status}</h4>

                      
                      </Card>
            
                    </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        ):(<h1>Searching...</h1>)
        }
      </Container>
    </>
  );
};

export default TransactionBar;
