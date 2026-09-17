import './ProductCard.css'
import { useStore } from '../context/StoreContext.jsx'

export default function ProductCard({ product, onSelect }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore()
  const isFav = isInWishlist(product.id)

  const handleCardClick = () => {
    if (onSelect) onSelect(product)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product, 1)
  }

  const handleWishlistToggle = (e) => {
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <div className="fk-card" onClick={handleCardClick}>
      {/* Wishlist floating heart */}
      <button
        className={`fk-card-heart ${isFav ? 'fav' : ''}`}
        onClick={handleWishlistToggle}
        title={isFav ? 'Remove from Wishlist' : 'Add to Wishlist'}
        aria-label="Wishlist"
      >
        <svg viewBox="0 0 24 24" className="fk-heart-svg">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={isFav ? '#ff4343' : 'none'}
            stroke={isFav ? '#ff4343' : '#c2c2c2'}
            strokeWidth="1.8"
          />
        </svg>
      </button>

      {/* Product Image */}
      <div className="fk-card-media">
        <img
          src={product.images[0]}
          alt={product.name}
          className="fk-card-img"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="fk-card-body">
        <span className="fk-card-brand">{product.brand}</span>
        <h3 className="fk-card-title" title={product.name}>
          {product.name}
        </h3>

        {/* Rating & Assured Badge */}
        <div className="fk-card-rating-row">
          <div className="fk-rating-badge">
            <span>{product.rating}</span>
            <span className="fk-rating-star">★</span>
          </div>
          <span className="fk-rating-count">
            ({product.ratingCount.toLocaleString('en-IN')})
          </span>
          {product.isAssured && (
            <span className="fk-assured-tag" title="Flipkart Assured">
              <em>f</em>-Assured
            </span>
          )}
        </div>

        {/* Pricing */}
        <div className="fk-card-price-row">
          <span className="fk-card-price">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="fk-card-mrp">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="fk-card-discount">
                {product.discount}% off
              </span>
            </>
          )}
        </div>

        <div className="fk-card-footer-meta">
          <span className="fk-card-delivery">Free delivery</span>
          <button
            type="button"
            className="fk-card-add-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
