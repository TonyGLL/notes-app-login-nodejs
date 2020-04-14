
/*======================*/
/*        PORT          */
/*======================*/
process.env.PORT = process.env.PORT || 3000;


/*======================*/
/*      ENVIROMENT      */
/*======================*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/*======================*/
/*       DATABASE       */
/*======================*/
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    
    urlDB = 'mongodb://localhost/notes-db-app';
}else {

    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;