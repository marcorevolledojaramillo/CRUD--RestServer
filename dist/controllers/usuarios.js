"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
//Regresa todos los usuarios en la base de datos
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(typeof req);
    const usuarios = yield usuario_1.default.findAll()
        .catch((err) => {
        console.log(err);
        return res.status(500).json({
            msg: 'Error interno del servidor, comuniquese con el administrador.'
        });
    });
    return res.status(200).json({
        msg: 'Ok- GetUsuarios',
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
//Regresa un usuario de la base de datos por un ID extraido de la req.
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id)
        .catch((err) => {
        console.log(err);
        return res.status(500).json({
            msg: 'Error interno del servidor, comuniquese con el administrador.'
        });
    });
    if (usuario) {
        return res.json({
            msg: 'Ok- getUsuario',
            usuario
        });
    }
    else {
        return res.status(400).json({
            msg: `Ok- No se encontro ningun usuario con este ID ${id}`,
        });
    }
});
exports.getUsuario = getUsuario;
//Guarda nuevo registro de de un usuario en la base de datos
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email } = req.body; //Se extreae solo los campos solicitados, para evitar problemas de relacion. 
    const data = { nombre, email };
    try {
        const usuarioCreado = yield usuario_1.default.create(data)
            .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Error interno del servidor, comuniquese con el administrador.'
            });
        });
        if (usuarioCreado) {
            return res.status(201).json({
                msg: 'Ok - postUsuario',
                usuarioCreado
            });
        }
        else {
            return res.status(400).json({
                msg: 'Hubo un error al procesar, Rectifique si todos los campos necesarios estan completados'
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Error del servidor - Hable con el administrador'
        });
    }
});
exports.postUsuario = postUsuario;
//Actualizar usuario
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userValid = yield usuario_1.default.findByPk(id);
    if (userValid) {
        const _a = req.body, { estado, createdAt, updatedAt } = _a, resto = __rest(_a, ["estado", "createdAt", "updatedAt"]);
        if (Object.entries(resto).length === 0) {
            return res.status(400).json({
                msg: 'Tiene que ingresar algun cambio para realizar alguna modificacion',
            });
        }
        try {
            const usuarioActualizado = yield userValid.update(resto);
            if (usuarioActualizado) {
                return res.json({
                    msg: 'Se actualizo correctamente el usuario',
                });
            }
            else {
                return res.status(400).json({
                    msg: 'No se pudo hacer rectifique el nombre de los campos, y valores ingresados',
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Hable con el administrador',
            });
        }
    }
    else {
        return res.status(400).json({
            msg: 'El usuario que desea modificar no se encuentra en la base de datos',
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userValid = yield usuario_1.default.findByPk(id);
    if (userValid) {
        try {
            const usuarioEliminado = yield userValid.update({ estado: false });
            if (usuarioEliminado) {
                return res.json({
                    msg: `Se elimino correctamente el usuariocon ID ${id}`, usuarioEliminado
                });
            }
            else {
                return res.status(400).json({
                    msg: 'No se pudo hacer rectifique el ID ingresado',
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Hable con el administrador',
            });
        }
    }
    else {
        return res.status(400).json({
            msg: 'No se pudo hacer rectifique el ID ingresado',
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map