'use strict';

/**
 * @namespace Stores
 */

var server = require('server');
var storeModule = module.superModule;
server.extend(storeModule);
var storeHelpers = require('*/cartridge/scripts/helpers/storeHelpers');


/**
 * Stores-FindStores : The Stores-FindStores endpoint returns a list of stores that meet the searching criteria
 * @name Base/Stores-FindStores
 * @function
 * @memberof Stores
 * @param {querystringparameter} - radius - The radius that the shopper selected to refine the search
 * @param {querystringparameter} - postalCode - The postal code that the shopper used to search
 * @param {querystringparameter} - lat - The latitude of the shopper position
 * @param {querystringparameter} - long - The longitude of the shopper position
 * @param {querystringparameter} - showMap - A flag indicating whether or not map is to be shown
 * @param {category} - non-sensitive
 * @param {returns} - json
 * @param {serverfunction} - get
 */
server.append('FindStores', function (req, res, next) {
    var searchQuery = req.querystring.searchQuery || '';

    if (!searchQuery) {
        next();
    }

    var stores = storeHelpers.findStores(searchQuery);

    res.json(stores);
    next();
});

module.exports = server.exports();
