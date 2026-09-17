import './ProductFilters.css'

export default function ProductFilters({
  brands = [],
  selectedBrands = [],
  onToggleBrand,
  maxPrice,
  priceLimit,
  onPriceLimitChange,
  minRating,
  onMinRatingChange,
  onlyAssured,
  onToggleAssured,
  minDiscount,
  onMinDiscountChange,
  sortBy,
  onSortByChange,
  onClearAll,
  totalResults = 0,
}) {
  const sortOptions = [
    { id: 'relevance', label: 'Relevance' },
    { id: 'popularity', label: 'Popularity' },
    { id: 'price_low', label: 'Price -- Low to High' },
    { id: 'price_high', label: 'Price -- High to Low' },
    { id: 'discount', label: 'Discount' },
  ]

  const ratingOptions = [
    { val: 4, label: '4★ & above' },
    { val: 3, label: '3★ & above' },
  ]

  const discountOptions = [
    { val: 0, label: 'All Discounts' },
    { val: 15, label: '15% or more' },
    { val: 30, label: '30% or more' },
    { val: 40, label: '40% or more' },
  ]

  return (
    <aside className="fk-filters-sidebar">
      {/* Top Filter Header */}
      <div className="fk-filters-head">
        <h3 className="fk-filters-title">Filters</h3>
        <button className="fk-clear-btn" onClick={onClearAll}>
          CLEAR ALL
        </button>
      </div>

      {/* Flipkart Assured Filter */}
      <div className="fk-filter-block">
        <label className="fk-filter-checkbox fk-assured-filter-label">
          <input
            type="checkbox"
            checked={onlyAssured}
            onChange={(e) => onToggleAssured(e.target.checked)}
          />
          <span className="fk-assured-badge-filter">
            <em>f</em>-Assured
          </span>
        </label>
      </div>

      {/* Price Slider */}
      <div className="fk-filter-block">
        <div className="fk-block-title">
          <span>PRICE</span>
          <span className="fk-price-val">Up to ₹{priceLimit.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="1000"
          max={maxPrice || 150000}
          step="2000"
          value={priceLimit}
          onChange={(e) => onPriceLimitChange(Number(e.target.value))}
          className="fk-slider"
        />
        <div className="fk-slider-bounds">
          <span>₹1,000</span>
          <span>₹{(maxPrice || 150000).toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Brand Checkboxes */}
      {brands.length > 0 && (
        <div className="fk-filter-block">
          <div className="fk-block-title">BRAND</div>
          <div className="fk-checkbox-list">
            {brands.map((brand) => (
              <label key={brand} className="fk-filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onToggleBrand(brand)}
                />
                <span className="fk-checkbox-label">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Customer Ratings */}
      <div className="fk-filter-block">
        <div className="fk-block-title">CUSTOMER RATINGS</div>
        <div className="fk-radio-list">
          {ratingOptions.map((opt) => (
            <label key={opt.val} className="fk-filter-radio">
              <input
                type="radio"
                name="customer_rating"
                checked={minRating === opt.val}
                onChange={() => onMinRatingChange(opt.val)}
              />
              <span className="fk-radio-label">{opt.label}</span>
            </label>
          ))}
          {minRating > 0 && (
            <button
              type="button"
              className="fk-link-clear"
              onClick={() => onMinRatingChange(0)}
            >
              Reset rating filter
            </button>
          )}
        </div>
      </div>

      {/* Discount Filter */}
      <div className="fk-filter-block">
        <div className="fk-block-title">DISCOUNT</div>
        <div className="fk-radio-list">
          {discountOptions.map((disc) => (
            <label key={disc.val} className="fk-filter-radio">
              <input
                type="radio"
                name="discount_filter"
                checked={minDiscount === disc.val}
                onChange={() => onMinDiscountChange(disc.val)}
              />
              <span className="fk-radio-label">{disc.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
