const User = require("../models/user.model");

var bcrypt = require("bcryptjs");
const config = require('../config/auth.config');
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        var encrypt_password = req.body.password;
        const user = new User({

            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(encrypt_password),
            mobile_no: req.body.mobile_no,
            address: req.body.address,
            pincode: req.body.pincode,

        });
        const data = await User.findOne({ email: req.body.email });
        if (data) {
            res.status(200).send({ message: "This mail already exists" });
        }
        else {
            const saveuser = await user.save();
            res.status(200).send({ data: saveuser });
        }
    }
    catch (error) {
        res.status(200).send(error);
    }

}

exports.login = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });
    if (user) {

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (passwordIsValid) {

            const tokendata = jwt.sign({ _id: user.id }, config.secret);
            user.token = tokendata;
            await user.save();
            // console.log( user.token )

            const result = {
                _id: user._id,
                email: user.email,
                password: user.password,
                mobile_no: user.mobile_no,
                address: user.address,
                pincode: user.pincode,
                token: tokendata
            }

            res.status(200).send({ message: "User Login Successfully", data: result });
        }
        else {
            res.status(200).send({ message: "Incorrect Password." });
        }
    }
    else {
        res.status(200).send({ message: "User Not found." });
    }



}

exports.tokenVerification = async (req, res) => {

    const token = req.body.token;

    const user = await User.findOne({ token: token });
    if (user) {

        const tokenIsValid = user.token;
        if (tokenIsValid) {

            const result = {
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                mobile_no: user.mobile_no,
                address: user.address,
                pincode: user.pincode,
                token: user.token
            }

            res.status(200).send({ message: "User Find Using JWT authentication", data: result });
        }
        else {
            res.status(200).send({ message: "Incorrect Token." });
        }
    }
    else {
        res.status(200).send({ message: "User Not found." });
    }

}
exports.userList = async (req, res) => {
    try {
        User.find({})

            .then((userdata) => {
                res.json(userdata);
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error fetching data from MongoDB' });
            });
    }
    catch (err) {
        console.error(err.message);
    }
}


