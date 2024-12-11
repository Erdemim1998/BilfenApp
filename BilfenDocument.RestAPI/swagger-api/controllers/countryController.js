const db = require('../models/index.js');
const Country = db.countries;
const { literal, fn, col } = require('sequelize');

const GetAllCountries = async (req, res) => {
    try {
        const countries = await Country.findAll({
            attributes: [
                'Id',
                'Name',
                [
                    literal("DATE_FORMAT(createdAt, '%d.%m.%Y %H:%i:%s')"),
                    'createdAt'
                ],
                [
                    literal("DATE_FORMAT(updatedAt, '%d.%m.%Y %H:%i:%s')"),
                    'updatedAt'
                ]
            ]
        });

        res.status(200).json(countries);
    } catch (error) {
        res.status(400).json({ message: `Hata: ${error.message}` });
    }
};

const GetCountry = async (req, res) => {
    try {
        const id = req.params.id;

        const country = await Country.findOne({
            where: { Id: id },
            attributes: [
                'Id',
                'Name',
                [literal("DATE_FORMAT(createdAt, '%d.%m.%Y %H:%i:%s')"), 'createdAt'],
                [literal("DATE_FORMAT(updatedAt, '%d.%m.%Y %H:%i:%s')"), 'updatedAt'],
            ],
        });

        if (country) {
            return res.status(200).json(country);
        }

        return res.status(204).json(null);
    } catch (error) {
        return res.status(400).json({ message: `Hata: ${error.message}` });
    }
};

const CreateCountry = async (req, res) => {
    try {
        debugger;
        const { Id, Name } = req.body;

        const newCountryData = {
            Id,
            Name,
        };

        let country = await Country.create(newCountryData);

        country = await Country.findOne({
            attributes: [
                'Id',
                'Name',
                [fn('DATE_FORMAT', col('createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
            ],
            where: { Id: country.Id }
        });

        if (country) {
            return res.status(200).json(country);
        }

        else {
            return res.status(204).json([]);
        }
    } catch (error) {
        return res.status(200).json({
            code: 400,
            message: "Girilen �lke bilgisine sahip bir kay�t zaten var."
        });
    }
};

const EditCountry = async (req, res) => {
    try {
        debugger;
        const { Id, Name } = req.body;
        let country = await Country.findByPk(Id);

        if (country) {
            await Country.update(
                { Name },
                { where: { Id } }
            );

            country = await Country.findOne({
                attributes: [
                    'Id',
                    'Name',
                    [fn('DATE_FORMAT', col('createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                    [fn('DATE_FORMAT', col('updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                ],
                where: { Id: country.Id }
            });

            return res.status(200).json(country);
        }

        return res.status(204).json({ message: '�lke kayd� bulunamad�!' });
    } catch (error) {
        return res.status(200).json({
            code: 400,
            message: "Girilen �lke bilgisine sahip bir kay�t zaten var."
        });
    }
};

const DeleteCountry = async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await Country.destroy({
            where: { Id: id }
        });

        if (deleted) {
            return res.status(200).json({
                code: 200,
                message: 'Silme i�lemi ba�ar�yla yap�ld�!'
            });
        }

        else {
            return res.status(204).json({
                code: 204,
                message: '�lke kayd� bulunamad�!'
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: `Silme i�lemi s�ras�nda bir hata olu�tu! Hata: ${error.message}`
        });
    }
};

module.exports = { GetAllCountries, GetCountry, CreateCountry, EditCountry, DeleteCountry };