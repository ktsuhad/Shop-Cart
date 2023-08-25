"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDatabase = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var connectionDatabase = function () {
    mongoose_1.default
        .connect("".concat(process.env.MONGO_URL))
        .then(function () {
        console.log("🚀 Connected to DB");
    })
        .catch(function (error) {
        console.log("🚀 Mongodb connection error :", error);
    });
};
exports.connectionDatabase = connectionDatabase;
