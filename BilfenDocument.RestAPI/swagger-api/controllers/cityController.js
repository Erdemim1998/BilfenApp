const db = require('../models/index.js');
const City = db.cities;
const Country = db.countries;
const { fn, col, Op, literal } = require('sequelize');

const GetAllCities = async (req, res) => {
    try {
        const cities = await City.findAll({
            attributes: [
                'Id',
                'Name',
                [fn('DATE_FORMAT', col('city.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('city.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                'CountryId'
            ],
            include: [
                {
                    model: Country,
                    as: 'Country',
                    attributes: [
                        'Id',
                        'Name',
                        [fn('DATE_FORMAT', col('country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ]
                }
            ]
        });

        return res.status(200).json(cities);
    } catch (error) {
        return res.status(400).json({
            message: `Hata: ${error.message}`
        });
    }
};

const GetAllCitiesByCountryId = async (req, res) => {
    try {
        const countryId = req.params.countryId;

        const cities = await City.findAll({
            where: { CountryId: countryId },
            attributes: [
                'Id',
                'Name',
                [fn('DATE_FORMAT', col('city.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('city.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                'CountryId'
            ],
            include: [
                {
                    model: Country,
                    as: 'Country',
                    attributes: [
                        'Id',
                        'Name',
                        [fn('DATE_FORMAT', col('country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ]
                }
            ]
        });

        return res.status(200).json(cities);
    } catch (error) {
        return res.status(400).json({
            message: `Hata: ${error.message}`
        });
    }
};

const GetCity = async (req, res) => {
    try {
        const id = req.params.id;

        const city = await City.findOne({
            where: { Id: id },
            attributes: [
                'Id',
                'Name',
                [fn('DATE_FORMAT', col('city.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('city.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                'CountryId'
            ],
            include: [
                {
                    model: Country,
                    as: 'Country',
                    attributes: [
                        'Id',
                        'Name',
                        [fn('DATE_FORMAT', col('country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ]
                }
            ]
        });

        if (city) {
            return res.status(200).json(city);
        }

        return res.status(204).json(null);
    } catch (error) {
        return res.status(400).json({
            message: `Hata: ${error.message}`
        });
    }
};

const CreateCity = async (req, res) => {
    try {
        const { Id, Name, CountryId } = req.body;

        const addedCity = {
            Id,
            Name,
            CountryId
        };

        const city = await City.create(addedCity);

        const cityWithCountry = await City.findOne({
            where: { Id: city.Id },
            attributes: [
                'Id',
                'Name',
                [fn('DATE_FORMAT', col('city.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('city.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                'CountryId'
            ],
            include: [
                {
                    model: Country,
                    as: 'Country',
                    attributes: [
                        'Id',
                        'Name',
                        [fn('DATE_FORMAT', col('country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ]
                }
            ]
        });

        if (cityWithCountry) {
            return res.status(200).json(cityWithCountry);
        }

        return res.status(204).json([]);
    } catch (error) {
        return res.status(200).json({
            code: 400,
            message: "Girilen il bilgisine sahip bir kayýt zaten var."
        });
    }
};

const EditCity = async (req, res) => {
    try {
        const { Id, Name, CountryId } = req.body;

        const city = await City.findByPk(Id);

        if (city) {
            await City.update(
                { Name, CountryId },
                { where: { Id } }
            );

            const cityData = await City.findOne({
                where: { Id },
                attributes: [
                    'Id',
                    'Name',
                    [fn('DATE_FORMAT', col('city.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                    [fn('DATE_FORMAT', col('city.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                    'CountryId'
                ],
                include: [
                    {
                        model: Country,
                        as: 'Country',
                        attributes: [
                            'Id',
                            'Name',
                            [fn('DATE_FORMAT', col('country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                            [fn('DATE_FORMAT', col('country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                        ]
                    }
                ]
            });

            return res.status(200).json(cityData);
        }

        return res.status(204).json({ message: 'Ýl kaydý bulunamadý!' });
    } catch (error) {
        return res.status(200).json({
            code: 400,
            message: "Girilen il bilgisine sahip bir kayýt zaten var."
        });
    }
};

const DeleteCity = async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await City.destroy({ where: { Id: id } });

        if (deleted) {
            return res.status(200).json({
                code: 200,
                message: 'Silme iþlemi baþarýyla yapýldý!'
            });
        }

        else {
            return res.status(204).json({
                code: 204,
                message: 'Ýl kaydý bulunamadý!'
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: `Silme iþlemi sýrasýnda bir hata oluþtu! Hata: ${error.message}`
        });
    }
};

module.exports = { GetAllCities, GetAllCitiesByCountryId, GetCity, CreateCity, EditCity, DeleteCity };