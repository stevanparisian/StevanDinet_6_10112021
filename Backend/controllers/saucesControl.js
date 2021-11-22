const Sauce = require('../models/saucesModel');
const fs = require('fs');


exports.createSauce = (req, res, next) => {
    const sauceData = JSON.parse(req.body.sauce)
    delete sauceData._id;
    const sauce = new Sauce({
        ...sauceData,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersdisLiked: [],
    });
    sauce.save()
    .then(() => res.status(201).json({ message: "Sauce créée et enregistrées" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};
  
exports.getSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.likesSauces = (req, res, next) => {
    let like = req.body.like
    let userId = req.body.userId
    let sauceId = req.params.id

    switch (like) {

        case 1 :
            Sauce.updateOne(
            { _id: sauceId },
            { $push: { usersLiked: userId }, $inc: { likes: +1 }})
            .then(() => res.status(200).json({ message: "Vous avez mis un like sur la sauce." }))
            .catch((error) => res.status(400).json({ error }))
        break;

        case 0 :
            Sauce.findOne({ _id: sauceId }) 
            .then((sauce) => {
                if(sauce.usersLiked.includes(userId)) {
                    Sauce.updateOne(
                    { _id: sauceId },
                    { $push: { usersLiked: userId }, $inc: { likes: -1 }})
                    .then(() => res.status(200).json({ message: "Votre like a été supprimé" }))
                    .catch((error) => res.status(400).json({ error }))
                }

                if(sauce.usersDisliked.includes(userId)) {
                    Sauce.updateOne(
                    { _id: sauceId },
                    { $push: { usersLiked: userId }, $inc: { dislikes: -1 }})
                    .then(() => res.status(200).json({ message: "Votre dislike a été supprimé" }))
                    .catch((error) => res.status(400).json({ error }))
                }
            })
            .catch((error) => res.status(400).json({ error }))
        break;

        case -1 :
            Sauce.updateOne(
            { _id: sauceId },
            { $push: { usersLiked: userId }, $inc: { dislikes: +1 }})
            .then(() => res.status(200).json({ message: "Vous avez mis un dislike sur la sauce." }))
            .catch((error) => res.status(400).json({ error }))
        break;
    }
};

exports.updateSauce = (req, res, next) => {

    const sauceData = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }

    Sauce.updateOne(
    { _id : req.params.id}, 
    {...sauceData, _id: req.params.id})
    .then(res.status(200).json({ message : "Sauce modifiée"}))
    .catch((error) => res.status(400).json({ error }))
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {

        const fileName = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${fileName}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "La sauce a été supprimée !" }))
            .catch((error) => res.status(400).json({ error }));
        });

    })
    .catch((error) => res.status(400).json({ error }))
};