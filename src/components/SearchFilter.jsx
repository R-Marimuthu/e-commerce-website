import { IconSearch } from './Icons.jsx'
import './SearchFilter.css'

export default function SearchFilter({
  categories,
  activeCategory,
  onCategoryChange,
  query,
  onQueryChange,
}) {
  return (
    <div className="filter">
      <div className="filter__search">
        <IconSearch className="filter__search-icon" />
        <input
          type="text"
          placeholder="Search products…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search products"
        />
      </div>

      <div className="filter__chips" role="tablist" aria-label="Filter by category">
        <button
          className={`filter__chip ${activeCategory === 'All' ? 'is-active' : ''}`}
          onClick={() => onCategoryChange('All')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter__chip ${activeCategory === cat ? 'is-active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
