"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const VenueSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true }
}).set('toJSON', {
    virtuals: true
});
const VenueModel = mongoose_1.default.model("venue", VenueSchema);
exports.default = VenueModel;
