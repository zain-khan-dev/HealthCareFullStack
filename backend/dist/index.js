"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const organization_1 = __importDefault(require("./controllers/organization"));
const employee_1 = __importDefault(require("./controllers/employee"));
const db_config_1 = require("./config/db.config");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, db_config_1.connect_db)();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/org", organization_1.default);
app.use("/emp", employee_1.default);
app.listen(PORT, () => {
    console.log("The server is listening for incoming request at port " + PORT);
});
