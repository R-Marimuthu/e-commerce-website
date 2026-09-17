import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((item) => item.id === action.product.id)
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...state, { ...action.product, qty: 1 }]
    }
    case 'REMOVE':
      return state.filter((item) => item.id !== action.id)
    case 'INCREMENT':
      return state.map((item) =>
        item.id === action.id ? { ...item, qty: item.qty + 1 } : item
      )
    case 'DECREMENT':
      return state
        .map((item) =>
          item.id === action.id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [])

  const addToCart = (product) => dispatch({ type: 'ADD', product })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', id })
  const incrementItem = (id) => dispatch({ type: 'INCREMENT', id })
  const decrementItem = (id) => dispatch({ type: 'DECREMENT', id })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementItem,
        decrementItem,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
