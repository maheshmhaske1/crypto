const mongoose = require('mongoose')

const userContactsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    coinName: {
        type: String,
    },
    coinAddress: {
        type: String,
    }
})


var userContactsModel = mongoose.model('userContacts', userContactsSchema);
module.exports = userContactsModel;