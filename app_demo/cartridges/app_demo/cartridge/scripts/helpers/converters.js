'use strict'



/**
 * Convert SeekableIterator to Set Collection
 * @param {dw.util.SeekableIterator} iterator -  SeekableIterator
 * @returns {dw.util.HashSet} - HashSet
 */
function iteratorToSet(iterator) {
    var HashSet = require('dw/util/HashSet');
    var resultSet = new HashSet();

    // Iterate over the SeekableIterator and add elements to the Set
    while (iterator.hasNext()) {
        var element = iterator.next();
        resultSet.add(element);
    }

    return resultSet;
}

module.exports = {
    iteratorToSet: iteratorToSet,
};
