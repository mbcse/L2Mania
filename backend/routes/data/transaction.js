import express from 'express'
import { getTransactionDetails } from '../../controllers/transactionController'

const router = express.Router()

router.post('/search', getTransactionDetails)

export default router
