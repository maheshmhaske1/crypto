const userModel = require('../model/user.model')
const mailMiddleware = require('../middleware/mail.middleware')
const jwtMiddleware = require('../middleware/auth')
const otpModel = require('../model/otp.model')
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv').config()


exports.createUser = async (req, res) => {
    let { first_name, last_name, email, mobile, password } = req.body

    let error_message = `please enter`
    if (!first_name) {
        error_message += `first name`
    }
    if (!mobile) {
        error_message += `, mobile`
    }
    if (!password) {
        error_message += `, password`
    }

    if (error_message !== "please enter") {
        return res.json({
            success: false,
            message: error_message
        })
    }

    const isUserFound = await userModel.findOne({ email: email })
    if (isUserFound) {
        return res.json({
            success: false,
            message: "user already exist please login"
        })
    }

    const hashed_password = await bcrypt.hash(password, 10);

    await new userModel({
        first_name: first_name,
        last_name: last_name,
        email: email,
        mobile: mobile,
        password: hashed_password
    }).save()
        .then(async (success) => {
            const token = await jwtMiddleware.generate_token_admin(success._id, success.mobile)
            console.log(token)
            await userModel.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(success._id) },
                { $set: { token: token } },
                { returnOriginal: false }
            )
                .then((success) => {
                    return res.json({
                        success: true,
                        message: `user registered`,
                        data: success
                    })
                })
                .catch((error) => {
                    return res.json({
                        success: false,
                        message: "something went wrong", error
                    })
                })
        })
        .catch((error) => {
            return res.json({
                success: false,
                message: "something went wrong", error
            })
        })
}


exports.login = async (req, res) => {
    let { username, password } = req.body

    let error_message = `please enter`

    if (!username) {
        error_message += `, email`
    }
    if (!password) {
        error_message += `, password`
    }

    if (error_message !== "please enter") {
        return res.json({
            success: false,
            message: error_message
        })
    }


    const isUserFound = await userModel.findOne({ email: username })
    console.log(isUserFound)
    if (!isUserFound) {
        return res.json({
            success: false,
            message: "user not registered please register"
        })
    }

    if (bcrypt.compareSync(password, isUserFound.password)) {
        return res.json({
            success: true,
            message: `logged in`,
            data: isUserFound
        })
    }
    else {
        return res.json({
            success: false,
            message: `incorrect password`
        })
    }
}


exports.resetPassword = async (req, res) => {
    let { username, newPassword, otp } = req.body

    let error_message = `please enter`

    if (!username) {
        error_message += `, email`
    }
    if (!newPassword) {
        error_message += `, password`
    }
    if (!otp) {
        error_message += `, otp`
    }

    if (error_message !== "please enter") {
        return res.json({
            success: false,
            message: error_message
        })
    }

    const isUserFound = await userModel.findOne({ email: username })
    console.log(isUserFound)
    if (!isUserFound) {
        return res.json({
            success: false,
            message: "user not registered please register"
        })
    }

    const isValidOtp = await otpModel.findOne({ email: username }).sort({ _id: -1 })
        .then(async (success) => {
            if (!success) {
                return res.json({
                    success: false,
                    message: `record not found`
                })
            }
            else {
                if (otp == success.otp && success.validTill > Date.now()) {
                    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
                    console.log("hashedNewPassword ==>", hashedNewPassword)
                    console.log("newPassword ==>", newPassword)
                    console.log("Usrname ==>", username)
                    await userModel.findByIdAndUpdate({ _id: isUserFound._id },
                        {
                            $set: {
                                password: hashedNewPassword
                            }
                        })
                        .then((success) => {
                            console.log(success)
                            if (success) {
                                return res.json({
                                    success: true,
                                    message: "password changed successfully"
                                })
                            }
                            x
                        })
                        .catch((error) => {
                            return res.json({
                                success: false,
                                message: "error while changing password"
                            })
                        })
                }
                else if (otp == success.otp && success.validTill < Date.now()) {
                    return res.json({
                        success: false,
                        message: "otp expired"
                    })
                }
                else {
                    return res.json({
                        success: false,
                        message: "otp not matched"
                    })
                }
            }
        })
        .catch((error) => {
            return res.json({
                success: false,
                message: "something went wrong", error
            })
        })

    console.log(isValidOtp)

}


exports.isUserExist = async (req, res) => {
    let { username } = req.body

    let error_message = `please enter`

    if (!username) {
        error_message += `, email`
    }

    if (error_message !== "please enter") {
        return res.json({
            success: false,
            message: error_message
        })
    }

    const isUserFound = await userModel.findOne({ email: username })
    if (!isUserFound) {
        return res.json({
            success: false,
            message: "email not registered"
        })
    }
    else {
        return res.json({
            success: true,
            message: "user found"
        })
    }

}

exports.getAll = async (req, res) => {
    await userModel.find()
        .then((success) => {
            return res.json({
                success: true,
                message: `users details`,
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                success: false,
                message: "something went wrong", error
            })
        })
}

exports.getById = async (req, res) => {

    const { userId } = req.params

    if (!userId) {
        return res.json({
            success: false,
            message: `please provide userId`
        })
    }

    await userModel.findOne({ _id: mongoose.Types.ObjectId(userId) })
        .then((success) => {
            return res.json({
                success: true,
                message: `user details`,
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                success: false,
                message: "something went wrong", error
            })
        })
}

exports.delete = async (req, res) => {

    const { userId } = req.params

    if (!userId) {
        return res.json({
            success: false,
            message: `please provide userId`
        })
    }

    await userModel.findOneAndDelete({ _id: mongoose.Types.ObjectId(userId) })
        .then((success) => {
            return res.json({
                success: true,
                message: `user details deleted`,
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                success: false,
                message: "something went wrong", error
            })
        })
}

exports.updateUser = async (req, res) => {
    const { userId } = req.params
    const updateUser = req.body

    if (!userId) {
        return res.json({
            success: false,
            message: `please provide userId`
        })
    }

    const isUserExist = await userModel.findOne({ _id: mongoose.Types.ObjectId(userId) })
    if (!isUserExist) {
        return res.json({
            success: false,
            message: `please provide valid userId`
        })
    }

    await userModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(userId)},
    {
        $set:updateUser
    },
    {returnOriginal:false})
    .then((success) => {
        return res.json({
            success: true,
            message: `user details updated`,
            data: success
        })
    })
    .catch((error) => {
        return res.json({
            success: false,
            message: "something went wrong", error
        })
    })
}