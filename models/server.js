const express = require('express')
const cors = require('cors');

const { socketController } = require('../sockets/controller');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Socket IO
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        //////

        
        this.paths = {}

        //Connectar a Base de Datos
        // this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de las APP
        this.routes();

        // Configuracion de Sockets
        this.sockets();
    }

    // async conectarDB(){
    //     await dbConnection();
    // }


    middlewares(){
        //CORS
        this.app.use(cors());
        
        //Parseo - Lectura Body
        // this.app.use(express.json());

        //Directorio Público
        this.app.use(express.static('public'));
    }

    routes(){
        // this.app.use(this.paths.auth, require('../routes/auth'));
    }

    sockets(){

        this.io.on('connection', socketController);
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port)
        });
    }
}

module.exports = Server;