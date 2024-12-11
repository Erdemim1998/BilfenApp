const db = require('../models/index.js');
const Document = db.documents;
const User = db.users;
const Role = db.roles;
const { literal, fn, col } = require('sequelize');

const GetAllDocuments = async (req, res) => {
    try {
        const documents = await Document.findAll({
            attributes: [
                'Id',
                'Name',
                'FilePath',
                [literal(`CASE WHEN document.Status = 'OB' THEN 'Onay Bekliyor' 
                     WHEN document.Status = 'O' THEN 'Onaylandı' 
                     ELSE 'Reddedildi' END`), 'Status'],
                [fn('DATE_FORMAT', col('document.CreatedAt'), '%d.%m.%Y %H:%i:%s'), 'CreatedAt'],
                [fn('DATE_FORMAT', col('document.UpdatedAt'), '%d.%m.%Y %H:%i:%s'), 'UpdatedAt'],
                'UserId'
            ],
            include: [{
                model: User,
                required: false,
                as: 'User',
                attributes: [
                    'Id',
                    'FirstName',
                    'LastName',
                    'UserName',
                    'Email',
                    'Password',
                    'PasswordHash',
                    [fn('DATE_FORMAT', col('User.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                    [fn('DATE_FORMAT', col('User.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                    'RoleId'
                ],
                include: [{
                    model: Role,
                    required: false,
                    as: 'Role',
                    attributes: [
                        'Id',
                        'Name',
                        [fn('DATE_FORMAT', col('User->Role.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'], // Format Role's createdAt
                        [fn('DATE_FORMAT', col('User->Role.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']  // Format Role's updatedAt
                    ]
                }]
            }]
        });

        return res.status(200).json(documents);
    }

    catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

const GetAllDocumentsByUserId = async (req, res) => {
    try {
        let userId = req.params.userId;

        const documents = await Document.findAll({
            attributes: [
                'Id',
                'Name',
                'FilePath',
                [literal(`CASE WHEN document.Status = 'OB' THEN 'Onay Bekliyor' 
                     WHEN document.Status = 'O' THEN 'Onaylandı' 
                     ELSE 'Reddedildi' END`), 'Status'],
                [fn('DATE_FORMAT', col('document.CreatedAt'), '%d.%m.%Y %H:%i:%s'), 'CreatedAt'],
                [fn('DATE_FORMAT', col('document.UpdatedAt'), '%d.%m.%Y %H:%i:%s'), 'UpdatedAt'],
                'UserId'
            ],
            include: [{
                model: User,
                required: false,
                as: 'User',
                attributes: [
                    'Id',
                    'FirstName',
                    'LastName',
                    'UserName',
                    'Email',
                    'Password',
                    'PasswordHash',
                    [fn('DATE_FORMAT', col('User.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                    [fn('DATE_FORMAT', col('User.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                    'RoleId'
                ],
                include: [{
                    model: Role,
                    required: false,
                    as: 'Role',
                    attributes: [
                        'Id',
                        'Name',
                        [fn('DATE_FORMAT', col('User->Role.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('User->Role.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ]
                }]
            }],
            where: { UserId: userId }
        });

        return res.status(200).json(documents);
    }

    catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

const GetDocument = async (req, res) => {
    try {
        let id = req.params.id;
        const document = await Document.findOne({
            attributes: [
                'Id',
                'Name',
                'FilePath',
                [literal(`CASE WHEN document.Status = 'OB' THEN 'Onay Bekliyor' 
                     WHEN document.Status = 'O' THEN 'Onaylandı' 
                     ELSE 'Reddedildi' END`), 'Status'],
                [fn('DATE_FORMAT', col('document.CreatedAt'), '%d.%m.%Y %H:%i:%s'), 'CreatedAt'],
                [fn('DATE_FORMAT', col('document.UpdatedAt'), '%d.%m.%Y %H:%i:%s'), 'UpdatedAt'],
                'UserId'
            ],
            include: [{
                model: User,
                required: false,
                as: 'User',
                attributes: [
                    'Id',
                    'FirstName',
                    'LastName',
                    'UserName',
                    'Email',
                    'Password',
                    'PasswordHash',
                    [fn('DATE_FORMAT', col('User.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                    [fn('DATE_FORMAT', col('User.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                    'RoleId'
                ],
                include: [{
                    model: Role,
                    required: false,
                    as: 'Role',
                    attributes: [
                        'Id',
                        'Name',
                        [fn('DATE_FORMAT', col('User->Role.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('User->Role.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                    ],
                }]
            }],
            where: { Id: id }
        });

        if (document) {
            return res.status(200).json(document);
        }

        return res.status(204).json();
    }

    catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

const CreateDocument = async (req, res) => {
    try {
        const docData = await Document.findOne({ where: { Name: req.body.Name, UserId: req.body.UserId } });

        if (!docData) {
            let addedDocument = {
                Name: req.body.Name,
                FilePath: req.body.FilePath,
                Status: req.body.Status,
                UserId: req.body.UserId
            }

            const document = await Document.create(addedDocument);

            const documentWithUserAndRole = await Document.findOne({
                attributes: [
                    'Id',
                    'Name',
                    'FilePath',
                    [literal(`CASE WHEN document.Status = 'OB' THEN 'Onay Bekliyor' 
                     WHEN document.Status = 'O' THEN 'Onaylandı' 
                     ELSE 'Reddedildi' END`), 'Status'],
                    [fn('DATE_FORMAT', col('document.CreatedAt'), '%d.%m.%Y %H:%i:%s'), 'CreatedAt'],
                    [fn('DATE_FORMAT', col('document.UpdatedAt'), '%d.%m.%Y %H:%i:%s'), 'UpdatedAt'],
                    'UserId'
                ],
                include: [{
                    model: User,
                    as: 'User',
                    attributes: [
                        'Id',
                        'FirstName',
                        'LastName',
                        'UserName',
                        'Email',
                        'Password',
                        'PasswordHash',
                        [fn('DATE_FORMAT', col('User.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('User.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                        'RoleId'
                    ],
                    include: [{
                        model: Role,
                        as: 'Role',
                        attributes: [
                            'Id',
                            'Name',
                            [fn('DATE_FORMAT', col('User->Role.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                            [fn('DATE_FORMAT', col('User->Role.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                        ],
                    }]
                }],
                where: { Id: document.Id }
            });

            if (documentWithUserAndRole) {
                return res.status(200).json(documentWithUserAndRole);
            }

            return res.status(204).json();
        }

        else {
            return res.status(200).json({ message: 'Girilen evraka ait bir kayıt zaten var.' });
        }
    }

    catch (err) {
        res.status(400).send({ message: `Kayıt işlemi sırasında bir hata oluştu! Hata: ${err.message}` });
    }
}

const EditDocument = async (req, res) => {
    try {
        let id = req.body.Id;
        await Document.update(req.body, { where: { Id: id } });

        const documentWithUserAndRole = await Document.findOne({
            attributes: [
                'Id',
                'Name',
                'FilePath',
                [literal(`CASE WHEN document.Status = 'OB' THEN 'Onay Bekliyor' 
                     WHEN document.Status = 'O' THEN 'Onaylandı' 
                     ELSE 'Reddedildi' END`), 'Status'],
                [fn('DATE_FORMAT', col('document.CreatedAt'), '%d.%m.%Y %H:%i:%s'), 'CreatedAt'],
                [fn('DATE_FORMAT', col('document.UpdatedAt'), '%d.%m.%Y %H:%i:%s'), 'UpdatedAt'],
                'UserId'
            ],
            include: [{
                model: User,
                as: 'User',
                attributes: [
                    'Id',
                    'FirstName',
                    'LastName',
                    'UserName',
                    'Email',
                    'Password',
                    'PasswordHash',
                    [fn('DATE_FORMAT', col('User.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                    [fn('DATE_FORMAT', col('User.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                    'RoleId'
                ],
                include: [{
                    model: Role,
                    as: 'Role',
                    attributes: [
                        'Id',
                        'Name',
                        [fn('DATE_FORMAT', col('User->Role.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('User->Role.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                    ],
                }]
            }],
            where: { Id: id }
        });

        if (documentWithUserAndRole) {
            return res.status(200).json(documentWithUserAndRole);
        }

        return res.status(204).json({ message: "Evrak kaydı bulunamadı!" });
    }

    catch (err) {
        res.status(400).json({ message: `Kayıt işlemi sırasında bir hata oluştu! Hata: ${err.message}` });
    }
}

const DeleteDocument = async (req, res) => {
    try {
        let id = req.params.id;
        let deleted = await Document.destroy({ where: { Id: id } });

        if (deleted) {
            return res.status(200).json({ code: 200, message: 'Silme işlemi başarıyla yapıldı!' });
        }

        else {
            return res.status(200).json({ code: 204, message: 'Evrak kaydı bulunamadı!' });
        }
    }

    catch (err) {
        return res.status(400).json({ message: `Silme işlemi sırasında bir hata oluştu! Hata: ${err.message}` });
    }
}

module.exports = {
    GetAllDocuments,
    GetAllDocumentsByUserId,
    GetDocument,
    CreateDocument,
    EditDocument,
    DeleteDocument
}