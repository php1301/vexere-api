const mongoose = require('mongoose')
const { SeatSchema } = require('./Seat')
const TripSchema = new mongoose.Schema({
    fromStationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",

    },
    toStationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
    },
    startTime: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seats: [SeatSchema]
})
const Trip = mongoose.model("Trip", TripSchema, "Trip")
module.exports = {
    TripSchema, Trip
}