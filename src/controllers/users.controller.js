const usersCtrl = {};
const User = require('../models/User');
const passport = require('passport');

usersCtrl.renderSingUpForm= (req,res)=>{
    res.render('users/signup');
};

usersCtrl.singup = async(req,res)=>{
    const errors= [];
    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text:'Password do not match'});
    }
    if(password.length < 4){
        errors.push({text: 'Password must be at least 4 characters.'});
    }
    if(errors.length>0){
        res.render('users/signup',{
            errors,
            name,
            email,
            password,
            confirm_password
        })
    }else{
        const emailUser = await User.findOne({email:email});
        if(emailUser){
            req.flash('error_msg','El correo ya se encuentra registrado');
            res.redirect('/users/signup');
        }else{
            const newUser= new User({name,email,password});
            newUser.password= await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg','Te has registrado!');
            res.redirect('/users/signin');
        }
        
    }
};


usersCtrl.renderSingInForm= (req,res)=>{
    res.render('users/signin');
};

usersCtrl.singin = passport.authenticate('local',{
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

usersCtrl.logout = (req,res)=>{
    req.logout();
    req.flash('success_msg',"Se ha cerrado la sesion!");
    res.redirect('/users/signin');
}


module.exports=usersCtrl;