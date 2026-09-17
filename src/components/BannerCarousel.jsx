import { useState, useEffect, useRef } from 'react'
import './BannerCarousel.css'
import { heroBanners, bankOffers } from '../data/flipkartData.js'

export default function BannerCarousel({ onSelectCategory }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (isPaused) return
    timerRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroBanners.length)
    }, 4500)

    return () => clearInterval(timerRef.current)
  }, [isPaused])

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? heroBanners.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % heroBanners.length)
  }

  const activeBanner = heroBanners[currentIdx]

  return (
    <div
      className="fk-carousel-wrap"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="fk-carousel-stage">
        <div
          className="fk-banner-slide"
          style={{ background: activeBanner.bgGradient }}
        >
          <div className="fk-banner-content">
            <span className="fk-banner-badge">{activeBanner.badge}</span>
            <h2 className="fk-banner-title">{activeBanner.title}</h2>
            <p className="fk-banner-sub">{activeBanner.subtitle}</p>
            <div className="fk-banner-offer-pill">{activeBanner.offerText}</div>
            <button
              className="fk-banner-cta"
              onClick={() => onSelectCategory(activeBanner.tagCategory)}
            >
              {activeBanner.ctaText} →
            </button>
          </div>
          <div className="fk-banner-image-wrap">
            <img
              src={activeBanner.image}
              alt={activeBanner.title}
              className="fk-banner-img"
            />
          </div>
        </div>

        {/* Carousel controls */}
        <button
          className="fk-carousel-arrow fk-arrow-left"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className="fk-carousel-arrow fk-arrow-right"
          onClick={handleNext}
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Dots */}
        <div className="fk-carousel-dots">
          {heroBanners.map((b, idx) => (
            <button
              key={b.id}
              className={`fk-carousel-dot ${idx === currentIdx ? 'active' : ''}`}
              onClick={() => setCurrentIdx(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bank discount strip */}
      <div className="fk-bank-strip">
        <div className="fk-bank-strip-inner">
          <span className="fk-bank-tag">⚡ BANK OFFERS</span>
          <div className="fk-bank-marquee">
            <span>{bankOffers[0]}</span>
            <span className="fk-bullet">•</span>
            <span>{bankOffers[1]}</span>
            <span className="fk-bullet">•</span>
            <span>{bankOffers[2]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
