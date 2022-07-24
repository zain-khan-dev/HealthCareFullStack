"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EmployeeSlotSchema = new mongoose_1.default.Schema({
    employeeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'employee', required: true },
    venueId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'venue', required: true },
    status: { type: String, enum: ["ALLOCATED", "COMPLETE", "CANCELLED"], required: true, default: "ALLOCATED" },
    notes: { type: String },
    scheduledAt: { type: Date, required: true }
}).set('toJSON', {
    virtuals: true
});
const EmployeeSlotModel = mongoose_1.default.model("slots", EmployeeSlotSchema);
exports.default = EmployeeSlotModel;
//employeeId
// venueId
// scheduledAt (datetime)
// status ( ALLOCATED | COMPLETE | CANCELLED) [Default = ALLOCATED]
// notes (if any)
