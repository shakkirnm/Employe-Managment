const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')


//UPDATE USER
router.put('/:id', async(req,res) => {

    const user = await User.findById(req.params.id)

    if(user.isSuperUser == true) {
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);

            }catch(err){
                return res.status(500).json(err)
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.body.userId, {
                $set : req.body
            })
            res.status(200).json("Account has been Updated")
        }catch (err){
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).json("Editing permision only for Super User")
    }
})

//DELETE USER
router.delete('/:id', async(req,res) => {
    const user = await User.findById(req.params.id)
    if(user.isSuperUser == true) {
        try{
            await User.findByIdAndDelete( req.body.userId);
            res.status(200).json("Account has been deleted successfully")
        }catch (err){
            return res.status(500).json(err)
        }
        
    }else{
        return res.status(403).json("Deleting permision only for Super User!")
    }
})

//GET ALL USER
router.get('/all', async (req,res) => {
    try{
        const users = await User.find()
        res.status(200).json(users)

    }catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router