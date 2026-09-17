import { useState, useEffect, useRef } from 'react'
import './DealsSection.css'

export default function DealsSection({
  title = 'Deals of the Day',
  subtitle = 'Top offers curated for you',
  products = [],
  onSelectProduct,
  hasTimer = true,
}) {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 })
  const scrollRef = useRef(null)

  // Countdown timer simulation
  useEffect(() => {
    if (!hasTimer) return
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [hasTimer])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <section className="fk-deals-section">
      <div className="fk-deals-header">
        <div className="fk-deals-title-wrap">
          <h2 className="fk-deals-heading">{title}</h2>
          {hasTimer && (
            <div className="fk-deals-timer">
              <span className="fk-clock-icon">⏰</span>
              <span className="fk-timer-digits">
                {pad(timeLeft.hours)} : {pad(timeLeft.minutes)} : {pad(timeLeft.seconds)} Left
              </span>
            </div>
          )}
        </div>
        <p className="fk-deals-subtitle">{subtitle}</p>
      </div>

      <div className="fk-deals-carousel-wrapper">
        <button
          className="fk-deal-nav fk-deal-left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div className="fk-deals-row" ref={scrollRef}>
          {products.map((p) => (
            <div
              key={p.id}
              className="fk-deal-card"
              onClick={() => onSelectProduct(p)}
            >
              <div className="fk-deal-img-wrap">
                <img src={p.images[0]} alt={p.name} className="fk-deal-img" />
              </div>
              <h3 className="fk-deal-name" title={p.name}>
                {p.name}
              </h3>
              <div className="fk-deal-offer">
                Min. {p.discount}% Off
              </div>
              <div className="fk-deal-price">
                From ₹{p.price.toLocaleString('en-IN')}
              </div>
              <span className="fk-deal-brand">{p.brand}</span>
            </div>
          ))}
        </div>

        <button
          className="fk-deal-nav fk-deal-right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>
  )
}
