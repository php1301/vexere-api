const express = require('express')
const { Station } = require("../../models/Station")
const router = express.Router()
router.get("/stations", (req, res, next) => {
    Station.find()
        .then(stations => res.status(200).json(stations))
        .catch(err => res.status(500).json(err))
})
router.get("/stations/:id", (req, res, next) => {
    const { id } = req.params
    Station.findById(id)
        .then(station => {
            if (!station)
                throw { status: '404', message: 'station cannot found' }
            res.status(200).json(station)
        })
        // .then(station => )
        .catch(err => res.status(500).json(err))
})
router.post("/stations/", (req, res, next) => {
    const { name, address, province } = req.body;
    const newStation = new Station({
        name, address, province
    })
    newStation.save()
        .then(station => res.status(201).json(station))
        .catch(err => res.status(500).json(err))
})
router.put("/stations/:id", (req, res, next) => {
    const { id } = req.params
    const { name, address, province } = req.body
    Station.findById(id)
        .then(station => {
            if (!station) return Promise.reject({ message: "Station not found" })
            // throw{status: '404', message: 'station cannot found'}
            station.name = name
            station.address = address
            station.province = province
            return station.save()
        })
        .then(station => res.status(200).json(station))
        .catch(err => res.status(500).json(err))
})
router.delete("/stations/:id", (req, res, next) => {
    const { id } = req.params
    Station.deleteOne({ _id: id })
        .then(res.status(200).json({ message: "delelte successfully" }))
        .catch(err => res.json(err))
})
module.exports = router