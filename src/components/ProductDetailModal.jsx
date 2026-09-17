import { useState, useEffect } from 'react'
import './ProductDetailModal.css'
import { useStore } from '../context/StoreContext.jsx'
import { bankOffers } from '../data/flipkartData.js'

export default function ProductDetailModal({
  product,
  onClose,
  onOpenCheckout,
}) {
  const { addToCart, toggleWishlist, isInWishlist, checkPincode } = useStore()
  const [activeImgIdx, setActiveImgIdx] = useState(0)
  const [pincode, setPincode] = useState('560103')
  const [pincodeResult, setPincodeResult] = useState(null)

  useEffect(() => {
    if (product) {
      setActiveImgIdx(0)
      setPincodeResult(checkPincode('560103'))
    }
  }, [product])

  if (!product) return null

  const isFav = isInWishlist(product.id)

  const handleCheckPin = (e) => {
    e.preventDefault()
    setPincodeResult(checkPincode(pincode))
  }

  const handleAddToCart = () => {
    addToCart(product, 1)
  }

  const handleBuyNow = () => {
    addToCart(product, 1)
    onClose()
    if (onOpenCheckout) onOpenCheckout()
  }

  return (
    <div className="fk-modal-backdrop" onClick={onClose}>
      <div
        className="fk-detail-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="fk-detail-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="fk-detail-grid">
          {/* Left Column: Gallery & Action Buttons */}
          <div className="fk-detail-left">
            <div className="fk-detail-gallery-row">
              {/* Thumbnails */}
              <div className="fk-detail-thumbs">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`fk-thumb-btn ${idx === activeImgIdx ? 'active' : ''}`}
                    onClick={() => setActiveImgIdx(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="fk-thumb-img" />
                  </button>
                ))}
              </div>

              {/* Main Image Preview */}
              <div className="fk-detail-preview">
                <button
                  className={`fk-detail-wish-btn ${isFav ? 'fav' : ''}`}
                  onClick={() => toggleWishlist(product)}
                  title={isFav ? 'Remove from Wishlist' : 'Add to Wishlist'}
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
                <img
                  src={product.images[activeImgIdx] || product.images[0]}
                  alt={product.name}
                  className="fk-detail-big-img"
                />
              </div>
            </div>

            {/* Sticky Action Buttons */}
            <div className="fk-detail-actions">
              <button
                type="button"
                className="fk-btn-cart"
                onClick={handleAddToCart}
              >
                <svg viewBox="0 0 24 24" className="fk-btn-icon">
                  <path
                    d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
                    fill="currentColor"
                  />
                </svg>
                ADD TO CART
              </button>
              <button
                type="button"
                className="fk-btn-buy"
                onClick={handleBuyNow}
              >
                <svg viewBox="0 0 24 24" className="fk-btn-icon">
                  <path d="M7 2v11h3v9l7-12h-4l4-8z" fill="currentColor" />
                </svg>
                BUY NOW
              </button>
            </div>
          </div>

          {/* Right Column: Information & Reviews */}
          <div className="fk-detail-right">
            {/* Breadcrumbs */}
            <div className="fk-breadcrumbs">
              <span>Home</span> &gt; <span>{product.category}</span> &gt; <span>{product.brand}</span>
            </div>

            {/* Product Title */}
            <h1 className="fk-detail-title">{product.name}</h1>

            {/* Rating Bar */}
            <div className="fk-detail-ratings-row">
              <div className="fk-rating-badge">
                <span>{product.rating}</span>
                <span className="fk-rating-star">★</span>
              </div>
              <span className="fk-detail-review-counts">
                {product.ratingCount.toLocaleString('en-IN')} Ratings & {product.reviewCount.toLocaleString('en-IN')} Reviews
              </span>
              {product.isAssured && (
                <span className="fk-assured-tag">
                  <em>f</em>-Assured
                </span>
              )}
            </div>

            {/* Price Section */}
            <div className="fk-detail-price-box">
              <span className="fk-special-price-tag">Special price</span>
              <div className="fk-detail-price-numbers">
                <span className="fk-detail-current-price">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="fk-detail-mrp">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="fk-detail-discount">
                  {product.discount}% off
                </span>
              </div>
            </div>

            {/* Bank Offers List */}
            <div className="fk-offers-block">
              <h4 className="fk-offers-title">Available offers</h4>
              <ul className="fk-offers-list">
                {bankOffers.map((off, idx) => (
                  <li key={idx} className="fk-offer-item">
                    <span className="fk-offer-icon">🏷️</span>
                    <span>{off}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pincode delivery checker */}
            <div className="fk-pincode-section">
              <span className="fk-pin-label">Delivery</span>
              <form className="fk-pin-form" onSubmit={handleCheckPin}>
                <div className="fk-pin-input-wrap">
                  <span className="fk-pin-map-icon">📍</span>
                  <input
                    type="text"
                    maxLength="6"
                    className="fk-pin-input"
                    placeholder="Enter Delivery Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <button type="submit" className="fk-pin-check-btn">
                    Check
                  </button>
                </div>
              </form>
            </div>
            {pincodeResult && (
              <div className={`fk-pin-feedback ${pincodeResult.isValid ? 'valid' : 'invalid'}`}>
                {pincodeResult.isValid ? '✓ ' : '✕ '}
                {pincodeResult.message}
              </div>
            )}

            {/* Highlights */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="fk-highlights-section">
                <h4 className="fk-section-subhead">Highlights</h4>
                <ul className="fk-highlights-list">
                  {product.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications Table */}
            {product.specs && (
              <div className="fk-specs-section">
                <h4 className="fk-section-subhead">Specifications</h4>
                <div className="fk-specs-table">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="fk-spec-row">
                      <span className="fk-spec-key">{key}</span>
                      <span className="fk-spec-val">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ratings & Customer Reviews */}
            <div className="fk-reviews-section">
              <h4 className="fk-section-subhead">Ratings & Reviews</h4>
              <div className="fk-review-breakdown">
                <div className="fk-overall-rating">
                  <div className="fk-big-score">
                    {product.rating} <span className="fk-score-star">★</span>
                  </div>
                  <span className="fk-score-sub">
                    {product.ratingCount.toLocaleString('en-IN')} Ratings &amp; <br />
                    {product.reviewCount.toLocaleString('en-IN')} Reviews
                  </span>
                </div>
                <div className="fk-rating-bars">
                  <div className="fk-bar-row">
                    <span>5★</span>
                    <div className="fk-bar-track"><div className="fk-bar-fill" style={{ width: '74%' }} /></div>
                    <span>74%</span>
                  </div>
                  <div className="fk-bar-row">
                    <span>4★</span>
                    <div className="fk-bar-track"><div className="fk-bar-fill" style={{ width: '18%' }} /></div>
                    <span>18%</span>
                  </div>
                  <div className="fk-bar-row">
                    <span>3★</span>
                    <div className="fk-bar-track"><div className="fk-bar-fill" style={{ width: '5%' }} /></div>
                    <span>5%</span>
                  </div>
                  <div className="fk-bar-row">
                    <span>2★</span>
                    <div className="fk-bar-track"><div className="fk-bar-fill" style={{ width: '2%' }} /></div>
                    <span>2%</span>
                  </div>
                  <div className="fk-bar-row">
                    <span>1★</span>
                    <div className="fk-bar-track"><div className="fk-bar-fill" style={{ width: '1%' }} /></div>
                    <span>1%</span>
                  </div>
                </div>
              </div>

              {/* Customer Comments */}
              <div className="fk-customer-reviews-list">
                {product.reviews && product.reviews.map((rev) => (
                  <div key={rev.id} className="fk-single-review">
                    <div className="fk-review-header">
                      <div className="fk-rating-badge">
                        <span>{rev.rating}</span>
                        <span className="fk-rating-star">★</span>
                      </div>
                      <span className="fk-review-title">{rev.title}</span>
                    </div>
                    <p className="fk-review-comment">{rev.comment}</p>
                    <div className="fk-review-footer">
                      <span className="fk-reviewer-name">{rev.user}</span>
                      <span className="fk-verified-buyer">✓ Certified Buyer</span>
                      <span className="fk-review-date">{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
