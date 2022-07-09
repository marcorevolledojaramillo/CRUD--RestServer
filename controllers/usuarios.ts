import { Request, Response } from 'express';
import Usuario from '../models/usuario';
//Regresa todos los usuarios en la base de datos
export const getUsuarios = async (req: Request, res: Response) => {
    console.log(typeof req);
    const usuarios = await Usuario.findAll()
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Error interno del servidor, comuniquese con el administrador.'
            })
        });

    return res.status(200).json({
        msg: 'Ok- GetUsuarios',
        usuarios
    });

}
//Regresa un usuario de la base de datos por un ID extraido de la req.
export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id)
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Error interno del servidor, comuniquese con el administrador.'
            })
        });

    if (usuario) {
        return res.json({
            msg: 'Ok- getUsuario',
            usuario
        });
    } else {
        return res.status(400).json({
            msg: `Ok- No se encontro ningun usuario con este ID ${id}`,
        });
    }

}

//Guarda nuevo registro de de un usuario en la base de datos
export const postUsuario = async (req: Request, res: Response) => {
    const { nombre, email } = req.body; //Se extreae solo los campos solicitados, para evitar problemas de relacion. 
    const data = { nombre, email };
    try {
        const usuarioCreado = await Usuario.create(data)
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    msg: 'Error interno del servidor, comuniquese con el administrador.'
                })
            });
        if (usuarioCreado) {
            return res.status(201).json({
                msg: 'Ok - postUsuario',
                usuarioCreado
            });
        } else {
            return res.status(400).json({
                msg: 'Hubo un error al procesar, Rectifique si todos los campos necesarios estan completados'
            });
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Error del servidor - Hable con el administrador'
        });
    }



}

//Actualizar usuario
export const putUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const userValid = await Usuario.findByPk(id);
    if (userValid) {
        const { estado, createdAt, updatedAt, ...resto } = req.body;
        if (Object.entries(resto).length === 0) {
            return res.status(400).json({
                msg: 'Tiene que ingresar algun cambio para realizar alguna modificacion',
            });
        }
        try {
            const usuarioActualizado = await userValid.update(resto)
            if (usuarioActualizado) {
                return res.json({
                    msg: 'Se actualizo correctamente el usuario',


                });
            } else {
                return res.status(400).json({
                    msg: 'No se pudo hacer rectifique el nombre de los campos, y valores ingresados',
                });
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                msg: 'Hable con el administrador',
            });
        }
    } else {
        return res.status(400).json({
            msg: 'El usuario que desea modificar no se encuentra en la base de datos',
        });
    }

}

export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const userValid = await Usuario.findByPk(id);

    if (userValid) {
        try {
            const usuarioEliminado = await userValid.update({ estado: false })
            if (usuarioEliminado) {
                return res.json({
                    msg: `Se elimino correctamente el usuariocon ID ${id}`,usuarioEliminado
                });
            } else {
                return res.status(400).json({
                    msg: 'No se pudo hacer rectifique el ID ingresado',
                });
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                msg: 'Hable con el administrador',
            });
        }
    }else{
        return res.status(400).json({
            msg: 'No se pudo hacer rectifique el ID ingresado',
        });
    }

}