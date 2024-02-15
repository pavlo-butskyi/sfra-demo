'use strict';

var PremiumPrice = require('../../models/price/premium');
// Fetch the parent module
var base = module.superModule;
// Create a module with the parent module as its prototype
var myHelpers = Object.create(base);

/**
 * Retrieves Price instance
 *
 * @param {dw.catalog.Product|dw.catalog.productSearchHit} product - API object for a product
 * @param {string} currency - Current session currencyCode
 * @param {boolean} useSimplePrice - Flag as to whether a simple price should be used, used for
 *     product tiles and cart line items.
 * @param {dw.util.Collection<dw.campaign.Promotion>} promotions - Promotions that apply to this
 *                                                                 product
 * @param {dw.catalog.ProductOptionModel} currentOptionModel - The product's option model
 * @return {TieredPrice|RangePrice|DefaultPrice|PremiumPrice} - The product's price
 */
myHelpers.getPrice = function(product, currency, useSimplePrice, promotions, currentOptionModel) {
    var UserHelpers = require('*/cartridge/scripts/helpers/user');
    var CategoryHelpers = require('*/cartridge/scripts/helpers/category');

    var primaryCategory = product.getPrimaryCategory();
    var categoryDiscount = CategoryHelpers.getCategoryDiscount(primaryCategory);
    // eslint-disable-next-line
    var isPremiumUserGroup = UserHelpers.isPremiumUserGroup(customer);
    var useDiscount = isPremiumUserGroup && !!categoryDiscount;
    if (useDiscount) {
        var priceModel = currentOptionModel
            ? product.getPriceModel(currentOptionModel)
            : product.getPriceModel();
        // get price with discount
        // var discountedPrice = priceModel.price.subtractPercent(25);
        return new PremiumPrice(priceModel.price, categoryDiscount || 0)
    }

    return base.getPrice(product, currency, useSimplePrice, promotions, currentOptionModel);
};


module.exports = myHelpers;
