"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect_db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connect_db = () => {
    const db_url = process.env.DB_URL;
    mongoose_1.default.connect(db_url, function (err) {
        if (err)
            throw err;
        console.log('Successfully connected');
    });
};
exports.connect_db = connect_db;
