const nodemailer = require('nodemailer')
const fs = require('fs')
const hogan = require('hogan.js')
const config = require('../config/index')
const template = fs.readFileSync(`${__dirname}/template/bookingTicket.hjs`, "utf-8")
const compiledTemplate = hogan.compile(template)
module.exports.sendBookTicketEmail = (ticket, trip, user) => {
    console.log(ticket)
    console.log(trip)
    console.log(user)
    const transport = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTSL: false,
        requireSSL: false,
        auth: {
            user: config.email,
            pass: config.password
        }
    }
    const transporter = nodemailer.createTransport(transport)
    const mailOptions = {
        from: "redias2048@gmail.com",
        to: "19520854@gm.uit.edu.vn",
        subject: "test email send",
        html: compiledTemplate.render({
            email: user.email,
            fromStation: trip.fromStationId.name,
            toStation: trip.toStationId.name,
            price: trip.price,
            amount: ticket.seats.length,
            total: trip.price * ticket.seats.length,
            seatCodes: ticket.seats.map(s => s.code).join("-")
        })
    }
    transporter.sendMail(mailOptions, err => {
        if (err) return console.log(err)
        console.log("send email success")
    })
}