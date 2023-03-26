import chainData from '../config/chainData.js'
import axios from 'axios'
import config from '../config/index.js'
import * as responseUtils from '../utilities/responseUtils'

export const getAddressTokenBalance = async (req, res) => {
  try {
    console.log(req.body)
    const chainName = chainData[req.body.chainId].covalentName
    const userAddress = req.body.userAddress
    const uri = `https://api.covalenthq.com/v1/${chainName}/address/${userAddress}/balances_v2/?key=${config.COVALENT.API_KEY}`
    const resp = await axios.get(uri)

    console.log(resp.data)

    responseUtils.response.successResponse(res, 'Token Data', resp.data.data)
  } catch (error) {
    console.log(error)
    responseUtils.response.serverErrorResponse(res, error)
  }
}
