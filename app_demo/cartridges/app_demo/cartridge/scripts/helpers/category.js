'use strict';

/**
 * Return the list of user groups for current user
 * @param {dw.catalog.Category} category -  Customer data
 * @returns {number|null} - Array with user group names (string)
 */
function getCategoryDiscount(category) {
    return category.custom.discount;
}

module.exports = {
    getCategoryDiscount: getCategoryDiscount,
};
