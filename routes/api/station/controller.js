const express = require('express')
const { Station } = require("../../../models/Station")
const router = express.Router()
module.exports.getStation = (req, res, next) => {
    Station.find()
        .then(stations => res.status(200).json(stations))
        .catch(err => res.status(500).json(err))
}
module.exports.getStationById = (req, res, next) => {
    const { id } = req.params
    Station.findById(id)
        .then(station => {
            if (!station)
                throw { status: '404', message: 'station cannot found' }
            res.status(200).json(station)
        })
        // .then(station => )
        .catch(err => res.status(500).json(err))
}
module.exports.postStation = (req, res, next) => {
    const { name, address, province } = req.body;
    const newStation = new Station({
        name, address, province
    })
    newStation.save()
        .then(station => res.status(201).json(station))
        .catch(err => res.status(500).json(err))
}
module.exports.putStationById = (req, res, next) => {
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
} //replace
module.exports.updateStationById = async (req, res, next) => {
    const { id } = req.params
    const { name, address, province } = req.body
    await Station.findById(id)
        .then(station => {
            if (!station)
                throw { status: '404', message: "station not found" }
            Object.keys(req.body).forEach(key => station[key] = req.body[key])
            // if (name) station.name = name
            // if (address) station.address = address
            // if (province) station.province = province
            return station.save()
        })
        .then(station => res.status(200).json(station))
        .catch(err => res.status(500).json(err))
}
module.exports.deleteStation = (req, res, next) => {
    const { id } = req.params
    Station.deleteOne({ _id: id })
        .then(res.status(200).json({ message: "delelte successfully" }))
        .catch(err => res.json(err))
}
