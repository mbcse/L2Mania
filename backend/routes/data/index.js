import express from 'express'
import nftRouter from './nft'
import tokenRouter from './token'
import transactionRouter from './transaction'
import chainRouter from './chain'

const router = express.Router()

router.use('/nft', nftRouter)
router.use('/token', tokenRouter)
router.use('/transaction', transactionRouter)
router.use('/chain', chainRouter)

export default router
