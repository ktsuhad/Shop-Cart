import { Request, Response } from "express";
import productModel from "../Model/productModel";

//create product
export const productController = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      brand,
      category,
    } = req.body;


    const imageFile = req.file?.filename; //  Get the uploaded image file


    //validation
    if (
      !title ||
      !description ||
      !price ||
      !discountPercentage ||
      !rating ||
      !brand ||
      !category
    ) {
      res
        .status(400)
        .send({ success: false, message: "All fields is Mandatory" });
    }

    // Validation: Check if a product with the same title already exists
    const existingProduct = await productModel.findOne({ title });

    if (existingProduct) {
      return res.status(400).send({
        success: false,
        message: "Product with the same title already exists",
      });
    }

    const product = new productModel({
      title,
      description,
      price,
      discountPercentage,
      rating,
      brand,
      category,
      image:imageFile,
    });

    await product.save();
    res
      .status(201)
      .send({ success: true, message: "product added successfully", product });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error while in creating product" });
  }
};

// -----------------------------------------------------------------------------------------------

// update product
export const updateProductController = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      brand,
      category,
      image,
    } = req.body;

    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.productId,
      {
        $set: {
          title,
          description,
          price,
          discountPercentage,
          rating,
          brand,
          category,
          image,
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      throw new Error("cannot update");
    }

    res.status(200).send({
      success: true,
      message: "product updated",
      updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error while in updating product" });
  }
};

// ---------------------------------------------------------------------------------------------

// Delete product

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const deleteProduct = await productModel.findByIdAndDelete(
      req.params.productId
    );

    if (!deleteProduct) {
      throw new Error("cannot delete product");
    }
    res.status(200).send({
      success: true,
      message: "product deleted",
      deleteProduct,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error while in deleting product" });
  }
};

// ---------------------------------------------------------------------------------------------
// getAll product

export const getAllproductController = async (req: Request, res: Response) => {
  try {
    const products = await productModel
      .find({})
      .limit(12)
      .sort({ createdAt: -1 });

    if (!products) {
      return res.status(404).send({
        success: false,
        message: "no products",
      });
    }
    res.status(200).send({
      success: true,
      message: "All products",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while in getting all products",
    });
  }
};

//get Single product
export const getSingleProductController = async (
  req: Request,
  res: Response
) => {
  const productId = req.params.productId;
  try {
    // Validate if productId is a valid ObjectId (assuming you're using MongoDB ObjectId)
    // if (!isValidObjectId(productId)) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Invalid productId",
    //   });
    // }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "product is not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "got single product",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while in getting single product",
    });
  }
};
