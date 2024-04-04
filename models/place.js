var mongoose = require('mongoose')


const placeSchema = mongoose.Schema({
    nickname: String,
    name: String,
    latitude: Number,
    longitude: Number
})


const place = mongoose.model('places', placeSchema)

module.exports = place