"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = require("express");
var userController_1 = require("../controller/userController");
var Multer_1 = __importDefault(require("../middleware/Multer"));
var authMiddleware_1 = require("../middleware/authMiddleware");
var app = (0, express_1.Router)();
app.post("/signup", Multer_1.default.single("avatar"), userController_1.signUpController);
app.post("/login", userController_1.loginController);
app.get('/all-users', userController_1.alluserController);
app.delete('/delete-user/:userId', authMiddleware_1.requireSignin, authMiddleware_1.isadmin, userController_1.deleteUserController);
app.put('/update-user-role/:userId', authMiddleware_1.requireSignin, authMiddleware_1.isadmin, userController_1.updateUserController);
exports.authRouter = app;
