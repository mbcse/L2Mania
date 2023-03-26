import { getBalance, getNFTs, getTokens, getNftTransfers,
   getTokenTransfers, getTransfersData, getNativeTransactions, getChainExplorerLink } from './moralis.js'

import {getAllNotifications,getSpamNotifications,getChatRequests,
getChats,getSubscriptions,getUserPushProfile} from './pushProtocolData'



export const dashboard = async (req, res) => {
  console.log('Request Recieved')
  const address = req.params.address
  const chain = req.params.chain
  const balanceData = await getBalance(chain, address)
  const tokenData = await getTokens(chain, address)
  const nftData = await getNFTs(chain, address)
  const transfersData = await getTransfersData(chain, address)
  console.log(transfersData)
  res.render('dashboard', { title: 'Dashboard', balanceData, tokenData, nftData, transfersData, userAddress: address, chain })
}

export const profile = async (req, res) => {
  res.render('dashboard/profile', { title: 'profile' })
}

export const nft = async (req, res) => {
  const address = req.params.address
  const chain = req.params.chain
  const nftData = await getNFTs(chain, address)
  const explorerLink = await getChainExplorerLink(chain)
  res.render('dashboard/nft', { title: 'nft', nftData, userAddress: address, chain, explorerLink })
}

export const token = async (req, res) => {
  const address = req.params.address
  const chain = req.params.chain
  const tokenData = await getTokens(chain, address)
  const explorerLink = await getChainExplorerLink(chain)
  res.render('dashboard/token', { title: 'token', tokenData, userAddress: address, chain, explorerLink })
}

export const nftTransfers = async (req, res) => {
  const address = req.params.address
  const chain = req.params.chain
  // const nftTransfers = await getNftTransfers(chain, address)
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Transfer-Encoding', 'chunked')
  req.on('close', () => {
    res.end()
    console.log('Connection closed')
  })
  await getNftTransfers(chain, address, res)
  res.end()
}

export const tokenTransfers = async (req, res) => {
  const address = req.params.address
  const chain = req.params.chain
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Transfer-Encoding', 'chunked')
  req.on('close', () => {
    res.end()
    console.log('Connection closed')
  })
  await getTokenTransfers(chain, address, res)
  res.end()
}

export const nativeTransactions = async (req, res) => {
  const address = req.params.address
  const chain = req.params.chain
  // const nftTransfers = await getNftTransfers(chain, address)
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Transfer-Encoding', 'chunked')
  req.on('close', () => {
    res.end()
    console.log('Connection closed')
  })
  await getNativeTransactions(chain, address, res)
  res.end()
}

export const landing = async (req, res) => {
  res.render('landing', { title: 'Landing' })
}

export const transactions = async (req, res) => {
  const address = req.params.address
  const chain = req.params.chain
  const explorerLink = await getChainExplorerLink(chain)
  res.render('dashboard/native', { title: 'Transactions', userAddress: address, chain, explorerLink })
}


export const getAllNotificationsController = async (req, res) => {
  const address = req.params.address
  const chain = req.params.chain
  const explorerLink = await getChainExplorerLink(chain)
  const notifications = await getAllNotifications(address)
  const spamNotifications = await getSpamNotifications(address)
  res.render('dashboard/notifications', { title: 'Notifications', notifications, spamNotifications, userAddress: address, chain, explorerLink})
}
export const getChatsController= async (req, res) => {
  const address = req.params.address
  const chain = req.params.chain
  const explorerLink = await getChainExplorerLink(chain)
  const chats = await getChats(address)
  const chatRequests = await getChatRequests(address)
  res.render('dashboard/chats', { title: 'Chats', chats, chatRequests , userAddress: address, chain, explorerLink})
}

export const getUserPushProfileController= async (req, res) => {
  const address = req.params.address
  const chain = req.params.chain
  const explorerLink = await getChainExplorerLink(chain)
  const profile = await getUserPushProfile(address)
  res.render('dashboard/notifications', { title: 'Profile', profile , userAddress: address, chain, explorerLink})
}

export const getSubscriptionsController= async (req, res) => {
  const address = req.params.address
  const chain = req.params.chain
  const explorerLink = await getChainExplorerLink(chain)
  const subscriptions = await getSubscriptions(address)
  res.render('dashboard/subscriptions', { title: 'Subscriptions', subscriptions, userAddress: address, chain, explorerLink})
}