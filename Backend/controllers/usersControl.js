const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
const dotenv = require('dotenv');
const result = dotenv.config();


exports.signup = (req, res, next) => {
    const emailCrypt = cryptojs.HmacSHA256(req.body.email, `${process.env.CLE_CRYPTO}`).toString(cryptojs.enc.Base64);

    bcrypt.hash(req.body.password, 10)
    .then((hashedPassword)=> {
        const user = new usersModel({
            email : emailCrypt,
            password : hashedPassword
        });
        user.save()
        .then(() => res.status(201).json({ message : "Nouvel utilisateur créé !"}))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ error })
    });
};

exports.login = (req, res, next) => {
    const emailCrypt = cryptojs.HmacSHA256(req.body.email, `${process.env.CLE_CRYPTO}`).toString(cryptojs.enc.Base64);

    usersModel.findOne({ email: emailCrypt})
    .then((user) => {
        if(!user) {
            return res.status(401).json({ error: "L'utilisateur n'existe pas. Vérifiez l'adresse email."});
        }

        bcrypt.compare(req.body.password, user.password)
        .then((validation) => {
            if(!validation) {
                return res.status(401).json({ error: "Mot de passe erroné."});
            }
            else {
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        process.env.CLE_CRYPTO,
                        { expiresIn: '12h'}
                    )
                })
            }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};