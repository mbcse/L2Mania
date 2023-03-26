import chainData from '../config/chainData.js'
import axios from 'axios'
import config from '../config/index.js'
import * as responseUtils from '../utilities/responseUtils'

export const getAddressNftBalance = async (req, res) => {
  try {
    console.log(req.body)
    const chainName = chainData[req.body.chainId].covalentName
    const userAddress = req.body.userAddress
    const uri = `https://api.covalenthq.com/v1/${chainName}/address/${userAddress}/balances_nft/?key=${config.COVALENT.API_KEY}`
    const resp = await axios.get(uri)

    responseUtils.response.successResponse(res, 'NFT Data', resp.data.data)
  } catch (error) {
    console.log(error)
    responseUtils.response.serverErrorResponse(res, error)
  }
}
