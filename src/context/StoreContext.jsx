import { createContext, useContext, useEffect, useState, useMemo } from 'react'

const StoreContext = createContext(null)

const DEFAULT_USER = {
  name: 'Raja',
  phone: '+91 98765 43210',
  email: 'raja@example.com',
  isLoggedIn: true,
  superCoins: 480,
  plusMember: true,
}

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    name: 'Raja',
    phone: '9876543210',
    pincode: '560103',
    locality: 'Bellandur',
    address: 'Flat 402, Green Glen Layout, Outer Ring Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    type: 'HOME',
    isDefault: true,
  },
  {
    id: 'addr-2',
    name: 'Raja (Office)',
    phone: '9876543210',
    pincode: '560037',
    locality: 'Marathahalli',
    address: 'Tech Park, 4th Floor, Tower B',
    city: 'Bengaluru',
    state: 'Karnataka',
    type: 'WORK',
    isDefault: false,
  },
]

export function StoreProvider({ children }) {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('fk_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('fk_wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // User auth state
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fk_user')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.name === 'Adarsh Kumar') {
          return { ...parsed, name: 'Raja', email: 'raja@example.com' }
        }
        return parsed
      }
      return DEFAULT_USER
    } catch {
      return DEFAULT_USER
    }
  })

  // Addresses
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('fk_addresses')
      if (saved) {
        const parsed = JSON.parse(saved)
        return parsed.map((a) =>
          a.name && a.name.includes('Adarsh')
            ? { ...a, name: a.name.replace('Adarsh Kumar', 'Raja') }
            : a
        )
      }
      return DEFAULT_ADDRESSES
    } catch {
      return DEFAULT_ADDRESSES
    }
  })
  const [selectedAddressId, setSelectedAddressId] = useState('addr-1')

  // Orders list
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('fk_orders')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Toast notification state
  const [toast, setToast] = useState(null)

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('fk_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('fk_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem('fk_user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('fk_addresses', JSON.stringify(addresses))
  }, [addresses])

  useEffect(() => {
    localStorage.setItem('fk_orders', JSON.stringify(orders))
  }, [orders])

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev))
    }, 3200)
  }

  // Cart operations
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.product.id === product.id)
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        )
      }
      return [...prev, { product, qty }]
    })
    showToast(`Added "${product.name.slice(0, 30)}..." to Cart!`, 'success')
  }

  const updateQty = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, qty: newQty } : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
    showToast('Removed item from Cart', 'info')
  }

  const clearCart = () => {
    setCart([])
  }

  // Wishlist operations
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id)
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id))
      showToast('Removed from Wishlist', 'info')
    } else {
      setWishlist((prev) => [...prev, product])
      showToast('Saved to Wishlist! ❤️', 'success')
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId)
  }

  // Cart calculations
  const cartSummary = useMemo(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0)
    const totalMrp = cart.reduce(
      (acc, item) => acc + (item.product.originalPrice || item.product.price) * item.qty,
      0
    )
    const totalSelling = cart.reduce(
      (acc, item) => acc + item.product.price * item.qty,
      0
    )
    const discount = totalMrp - totalSelling
    const deliveryCharge = totalSelling > 500 || totalSelling === 0 ? 0 : 40
    const packagingFee = totalSelling > 0 ? 49 : 0
    const finalAmount = totalSelling + packagingFee + (deliveryCharge === 0 ? 0 : deliveryCharge)
    const totalSavings = discount + (deliveryCharge === 0 && totalSelling > 0 ? 40 : 0)

    return {
      totalItems,
      totalMrp,
      totalSelling,
      discount,
      deliveryCharge,
      packagingFee,
      finalAmount,
      totalSavings,
    }
  }, [cart])

  // Auth operations
  const login = (info) => {
    setUser({
      name: info.name || 'Raja',
      phone: info.phone || '+91 98765 43210',
      email: info.email || 'raja@fashionmart.com',
      isLoggedIn: true,
      superCoins: 480,
      plusMember: true,
    })
    showToast('Logged in successfully!', 'success')
  }

  const logout = () => {
    setUser({
      name: 'Guest',
      phone: '',
      email: '',
      isLoggedIn: false,
      superCoins: 0,
      plusMember: false,
    })
    showToast('Logged out of Fashion Mart', 'info')
  }

  // Addresses
  const addAddress = (newAddr) => {
    const addr = { ...newAddr, id: `addr-${Date.now()}` }
    setAddresses((prev) => [...prev, addr])
    setSelectedAddressId(addr.id)
    showToast('New delivery address saved!', 'success')
  }

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0]

  // Pincode lookup simulator
  const checkPincode = (pincode) => {
    const cleanPin = (pincode || '').trim()
    if (/^[1-9][0-9]{5}$/.test(cleanPin)) {
      const days = (parseInt(cleanPin.slice(-1), 10) % 2) + 1
      const deliveryDate = new Date()
      deliveryDate.setDate(deliveryDate.getDate() + days)
      const dateStr = deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
      return {
        isValid: true,
        message: `Delivery by ${dateStr} | FREE Delivery`,
        deliveryDate: dateStr,
      }
    }
    return {
      isValid: false,
      message: 'Please enter a valid 6-digit Indian PIN code',
    }
  }

  // Place Order
  const placeOrder = (paymentMethod) => {
    if (cart.length === 0) return null

    const orderId = `OD${Date.now()}${Math.floor(100 + Math.random() * 900)}`
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      items: [...cart],
      summary: { ...cartSummary },
      shippingAddress: selectedAddress,
      paymentMethod: paymentMethod || 'UPI',
      status: 'Order Placed',
      trackingSteps: [
        { label: 'Ordered', date: 'Today', done: true },
        { label: 'Packed', date: 'Expected Tomorrow', done: false },
        { label: 'Shipped', date: 'In 2 Days', done: false },
        { label: 'Delivered', date: 'In 3 Days', done: false },
      ],
    }

    setOrders((prev) => [newOrder, ...prev])
    clearCart()
    showToast('Order Placed Successfully! 🎉', 'success')
    return newOrder
  }

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        cartSummary,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        login,
        logout,
        addresses,
        selectedAddressId,
        setSelectedAddressId,
        selectedAddress,
        addAddress,
        orders,
        placeOrder,
        checkPincode,
        toast,
        showToast,
      }}
    >
      {children}
      {toast && (
        <div className={`fk-global-toast fk-toast-${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
