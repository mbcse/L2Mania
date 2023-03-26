import express from 'express'
import { getAllChainData } from '../../controllers/chainDataController'

const router = express.Router()

router.get('/all', getAllChainData)

export default router
