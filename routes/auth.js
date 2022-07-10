const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
  

//REGISTER
router.get("/register", async (req,res) => {
    
    try{

        //GENERATE NEW PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //CREATE NEW USER
        const newUser = new User({
            empName : req.body.empName,
            email : req.body.email,
            dateOfJoin : req.body.dateOfJoin,
            password : hashedPassword,
            isSuperUser : req.body.isSuperUser
        })

        //SAVE 
        const user = await newUser.save();

        //NODEMAILER
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'timepass7077@gmail.com',
              pass: 'ixdbzimzwgixkolq'
            }
          });

          var mailOptions = {
            from: 'timepass7077@gmail.com',
            to: 'shakkirnm@gmail.com',
            subject: 'Login Credentials',
            text: 'Your Email Email is : '+ req.body.email + '\nPassword is : '+ req.body.password
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        res.status(200).json(user);
    }catch (err){
        res.status(500).json(err);
    }
});


//LOGIN
router.post("/login", async(req,res)=> {
    try{
        const user = await User.findOne({email : req.body.email});
        !user && res.status(404).send("user not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong Password")

        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err);
    }
    
})


module.exports = router;