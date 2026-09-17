import './CartDrawer.css'
import { useStore } from '../context/StoreContext.jsx'

export default function CartDrawer({
  isOpen,
  onClose,
  onProceedToCheckout,
}) {
  const {
    cart,
    updateQty,
    removeFromCart,
    cartSummary,
    selectedAddress,
    toggleWishlist,
  } = useStore()

  if (!isOpen) return null

  const handleSaveForLater = (product) => {
    toggleWishlist(product)
    removeFromCart(product.id)
  }

  return (
    <div className="fk-cart-modal-backdrop" onClick={onClose}>
      <div
        className="fk-cart-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="fk-cart-head">
          <div className="fk-cart-head-left">
            <h2 className="fk-cart-title">My Cart ({cartSummary.totalItems})</h2>
            <span className="fk-cart-tagline">Flipkart Assured Order</span>
          </div>
          <button className="fk-cart-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="fk-cart-empty">
            <div className="fk-cart-empty-icon">🛒</div>
            <h3>Your cart is empty!</h3>
            <p>Explore our wide selection and find great deals today</p>
            <button className="fk-cart-shop-now" onClick={onClose}>
              Shop Now
            </button>
          </div>
        ) : (
          <div className="fk-cart-body-grid">
            {/* Left Column: Items */}
            <div className="fk-cart-items-column">
              {/* Delivery Address Banner */}
              {selectedAddress && (
                <div className="fk-cart-addr-banner">
                  <div className="fk-addr-info">
                    <span className="fk-addr-deliver-to">
                      Deliver to: <strong>{selectedAddress.name}</strong>, {selectedAddress.pincode}
                    </span>
                    <p className="fk-addr-text">
                      {selectedAddress.address}, {selectedAddress.city}
                    </p>
                  </div>
                  <button
                    className="fk-addr-change-btn"
                    onClick={onProceedToCheckout}
                  >
                    Change
                  </button>
                </div>
              )}

              {/* Items List */}
              <div className="fk-cart-list">
                {cart.map(({ product, qty }) => (
                  <div key={product.id} className="fk-cart-item">
                    <div className="fk-item-main-row">
                      <div className="fk-item-img-wrap">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="fk-item-img"
                        />
                      </div>
                      <div className="fk-item-details">
                        <h4 className="fk-item-name">{product.name}</h4>
                        <div className="fk-item-seller-row">
                          <span className="fk-item-seller">Seller: RetailNet</span>
                          {product.isAssured && (
                            <span className="fk-assured-tag">
                              <em>f</em>-Assured
                            </span>
                          )}
                        </div>

                        <div className="fk-item-pricing">
                          <span className="fk-item-current-price">
                            ₹{(product.price * qty).toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice > product.price && (
                            <>
                              <span className="fk-item-mrp">
                                ₹{(product.originalPrice * qty).toLocaleString('en-IN')}
                              </span>
                              <span className="fk-item-discount">
                                {product.discount}% Off
                              </span>
                            </>
                          )}
                        </div>
                        <span className="fk-item-delivery-text">
                          Free Delivery by Tomorrow, 9 PM
                        </span>
                      </div>
                    </div>

                    {/* Item Controls */}
                    <div className="fk-item-actions-row">
                      <div className="fk-qty-stepper">
                        <button
                          type="button"
                          className="fk-qty-btn"
                          disabled={qty <= 1}
                          onClick={() => updateQty(product.id, qty - 1)}
                        >
                          −
                        </button>
                        <span className="fk-qty-num">{qty}</span>
                        <button
                          type="button"
                          className="fk-qty-btn"
                          onClick={() => updateQty(product.id, qty + 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="fk-item-link-btn"
                        onClick={() => handleSaveForLater(product)}
                      >
                        SAVE FOR LATER
                      </button>

                      <button
                        type="button"
                        className="fk-item-link-btn fk-link-remove"
                        onClick={() => removeFromCart(product.id)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Price Summary */}
            <div className="fk-cart-summary-column">
              <div className="fk-price-card">
                <h3 className="fk-price-card-title">PRICE DETAILS</h3>
                <div className="fk-price-lines">
                  <div className="fk-price-row">
                    <span>Price ({cartSummary.totalItems} items)</span>
                    <span>₹{cartSummary.totalMrp.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="fk-price-row">
                    <span>Discount</span>
                    <span className="fk-green-text">
                      − ₹{cartSummary.discount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="fk-price-row">
                    <span>Delivery Charges</span>
                    <span className="fk-green-text">
                      <del className="fk-del-fee">₹40</del> FREE
                    </span>
                  </div>
                  <div className="fk-price-row">
                    <span>Secured Packaging Fee</span>
                    <span>₹{cartSummary.packagingFee}</span>
                  </div>
                </div>

                <div className="fk-total-amount-row">
                  <span>Total Amount</span>
                  <span>₹{cartSummary.finalAmount.toLocaleString('en-IN')}</span>
                </div>

                {cartSummary.totalSavings > 0 && (
                  <div className="fk-savings-banner">
                    You will save ₹{cartSummary.totalSavings.toLocaleString('en-IN')} on this order
                  </div>
                )}
              </div>

              {/* Order Guarantee Note */}
              <div className="fk-shield-note">
                <span className="fk-shield-icon">🛡️</span>
                <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
              </div>

              {/* Place Order CTA */}
              <button
                className="fk-place-order-btn"
                onClick={() => {
                  onClose()
                  if (onProceedToCheckout) onProceedToCheckout()
                }}
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
