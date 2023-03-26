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

const getOptimismTx = async (txHash) => {
  try {
    const getMainnetTx = async (txHash) => {
      const confirmedTxData = await optimismMainnetProvider.getTransactionReceipt(txHash)
      if (!confirmedTxData) {
        const unconmirmedTxData = await optimismMainnetProvider.getTransaction(txHash)
        return unconmirmedTxData
      } else {
        return confirmedTxData
      }
    }
    const getTestnetTx = async (txHash) => {
      const confirmedTxData = await optimismTestnetProvider.getTransactionReceipt(txHash)
      if (!confirmedTxData) {
        const unconmirmedTxData = await optimismTestnetProvider.getTransaction(txHash)
        return unconmirmedTxData
      } else {
        return confirmedTxData
      }
    }

    const [mainnetTx, testnetTx] = await Promise.all([getMainnetTx(txHash), getTestnetTx(txHash)])
    if (mainnetTx) {
      return {
        chainName: 'Optimism Mainnet',
        chainType: 'L2 Chain',
        l2Type: 'Optimistic Rollup',
        chainId: (await optimismMainnetProvider.getNetwork()).chainId,
        txHash,
        l1Data: {},
        l2Data: mainnetTx,
        l2l1Data: {},
        status: 'Confirmed'
      }
    } else if (testnetTx) {
      return {
        chainName: 'Optimism Testnet',
        chainType: 'L2 Chain',
        l2Type: 'Optimistic Rollup',
        chainId: (await optimismTestnetProvider.getNetwork()).chainId,
        txHash,
        l1Data: {},
        l2Data: testnetTx,
        l2l1Data: {},
        status: 'Confirmed'
      }
    } else return null
  } catch (error) {
    return null
  }
}

const getMantleTx = async (txHash) => {
  try {
    const getMainnetTx = async (txHash) => {
      // const confirmedTxData = await mantleMainnetProvider?.getTransactionReceipt(txHash)
      // if (!confirmedTxData) {
      //   const unconmirmedTxData = await mantleMainnetProvider?.getTransaction(txHash)
      //   return unconmirmedTxData
      // } else {
      //   return confirmedTxData
      // }
      return null
    }
    const getTestnetTx = async (txHash) => {
      const confirmedTxData = await mantleTestnetProvider.getTransactionReceipt(txHash)
      if (!confirmedTxData) {
        const unconmirmedTxData = await mantleTestnetProvider.getTransaction(txHash)
        return unconmirmedTxData
      } else {
        return confirmedTxData
      }
    }

    const [mainnetTx, testnetTx] = await Promise.all([getMainnetTx(txHash), getTestnetTx(txHash)])
    if (mainnetTx) {
      return {
        chainName: 'Mantle Mainnet',
        chainType: 'L2 Chain',
        l2Type: 'Optimistic Rollup',
        chainId: (await mantleMainnetProvider?.getNetwork()).chainId,
        txHash,
        l1Data: {},
        l2Data: mainnetTx,
        l2l1Data: {},
        status: 'Confirmed'
      }
    } else if (testnetTx) {
      return {
        chainName: 'Mantle Testnet',
        chainType: 'L2 Chain',
        l2Type: 'Optimistic Rollup',
        chainId: (await mantleTestnetProvider.getNetwork()).chainId,
        txHash,
        l1Data: {},
        l2Data: testnetTx,
        l2l1Data: {},
        status: 'Confirmed'
      }
    } else return null
  } catch (error) {
    return null
  }
}

