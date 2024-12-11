const db = require('../models/index.js');
const Role = db.roles;
const { fn, col } = require('sequelize');

const GetAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll({
            attributes: [
                'Id',
                'Name',
                [fn('DATE_FORMAT', col('createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
            ]
        });

        return res.status(200).json(roles);
    }

    catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

const GetRole = async (req, res) => {
    try {
        let id = req.params.id;
        const role = await Role.findOne({
            attributes: [
                'Id',
                'Name',
                [fn('DATE_FORMAT', col('createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
            ],
            where: { Id: id }
        });

        if (role) {
            return res.status(200).json(role);
        }

        return res.status(204).json();
    }

    catch (err) {
        return res.status(400).json({ message: err.message });
    }
 }

const CreateRole = async (req, res) => {
    try {
        let addedRole = {
            Name: req.body.Name
        }

        const savedRole = await Role.create(addedRole);

        const role = await Role.findOne({
            attributes: [
                'Id',
                'Name',
                [fn('DATE_FORMAT', col('createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
            ],
            where: { Id: savedRole.Id }
        });

        if (role) {
            return res.status(200).json(role);
        }

        return res.status(204).json();
    }

    catch (err) {
        return res.status(200).json({ code: 400, message: `Girilen role ait bir kayıt zaten var.` });
    }
}

const EditRole = async (req, res) => {
    try {
        let id = req.body.Id;
        let updated = await Role.update(req.body, { where: { Id: id } });

        const role = await Role.findOne({
            attributes: [
                'Id',
                'Name',
                [fn('DATE_FORMAT', col('createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
            ],
            where: { Id: id }
        });

        if (updated) {
            return res.status(200).json(role);
        }

        return res.status(204).json({ message: "Rol kaydı bulunamadı!" });
    }

    catch (err) {
        return res.status(200).json({ code: 400, message: `Girilen role ait bir kayıt zaten var.` });
    }
}

const DeleteRole = async (req, res) => {
    try {
        let id = req.params.id;
        let deleted = await Role.destroy({ where: { Id: id } });

        if (deleted) {
            return res.status(200).json({ code: 200, message: 'Silme işlemi başarıyla yapıldı!' });
        }

        else {
            return res.status(200).json({ code: 204, message: 'Rol kaydı bulunamadı!' });
        }
    }

    catch (err) {
        return res.status(400).json({ message: `Silme işlemi sırasında bir hata oluştu! Hata: ${err.message}` });
    }
}

module.exports = {
    GetAllRoles,
    GetRole,
    CreateRole,
    EditRole,
    DeleteRole
}