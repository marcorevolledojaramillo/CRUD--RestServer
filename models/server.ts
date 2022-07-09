
import express, {Application} from 'express';
import cors from 'cors';
import userRoutes from '../routes/usuario'
import Conexion from '../db/connection'

class Server {

    private app: Application;
    private port: string;
    private apiPath={
        usuarios:'/api/usuarios'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT ||'8000';
        
        this.dbConnection();
        this. middlewares();
        this.routes();
        
    }

    async dbConnection(){
        try {
            await Conexion.authenticate();
            console.log('Base de Datos Activa');
        } catch (error: any) {
            throw new Error(error);
        }
    }



    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura del body
        this.app.use(express.json());

        //Carpeta publica
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.apiPath.usuarios, userRoutes)
    }


    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en puerto http://localhost:${this.port}`);
        })
    }

}

export default Server; 