import express from 'express'
import dataRoute from './data'

// import verifyAPIKey from '../middleware/verifyAPIKey.js'

const router = express.Router()

// landing page
router.get('/', (req, res) => {
  res.send('Welcome to Backend!')
})

router.use('/api/v1/data', dataRoute)

export default router
