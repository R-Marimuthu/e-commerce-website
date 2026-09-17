import ProductCard from './ProductCard.jsx'
import './ProductGrid.css'

export default function ProductGrid({
  products = [],
  onSelectProduct,
  sortBy,
  onSortByChange,
  activeCategory,
  query,
  totalCount,
  onClearFilters,
}) {
  const sortTabs = [
    { id: 'relevance', label: 'Relevance' },
    { id: 'popularity', label: 'Popularity' },
    { id: 'price_low', label: 'Price -- Low to High' },
    { id: 'price_high', label: 'Price -- High to Low' },
    { id: 'discount', label: 'Discount' },
  ]

  return (
    <div className="fk-grid-wrapper">
      {/* Top Sort Bar */}
      <div className="fk-sort-bar">
        <div className="fk-results-info">
          <span className="fk-results-category-title">
            {activeCategory === 'All' ? 'All Products & Deals' : activeCategory}
          </span>
          <span className="fk-results-count">
            (Showing {products.length} {products.length === 1 ? 'item' : 'items'}
            {query ? ` for "${query}"` : ''})
          </span>
        </div>

        <div className="fk-sort-tabs">
          <span className="fk-sort-label">Sort By</span>
          {sortTabs.map((tab) => (
            <button
              key={tab.id}
              className={`fk-sort-tab ${sortBy === tab.id ? 'active' : ''}`}
              onClick={() => onSortByChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      {products.length === 0 ? (
        <div className="fk-empty-results">
          <div className="fk-empty-icon">🔍</div>
          <h3>No products found!</h3>
          <p>We couldn't find any match for your current filters or search criteria.</p>
          <button className="fk-btn-reset-filters" onClick={onClearFilters}>
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="fk-products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  )
}
