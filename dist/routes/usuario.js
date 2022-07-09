"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const validar_campos_1 = require("../middleware/validar-campos");
const router = (0, express_1.Router)();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'El id es obligatorio para realizar una consulta').notEmpty(),
    validar_campos_1.validarCampos
], usuarios_1.getUsuario);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').notEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').notEmpty(),
    (0, express_validator_1.check)('email', 'Ingrese un email valido').isEmail(),
    validar_campos_1.validarCampos
], usuarios_1.postUsuario);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id es obligatorio para realizar una actualizacion').notEmpty(),
    validar_campos_1.validarCampos
], usuarios_1.putUsuario);
router.delete('/:id', usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map