const mongoose = require('mongoose')

const userWalletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    currencyName: {
        type: String,
        default: ''
    },
    currentPrice: {
        type: Number,
    }
})


var userWalletsModel = mongoose.model('userWallets', userWalletSchema);
module.exports = userWalletsModel;