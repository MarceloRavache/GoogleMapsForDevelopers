const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('./utils/parseStringAsArray');

module.exports = {
    async index(req,res){
        const devs = await Dev.find();
        return res.json(devs);
    },
    async store(req,res){
        const {github_username,techs,latitude,longitude} = req.body;
        const response = await axios.get(`https://api.github.com/users/${github_username}`);

        let dev = await Dev.findOne({github_username});

        if(!dev){
            const {login, avatar_url} = response.data;
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates:[latitude,longitude]
            };

            dev = await Dev.create({
                github_username,
                name: login,
                avatar_url,
                techs:techsArray,
                location,
            });
            res.json(dev);
        }else{
            res.json({error:"User already exists"})
        }

    }
}