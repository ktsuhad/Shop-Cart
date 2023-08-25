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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = exports.deleteUserController = exports.alluserController = exports.loginController = exports.signUpController = void 0;
var userModel_1 = __importDefault(require("../Model/userModel"));
var authHelper_1 = require("../Helpers/authHelper");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Cloudinary_1 = require("../config/Cloudinary");
//Register user
var signUpController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, avatar, existingUser, avatarUrl, imageStream, hashedPassword, newUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                avatar = req.file;
                console.log("reqbody :", req.body);
                if (!name || !email || !password) {
                    res.status(400).send({ message: "all fields are required" });
                }
                return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
            case 1:
                existingUser = _b.sent();
                //if esists
                if (existingUser) {
                    return [2 /*return*/, res.status(409).send("User already exists")];
                }
                avatarUrl = "";
                if (!avatar) return [3 /*break*/, 3];
                return [4 /*yield*/, Cloudinary_1.Cloud.uploader.upload(avatar.path, {
                        folder: "profile-folder",
                        transformation: [{ width: 200, height: 200, crop: "fill" }],
                    })];
            case 2:
                imageStream = _b.sent();
                avatarUrl = imageStream.secure_url;
                _b.label = 3;
            case 3: return [4 /*yield*/, (0, authHelper_1.hashPassword)(password)];
            case 4:
                hashedPassword = _b.sent();
                newUser = new userModel_1.default({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    avatar: avatarUrl,
                });
                return [4 /*yield*/, newUser.save()];
            case 5:
                _b.sent();
                res
                    .status(201)
                    .send({ success: true, message: "user registered successfuly" });
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                res.status(500).send({ success: false, message: "error in registering" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.signUpController = signUpController;
// -----------------------------------------------------------------------------
//login user
var loginController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, match, accessToken, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                // console.log(req.body);
                //validation
                if (!email || !password) {
                    return [2 /*return*/, res
                            .status(400)
                            .send({ success: false, message: "all field are mandatory" })];
                }
                return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res
                            .status(302)
                            .send({ success: false, message: "user not found" })];
                }
                return [4 /*yield*/, (0, authHelper_1.comparePassword)(password, user.password)];
            case 2:
                match = _b.sent();
                if (!match) {
                    return [2 /*return*/, res
                            .status(401)
                            .send({ success: false, message: "Invalid password" })];
                }
                accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_KEY, {
                    expiresIn: "7d",
                });
                res.status(200).send({
                    success: true,
                    message: "successfully loged in",
                    accessToken: accessToken,
                    user: {
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                        role: user.role,
                    },
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                res.status(500).send({ success: false, message: "error in login" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginController = loginController;
// -----------------------------------------------------------------------------
// getting all users
var alluserController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel_1.default.find()];
            case 1:
                users = _a.sent();
                res
                    .status(200)
                    .send({ success: true, message: "all users getting successfull", users: users });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res
                    .status(500)
                    .send({ success: false, message: "error in getting all users" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.alluserController = alluserController;
//deleteUserController
var deleteUserController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, users, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4 /*yield*/, userModel_1.default.findByIdAndDelete(userId)];
            case 1:
                users = _a.sent();
                res
                    .status(200)
                    .send({ success: true, message: "".concat(users === null || users === void 0 ? void 0 : users.name, " is deleted"), users: users });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res
                    .status(500)
                    .send({ success: false, message: "error in getting all users" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUserController = deleteUserController;
//updateUserController
var updateUserController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, role, updatedUser, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                role = req.body.role;
                return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(userId, { role: role }, { new: true })];
            case 1:
                updatedUser = _a.sent();
                if (!updatedUser) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ success: false, message: "User not found" })];
                }
                res.status(200).json({
                    success: true,
                    message: "".concat(updatedUser.name, "  is updated"),
                    user: updatedUser,
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res
                    .status(500)
                    .send({ success: false, message: "error in getting all users" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUserController = updateUserController;
