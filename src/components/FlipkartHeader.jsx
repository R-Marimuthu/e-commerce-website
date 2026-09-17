import { useState, useRef, useEffect } from 'react'
import './FlipkartHeader.css'
import { useStore } from '../context/StoreContext.jsx'

export default function FlipkartHeader({
  query,
  onQueryChange,
  onSearchSubmit,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onOpenOrders,
  allProducts = [],
}) {
  const { user, logout, cartSummary, wishlist } = useStore()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const dropdownRef = useRef(null)
  const searchContainerRef = useRef(null)

  // Live search suggestions
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }
    const q = query.toLowerCase()
    const matches = allProducts
      .filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 6)
    setSuggestions(matches)
  }, [query, allProducts])

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSuggestionsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuggestionsOpen(false)
    if (onSearchSubmit) onSearchSubmit(query)
  }

  const handleSelectSuggestion = (item) => {
    onQueryChange(item.name)
    setSuggestionsOpen(false)
    if (onSearchSubmit) onSearchSubmit(item.name)
  }

  return (
    <header className="fk-navbar">
      <div className="fk-nav-container">
        {/* Brand Logo & Plus badge */}
        <div className="fk-brand-col" onClick={() => onQueryChange('')}>
          <div className="fk-logo-wrap">
            <span className="fk-logo-text">Fashion Mart</span>
            <span className="fk-logo-plus">
              Explore <em>Plus</em>
              <svg className="fk-plus-star" viewBox="0 0 24 24">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill="#ffe500"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Global Search Bar with Autocomplete */}
        <div className="fk-search-col" ref={searchContainerRef}>
          <form className="fk-search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="fk-search-input"
              placeholder="Search for Products, Brands and More"
              value={query}
              onChange={(e) => {
                onQueryChange(e.target.value)
                setSuggestionsOpen(true)
              }}
              onFocus={() => {
                if (query.trim()) setSuggestionsOpen(true)
              }}
            />
            {query && (
              <button
                type="button"
                className="fk-search-clear"
                onClick={() => {
                  onQueryChange('')
                  setSuggestions([])
                }}
                title="Clear"
              >
                ✕
              </button>
            )}
            <button type="submit" className="fk-search-btn" title="Search">
              <svg viewBox="0 0 24 24" className="fk-search-icon">
                <path
                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </form>

          {/* Autocomplete suggestions dropdown */}
          {suggestionsOpen && suggestions.length > 0 && (
            <div className="fk-search-suggestions">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="fk-suggestion-item"
                  onClick={() => handleSelectSuggestion(item)}
                >
                  <img src={item.images[0]} alt={item.name} className="fk-suggestion-thumb" />
                  <div className="fk-suggestion-meta">
                    <span className="fk-suggestion-title">{item.name}</span>
                    <span className="fk-suggestion-cat">in {item.category}</span>
                  </div>
                  <span className="fk-suggestion-price">₹{item.price.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="fk-actions-col">
          {/* User / Login Dropdown */}
          <div className="fk-user-wrap" ref={dropdownRef}>
            {user.isLoggedIn ? (
              <button
                className="fk-user-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="fk-user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="fk-user-name">{user.name.split(' ')[0]}</span>
                <svg className={`fk-arrow-icon ${dropdownOpen ? 'open' : ''}`} viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z" fill="currentColor" />
                </svg>
              </button>
            ) : (
              <button className="fk-login-btn" onClick={onOpenAuth}>
                Login
              </button>
            )}

            {dropdownOpen && user.isLoggedIn && (
              <div className="fk-menu-dropdown">
                <div className="fk-menu-header">
                  <p className="fk-menu-greeting">Hello, <strong>{user.name}</strong></p>
                  <span className="fk-supercoins-pill">
                    🪙 {user.superCoins} SuperCoins
                  </span>
                </div>
                <div className="fk-menu-divider" />
                <button
                  className="fk-menu-item"
                  onClick={() => {
                    setDropdownOpen(false)
                    onOpenOrders()
                  }}
                >
                  📦 Orders
                </button>
                <button
                  className="fk-menu-item"
                  onClick={() => {
                    setDropdownOpen(false)
                    onOpenWishlist()
                  }}
                >
                  ❤️ Wishlist ({wishlist.length})
                </button>
                <button
                  className="fk-menu-item"
                  onClick={() => {
                    setDropdownOpen(false)
                    onOpenOrders()
                  }}
                >
                  ⭐ Fashion Mart Plus Zone
                </button>
                <div className="fk-menu-divider" />
                <button
                  className="fk-menu-item fk-menu-logout"
                  onClick={() => {
                    setDropdownOpen(false)
                    logout()
                  }}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>

          {/* Become a Seller link */}
          <a
            href="#seller"
            className="fk-seller-link"
            onClick={(e) => {
              e.preventDefault()
              alert('Fashion Mart Seller Hub: Join over 1.4 million sellers selling across India!')
            }}
          >
            Become a Seller
          </a>

          {/* Wishlist Button */}
          <button
            className="fk-nav-icon-btn"
            onClick={onOpenWishlist}
            title="Wishlist"
          >
            <div className="fk-icon-badge-wrap">
              <svg viewBox="0 0 24 24" className="fk-nav-svg">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              {wishlist.length > 0 && (
                <span className="fk-badge">{wishlist.length}</span>
              )}
            </div>
            <span className="fk-nav-label">Wishlist</span>
          </button>

          {/* Cart Button */}
          <button
            className="fk-cart-btn"
            onClick={onOpenCart}
            title="Cart"
          >
            <div className="fk-icon-badge-wrap">
              <svg viewBox="0 0 24 24" className="fk-nav-svg">
                <path
                  d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
                  fill="currentColor"
                />
              </svg>
              {cartSummary.totalItems > 0 && (
                <span className="fk-badge fk-badge-cart">{cartSummary.totalItems}</span>
              )}
            </div>
            <span className="fk-nav-label">Cart</span>
          </button>
        </div>
      </div>
    </header>
  )
}
