import {Sequelize} from 'sequelize';


const db = new Sequelize('cursoNode', 'root','', {
    host:'localhost',
    dialect:'mysql',

});

export default db;
