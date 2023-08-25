"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cloud = void 0;
var cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "Cloud", { enumerable: true, get: function () { return cloudinary_1.v2; } });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRETE
});
console.log(process.env.API_SECRETE);
