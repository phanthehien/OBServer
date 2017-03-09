var Joi = require('joi')
var uuid = require('node-uuid');

module.exports = [{
    method: 'GET',
    path: '/api/candidate',
    config: {
        tags: ['api'],
        handler: function (request, reply) {
            var db = request.mongo.db;
            var usersQuery = db.collection('candidates').find(function (err, results) {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }
                reply(results.toArray());
            });
        }
    }
}, {
    method: 'GET',
    path: '/api/candidate/{id}',
    config: {
        description: "User authentication function",
        notes: "just post the username and password",
        tags: ['api', 'candidate']
    },
    handler(request, reply) {
        const db = request.mongo.db;
        const ObjectID = request.mongo.ObjectID;

        db.collection('candidates').findOne({
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
    path: '/api/candidate',
    config: {
        description: "Create/Update candidate",
        notes: "create new/update existing internal candidate",
        tags: ['api', 'candidate']
    },
    handler(request, reply) {
        if(!request.payload) {
            return reply(Boom.badData('No data from request'));
        }
        const candidate = request.payload;

        var db = request.mongo.db;

        if (!candidate._id) {
            candidate._id = uuid.v1();
            db.collection('candidates').save(candidate, (err, result) => {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(candidate);
            });
        } else {
            db.collection('candidates').update({
                _id: candidate._id
            }, {
                $set: candidate
            }, (err, updated) => {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(candidate);
            })
        }
    }
}];