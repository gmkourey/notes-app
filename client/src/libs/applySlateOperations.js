

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applySlateOperations = undefined;

var _automerge = require("automerge");

var _automerge2 = _interopRequireDefault(_automerge);

var _slateCustomToJson = require("./slateCustomToJson");

var _slateCustomToJson2 = _interopRequireDefault(_slateCustomToJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var allowedOperations = ["insert_text", "remove_text", "insert_node", "split_node", "remove_node", "merge_node", "set_node", "move_node"];

/**
 * @function applySlateOperations
 * @desc converts a Slate operation to operations that act on an Automerge document
 * @param {Automerge.DocSet} doc - the Automerge document
 * @param {number} doc - Automerge document id
 * @param {List} slateOperations - a list of Slate Operations
 * @param {number} clientId - (optional) Id of the client
 */
var applySlateOperations = exports.applySlateOperations = function applySlateOperations(docSet, docId, slateOperations, clientId) {
    var currentDoc = docSet.getDoc(docId);
    if (currentDoc) {
        var message = clientId ? "Client " + clientId : "Change log";
        var docNew = _automerge2.default.change(currentDoc, message, function (doc) {
            // Use the Slate operations to modify the Automerge document.
            applySlateOperationsHelper(doc, slateOperations);
        });
        docSet.setDoc(docId, docNew);
    }
};

/**
 * @function applySlateOperationsHelper
 * @desc converts a Slate operation to operations that act on an Automerge document
 * @param {Automerge.document} doc - the Automerge document
 * @param {List} operations - a list of Slate Operations
 */
var applySlateOperationsHelper = function applySlateOperationsHelper(doc, operations) {
    operations.forEach(function (op) {
        if (allowedOperations.indexOf(op.type) === -1) {
            return;
        }
        var path = op.path,
            offset = op.offset,
            text = op.text,
            length = op.length,
            mark = op.mark,
            node = op.node,
            position = op.position,
            properties = op.properties,
            newPath = op.newPath;

        var index = path.get(path.size - 1);
        var rest = path.slice(0, -1);
        var currentNode = doc.note;
        switch (op.type) {
            // NOTE: Marks are definitely broken as of Slate 0.34
            // case "add_mark":
            //     // Untested
            //     path.forEach(el => {
            //         currentNode = currentNode.nodes[el];
            //     })
            //     currentNode.characters.forEach((char, i) => {
            //         if (i < offset) return;
            //         if (i >= offset + length) return;
            //         const hasMark = char.marks.find((charMark) => {
            //             return charMark.type === mark.type
            //         })
            //         if (!hasMark) {
            //             char.marks.push(mark)
            //         }
            //     })
            //     break;
            // case "remove_mark":
            //     // Untested
            //     path.forEach(el => {
            //         currentNode = currentNode.nodes[el];
            //     })
            //     currentNode.characters.forEach((char, i) => {
            //         if (i < offset) return;
            //         if (i >= offset + length) return;
            //         const markIndex = char.marks.findIndex((charMark) => {
            //             return charMark.type === mark.type
            //         })
            //         if (markIndex) {
            //             char.marks.deleteAt(markIndex, 1);
            //         }
            //     })
            //     break;
            // case "set_mark":
            //     // Untested
            //     path.forEach(el => {
            //         currentNode = currentNode.nodes[el];
            //     })
            //     currentNode.characters.forEach((char, i) => {
            //         if (i < offset) return;
            //         if (i >= offset + length) return;
            //         const markIndex = char.marks.findIndex((charMark) => {
            //             return charMark.type === mark.type
            //         })
            //         if (markIndex) {
            //             char.marks[markIndex] = mark;
            //         }
            //     })
            //     break;
            case "insert_text":
                path.forEach(function (el) {
                    currentNode = currentNode.nodes[el];
                });
                // Assumes no marks and only 1 leaf
                currentNode.leaves[0].text.insertAt(offset, text);
                break;
            case "remove_text":
                path.forEach(function (el) {
                    currentNode = currentNode.nodes[el];
                });
                // Assumes no marks and only 1 leaf
                currentNode.leaves[0].text.deleteAt(offset, text.length);
                break;
            case "split_node":
                rest.forEach(function (el) {
                    currentNode = currentNode.nodes[el];
                });
                var childOne = currentNode.nodes[index];
                var childTwo = JSON.parse(JSON.stringify(currentNode.nodes[index]));
                if (childOne.object === "text") {
                    childOne.leaves[0].text.splice(position);
                    childTwo.leaves[0].text.splice(0, position);
                } else {
                    childOne.nodes.splice(position);
                    childTwo.nodes.splice(0, position);
                }
                currentNode.nodes.insertAt(index + 1, childTwo);
                if (properties) {
                    if (currentNode.nodes[index + 1].object !== "text") {
                        var propertiesJSON = (0, _slateCustomToJson2.default)(properties);
                        Object.keys(propertiesJSON).forEach(function (key) {
                            if (propertiesJSON.key) {
                                currentNode.nodes[index + 1][key] = propertiesJSON.key;
                            }
                        });
                    }
                }
                break;
            case "merge_node":
                rest.forEach(function (el) {
                    currentNode = currentNode.nodes[el];
                });
                var one = currentNode.nodes[index - 1];
                var two = currentNode.nodes[index];
                if (one.object === "text") {
                    var _one$leaves$0$text;

                    (_one$leaves$0$text = one.leaves[0].text).push.apply(_one$leaves$0$text, _toConsumableArray(two.leaves[0].text));
                } else {
                    var _one$nodes;

                    (_one$nodes = one.nodes).push.apply(_one$nodes, _toConsumableArray(two.nodes));
                }
                currentNode.nodes.deleteAt(index, 1);
                break;
            case "insert_node":
                rest.forEach(function (el) {
                    currentNode = currentNode.nodes[el];
                });
                currentNode.nodes.insertAt(index, (0, _slateCustomToJson2.default)(node));
                break;
            case "remove_node":
                rest.forEach(function (el) {
                    currentNode = currentNode.nodes[el];
                });
                currentNode.nodes.deleteAt(index, 1);
                break;
            case "set_node":
                path.forEach(function (el) {
                    currentNode = currentNode.nodes[el];
                });
                for (var attrname in properties) {
                    currentNode[attrname] = properties[attrname];
                }
                break;
            case "move_node":
                var newIndex = newPath.get(newPath.size - 1);
                var newParentPath = newPath.slice(0, -1);
                var oldParentPath = path.slice(0, -1);
                var oldIndex = path.get(path.size - 1);

                // Remove the old node from it's current parent.
                oldParentPath.forEach(function (el) {
                    currentNode = currentNode.nodes[el];
                });
                var nodeToMove = currentNode.nodes[oldIndex];

                // Find the new target...
                if (oldParentPath.every(function (x, i) {
                    return x === newParentPath.get(i);
                }) && oldParentPath.size === newParentPath.size) {
                    // Do nothing
                } else if (oldParentPath.every(function (x, i) {
                    return x === newParentPath.get(i);
                }) && oldIndex < newParentPath.get(oldParentPath.size)) {
                    // Remove the old node from it's current parent.
                    currentNode.nodes.deleteAt(oldIndex, 1);

                    // Otherwise, if the old path removal resulted in the new path being no longer
                    // correct, we need to decrement the new path at the old path's last index.
                    currentNode = doc.note;
                    newParentPath = newParentPath.set(oldParentPath.size, newParentPath.get(oldParentPath.size) - 1);
                    newParentPath.forEach(function (el) {
                        currentNode = currentNode.nodes[el];
                    });

                    // TOFIX: This is to strip out the objectId and create a new list.
                    // Not ideal at all but Slate can't do the linking that Automerge can
                    // and it's alot of work to try to move references in Slate.
                    // See Note above.
                    nodeToMove = JSON.parse(JSON.stringify(nodeToMove));
                    // Insert the new node to its new parent.
                    currentNode.nodes.insertAt(newIndex, nodeToMove);
                } else {
                    // Remove the old node from it's current parent.
                    currentNode.nodes.deleteAt(oldIndex, 1);

                    // Otherwise, we can just grab the target normally...
                    currentNode = doc.note;
                    newParentPath.forEach(function (el) {
                        currentNode = currentNode.nodes[el];
                    });

                    // TOFIX: This is to strip out the objectId and create a new list.
                    // Not ideal at all but Slate can't do the linking that Automerge can
                    // and it's alot of work to try to move references in Slate.
                    // See Note above.
                    nodeToMove = JSON.parse(JSON.stringify(nodeToMove));
                    // Insert the new node to its new parent.
                    currentNode.nodes.insertAt(newIndex, nodeToMove);
                }
                break;
            default:
                console.log("In default case");
                break;
        }
    });
};