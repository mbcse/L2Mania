import * as zksync from 'zksync-web3'
import pkg from '@maticnetwork/maticjs'
import * as optimismSdk from '@eth-optimism/sdk'
import * as mantleSDK from '@mantleio/sdk'

import * as ethers from 'ethers'
import Web3 from 'web3'

import chainData from '../config/chainData'
import * as responseUtils from '../utilities/responseUtils'

const ethProvider = new ethers.providers.JsonRpcProvider(chainData[1].rpc_url)
const goerliProvider = new ethers.providers.JsonRpcProvider(chainData[5].rpc_url)
const polygonProvider = new ethers.providers.JsonRpcProvider(chainData[137].rpc_url)
const mumbaiProvider = new ethers.providers.JsonRpcProvider(chainData[80001].rpc_url)
const sepoliaProvider = new ethers.providers.JsonRpcProvider(chainData[11155111].rpc_url)
const gnosisProvider = new ethers.providers.JsonRpcProvider(chainData[100].rpc_url)

const polygonZkevmTestnetProvider = new ethers.providers.JsonRpcProvider(chainData[1442].rpc_url)
const mantleTestnetProvider = mantleSDK.asL2Provider(new ethers.providers.JsonRpcProvider(chainData[5001].rpc_url))
const optimismMainnetProvider = optimismSdk.asL2Provider(new ethers.providers.JsonRpcProvider(chainData[10].rpc_url))
const scrollTestnetProvider = new ethers.providers.JsonRpcProvider(chainData[534353].rpc_url)
const zksyncEraTestnetProvider = new zksync.Provider(chainData[280].rpc_url)
const optimismTestnetProvider = optimismSdk.asL2Provider(new ethers.providers.JsonRpcProvider(chainData[420].rpc_url))
const taikoTestnetProvider = new ethers.providers.JsonRpcProvider(chainData[167400].rpc_url)

const getOptimismData = async () => {
  try {
    const MainnetGasFee = await optimismMainnetProvider.getGasPrice()
    const TestnetGasFee = await optimismTestnetProvider.getGasPrice()

    return {
      gasFee: {
        testnet: TestnetGasFee.toString(),
        mainnet: MainnetGasFee.toString()
      },
      ...chainData[10]
    }
  } catch (error) {
    console.log(error)
  }
}

const getMantleData = async () => {
  try {
    // const MainnetGasFee = (mantleMainnetProvider && await mantleMainnetProvider?.getGasPrice()) || null
    const TestnetGasFee = await mantleTestnetProvider.getGasPrice()

    return {
      gasFee: {
        testnet: TestnetGasFee.toString(),
        mainnet: null
      },
      ...chainData[5001]
    }
  } catch (error) {
    console.log(error)
  }
}

const getScrollData = async () => {
  try {
    // const MainnetGasFee = (await scrollMainnetProvider?.getGasPrice()) || null
    const TestnetGasFee = await scrollTestnetProvider.getGasPrice()

    return {
      gasFee: {
        testnet: TestnetGasFee.toString(),
        mainnet: null
      },
      ...chainData[534353]
    }
  } catch (error) {
    console.log(error)
  }
}

const getPolygonZkEvmData = async () => {
  try {
    // const MainnetGasFee = (await polygonZkevmMainnetProvider?.getGasPrice()) || null
    const TestnetGasFee = await polygonZkevmTestnetProvider.getGasPrice()

    return {
      gasFee: {
        testnet: TestnetGasFee.toString(),
        mainnet: null
      },
      ...chainData[1442]
    }
  } catch (error) {
    console.log(error)
  }
}

const getTaikoData = async () => {
  try {
    // const MainnetGasFee = (await taikoMainnetProvider?.getGasPrice()) || null
    const TestnetGasFee = await taikoTestnetProvider.getGasPrice()

    return {
      gasFee: {
        testnet: TestnetGasFee.toString(),
        mainnet: null
      },
      ...chainData[167400]
    }
  } catch (error) {
    console.log(error)
  }
}

const getEthereumData = async () => {
  try {
    const MainnetGasFee = await ethProvider?.getGasPrice()
    const TestnetGasFee = await goerliProvider.getGasPrice()

    return {
      gasFee: {
        testnet: TestnetGasFee.toString(),
        mainnet: MainnetGasFee.toString()
      },
      ...chainData[1]
    }
  } catch (error) {
    console.log(error)
  }
}

const getZkSyncEraData = async () => {
  try {
    // const MainnetGasFee = (await zksyncEraMainnetProvider?.getGasPrice()) || null
    const TestnetGasFee = await zksyncEraTestnetProvider.getGasPrice()

    return {
      gasFee: {
        testnet: TestnetGasFee.toString(),
        mainnet: null
      },
      ...chainData[280]
    }
  } catch (error) {
    console.log(error)
  }
}

const getPolygonData = async () => {
  try {
    const MainnetGasFee = await polygonProvider?.getGasPrice()
    const TestnetGasFee = await mumbaiProvider.getGasPrice()

    return {
      gasFee: {
        testnet: TestnetGasFee.toString(),
        mainnet: MainnetGasFee.toString()
      },
      ...chainData[137]
    }
  } catch (error) {
    console.log(error)
  }
}

const getGnosisData = async () => {
  try {
    const MainnetGasFee = await gnosisProvider?.getGasPrice()
    // const TestnetGasFee = await goerliProvider.getGasPrice()

    return {
      gasFee: {
        testnet: null,
        mainnet: MainnetGasFee.toString()
      },
      ...chainData[100]
    }
  } catch (error) {
    console.log(error)
  }
}

export const getAllChainData = async (req, res) => {
  try {
    const [ethData, polygonData, gnosisData, opData, eraData, taikoData, zkevmData, mantleData, scrollData] = await Promise.all([
      getEthereumData(),
      getPolygonData(),
      getGnosisData(),
      getOptimismData(),
      getZkSyncEraData(),
      getTaikoData(),
      getPolygonZkEvmData(),
      getMantleData(),
      getScrollData()
    ])
    const data = [ethData, polygonData, gnosisData, opData, eraData, taikoData, zkevmData, mantleData, scrollData]
    return responseUtils.response.successResponse(res, 'Transaction Data', data)
  } catch (error) {
    return responseUtils.response.errorResponse(res, error)
  }
}
