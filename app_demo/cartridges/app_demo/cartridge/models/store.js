'use strict';




// Import the model from the parent cartridge
var base = module.superModule;

/**
 * @constructor
 * @classdesc The stores model
 * @param {dw.catalog.Store} storeObject - a Store objects
 */
function store(storeObject) {
    // Build the model based on the parent cartridge
    base.call(this, storeObject);
    if (storeObject) {
        // Accessing custom properties
        var customAttributes = storeObject.custom;

        if (customAttributes.phone_number) {
            this.phone_number = customAttributes.phone_number;
        }

        if (customAttributes.Rating) {
            this.rating = customAttributes.Rating;
        }

        if (storeObject.image) {
            this.imageUrl = storeObject.image.httpsURL.toString();
        }
    }
}

module.exports = store;
