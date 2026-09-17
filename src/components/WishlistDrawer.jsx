import './WishlistDrawer.css'
import { useStore } from '../context/StoreContext.jsx'

export default function WishlistDrawer({
  isOpen,
  onClose,
  onSelectProduct,
}) {
  const { wishlist, toggleWishlist, addToCart } = useStore()

  if (!isOpen) return null

  const handleMoveToCart = (product) => {
    addToCart(product, 1)
    toggleWishlist(product)
  }

  return (
    <div className="fk-wish-backdrop" onClick={onClose}>
      <div className="fk-wish-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="fk-wish-header">
          <div className="fk-wish-header-left">
            <h3 className="fk-wish-title">My Wishlist</h3>
            <span className="fk-wish-count">({wishlist.length} items)</span>
          </div>
          <button className="fk-wish-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="fk-wish-empty">
            <div className="fk-wish-empty-icon">💔</div>
            <h4>Your wishlist is empty</h4>
            <p>Save items that you like to check out later</p>
            <button className="fk-wish-explore-btn" onClick={onClose}>
              Explore Deals
            </button>
          </div>
        ) : (
          <div className="fk-wish-list">
            {wishlist.map((item) => (
              <div key={item.id} className="fk-wish-item">
                <div
                  className="fk-wish-img-wrap"
                  onClick={() => {
                    onClose()
                    onSelectProduct(item)
                  }}
                >
                  <img src={item.images[0]} alt={item.name} className="fk-wish-img" />
                </div>

                <div className="fk-wish-info">
                  <h4
                    className="fk-wish-name"
                    onClick={() => {
                      onClose()
                      onSelectProduct(item)
                    }}
                  >
                    {item.name}
                  </h4>
                  <div className="fk-wish-rating-row">
                    <span className="fk-rating-badge">
                      {item.rating} ★
                    </span>
                    <span className="fk-wish-brand">{item.brand}</span>
                  </div>

                  <div className="fk-wish-prices">
                    <span className="fk-wish-price">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.originalPrice > item.price && (
                      <>
                        <span className="fk-wish-mrp">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="fk-wish-discount">
                          {item.discount}% off
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="fk-wish-actions">
                  <button
                    type="button"
                    className="fk-wish-add-cart-btn"
                    onClick={() => handleMoveToCart(item)}
                  >
                    MOVE TO CART
                  </button>
                  <button
                    type="button"
                    className="fk-wish-del-btn"
                    onClick={() => toggleWishlist(item)}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