const getZkSyncEraTx = async (txHash) => {
  try {
    const getMainnetTx = async (txHash) => {
      // const confirmedTxData = await zksyncEraMainnetProvider?.getTransactionReceipt(txHash)
      // if (!confirmedTxData) {
      //   const unconmirmedTxData = await zksyncEraMainnetProvider?.getTransaction(txHash)
      //   return unconmirmedTxData
      // } else {
      //   return confirmedTxData
      // }
      return null
    }
    const getTestnetTx = async (txHash) => {
      const confirmedTxData = await zksyncEraTestnetProvider.getTransactionReceipt(txHash)
      if (!confirmedTxData) {
        const unconmirmedTxData = await zksyncEraTestnetProvider.getTransaction(txHash)
        return unconmirmedTxData
      } else {
        return confirmedTxData
      }
    }

    const [mainnetTx, testnetTx] = await Promise.all([getMainnetTx(txHash), getTestnetTx(txHash)])
    if (mainnetTx) {
      return {
        chainName: 'ZkSync Era Mainnet',
        chainType: 'L2 Chain',
        l2Type: 'ZK Rollup',
        chainId: (await zksyncEraMainnetProvider?.getNetwork())?.chainId,
        txHash,
        l1Data: {},
        l2Data: mainnetTx,
        l2l1Data: {},
        status: 'Confirmed'
      }
    } else if (testnetTx) {
      return {
        chainName: 'ZkSync Era Testnet',
        chainType: 'L2 Chain',
        l2Type: 'ZK Rollup',
        chainId: (await zksyncEraTestnetProvider.getNetwork())?.chainId,
        txHash,
        l1Data: {},
        l2Data: testnetTx,
        l2l1Data: await zksyncEraTestnetProvider.getTransactionDetails(txHash),
        status: await zksyncEraTestnetProvider.getTransactionStatus(txHash)
      }
    } else return null
  } catch (error) {
    return null
  }
}

const getScrollTx = async (txHash) => {
  try {
    const getMainnetTx = async (txHash) => {
      // const confirmedTxData = await scrollMainnetProvider?.getTransactionReceipt(txHash)
      // if (!confirmedTxData) {
      //   const unconmirmedTxData = await scrollMainnetProvider?.getTransaction(txHash)
      //   return unconmirmedTxData
      // } else {
      //   return confirmedTxData
      // }
      return null
    }
    const getTestnetTx = async (txHash) => {
      const confirmedTxData = await scrollTestnetProvider.getTransactionReceipt(txHash)
      if (!confirmedTxData) {
        const unconmirmedTxData = await scrollTestnetProvider.getTransaction(txHash)
        return unconmirmedTxData
      } else {
        return confirmedTxData
      }
    }

    const [mainnetTx, testnetTx] = await Promise.all([getMainnetTx(txHash), getTestnetTx(txHash)])
    if (mainnetTx) {
      return {
        chainName: 'scroll Mainnet',
        chainType: 'L2 Chain',
        l2Type: 'ZK Rollup',
        chainId: (await scrollMainnetProvider?.getNetwork()).chainId,
        txHash,
        l1Data: {},
        l2Data: mainnetTx,
        l2l1Data: {},
        status: 'Confirmed'
      }
    } else if (testnetTx) {
      return {
        chainName: 'scroll Testnet',
        chainType: 'L2 Chain',
        l2Type: 'ZK Rollup',
        chainId: (await scrollTestnetProvider.getNetwork()).chainId,
        txHash,
        l1Data: {},
        l2Data: testnetTx,
        l2l1Data: {},
        status: 'Confirmed'
      }
    } else return null
  } catch (error) {
    return null
  }
}

const getTaikoTx = async (txHash) => {
  try {
    const getMainnetTx = async (txHash) => {
      // const confirmedTxData = await taikoMainnetProvider?.getTransactionReceipt(txHash)
      // if (!confirmedTxData) {
      //   const unconmirmedTxData = await taikoMainnetProvider?.getTransaction(txHash)
      //   return unconmirmedTxData
      // } else {
      //   return confirmedTxData
      // }
      return null
    }
    const getTestnetTx = async (txHash) => {
      const confirmedTxData = await taikoTestnetProvider.getTransactionReceipt(txHash)
      if (!confirmedTxData) {
        const unconmirmedTxData = await taikoTestnetProvider.getTransaction(txHash)
        return unconmirmedTxData
      } else {
        return confirmedTxData
      }
    }

    const [mainnetTx, testnetTx] = await Promise.all([getMainnetTx(txHash), getTestnetTx(txHash)])
    if (mainnetTx) {
      return {
        chainName: 'taiko Mainnet',
        chainType: 'L2 Chain',
        l2Type: 'ZK Rollup',
        chainId: (await taikoMainnetProvider?.getNetwork())?.chainId,
        txHash,
        l1Data: {},
        l2Data: mainnetTx,
        l2l1Data: {},
        status: 'Confirmed'
      }
    } else if (testnetTx) {
      return {
        chainName: 'taiko Testnet',
        chainType: 'L2 Chain',
        l2Type: 'ZK Rollup',
        chainId: (await taikoTestnetProvider.getNetwork())?.chainId,
        txHash,
        l1Data: {},
        l2Data: testnetTx,
        l2l1Data: {},
        status: 'Confirmed'
      }
    } else return null
  } catch (error) {
    return null
  }
}

