require('./config/config');
const mongoose = require('mongoose');

mongoose.connect(process.env.URLDB, {

    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(db => console.log('Database is connected'))
.catch(err => console.error(err));