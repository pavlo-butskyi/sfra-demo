'use strict';

/**
 * Return the list of user groups for current user
 * @param {dw.customer.Customer} customer -  Customer data
 * @returns {Array} - Array with user group names (string)
 */
function getCurrentUserGroups(customer) {
    var userGroups = [];

    // Get the current customer
    var customerGroups = customer.customerGroups;

    // Check if the profile exists and has customer groups
    if (customerGroups) {
        // Iterate through the customer groups and get their names
        for (var i = 0; i < customerGroups.length; i++) {
            userGroups.push(customerGroups[i].ID);
        }
    }

    return userGroups;
}

/**
 * Helper function to define if user has a Premium user group
 * @param {dw.customer.Customer} customer -  Customer data
 * @returns {boolean} - True is user is premium
 */
function isPremiumUserGroup(customer) {
    var currentUserGroups = getCurrentUserGroups(customer);

    return currentUserGroups.indexOf('Premium') !== -1;
}

module.exports = {
    isPremiumUserGroup: isPremiumUserGroup,
};