const getPolygonZkEvmTestnetTx = async (txHash) => {
  try {
    const getMainnetTx = async (txHash) => {
      // const confirmedTxData = await taikoMainnetProvider?.getTransactionReceipt(txHash)
      // if (!confirmedTxData) {
      //   const unconmirmedTxData = await taikoMainnetProvider?.getTransaction(txHash)
      //   return unconmirmedTxData
      // } else {
      //   return confirmedTxData
      // }
      return null
    }
    const getTestnetTx = async (txHash) => {
      const confirmedTxData = await polygonZkevmTestnetProvider.getTransactionReceipt(txHash)
      if (!confirmedTxData) {
        const unconmirmedTxData = await polygonZkevmTestnetProvider.getTransaction(txHash)
        return unconmirmedTxData
      } else {
        return confirmedTxData
      }
    }

    const [mainnetTx, testnetTx] = await Promise.all([getMainnetTx(txHash), getTestnetTx(txHash)])
    if (mainnetTx) {
      return {
        chainName: 'Polygon ZkEvm Mainnet',
        chainType: 'L2 Chain',
        l2Type: 'ZK Rollup',
        chainId: (await taikoMainnetProvider?.getNetwork())?.chainId,
        txHash,
        l1Data: {},
        l2Data: mainnetTx,
        l2l1Data: {},
        status: 'Confirmed'
      }
    } else if (testnetTx) {
      return {
        chainName: 'Polygon ZkEvm Testnet',
        chainType: 'L2 Chain',
        l2Type: 'ZK Rollup',
        chainId: (await polygonZkevmTestnetProvider.getNetwork())?.chainId,
        txHash,
        l1Data: {},
        l2l1Data: {},
        l2Data: testnetTx,
        status: 'Confirmed'
      }
    } else return null
  } catch (error) {
    return null
  }
}

export const getTransactionDetails = async (req, res) => {
  try {
    const { txHash } = req.body
    console.log(req.body)

    const [opData, eraData, taikoData, zkevmData, mantleData, scrollData] = await Promise.all([
      getOptimismTx(txHash),
      getZkSyncEraTx(txHash),
      getTaikoTx(txHash),
      getPolygonZkEvmTestnetTx(txHash),
      getMantleTx(txHash),
      getScrollTx(txHash)
    ])

    const data = opData || eraData || zkevmData || mantleData || taikoData || scrollData || 'Not Found'
    console.log(data)
    return responseUtils.response.successResponse(res, 'Transaction Data', data)
  } catch (error) {
    console.log(error)
    return responseUtils.response.errorResponse(res, error)
  }
}

// getMantleTx('0x7bf22d93ad82f57e75369206dfdf1a0451e8c42315650394395d5d1fd309fc8e')
// getZkSyncEraTx('0x2c7abaf2c3e87e97755bf016c47d8c4fac90772c7e144a8be44430e21519771b')
// getOptimismTx('0x9b43cdbd780eec0dc1589ad6f9c2898e7d53d03653a0d26265aed7435fff9f36') 0x85714cd89f5457c2cdb298edc2cef6eedb8a9be71ddf35aefb2f6114c72d90cc
// getScrollTx('0x0a7eab5a87e1e162a15578a9e700e0790be534bdf2edccd299063ac0a1c96031')
// getTaikoTx('0xd541c2c97a6edadbc967f8c0c1d97e65f98735eba9973d9518330bf2b909d057')
// getPolygonZkEvmTestnetTx('0x28b6558a7fedf726d361b6107cd6a2b82dee2b037d9c7f1b045e281c6e3e979a')

// getTransactionDetails({ body: { txHash: '0x28b6558a7fedf726d361b6107cd6a2b82dee2b037d9c7f1b045e281c6e3e979a' } })
