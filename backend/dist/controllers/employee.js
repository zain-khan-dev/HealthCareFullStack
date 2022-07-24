"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const checkupvenue_1 = __importDefault(require("../models/checkupvenue"));
const employee_1 = __importDefault(require("../models/employee"));
const employeeslot_1 = __importDefault(require("../models/employeeslot"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield employee_1.default.find({});
    res.status(200).json(employee);
}));
router.get("/venues", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allVenues = yield checkupvenue_1.default.find({}).select("id name location");
    res.status(200).json(allVenues);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age } = req.body;
        const employee = new employee_1.default({ name, age });
        const savedEmployee = yield employee.save();
        res.status(200).json(savedEmployee);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}));
router.get("/slots/:empId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSlots = yield employeeslot_1.default.find({ employeeId: new mongoose_1.default.Types.ObjectId(req.params.empId) }).populate("venueId");
        console.log(allSlots);
        res.status(200).json(allSlots);
    }
    catch (err) {
        res.status(404).send();
    }
}));
router.put("/slot/:slotId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slotId = req.params.slotId;
        const { employeeId, scheduledAt, notes, venueId } = req.body;
        const result = yield employeeslot_1.default.updateOne({ _id: slotId }, { employeeId, scheduledAt, notes, venueId });
        if (result.matchedCount == 1) {
            res.status(200).send("Updated time successfuly");
        }
        else {
            res.status(404).send();
        }
    }
    catch (err) {
        res.status(400).send();
    }
}));
router.post("/slot/:empId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { venueId, status, notes, scheduledAt } = req.body;
        const slot = new employeeslot_1.default({ employeeId: req.params.empId, status, notes, scheduledAt, venueId });
        const result = yield slot.save();
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.put("/slot/:slotId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slotId = req.params.slotId;
        console.log(slotId);
        const { venueId, notes, scheduledAt } = req.body;
        const result = yield employeeslot_1.default.updateOne({ _id: slotId }, { notes, scheduledAt, venueId });
        if (result.matchedCount === 0)
            res.status(404).send();
        else
            res.status(201).json(result);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.delete("/slot/:slotid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params);
        const result = yield (employeeslot_1.default).deleteOne({ id: req.params.slotid });
        if (result.deletedCount === 0)
            res.status(404).send();
        else
            res.status(204).json("Deleted Succesfull");
    }
    catch (err) {
        res.status(404).send(err);
    }
}));
exports.default = router;
