const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},async(email, password, done)=>{
    const user =await User.findOne({email});
    if(!user){
        return done(null,false,{ message: 'No se ha encontrado un usuario registrado'});
    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null,user);
        }else{
            return done(null,false,{message:'La contraseña ingresada no es la correcta.'});
        }
    }

}));

passport.serializeUser((user,done) =>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    })
});