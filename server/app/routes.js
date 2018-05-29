var User = require('./models/user');

module.exports = function (app) {

    app.put('/main', function (req, res) {
        User.findById(req.body.id, function (err, user) {
            if (err) {
                res.send(err);
            }
            //console.log(req.body.coord);
            user.myMarkers.push(req.body.coord);
            user.save(function (err) {
                if (err) {
                    res.send(err);
                }
            })
            res.json(user);
        });
        console.log('put /main');
    });

    /*app.post('/registration', function (req, res) { //registration
        User.create({
            login: req.body.login,
            password: req.body.password,
            name: {
                firstName: 'Ivan',
                lastName: 'Ivanovich',
            },
            biography: 'Junior front-end developer'
        }, function (err) {
            if (err) {
                console.log(err);
                res.send(err);
            }
        });
        console.log('post /registration');
    });*/

    app.post('/login', function (req, res) {
        User.findOne({ login: req.body.login, password: req.body.password },
            function (err, user) {
                if (err) {
                    res.send(err);
                }
                if (user) {
                    user.password = '';
                    res.status(200).send({
                        user: user
                    });
                }
            });
        console.log('post/login');
    });

    app.get('/main', function (req, res) {
        User.findById(req.query.id, function (err, user) {
            if (err) {
                res.send(err);
            };
            res.json(user.myMarkers);
        });
        console.log('get/main');
    });
}