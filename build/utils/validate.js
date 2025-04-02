"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMongoId = void 0;
const mongoose_1 = require("mongoose");
const isMongoId = (id) => {
    return !!id && mongoose_1.default.Types.ObjectId.isValid(String(id));
};
exports.isMongoId = isMongoId;
//# sourceMappingURL=validate.js.map