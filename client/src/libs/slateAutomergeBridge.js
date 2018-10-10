"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slateCustomToJson = exports.automergeJsonToSlate = exports.applyAutomergeOperations = exports.applySlateOperations = undefined;

var _applySlateOperations = require("./applySlateOperations");

var _applyAutomergeOperations = require("./applyAutomergeOperations");

var _slateCustomToJson = require("./slateCustomToJson");

var _slateCustomToJson2 = _interopRequireDefault(_slateCustomToJson);

var _automergeJsonToSlate = require("./automergeJsonToSlate");

var _automergeJsonToSlate2 = _interopRequireDefault(_automergeJsonToSlate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.applySlateOperations = _applySlateOperations.applySlateOperations;
exports.applyAutomergeOperations = _applyAutomergeOperations.applyAutomergeOperations;
exports.automergeJsonToSlate = _automergeJsonToSlate2.default;
exports.slateCustomToJson = _slateCustomToJson2.default;