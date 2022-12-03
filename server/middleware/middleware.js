const productModel=require('../models/Product.js')
async function createProduct(req,res,next) {
    const product =await productModel.create(req.body)
    product.imagePath=`http://localhost:1000/images/${product.name}.jpg`
    next()
}
module.exports={createProduct}
