import './CategoryBar.css'
import { navCategories } from '../data/flipkartData.js'

export default function CategoryBar({ activeCategory, onSelectCategory }) {
  return (
    <nav className="fk-cat-bar">
      <div className="fk-cat-container">
        {navCategories.map((cat) => {
          const isActive =
            (cat.id === 'all' && activeCategory === 'All') ||
            cat.id === activeCategory

          return (
            <button
              key={cat.id}
              className={`fk-cat-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id === 'all' ? 'All' : cat.id)}
            >
              <div className="fk-cat-img-wrap">
                <img src={cat.image} alt={cat.name} className="fk-cat-img" />
              </div>
              <span className="fk-cat-title">{cat.name}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
