import './ProductCard.css'


function ProductCard({ product }) {
  return (
    <article className="product-card">
      <ProductImage product={product} />

      <ProductInformation product={product} />
    </article>
  )
}

function ProductImage({ product }) {
  return (
    <div className="product-image">
      <div className="product-image-placeholder">
        <span>Product</span>
      </div>
    </div>
  )
}

function ProductInformation({ product }) {
  return (
    <div className="product-information">
      <p className="product-vendor">
        Vendor #{product.vendorId}
      </p>

      <h3>{product.name}</h3>

      <div className="product-footer">
        <span className="product-price">
          ₹{Number(product.price).toFixed(2)}
        </span>

        <span className="product-stock">
          {product.stockQuantity > 0
            ? `${product.stockQuantity} in stock`
            : 'Out of stock'}
        </span>
      </div>
    </div>
  )
}

export default ProductCard