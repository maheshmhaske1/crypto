const { default: mongoose, mongo } = require('mongoose')
const userContactsModel = require('../model/contact.model')
const userModel = require('../model/user.model')

exports.addCOntact = async (req, res) => {
    const { userId, coinName, coinAddress } = req.body

    if (!userId || !coinName) {
        return res.json({
            status: false,
            message: "userId, coinName are required"
        })
    }

    const isUserExist = await userModel.findOne({ _id: mongoose.Types.ObjectId(userId) })
    if (!isUserExist) {
        return res.json({
            status: false,
            message: "invalid user id"
        })
    }

    const isContactALreadyExist = await userContactsModel.findOne({ number: number })
    if (isContactALreadyExist) {
        return res.json({
            status: false,
            message: "this contact already added"
        })
    }

    await new userContactsModel({
        userId: userId,
        coinName: coinName,
        coinAddress: coinAddress
    })
        .save()
        .then((success) => {
            return res.json({
                status: true,
                message: "contact added",
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

exports.getAllContact = async (req, res) => {
    const { userId } = req.params

    if (!userId) {
        return res.json({
            status: false,
            message: "userId is required"
        })
    }


    const isUserExist = await userModel.findOne({ _id: mongoose.Types.ObjectId(userId) })
    if (!isUserExist) {
        return res.json({
            status: false,
            message: "invalid user id"
        })
    }

    await userContactsModel.find({ userId: mongoose.Types.ObjectId(userId) })
        .then((success) => {
            return res.json({
                status: true,
                message: "contacts",
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

exports.editContact = async (req, res) => {
    const { contactId, name, number } = req.body

    if (!contactId) {
        return res.json({
            status: false,
            message: "contactId is required"
        })
    }

    isContactExist = await userContactsModel.findOne({ _id: mongoose.Types.ObjectId(contactId) })
    if (!isContactExist) {
        return res.json({
            status: false,
            message: "invalid contactId"
        })
    }

    await userContactsModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(contactId) },
        {
            $set: {
                name: name,
                number: number
            }
        },
        { returnOriginal: false })
        .then((success) => {
            return res.json({
                status: true,
                message: "contact updated",
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

exports.deleteContact = async (req, res) => {
    const { contactId } = req.params

    if (!contactId) {
        return res.json({
            status: false,
            message: "contactId is required"
        })
    }

    isContactExist = await userContactsModel.findOne({ _id: mongoose.Types.ObjectId(contactId) })
    if (!isContactExist) {
        return res.json({
            status: false,
            message: "invalid contactId"
        })
    }

    await userContactsModel.findOneAndDelete({
        _id: mongoose.Types.ObjectId(contactId)
    })
        .then((success) => {
            return res.json({
                status: true,
                message: "contact deleted",
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
