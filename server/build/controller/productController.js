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
exports.getSingleproduct = exports.getAllproductController = exports.UpdateproductController = exports.deleteProductController = exports.productController = void 0;
var productModel_1 = __importDefault(require("../Model/productModel"));
var Cloudinary_1 = require("../config/Cloudinary");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
//create product
var productController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, price, discountPercentage, rating, brand, category, imageFile, imageStream, existingProduct, product, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, title = _a.title, description = _a.description, price = _a.price, discountPercentage = _a.discountPercentage, rating = _a.rating, brand = _a.brand, category = _a.category;
                imageFile = req.file;
                if (!imageFile) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: "Image is required" })];
                }
                return [4 /*yield*/, Cloudinary_1.Cloud.uploader.upload(imageFile.path, {
                        folder: "product-folder",
                        transformation: [{ width: 200, height: 200, crop: "fill" }],
                    })];
            case 1:
                imageStream = _b.sent();
                //validation
                if (!title ||
                    !description ||
                    !price ||
                    !discountPercentage ||
                    !rating ||
                    !brand ||
                    !category) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: "All fields are mandatory" })];
                }
                return [4 /*yield*/, productModel_1.default.findOne({ title: title })];
            case 2:
                existingProduct = _b.sent();
                if (existingProduct) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Product with the same title already exists",
                        })];
                }
                product = new productModel_1.default({
                    title: title,
                    description: description,
                    price: price,
                    discountPercentage: discountPercentage,
                    rating: rating,
                    brand: brand,
                    category: category,
                    image: imageStream.secure_url,
                });
                return [4 /*yield*/, product.save()];
            case 3:
                _b.sent();
                res.status(201).json({
                    success: true,
                    message: "Product added successfully",
                    product: product,
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                res
                    .status(500)
                    .json({ success: false, message: "Error while creating product", error: error_1 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.productController = productController;
// // ---------------------------------------------------------------------------------------------
// // Delete product
var deleteProductController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteProduct, publicId, imagePath, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, productModel_1.default.findByIdAndDelete(req.params.productId)];
            case 1:
                deleteProduct = _a.sent();
                if (!deleteProduct) {
                    throw new Error("cannot delete product");
                }
                if (!deleteProduct.image) return [3 /*break*/, 3];
                publicId = deleteProduct.image.substring(deleteProduct.image.lastIndexOf("/") + 1, deleteProduct.image.lastIndexOf("."));
                return [4 /*yield*/, Cloudinary_1.Cloud.uploader.destroy(publicId)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                // Delete the local image file
                if (deleteProduct.image) {
                    imagePath = path_1.default.join(__dirname, "../../public/uploads", deleteProduct.image);
                    fs_1.default.unlinkSync(imagePath);
                }
                res.status(200).send({
                    success: true,
                    message: "product deleted",
                    deleteProduct: deleteProduct,
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                res
                    .status(500)
                    .send({ success: false, message: "error while deleting product", error: error_2 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteProductController = deleteProductController;
// // ---------------------------------------------------------------------------------------------
//update product
var UpdateproductController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, _a, title, description, price, discountPercentage, rating, brand, category, imageFile, existingProduct, publicId, imageStream, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                productId = req.params.productId;
                _a = req.body, title = _a.title, description = _a.description, price = _a.price, discountPercentage = _a.discountPercentage, rating = _a.rating, brand = _a.brand, category = _a.category;
                imageFile = req.file;
                return [4 /*yield*/, productModel_1.default.findById(productId)];
            case 1:
                existingProduct = _b.sent();
                if (!existingProduct) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "Product not found",
                        })];
                }
                // Update the fields
                existingProduct.title = title;
                existingProduct.description = description;
                existingProduct.price = price;
                existingProduct.discountPercentage = discountPercentage;
                existingProduct.rating = rating;
                existingProduct.brand = brand;
                existingProduct.category = category;
                if (!imageFile) return [3 /*break*/, 5];
                if (!existingProduct.image) return [3 /*break*/, 3];
                publicId = existingProduct.image.substring(existingProduct.image.lastIndexOf("/") + 1, existingProduct.image.lastIndexOf("."));
                return [4 /*yield*/, Cloudinary_1.Cloud.uploader.destroy(publicId)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3: return [4 /*yield*/, Cloudinary_1.Cloud.uploader.upload(imageFile.path, {
                    folder: "product-folder",
                    transformation: [{ width: 200, height: 200, crop: "fill" }],
                })];
            case 4:
                imageStream = _b.sent();
                existingProduct.image = imageStream.secure_url;
                _b.label = 5;
            case 5: return [4 /*yield*/, existingProduct.save()];
            case 6:
                _b.sent();
                res.status(200).json({
                    success: true,
                    message: "Product updated successfully",
                    product: existingProduct,
                });
                return [3 /*break*/, 8];
            case 7:
                error_3 = _b.sent();
                res.status(500).json({
                    success: false,
                    message: "Error while updating product",
                    error: error_3,
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.UpdateproductController = UpdateproductController;
// ---------------------------------------------------------------------------------------------
// getAll product
var getAllproductController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, productModel_1.default
                        .find({})
                        .limit(12)
                        .sort({ createdAt: -1 })];
            case 1:
                products = _a.sent();
                if (!products) {
                    return [2 /*return*/, res.status(404).send({
                            success: false,
                            message: "no products",
                        })];
                }
                res.status(200).send({
                    success: true,
                    message: "All products",
                    totalProducts: products.length,
                    products: products,
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).send({
                    success: false,
                    message: "error while in getting all products",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllproductController = getAllproductController;
//get single product 
var getSingleproduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, product, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                productId = req.params.productId;
                return [4 /*yield*/, productModel_1.default.findById(productId)];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).send({
                            success: false,
                            message: "no product",
                        })];
                }
                res.status(200).send({
                    success: true,
                    message: "got product",
                    product: product,
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).send({
                    success: false,
                    message: "error while in getting single product",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSingleproduct = getSingleproduct;
