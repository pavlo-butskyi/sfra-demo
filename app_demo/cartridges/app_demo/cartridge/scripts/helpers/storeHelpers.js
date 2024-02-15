'use strict';

// Fetch the parent module
var base = module.superModule;
// Create a module with the parent module as its prototype
var myHelpers = Object.create(base);

var SystemObjectMgr = require('dw/object/SystemObjectMgr');

/**
 * Searches for all stores and creates a plain object of the stores
 * @param {string} searchQuery - search query string
 * @returns {dw.util.SeekableIterator<dw.catalog.Store>} iterator object containing the results of the search
 */
function searchStores(searchQuery) {
    var query = 'name LIKE {0} or custom.phone_number = {0} or city = {0} or address1 = {0} or ID = {0}';
    return SystemObjectMgr.querySystemObjects('Store', query, 'name asc', searchQuery);
}


// function searchStoresByProductId(productId) {
//     var ProductMgr = require('dw/catalog/ProductMgr');
//     var ProductMgr = require('dw/catalog/ProductLineItem');
//
//     var product = ProductMgr.getProduct(productId);
//     // store.inventoryList
//     var inventoryLists = ProductInventoryMgr.getInventoryList(productId);
//
//     // var stores = SystemObjectMgr.querySystemObjects('Store', 'inventoryList = {0}', 'name asc', searchQuery);
//     return null
// }

/**
 * Searches for all stores and creates a plain object of the stores
 * @param {string} searchQuery - search query string
 * @param {dw.web.URL} url - a relative url
 * @returns {Object} a plain object containing the results of the search
 */
function findStores(searchQuery, url) {
    var Converters = require('*/cartridge/scripts/helpers/converters');
    var StoresModel = require('*/cartridge/models/stores');

    var Site = require('dw/system/Site');
    var URLUtils = require('dw/web/URLUtils');

    var searchKey = {};

    var searchResults = searchStores(searchQuery);

    var resultSet = Converters.iteratorToSet(searchResults);

    var actionUrl = url || URLUtils.url('Stores-FindStores', 'showMap', true).toString();
    var apiKey = Site.getCurrent().getCustomPreferenceValue('mapAPI');
    // searchStoresByProductId('008884303989M');
    var stores = new StoresModel(resultSet, searchKey, 100500, actionUrl, apiKey);

    return stores;
}

myHelpers.findStores = findStores;

module.exports = myHelpers;
