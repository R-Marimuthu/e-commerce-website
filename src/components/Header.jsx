import { useCart } from '../context/CartContext.jsx'
import { IconBag } from './Icons.jsx'
import './Header.css'

export default function Header({ onCartOpen }) {
  const { itemCount } = useCart()

  return (
    <header className="header">
      <div className="wrap header__inner">
        <div className="header__brand">
          <span className="header__mark" aria-hidden="true" />
          <span className="header__word">Current</span>
        </div>

        <button className="header__cart" onClick={onCartOpen} aria-label="Open cart">
          <IconBag />
          <span>Cart</span>
          {itemCount > 0 && <span className="header__badge">{itemCount}</span>}
        </button>
      </div>
    </header>
  )
}
