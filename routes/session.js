var Joi = require('joi')
var uuid = require('node-uuid');

module.exports = [{
    method: 'POST',
    path: '/api/session/login',
    config: {
        description: "User authentication function",
        notes: "just post the username and password",
        tags: ['api','session'],
        validate: {
             payload: Joi.object({
                 username : Joi.string().required(),
                 password : Joi.string().required()
             }).label("User Login")
        },
        handler: function(request, reply) {
            var db = request.mongo.db;
             db.collection('users').findOne({ username: request.payload.username, password: request.payload.password }, function (err, user) {
                if (err) {
                    return reply(Boom.badRequest('Your username or password is not correct', err));
                }
                reply(user);
            }); 
        }
    }
}];

