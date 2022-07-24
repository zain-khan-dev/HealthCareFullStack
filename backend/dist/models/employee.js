"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true }
}).set('toJSON', {
    virtuals: true
});
const EmployeeModel = mongoose_1.default.model("employee", EmployeeSchema);
exports.default = EmployeeModel;
