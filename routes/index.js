var fs = require('fs')
var Path = require('path')
var routes = {}

routes.register = function(server) {
    fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js') && file.indexOf('spec') < 0
    })
    .forEach(function(file) {
        var routes = require(Path.join(__dirname, file))
        routes.forEach(route => {
            server.route(route)
        })
    })
}

module.exports = routes;


