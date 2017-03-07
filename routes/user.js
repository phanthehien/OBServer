var Joi = require('joi')
var uuid = require('node-uuid');

module.exports = [{
    method: 'GET',
    path: '/api/user',
    config: {
        tags: ['api'],
        handler: function (request, reply) {
            var db = request.mongo.db;
            var usersQuery = db.collection('users').find(function (err, results) {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }
                reply(results.toArray());
            });
        }
    }
}, {
    method: 'GET',
    path: '/api/user/{id}',
    config: {
        description: "User authentication function",
        notes: "just post the username and password",
        tags: ['api', 'user']
    },
    handler(request, reply) {
        const db = request.mongo.db;
        const ObjectID = request.mongo.ObjectID;

        db.collection('users').findOne({
            _id: new ObjectID(request.params.id)
        }, function (err, result) {

            if (err) {
                return reply(Boom.internal('Internal MongoDB error', err));
            }

            reply(result);
        });
    }
}, {
    method: 'POST',
    path: '/api/user',
    config: {
        description: "Create user",
        notes: "create new internal user",
        tags: ['api', 'user']
    },
    handler(request, reply) {
        const user = request.payload;
        user._id = uuid.v1();

        var db = request.mongo.db;
        db.collection('users').save(user, (err, result) => {
            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            reply(user);
        });
    }
}];