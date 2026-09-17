import { useState, useMemo } from 'react'
import { StoreProvider } from './context/StoreContext.jsx'
import { flipkartProducts } from './data/flipkartData.js'

import FlipkartHeader from './components/FlipkartHeader.jsx'
import CategoryBar from './components/CategoryBar.jsx'
import BannerCarousel from './components/BannerCarousel.jsx'
import DealsSection from './components/DealsSection.jsx'
import ProductFilters from './components/ProductFilters.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import ProductDetailModal from './components/ProductDetailModal.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import CheckoutModal from './components/CheckoutModal.jsx'
import AuthModal from './components/AuthModal.jsx'
import WishlistDrawer from './components/WishlistDrawer.jsx'
import OrdersModal from './components/OrdersModal.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  // Navigation & Search State
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // Filter States
  const [selectedBrands, setSelectedBrands] = useState([])
  const [priceLimit, setPriceLimit] = useState(150000)
  const [minRating, setMinRating] = useState(0)
  const [onlyAssured, setOnlyAssured] = useState(false)
  const [minDiscount, setMinDiscount] = useState(0)
  const [sortBy, setSortBy] = useState('relevance')

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isOrdersOpen, setIsOrdersOpen] = useState(false)

  // Derived available brands based on current category
  const availableBrands = useMemo(() => {
    const relevant =
      activeCategory === 'All'
        ? flipkartProducts
        : flipkartProducts.filter((p) => p.category === activeCategory)
    const brandSet = new Set(relevant.map((p) => p.brand))
    return Array.from(brandSet).sort()
  }, [activeCategory])

  const maxCatalogPrice = useMemo(() => {
    return Math.max(...flipkartProducts.map((p) => p.price), 150000)
  }, [])

  // Brand toggle handler
  const handleToggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  // Clear all filters
  const handleClearAllFilters = () => {
    setSelectedBrands([])
    setPriceLimit(maxCatalogPrice)
    setMinRating(0)
    setOnlyAssured(false)
    setMinDiscount(0)
    setSortBy('relevance')
    setQuery('')
  }

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = flipkartProducts.filter((p) => {
      // Category filter
      if (activeCategory !== 'All' && p.category !== activeCategory) {
        return false
      }
      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase()
        const matchesName = p.name.toLowerCase().includes(q)
        const matchesBrand = p.brand.toLowerCase().includes(q)
        const matchesCat = p.category.toLowerCase().includes(q)
        if (!matchesName && !matchesBrand && !matchesCat) return false
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false
      }
      // Price filter
      if (p.price > priceLimit) {
        return false
      }
      // Rating filter
      if (minRating > 0 && p.rating < minRating) {
        return false
      }
      // Assured filter
      if (onlyAssured && !p.isAssured) {
        return false
      }
      // Discount filter
      if (minDiscount > 0 && p.discount < minDiscount) {
        return false
      }
      return true
    })

    // Sorting
    if (sortBy === 'price_low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price_high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'popularity') {
      result.sort((a, b) => b.ratingCount - a.ratingCount)
    } else if (sortBy === 'discount') {
      result.sort((a, b) => b.discount - a.discount)
    }

    return result
  }, [
    activeCategory,
    query,
    selectedBrands,
    priceLimit,
    minRating,
    onlyAssured,
    minDiscount,
    sortBy,
  ])

  // Featured Deal collections
  const dealsOfDay = useMemo(() => {
    return flipkartProducts.filter((p) => p.isDealOfDay)
  }, [])

  const electronicsDeals = useMemo(() => {
    return flipkartProducts.filter(
      (p) => p.category === 'Electronics' || p.category === 'Audio' || p.category === 'Mobiles'
    )
  }, [])

  const isHomePage = activeCategory === 'All' && !query.trim()

  return (
    <StoreProvider>
      {/* Flipkart Header Navbar */}
      <FlipkartHeader
        query={query}
        onQueryChange={setQuery}
        onSearchSubmit={() => {}}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        allProducts={flipkartProducts}
      />

      {/* Top Categories Navigation Bar */}
      <CategoryBar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat)
          setSelectedBrands([])
        }}
      />

      <main className="fk-wrap" style={{ flex: 1 }}>
        {/* Render Carousel & Deal Ribbons on Home screen */}
        {isHomePage && (
          <>
            <BannerCarousel onSelectCategory={setActiveCategory} />
            <DealsSection
              title="Deals of the Day"
              subtitle="Grab these limited time blockbuster discounts!"
              products={dealsOfDay}
              onSelectProduct={setSelectedProduct}
              hasTimer={true}
            />
            <DealsSection
              title="Best of Electronics & Gadgets"
              subtitle="Laptops, flagships & audiophile sound"
              products={electronicsDeals}
              onSelectProduct={setSelectedProduct}
              hasTimer={false}
            />
          </>
        )}

        {/* Main Content Layout: Filters Sidebar + Products Grid */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
            marginTop: isHomePage ? '8px' : '16px',
            marginBottom: '32px',
          }}
        >
          <ProductFilters
            brands={availableBrands}
            selectedBrands={selectedBrands}
            onToggleBrand={handleToggleBrand}
            maxPrice={maxCatalogPrice}
            priceLimit={priceLimit}
            onPriceLimitChange={setPriceLimit}
            minRating={minRating}
            onMinRatingChange={setMinRating}
            onlyAssured={onlyAssured}
            onToggleAssured={setOnlyAssured}
            minDiscount={minDiscount}
            onMinDiscountChange={setMinDiscount}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            onClearAll={handleClearAllFilters}
            totalResults={filteredProducts.length}
          />

          <ProductGrid
            products={filteredProducts}
            onSelectProduct={setSelectedProduct}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            activeCategory={activeCategory}
            query={query}
            totalCount={filteredProducts.length}
            onClearFilters={handleClearAllFilters}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => {
          setIsCartOpen(false)
          setIsCheckoutOpen(true)
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOpenOrders={() => setIsOrdersOpen(true)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onSelectProduct={setSelectedProduct}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />
    </StoreProvider>
  )
}
