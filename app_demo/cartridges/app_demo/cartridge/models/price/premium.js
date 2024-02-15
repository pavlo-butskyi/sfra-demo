'use strict';

var formatMoney = require('dw/util/StringUtils').formatMoney;

/**
 * Convert API price to an object
 * @param {dw.value.Money} price - Price object returned from the API
 * @returns {Object} price formatted as a simple object
 */
function toPriceModel(price) {
    var value = price.available ? price.getDecimalValue().get() : null;
    var currency = price.available ? price.getCurrencyCode() : null;
    var formattedPrice = price.available ? formatMoney(price) : null;
    var decimalPrice;

    if (formattedPrice) { decimalPrice = price.getDecimalValue().toString(); }

    return {
        value: value,
        currency: currency,
        formatted: formattedPrice,
        decimalPrice: decimalPrice
    };
}

/**
 * @constructor
 * @classdesc Premium price class
 * @param {dw.value.Money} salesPrice - Sales price
 * @param {dw.value.Money} discountPercent - discount percent
 */
function DiscountedDefaultPriceModel(salesPrice, discountPercent) {
    this.type = 'premium';
    var discountedPrice = salesPrice.subtractPercent(discountPercent)
    // new price with discount
    this.sales = toPriceModel(discountedPrice);
    // show old price as initial
    this.list = toPriceModel(salesPrice);
}

module.exports = DiscountedDefaultPriceModel;
