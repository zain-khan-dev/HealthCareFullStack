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
const checkupvenue_1 = __importDefault(require("../models/checkupvenue"));
const employee_1 = __importDefault(require("../models/employee"));
const employeeslot_1 = __importDefault(require("../models/employeeslot"));
const router = express_1.default.Router();
router.post("/venue", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const { name, location } = req.body;
        const venue = new checkupvenue_1.default({ name, location });
        const result = yield venue.save();
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.delete("/venue/:venueid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield checkupvenue_1.default.deleteOne({ id: req.params.venueid });
        if (result.deletedCount === 0)
            res.status(404).send();
        else
            res.status(200).json("Venue deleted successful");
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.get("/slots", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allSlots = yield employeeslot_1.default.find({}).populate({ path: "employeeId", model: employee_1.default }).populate({ path: "venueId", model: checkupvenue_1.default });
    res.status(200).json(allSlots);
}));
router.patch("/slots/:slotID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedSlot = yield employeeslot_1.default.updateOne({ _id: req.params.slotID }, { "status": "COMPLETE" });
        console.log(updatedSlot);
        if (updatedSlot.matchedCount === 0)
            res.status(404).send();
        else
            res.status(204).send();
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.default = router;
