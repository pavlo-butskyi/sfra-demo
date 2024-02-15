'use strict';

/**
 * @namespace Product
 */
var server = require('server');
var UserHelpers = require('*/cartridge/scripts/helpers/user');
var CategoryHelpers = require('*/cartridge/scripts/helpers/category');
var UserPremiumProtection = require('*/cartridge/scripts/middleware/userIsPremium');
var ProductMgr = require('dw/catalog/ProductMgr');
var HookMgr = require('dw/system/HookMgr');
var productModule = module.superModule;
server.extend(productModule);

server.append('Show',
    function (req, res, next) {
        var productId = req.querystring.pid; // Assuming product ID is passed in the query parameter
        HookMgr.callHook('custom.hook', 'Test'); // TODO: test
        // Get the product based on the ID
        var productInstance = ProductMgr.getProduct(productId);
        var primaryCategory = productInstance.getPrimaryCategory();
        var product = res.viewData.product;
        var categoryDiscount = CategoryHelpers.getCategoryDiscount(primaryCategory);
        var customerData = req.currentCustomer.raw;
        res.setViewData({
            productType: product.productType,
            // eslint-disable-next-line
            isPremiumUserGroup: UserHelpers.isPremiumUserGroup(customerData),
            productInstance: JSON.stringify(productInstance.primaryCategory.getDisplayName()),
            category: JSON.stringify(primaryCategory.getDisplayName()),
            productId: JSON.stringify(productId),
            categoryDiscount: categoryDiscount,
        });

        var isCustomPDP = req.querystring.custom === 'true';
        if (isCustomPDP) {
            var template = 'product/productDetailsCustom';
            res.render(template, {
                customData: 'test'
            })
        }
        next();

    },
    UserPremiumProtection.validateUserIsPremiumForPDP
);

module.exports = server.exports();
