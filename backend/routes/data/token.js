import express from 'express'

import { getAddressTokenBalance } from '../../controllers/tokenDataController'
const router = express.Router()

router.post('/', getAddressTokenBalance)

export default router
