const { Trip } = require("../../../models/Trip")
const { Seat } = require("../../../models/Seat")
const seatCodes = ['A01', 'A02', 'A03']
module.exports.getTrips = (req, res, next) => {

    Trip.find()
        .then(trips => {
            res.status(200).json(trips)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}
module.exports.getTripById = (req, res, next) => {
    const { id } = req.params
    Trip.findById(id)
        .then(trip => {
            if (!trip)
                throw { status: "404", message: "Trip not found" }
            res.status(200).json(station)
        })
        .catch(err => {
            res.status(404).json(err)
        })
}
module.exports.createTrip = (req, res, next) => {
    const { fromStationId, toStationId, startTime, price } = req.body
    // const seats = []
    // seatCodes.forEach(code => {
    //     const newSeat = new Seat({ code: code })
    //     seats.push(newSeat)
    // })
    const seats = seatCodes.map(code => new Seat({ code }))
    const newTrip = new Trip({
        fromStationId, toStationId, startTime, price, seats
    })
    newTrip.save()
        .then(trip => res.status(200).json(trip))
        .catch(err => res.status(200).json(err))
}
module.exports.replaceTripById = (req, res, next) => { }
module.exports.updateTripsById = (req, res, next) => { }
module.exports.deleteTripsById = (req, res, next) => { }