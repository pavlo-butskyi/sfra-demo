'use strict';

var URLUtils = require('dw/web/URLUtils');
var UserHelpers = require('*/cartridge/scripts/helpers/user');

/**
 * Middleware validating if user logged in
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validateUserIsPremium(req, res, next) {
    if (!req.currentCustomer.profile) {
        if (req.querystring.args) {
            req.session.privacyCache.set('args', req.querystring.args);
        }

        var target = req.querystring.rurl || 1;

        res.redirect(URLUtils.url('Login-Show', 'rurl', target));
    }
    next();
}

/**
 * Middleware validating if user logged in
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validateUserIsPremiumForPDP(req, res, next) {
    // eslint-disable-next-line
    var isPremiumUser = UserHelpers.isPremiumUserGroup(customer);
    var isCustomPDP = req.querystring.custom;
    if (isCustomPDP && !isPremiumUser) {
        res.setStatusCode(404);
        res.render('error/notFound');
    }
    next();
}

module.exports = {
    validateUserIsPremium: validateUserIsPremium,
    validateUserIsPremiumForPDP: validateUserIsPremiumForPDP,
};
