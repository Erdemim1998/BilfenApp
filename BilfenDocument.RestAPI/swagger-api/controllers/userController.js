const db = require('../models/index.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = db.users;
const Role = db.roles;
const Country = db.countries;
const City = db.cities;
const District = db.districts;
const { fn, col, Op, literal } = require('sequelize');
const bcrypt = require('bcrypt');
const webpush = require('web-push');
const secretKey = '4af619f021d708d0c57c49f29eec55ed34e3fca806dceaac6322e8b57fbf0c017cad7aee128a393b8884954adf4173cd68f9d4ad3b841f9369b7e558cb74699303f1d391f01b934d52f2e606e410eb31a43c4be82e0a7b231c4a8f2f5c05ac4f87299493275a507208f51a0e4023fa3cc2b0d6acc63fc4ba9feafad6948c21ed72e628f90b948fa16c04d5aa872265e06826ff0707e04cbb9c39624e99f7705865700ea1ef39eb7ab2390d5a24cec7ab557b7ebe27cbb282ee217788ae167bf95ae7232dc2fe2c762a97edf1cc04ae81554d26666ff2c485fc15b40175de9eaf09e98a558d016f73a98a0e8b92205a44c3c7a4748a25b70bfe06d73a069021f7';

const GetAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: [
                'Id',
                'FirstName',
                'LastName',
                'UserName',
                'Email',
                'Password',
                'PasswordHash',
                'ImagePath',
                'TCKN',
                'MotherName',
                'FatherName',
                [fn('DATE_FORMAT', col('user.BirthDate'), '%d.%m.%Y %H:%i:%s'), 'BirthDate'],
                [literal(`CASE WHEN Gender = 'E' THEN 'Erkek' ELSE 'Kadın' END`), 'Gender'],
                'CivilStatus',
                [fn('DATE_FORMAT', col('user.EmploymentDate'), '%d.%m.%Y %H:%i:%s'), 'EmploymentDate'],
                [literal(`CASE 
                    WHEN MilitaryStatus = 'C' THEN 'Tamamlamış' 
                    WHEN MilitaryStatus = 'P' THEN 'Tecilli' 
                    WHEN MilitaryStatus = 'E' THEN 'Muaf' 
                    ELSE NULL END`), 'MilitaryStatus'],
                [fn('DATE_FORMAT', col('user.PostponementDate'), '%d.%m.%Y %H:%i:%s'), 'PostponementDate'],
                'Address',
                'RoleId',
                'CountryId',
                'CityId',
                'DistrictId',
                [fn('DATE_FORMAT', col('user.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('user.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
            ],
            include: [
                {
                    model: Role,
                    as: 'Role',
                    attributes: [
                        'Id',
                        'Name',
                        [fn('DATE_FORMAT', col('role.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('role.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ]
                },
                {
                    model: Country,
                    as: 'Country',
                    attributes: [
                        'Id',
                        'Name',
                        [fn('DATE_FORMAT', col('country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ]
                },
                {
                    model: City,
                    as: 'City',
                    attributes: [
                        'Id',
                        'Name',
                        'CountryId',
                        [fn('DATE_FORMAT', col('city.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('city.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ],
                    include: {
                        model: Country,
                        as: 'Country',
                        attributes: [
                            'Id',
                            'Name',
                            [fn('DATE_FORMAT', col('city->country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                            [fn('DATE_FORMAT', col('city->country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                        ]
                    }
                },
                {
                    model: District,
                    as: 'District',
                    attributes: [
                        'Id',
                        'Name',
                        'CityId',
                        [fn('DATE_FORMAT', col('district.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('district.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ],
                    include: {
                        model: City,
                        as: 'City',
                        attributes: [
                            'Id',
                            'Name',
                            'CountryId',
                            [fn('DATE_FORMAT', col('district->city.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                            [fn('DATE_FORMAT', col('district->city.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                        ],
                        include: {
                            model: Country,
                            as: 'Country',
                            attributes: [
                                'Id',
                                'Name',
                                [fn('DATE_FORMAT', col('district->city->country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                                [fn('DATE_FORMAT', col('district->city->country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                            ]
                        }
                    }
                }
            ]
        });

        return res.status(200).json(users);
    }

    catch (err) {
        return res.status(400).json({ message: `Hata: ${error.message}` });
    }
}

const GetUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findOne({
            attributes: [
                'Id',
                'FirstName',
                'LastName',
                'UserName',
                'Email',
                'Password',
                'PasswordHash',
                'ImagePath',
                'TCKN',
                'MotherName',
                'FatherName',
                [fn('DATE_FORMAT', col('user.BirthDate'), '%d.%m.%Y %H:%i:%s'), 'BirthDate'],
                [literal(`CASE WHEN Gender = 'E' THEN 'Erkek' ELSE 'Kadın' END`), 'Gender'],
                'CivilStatus',
                [fn('DATE_FORMAT', col('user.EmploymentDate'), '%d.%m.%Y %H:%i:%s'), 'EmploymentDate'],
                [literal(`CASE 
                    WHEN MilitaryStatus = 'C' THEN 'Tamamlamış' 
                    WHEN MilitaryStatus = 'P' THEN 'Tecilli' 
                    WHEN MilitaryStatus = 'E' THEN 'Muaf' 
                    ELSE NULL END`), 'MilitaryStatus'],
                [fn('DATE_FORMAT', col('user.PostponementDate'), '%d.%m.%Y %H:%i:%s'), 'PostponementDate'],
                'Address',
                'RoleId',
                'CountryId',
                'CityId',
                'DistrictId',
                [fn('DATE_FORMAT', col('user.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('user.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
            ],
            include: [
                {
                    model: Role,
                    as: 'Role',
                    attributes: [
                        'Id',
                        'Name',
                        [fn('DATE_FORMAT', col('role.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('role.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ]
                },
                {
                    model: Country,
                    as: 'Country',
                    attributes: [
                        'Id',
                        'Name',
                        [fn('DATE_FORMAT', col('country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ]
                },
                {
                    model: City,
                    as: 'City',
                    attributes: [
                        'Id',
                        'Name',
                        'CountryId',
                        [fn('DATE_FORMAT', col('city.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('city.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ],
                    include: {
                        model: Country,
                        as: 'Country',
                        attributes: [
                            'Id',
                            'Name',
                            [fn('DATE_FORMAT', col('city->country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                            [fn('DATE_FORMAT', col('city->country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                        ]
                    }
                },
                {
                    model: District,
                    as: 'District',
                    attributes: [
                        'Id',
                        'Name',
                        'CityId',
                        [fn('DATE_FORMAT', col('district.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('district.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ],
                    include: {
                        model: City,
                        as: 'City',
                        attributes: [
                            'Id',
                            'Name',
                            'CountryId',
                            [fn('DATE_FORMAT', col('district->city.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                            [fn('DATE_FORMAT', col('district->city.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                        ],
                        include: {
                            model: Country,
                            as: 'Country',
                            attributes: [
                                'Id',
                                'Name',
                                [fn('DATE_FORMAT', col('district->city->country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                                [fn('DATE_FORMAT', col('district->city->country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                            ]
                        }
                    }
                }
            ],
            where: { Id: id }
        });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: `Hata: ${error.message}` });
    }
};

const Login = async (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;

    try {
        const user = await User.findOne({
            include: [
                {
                    model: Role,
                    required: false,
                    as: 'Role'
                }
            ],
            where: { Email: email, Password: password }
        });

        if (user) {
            return res.status(200).json({
                token: generateJWT({ Id: user.Id, Name: user.UserName }),
                isAuthenticated: true,
                userId: user.Id
            });
        } else {
            return res.status(200).json({ message: "Hatalı email veya parola!" });
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

const generateJWT = (user) => {
    let token = "";

    const options = {
        expiresIn: '1h'
    };

    try {
        token = jwt.sign(user, secretKey, options);
    }

    catch (err) {
        console.log(err.message);
    }
    
    return token;
}

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const CreateUser = async (req, res) => {
    try {
        debugger;
        const validatedData = req.body;

        const addedUser = {
            FirstName: validatedData.FirstName,
            LastName: validatedData.LastName,
            UserName: validatedData.UserName,
            Email: validatedData.Email,
            Password: validatedData.Password,
            PasswordHash: await hashPassword(validatedData.Password),
            RoleId: validatedData.RoleId,
            ImagePath: validatedData.ImagePath,
            TCKN: validatedData.TCKN,
            MotherName: validatedData.MotherName,
            FatherName: validatedData.FatherName,
            BirthDate: validatedData.BirthDate,
            Gender: validatedData.Gender,
            CivilStatus: validatedData.CivilStatus,
            EmploymentDate: validatedData.EmploymentDate,
            MilitaryStatus: validatedData.MilitaryStatus,
            PostponementDate: validatedData.PostponementDate,
            CountryId: validatedData.CountryId,
            CityId: validatedData.CityId,
            DistrictId: validatedData.DistrictId,
            Address: validatedData.Address
        };

        const user = await User.create(addedUser);

        const userData = await User.findOne({
            where: { Id: user.Id },
            attributes: [
                'Id',
                'FirstName',
                'LastName',
                'UserName',
                'Email',
                'Password',
                'PasswordHash',
                'ImagePath',
                'TCKN',
                'MotherName',
                'FatherName',
                'BirthDate',
                'Gender',
                'CivilStatus',
                'EmploymentDate',
                'MilitaryStatus',
                'PostponementDate',
                'Address',
                'RoleId',
                'CountryId',
                'CityId',
                'DistrictId',
                [fn('DATE_FORMAT', col('user.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                [fn('DATE_FORMAT', col('user.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
            ],
            include: [
                {
                    model: Role,
                    as: 'Role',
                    attributes: [
                        'Id',
                        'Name',
                        [fn('DATE_FORMAT', col('role.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('role.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ]
                },
                {
                    model: Country,
                    as: 'Country',
                    attributes: [
                        'Id',
                        'Name',
                        [fn('DATE_FORMAT', col('country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ]
                },
                {
                    model: City,
                    as: 'City',
                    attributes: [
                        'Id',
                        'Name',
                        'CountryId',
                        [fn('DATE_FORMAT', col('city.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('city.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ],
                    include: {
                        model: Country,
                        as: 'Country',
                        attributes: [
                            'Id',
                            'Name',
                            [fn('DATE_FORMAT', col('city->country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                            [fn('DATE_FORMAT', col('city->country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                        ]
                    }
                },
                {
                    model: District,
                    as: 'District',
                    attributes: [
                        'Id',
                        'Name',
                        'CityId',
                        [fn('DATE_FORMAT', col('district.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                        [fn('DATE_FORMAT', col('district.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                    ],
                    include: {
                        model: City,
                        as: 'City',
                        attributes: [
                            'Id',
                            'Name',
                            'CountryId',
                            [fn('DATE_FORMAT', col('district->city.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                            [fn('DATE_FORMAT', col('district->city.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                        ],
                        include: {
                            model: Country,
                            as: 'Country',
                            attributes: [
                                'Id',
                                'Name',
                                [fn('DATE_FORMAT', col('district->city->country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                                [fn('DATE_FORMAT', col('district->city->country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                            ]
                        }
                    }
                }
            ]
        });

        if (userData) {
            return res.status(200).json(userData);
        } else {
            return res.status(204).json({});
        }
    } catch (error) {
        return res.status(200).json({
            code: 400,
            message: "Girilen kullanıcı adı, email, parola veya tc kimlik numarası bilgisine sahip bir kayıt zaten var."
        });
    }
};

const EditUser = async (req, res) => {
    try {
        debugger;
        const validatedData = req.body;
        const user = await User.findByPk(validatedData.Id);

        if (user) {
            await User.update({
                FirstName: validatedData.FirstName,
                LastName: validatedData.LastName,
                UserName: validatedData.UserName,
                Email: validatedData.Email,
                Password: validatedData.Password,
                PasswordHash: await hashPassword(validatedData.Password),
                RoleId: validatedData.RoleId,
                ImagePath: validatedData.ImagePath,
                TCKN: validatedData.TCKN,
                MotherName: validatedData.MotherName,
                FatherName: validatedData.FatherName,
                BirthDate: validatedData.BirthDate,
                Gender: validatedData.Gender,
                CivilStatus: validatedData.CivilStatus,
                EmploymentDate: validatedData.EmploymentDate,
                MilitaryStatus: validatedData.MilitaryStatus,
                PostponementDate: validatedData.PostponementDate,
                CountryId: validatedData.CountryId,
                CityId: validatedData.CityId,
                DistrictId: validatedData.DistrictId,
                Address: validatedData.Address,
            }, {
                where: { Id: validatedData.Id }
            });

            const userData = await User.findOne({
                where: { Id: validatedData.Id },
                attributes: [
                    'Id',
                    'FirstName',
                    'LastName',
                    'UserName',
                    'Email',
                    'Password',
                    'PasswordHash',
                    'ImagePath',
                    'TCKN',
                    'MotherName',
                    'FatherName',
                    'BirthDate',
                    'Gender',
                    'CivilStatus',
                    'EmploymentDate',
                    'MilitaryStatus',
                    'PostponementDate',
                    'Address',
                    'RoleId',
                    'CountryId',
                    'CityId',
                    'DistrictId',
                    [fn('DATE_FORMAT', col('user.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                    [fn('DATE_FORMAT', col('user.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                ],
                include: [
                    {
                        model: Role,
                        as: 'Role',
                        attributes: [
                            'Id',
                            'Name',
                            [fn('DATE_FORMAT', col('role.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                            [fn('DATE_FORMAT', col('role.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                        ]
                    },
                    {
                        model: Country,
                        as: 'Country',
                        attributes: [
                            'Id',
                            'Name',
                            [fn('DATE_FORMAT', col('country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                            [fn('DATE_FORMAT', col('country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                        ]
                    },
                    {
                        model: City,
                        as: 'City',
                        attributes: [
                            'Id',
                            'Name',
                            'CountryId',
                            [fn('DATE_FORMAT', col('city.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                            [fn('DATE_FORMAT', col('city.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                        ],
                        include: {
                            model: Country,
                            as: 'Country',
                            attributes: [
                                'Id',
                                'Name',
                                [fn('DATE_FORMAT', col('city->country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                                [fn('DATE_FORMAT', col('city->country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                            ]
                        }
                    },
                    {
                        model: District,
                        as: 'District',
                        attributes: [
                            'Id',
                            'Name',
                            'CityId',
                            [fn('DATE_FORMAT', col('district.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                            [fn('DATE_FORMAT', col('district.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                        ],
                        include: {
                            model: City,
                            as: 'City',
                            attributes: [
                                'Id',
                                'Name',
                                'CountryId',
                                [fn('DATE_FORMAT', col('district->city.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                                [fn('DATE_FORMAT', col('district->city.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                            ],
                            include: {
                                model: Country,
                                as: 'Country',
                                attributes: [
                                    'Id',
                                    'Name',
                                    [fn('DATE_FORMAT', col('district->city->country.createdAt'), '%d.%m.%Y %H:%i:%s'), 'createdAt'],
                                    [fn('DATE_FORMAT', col('district->city->country.updatedAt'), '%d.%m.%Y %H:%i:%s'), 'updatedAt']
                                ]
                            }
                        }
                    }
                ]
            });

            return res.status(200).json(userData);
        }

        return res.status(204).json({ message: 'Kullanıcı kaydı bulunamadı!' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            code: 400,
            message: "Girilen kullanıcı adı, email, parola veya tc kimlik numarası bilgisine sahip bir kayıt zaten var."
        });
    }
};

const DeleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        let deleted = await User.destroy({ where: { Id: id } });

        if (deleted) {
            return res.status(200).json({ code: 200, message: 'Silme işlemi başarıyla yapıldı!' });
        }

        else {
            return res.status(200).json({ code: 204, message: 'Kullanıcı kaydı bulunamadı!' });
        }
    }

    catch (err) {
        return res.status(400).json({ message: `Silme işlemi sırasında bir hata oluştu! Hata: ${err.message}` });
    }
}

const GetVapidKeys = async (req, res) => {
    const vapidKeys = webpush.generateVAPIDKeys();
    return res.status(200).json({ publicKey: vapidKeys.publicKey, privateKey: vapidKeys.privateKey });
}

const SendNotification = async (req, res) => {
    debugger;
    const subscription = JSON.parse(req.body.Subscription);
    const publicKey = req.body.PublicKey;
    const privateKey = req.body.PrivateKey;
    const isApprove = req.body.IsApprove;

    try {
        webpush.setVapidDetails(
            'mailto:erdemanacoglu90@gmail.com',
            publicKey,
            privateKey
        );

        const content = JSON.stringify({
            title: isApprove ? 'Evrak Talebi Onayı' : 'Evrak Talebi Reddi',
            body: `Talep edilen evrak ${ isApprove ? 'onaylandı' : 'reddedildi' }. Çalışana bildirim maili gönderildi.`
        });

        const token = req.headers['authorization']?.split(' ')[1];

        if (token) {
            jwt.verify(token, secretKey);
        }

        await webpush.sendNotification(subscription, content);
        return res.status(200).json({ code: 200, message: 'Bildirim başarıyla gönderildi.' });
    }

    catch (err) {
        return res.status(200).json({ code: 400, message: 'Bildirim gönderimi sırasında bir hata oluştu. Hata:' + err.message });
    }
}

const SendEmail = async (req, res) => {
    let docName = req.body.DocumentName;
    let createDate = req.body.CreateDate;
    let toUserFirstName = req.body.ToUserFirstName;
    let toUserLastName = req.body.ToUserLastName;
    let toUserEmail = req.body.ToUserEmail;
    let fromUserEmail = req.body.FromUserEmail;
    let fromUserFirstName = req.body.FromUserFirstName;
    let fromUserLastName = req.body.FromUserLastName;
    let mailType = req.body.MailType;

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'erdemanacoglu90@gmail.com',
            pass: 'qary brtm xhcy ayxz',
        },
    });

    // Define the email options
    const mailOptions = {
        from: `${fromUserFirstName} ${fromUserLastName} <${fromUserEmail}>`,
        to: toUserEmail,
        subject: (mailType == 'Approve') ? 'Evrak Talebi Onayı' : 'Evrak Talebi Reddi',
        text: (mailType == 'Approve') ? `   Sayın ${toUserFirstName + ' ' + toUserLastName},\n ${createDate} tarihinde ${docName} isminde yüklemiş olduğunuz evrak talebiniz insan kaynakları personelimiz ${fromUserFirstName + ' ' + fromUserLastName} tarafından onaylanmıştır.` :
                                        `   Sayın ${toUserFirstName + ' ' + toUserLastName},\n ${createDate} tarihinde ${docName} isminde yüklemiş olduğunuz evrak talebiniz insan kaynakları personelimiz ${fromUserFirstName + ' ' + fromUserLastName} tarafından reddedilmiştir.\n En kısa zamanda tekrar yükleme yapmanızı rica ederiz.`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return res.status(200).json({ code: 400, message: 'Mail gönderimi sırasında bir hata oluştu. Hata: ' + error.message });
        } else {
            return res.status(200).json({ code: 200, message: 'Mail gönderimi başarıyla yapıldı.' });
        }
    });
}

module.exports = {
    GetAllUsers,
    GetUser,
    Login,
    CreateUser,
    EditUser,
    DeleteUser,
    SendEmail,
    SendNotification,
    GetVapidKeys
}