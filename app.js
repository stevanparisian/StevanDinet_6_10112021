const express = require('express');

const app = express();

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        userId: 'identifiant MongoDB',
        name: 'nom de la sauce',
        manufacturer: 'fabricant de la sauce',
        description: 'description de la sauce',
        mainPepper: 'le principal ingrédient épicé de la sauce',
        imageUrl: 'URL image de la sauce téléchargée par utilisateur',
        heat: 'nombre entre 1 et 10 décrivant la sauce',
        likes: 'nombre utilisateurs qui aiment (= likent) la sauce',
        dislikes:'nombre utilisateurs qui naiment pas (= dislike) la sauce',
        usersLiked:'tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce',
        usersDisliked:'tableau des identifiants des utilisateurs qui nont pas aimé (= disliked) la sauce',
      },
    ];
    res.status(200).json(stuff);
  });

module.exports = app; 