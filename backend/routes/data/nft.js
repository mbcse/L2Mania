import express from 'express'
import { getAddressNftBalance } from '../../controllers/nftDataController'

const router = express.Router()

router.post('/', getAddressNftBalance)

export default router
