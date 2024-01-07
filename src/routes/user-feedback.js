const {Router} = require("express");
const Joi = require('joi');
const {UserFeedback} = require("./../models/UserFeedback");

const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    comment: Joi.string().required(),
});

async function feedbackBodyValidator(req, res, next){
    try {
        const {error} = schema.validate(req.body);
        if(error){
            throw new Error(error.message);
        }
        next();
    } catch(err) {
        res.status(500).send({error: err.message || 'unknown error!'});
    }
}

const router  = Router();
router.post("/", feedbackBodyValidator, async (req, res) => {
    try{
        const userFeedback = UserFeedback.build(req.body);
        await userFeedback.save();
        res.send({feedbackID: userFeedback.getDataValue('fid')});
    } catch (error){
        res.status(500).send({error: err.message || 'unknown error!'});
    }
});

module.exports = router;