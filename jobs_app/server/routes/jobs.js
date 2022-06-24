const express = require('express')
const Router = express.Router()

const { getAllJobs, getJob, updateJob, delJob, createJob } = require('../controllers/jobs')


Router.route('/').get(getAllJobs).post(createJob)
Router.route('/:id').get(getJob).patch(updateJob).delete(delJob)

module.exports = Router