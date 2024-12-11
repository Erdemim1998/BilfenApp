const db = require('../models/index.js');
const District = db.districts;
const City = db.cities;
const Country = db.countries;
const { fn, col, Op, literal } = require('sequelize');

const GetAllDistricts = async (req, res) => {
    try {
        const districts = await District.findAll({
            include: [
                {
                    model: City,
                    as: 'City',
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
                                [fn('DATE_FORMAT', col('city->country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                                [fn('DATE_FORMAT', col('city->country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                            ]
                        }
                    ]
                }
            ],
            attributes: [
                'Id',
                'Name',
                [fn('DATE_FORMAT', col('district.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('district.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                'CityId'
            ]
        });

        return res.status(200).json(districts);
    } catch (error) {
        return res.status(400).json({
            message: `Hata: ${error.message}`
        });
    }
};

const GetAllDistrictsByCityId = async (req, res) => {
    try {
        const cityId = req.params.cityId;

        const districts = await District.findAll({
            where: {
                CityId: cityId
            },
            include: [
                {
                    model: City,
                    as: 'City',
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
                                [fn('DATE_FORMAT', col('city->country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                                [fn('DATE_FORMAT', col('city->country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                            ]
                        }
                    ]
                }
            ],
            attributes: [
                'Id',
                'Name',
                [fn('DATE_FORMAT', col('district.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('district.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                'CityId'
            ]
        });

        return res.status(200).json(districts);
    } catch (error) {
        return res.status(400).json({ message: `Hata: ${error.message}` });
    }
};

const GetDistrict = async (req, res) => {
    try {
        const id = req.params.id;

        const district = await District.findOne({
            where: {
                Id: id
            },
            include: [
                {
                    model: City,
                    as: 'City',
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
                                [fn('DATE_FORMAT', col('city->country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                                [fn('DATE_FORMAT', col('city->country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                            ]
                        }
                    ]
                }
            ],
            attributes: [
                'Id',
                'Name',
                [fn('DATE_FORMAT', col('district.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('district.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                'CityId'
            ]
        });

        if (district) {
            return res.status(200).json(district);
        }

        return res.status(204).json(null);
    } catch (error) {
        return res.status(400).json({ message: `Hata: ${error.message}` });
    }
};

const CreateDistrict = async (req, res) => {
    try {
        debugger;
        const { Id, Name, CityId } = req.body;

        const addedDistrict = await District.create({
            Id,
            Name,
            CityId
        });

        const districtWithCityAndCountry = await District.findOne({
            where: { Id: addedDistrict.Id },
            include: [
                {
                    model: City,
                    as: 'City',
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
                                [fn('DATE_FORMAT', col('city->country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                                [fn('DATE_FORMAT', col('city->country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                            ]
                        }
                    ]
                }
            ],
            attributes: [
                'Id',
                'Name',
                [fn('DATE_FORMAT', col('district.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('district.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                'CityId'
            ]
        });

        if (districtWithCityAndCountry) {
            return res.status(200).json(districtWithCityAndCountry);
        }

        return res.status(204).json([]);
    } catch (error) {
        return res.status(200).json({ code: 400, message: "Girilen ilçe bilgisine ait bir kayýt zaten var." });
    }
};

const EditDistrict = async (req, res) => {
    try {
        debugger;
        const { Id, Name, CityId } = req.body;
        const district = await District.findOne({ where: { Id } });

        if (district) {
            await District.update(
                { Name, CityId },
                { where: { Id } }
            );

            const districtWithCityAndCountry = await District.findOne({
                where: { Id },
                include: [
                    {
                        model: City,
                        as: 'City',
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
                                    [fn('DATE_FORMAT', col('city->country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                                    [fn('DATE_FORMAT', col('city->country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                                ]
                            }
                        ]
                    }
                ],
                attributes: [
                    'Id',
                    'Name',
                    [fn('DATE_FORMAT', col('district.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                    [fn('DATE_FORMAT', col('district.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt'],
                    'CityId'
                ]
            });

            return res.status(200).json(districtWithCityAndCountry);
        }

        return res.status(204).json({ message: 'Ýlçe kaydý bulunamadý!' });
    } catch (error) {
        return res.status(200).json({ code: 400, message: "Girilen ilçe bilgisine ait bir kayýt zaten var." });
    }
};

const DeleteDistrict = async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await District.destroy({
            where: { Id: id }
        });

        if (deleted) {
            return res.status(200).json({
                code: 200,
                message: 'Silme iþlemi baþarýyla yapýldý!'
            });
        } else {
            return res.status(204).json({
                code: 204,
                message: 'Ýlçe kaydý bulunamadý!'
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Silme iþlemi sýrasýnda bir hata oluþtu! Hata: ' + error.message
        });
    }
}

module.exports = { GetAllDistricts, GetAllDistrictsByCityId, GetDistrict, CreateDistrict, EditDistrict, DeleteDistrict };