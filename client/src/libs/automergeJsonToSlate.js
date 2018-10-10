"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * This contains a custom fromJSON function for Automerge objects intended to
 * initialize as a Slate Value. This currently does not have support for marks.
 */

var createLeaf = function createLeaf(leaf) {
    var newLeaf = {
        object: "leaf",
        marks: [],
        text: leaf.text.join("")
    };
    return newLeaf;
};

var fromJSON = function fromJSON(value) {
    if (value === undefined || value === null) {
        return null;
    }

    var newJson = {};

    Object.keys(value).forEach(function (key) {
        if (Array.isArray(value[key])) {
            newJson[key] = value[key].map(function (node) {
                return fromJSON(node);
            });
        } else if (_typeof(value[key]) === "object") {
            newJson[key] = fromJSON(value[key]);
        } else {
            newJson[key] = value[key];
        }
    });

    if (value.object === "text") {
        newJson.leaves = value.leaves.map(function (leaf) {
            return createLeaf(leaf);
        });
    }

    return newJson;
};

exports.default = fromJSON;