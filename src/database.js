const mongoose = require('mongoose');

const {NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE} = process.env;

const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

const mongodb_uri= "mongodb+srv://gm:gm2020@gm-ny80m.gcp.mongodb.net/Notas?retryWrites=true&w=majority";

mongoose.connect(mongodb_uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
    
}).then(db => console.log('Db is Connected'))
.catch(err=> console.log(err));