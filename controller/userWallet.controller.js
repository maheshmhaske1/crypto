const userWallet = require('../model/userWallet.model')
const userModel = require('../model/user.model')
const { default: mongoose } = require('mongoose')

exports.addInWallet = async (req, res) => {
    const { userId, currencyName, currentPrice } = req.body

    if (!userId || !currencyName || !currentPrice) {
        return res.json({
            status: false,
            message: "userId, currencyName, currentPrice are required"
        })
    }

    const isUserExist = await userModel.findOne({ _id: mongoose.Types.ObjectId(userId) })
    if (!isUserExist) {
        return res.json({
            status: false,
            message: "invalid user id"
        })
    }

    await new userWallet({
        userId: userId,
        currencyName: currencyName,
        currentPrice: currentPrice
    })
        .save()
        .then((success) => {
            return res.json({
                status: true,
                message: `${currencyName} added in your wallet`,
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: "something went wrong"
            })
        })
}

exports.getWalletDetails = async (req, res) => {
    const { userId } = req.params

    if (!userId) {
        return res.json({
            status: false,
            message: "userId required"
        })
    }

    const isUserExist = await userModel.findOne({ _id: mongoose.Types.ObjectId(userId) })
    if (!isUserExist) {
        return res.json({
            status: false,
            message: "invalid user id"
        })
    }

    await userWallet.find({ userId: mongoose.Types.ObjectId(userId) })
        .then((success) => {
            return res.json({
                status: true,
                message: `wallet details`,
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: "something went wrong"
            })
        })
}