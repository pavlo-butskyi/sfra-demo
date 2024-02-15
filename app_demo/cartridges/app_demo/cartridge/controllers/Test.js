'use strict';

/**
 * @namespace Product
 */
var server = require('server');

server.get('Show', function (req, res, next) {
    // var template = 'product/productDetailsCustom';
    res.render('home/homePage', {
        customData: 'test'
    })
    next();
});
