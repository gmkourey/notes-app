"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _automerge = require("automerge");

var _automerge2 = _interopRequireDefault(_automerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function toJSON
 * @desc Custom toJSON function for Slate data structures
 * @param {Slate.Node} value - a Slate node
 * @param {Object} options - current unused
 */
var toJSON = function toJSON(value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    if (value === undefined || value === null) {
        return null;
    }

    var object = value.object;
    switch (object) {
        case "block":
            return {
                object: value.object,
                data: toJSON(value.data, options),
                isVoid: value.isVoid,
                nodes: value.nodes.toArray().map(function (n) {
                    return toJSON(n, options);
                }),
                type: value.type
            };
        case "data":
            return object.toJSON();
        case "document":
            return {
                object: value.object,
                data: toJSON(value.data, options),
                nodes: value.nodes.toArray().map(function (n) {
                    return toJSON(n, options);
                })
            };
        case "history":
            return {
                object: value.object,
                redos: toJSON(value.redos, options),
                undos: toJSON(value.undos, options)
            };
        case "inline":
            return {
                object: value.object,
                data: toJSON(value.data, options),
                isVoid: value.isVoid,
                nodes: value.nodes.toArray().map(function (n) {
                    return toJSON(n, options);
                }),
                type: value.type
            };
        case "leaf":
            // Should convert leaf.text to an Automerge.Text object
            var automergeText = value.text.split("");
            return {
                object: value.object,
                marks: value.marks.toArray().map(function (m) {
                    return toJSON(m, options);
                }),
                text: automergeText
            };
        case "mark":
            return {
                object: value.object,
                data: toJSON(value.data, options),
                type: value.type
            };
        case "operation":
            return operationJSON(value, options);
        case "range":
            return {
                object: value.object,
                anchorKey: value.anchorKey,
                anchorOffset: value.anchorOffset,
                focusKey: value.focusKey,
                focusOffset: value.focusOffset,
                isBackward: value.isBackward,
                isFocused: value.isFocused,
                marks: value.marks === null ? null : value.marks.toArray().map(function (m) {
                    return toJSON(m, options);
                })
            };
        case "schema":
            return {
                object: value.object,
                document: value.document,
                blocks: value.blocks,
                inlines: value.inlines
            };
        case "text":
            return {
                object: value.object,
                leaves: value.leaves.toArray().map(function (c) {
                    return toJSON(c, options);
                })
            };
        case "value":
            return valueJSON(value, options);
        default:
            if (typeof value.toJSON === "function") {
                return value.toJSON();
            } else {
                var keys = Object.keys(value);
                var val = {};
                keys.forEach(function (key) {
                    if (!value.key) {
                        return;
                    }
                    if (typeof value.key.toJSON === "function") {
                        val[key] = value.key.toJSON();
                    } else {
                        val[key] = value.key;
                    }
                });
                return val;
            }
    }
}; /**
    * This contains a custom toJSON function for Slate objects intended to copy
    * exactly the Slate value for Automerge with the exception of Text nodes.
    * The code was modified from the toJSON() methods in
    * https://github.com/ianstormtaylor/slate/tree/master/packages/slate/src/models
    *
    * Primary differences:
    * - For leaf nodes, text is changed from a string to an array of characters.
        Should use Automerge.Text nodes if possible
    * - Currently does not support marks.
    */

var OPERATION_ATTRIBUTES = {
    add_mark: ['value', 'path', 'offset', 'length', 'mark'],
    insert_node: ['value', 'path', 'node'],
    insert_text: ['value', 'path', 'offset', 'text', 'marks'],
    merge_node: ['value', 'path', 'position', 'properties', 'target'],
    move_node: ['value', 'path', 'newPath'],
    remove_mark: ['value', 'path', 'offset', 'length', 'mark'],
    remove_node: ['value', 'path', 'node'],
    remove_text: ['value', 'path', 'offset', 'text', 'marks'],
    set_mark: ['value', 'path', 'offset', 'length', 'mark', 'properties'],
    set_node: ['value', 'path', 'node', 'properties'],
    set_selection: ['value', 'selection', 'properties'],
    set_value: ['value', 'properties'],
    split_node: ['value', 'path', 'position', 'properties', 'target']

    /**
     * @function operationJSON
     * @desc Convert an Slate Operation into JSON. This is a copy of the
     *     Operation.toJSON method except that it calls toJSON() in this file.
     */
};var operationJSON = function operationJSON(valueOriginal) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var object = valueOriginal.object,
        type = valueOriginal.type;

    var json = { object: object, type: type };
    var ATTRIBUTES = OPERATION_ATTRIBUTES[type];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = ATTRIBUTES[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var value = valueOriginal[key];

            // Skip keys for objects that should not be serialized, and are only used
            // for providing the local-only invert behavior for the history stack.
            if (key === 'document') continue;
            if (key === 'selection') continue;
            if (key === 'value') continue;
            if (key === 'node' && type !== 'insert_node') continue;

            if (key === 'mark' || key === 'marks' || key === 'node') {
                value = toJSON(value, options);
            }

            if (key === 'properties' && type === 'merge_node') {
                var v = {};
                if ('data' in value) v.data = toJSON(value.data, options);
                if ('type' in value) v.type = value.type;
                value = v;
            }

            if (key === 'properties' && type === 'set_mark') {
                var _v = {};
                if ('data' in value) _v.data = toJSON(value.data, options);
                if ('type' in value) _v.type = value.type;
                value = _v;
            }

            if (key === 'properties' && type === 'set_node') {
                var _v2 = {};
                if ('data' in value) _v2.data = toJSON(value.data, options);
                if ('isVoid' in value) _v2.isVoid = value.isVoid;
                if ('type' in value) _v2.type = value.type;
                value = _v2;
            }

            if (key === 'properties' && type === 'set_selection') {
                var _v3 = {};
                if ('anchorOffset' in value) _v3.anchorOffset = value.anchorOffset;
                if ('anchorPath' in value) _v3.anchorPath = value.anchorPath;
                if ('focusOffset' in value) _v3.focusOffset = value.focusOffset;
                if ('focusPath' in value) _v3.focusPath = value.focusPath;
                if ('isBackward' in value) _v3.isBackward = value.isBackward;
                if ('isFocused' in value) _v3.isFocused = value.isFocused;
                if ('marks' in value) _v3.marks = value.marks === null ? null : toJSON(value.marks, options);
                value = _v3;
            }

            if (key === 'properties' && type === 'set_value') {
                var _v4 = {};
                if ('data' in value) _v4.data = value.data.toJS();
                if ('decorations' in value) _v4.decorations = toJSON(value.decorations);
                if ('schema' in value) _v4.schema = toJSON(value.schema, options);
                value = _v4;
            }

            if (key === 'properties' && type === 'split_node') {
                var _v5 = {};
                if ('data' in value) _v5.data = toJSON(value.data, options);
                if ('type' in value) _v5.type = value.type;
                value = _v5;
            }

            json[key] = value;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return json;
};

/**
 * @function valueJSON
 * @desc Convert an Slate Value into JSON. This is a copy of the Value.toJSON
 *     method except that it calls toJSON() in this file.
 */
var valueJSON = function valueJSON(value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var object = {
        object: value.object,
        document: toJSON(value.document, options)
    };

    if (options.preserveData) {
        object.data = toJSON(value.data, options);
    }

    if (options.preserveDecorations) {
        object.decorations = value.decorations ? value.decorations.toArray().map(function (d) {
            return toJSON(d, options);
        }) : null;
    }

    if (options.preserveHistory) {
        object.history = toJSON(value.history, options);
    }

    if (options.preserveSelection) {
        object.selection = toJSON(value.selection, options);
    }

    if (options.preserveSchema) {
        object.schema = toJSON(value.schema, options);
    }

    if (options.preserveSelection && !options.preserveKeys) {
        var document = value.document,
            selection = value.selection;

        object.selection.anchorPath = selection.isSet ? document.getPath(selection.anchorKey) : null;
        object.selection.focusPath = selection.isSet ? document.getPath(selection.focusKey) : null;
        delete object.selection.anchorKey;
        delete object.selection.focusKey;
    }
    return object;
};

exports.default = toJSON;