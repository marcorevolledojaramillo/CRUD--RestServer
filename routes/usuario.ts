import { Router } from 'express';
import { check } from 'express-validator'; 

import { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } from '../controllers/usuarios';
import { validarCampos } from '../middleware/validar-campos';


const router = Router();

router.get('/',       getUsuarios);
router.get('/:id', [
    check('id','El id es obligatorio para realizar una consulta').notEmpty(),
    validarCampos
]  , getUsuario);
router.post('/',[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('email','El email es obligatorio').notEmpty(),
    check('email','Ingrese un email valido').isEmail(),
    validarCampos
]  ,    postUsuario);
router.put('/:id',[
    check('id','El id es obligatorio para realizar una actualizacion').notEmpty(),
    validarCampos
] ,   putUsuario);
router.delete('/:id', deleteUsuario);

export default router;