"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var databaseConnection_1 = require("./db/databaseConnection");
var authRouter_1 = require("./Router/authRouter");
var productRouter_1 = require("./Router/productRouter");
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config(); //dotenv config
var PORT = process.env.PORT || 3000; //port declaration
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('../Public/uploads', express_1.default.static(path_1.default.join(__dirname, '../Public/uploads')));
app.use((0, cors_1.default)({ origin: true }));
app.use((0, morgan_1.default)('tiny'));
app.use('/api/v1', authRouter_1.authRouter); //authRouter
app.use('/api/v1', productRouter_1.productRouter); //poductRouter
//connect db
(0, databaseConnection_1.connectionDatabase)();
// Start the server 
app.listen(PORT, function () {
    console.log("app listening at http://localhost:".concat(PORT));
});
