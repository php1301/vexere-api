const { Ticket } = require('../../../models/Ticket')
const { Trip } = require('../../../models/Trip')
const { Seat } = require('../../../models/Seat')
const { sendBookTicketEmail } = require('../../../email/sendEmail')
const _ = require('lodash')
module.exports.createTicket = (req, res, next) => {
    const { tripId, seatCodes } = req.body
    Trip.findById(tripId)
        .populate("fromStationId")
        .populate("toStationId")
        .then(trip => {
            if (!trip) {
                return Promise.reject({ message: "Trip not found" }) // validator
            }
            const availableSeatCodes = trip.seats
                .filter(s => s._doc.isBooked)
                .map(s => s._doc.code)

            let errSeats = seatCodes.filter(item => {
                return availableSeatCodes.indexOf(item) === -1
            })
            // let errSeats = seatCodes.map(item => {
            //     if (availableSeatCodes.indexOf(item) === -1)
            //         return item
            // })
            if (!_.isEmpty(errSeats)) return Promise.reject({
                message: `Seat(s) ${errSeats.join('', '')} are already booked`,
                errSeats
            })
            const newTicket = new Ticket({
                tripId,
                userId: req.user._id,
                seats: seatCodes.map(s => new Seat({ code: s })),
                totalPrice: seatCodes.length = trip.price
            })
            seatCodes.forEach(code => {
                const index = trip.seats.findIndex(s => s.code === code)
                trip.seats[index].isBooked = true
            })
            return Promise.all([
                newTicket.save(),
                trip.save()
            ])
        })
        .then(result => {
            sendBookTicketEmail(result[0], result[1], req.user)
            res.status(200).json(result[0])
        })
        .catch(err => {
            res.status(401).json(err)
        })
}