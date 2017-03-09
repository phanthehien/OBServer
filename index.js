var Hapi = require('hapi')
var server = new Hapi.Server()
// var Joi = require('Joi')
const Path = require('path')
var engine = require('hapi-react-views')
var routes = require('./routes')
var HapiSwagger = require('hapi-swagger')
const Pack = require('./package');
const hapiMongo = require('hapi-mongodb');

server.connection({
    port:  process.env.PORT || 3000
}); // tell hapi which TCP Port to "listen" on

require('babel-core/register')({
    plugins: ['transform-react-jsx']
});


server.route({
    method: 'GET',        // define the method this route will handle
    path: 'test/{yourname*}', // this is how you capture route parameters in Hapi
    config: {
        description: 'Get name params',
        notes: 'Get name params for testing',
        tags: ['api'], // ADD THIS TAG,
        // validate: {
        //     params: {
        //             yourname: Joi.string().min(2).max(40).alphanum().required()
        //         }
        //     },
    },
    handler: function(req, reply) { // request handler method
        reply('Hello ' + req.params.yourname + '!'); // reply with text.
    }
});


const mongoDBOptions = {
    // url: 'mongodb://localhost:27017/db',
    url: 'mongodb://hien:123@ds125060.mlab.com:25060/obdb',
    settings: {
        poolSize: 10
    },
    decorate: true
};


const swaggerOptions = {
    info: {
        'title': 'Test Swagger API',
        'version': Pack.version,
    }
};

//we need to register plugin if we want
server.register([require('inert'), require('vision'), {
    'register': hapiMongo,
    'options': mongoDBOptions
}, {
    'register': HapiSwagger,
    'options': swaggerOptions
}], function (err) {
    if (err) {
        throw err;
    }

    server.views({
        defaultExtension: 'jsx',
        engines: {
            jsx: engine, // support for .jsx files 
            js: engine // support for .js 
        },
        relativeTo: __dirname,
        path: Path.resolve(__dirname, 'views')
    });

    routes.register(server);

    server.start(function () { // start the Hapi server on your localhost
        console.log('Now Visit: http://localhost:' + server.info.port + '/YOURNAME');
    });
})

module.exports = server;