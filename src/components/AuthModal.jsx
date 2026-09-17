import { useState } from 'react'
import './AuthModal.css'
import { useStore } from '../context/StoreContext.jsx'

export default function AuthModal({ isOpen, onClose }) {
  const { login } = useStore()
  const [identifier, setIdentifier] = useState('')
  const [otpStep, setOtpStep] = useState(false)
  const [otp, setOtp] = useState('')

  if (!isOpen) return null

  const handleRequestOtp = (e) => {
    e.preventDefault()
    if (!identifier.trim()) return
    setOtpStep(true)
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    const isEmail = identifier.includes('@')
    login({
      name: isEmail ? identifier.split('@')[0] : 'Flipkart Shopper',
      phone: !isEmail ? identifier : '+91 98765 43210',
      email: isEmail ? identifier : 'shopper@flipkart.com',
    })
    onClose()
  }

  const handleQuickDemoLogin = () => {
    login({
      name: 'Adarsh Kumar',
      phone: '+91 98765 43210',
      email: 'adarsh.kumar@example.com',
    })
    onClose()
  }

  return (
    <div className="fk-auth-backdrop" onClick={onClose}>
      <div className="fk-auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="fk-auth-close" onClick={onClose}>
          ✕
        </button>

        <div className="fk-auth-grid">
          {/* Left Blue Banner */}
          <div className="fk-auth-left">
            <h3 className="fk-auth-brand-heading">Login</h3>
            <p className="fk-auth-subtext">
              Get access to your Orders, Wishlist and Recommendations
            </p>
            <div className="fk-auth-graphic">
              <span className="fk-auth-badge">⭐ PLUS</span>
              <p>Earn SuperCoins on every purchase!</p>
            </div>
          </div>

          {/* Right Form */}
          <div className="fk-auth-right">
            {!otpStep ? (
              <form onSubmit={handleRequestOtp} className="fk-auth-form">
                <div className="fk-auth-input-group">
                  <input
                    type="text"
                    required
                    placeholder="Enter Email/Mobile number"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="fk-auth-input"
                  />
                  <span className="fk-auth-terms">
                    By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.
                  </span>
                </div>

                <button type="submit" className="fk-auth-cta-btn">
                  Request OTP
                </button>

                <div className="fk-auth-or-line">
                  <span>OR</span>
                </div>

                <button
                  type="button"
                  className="fk-demo-login-btn"
                  onClick={handleQuickDemoLogin}
                >
                  ⚡ Instant 1-Click Demo Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="fk-auth-form">
                <p className="fk-otp-sent-note">
                  Please enter the OTP sent to <strong>{identifier}</strong>
                </p>
                <div className="fk-auth-input-group">
                  <input
                    type="text"
                    required
                    maxLength="6"
                    placeholder="Enter 6-digit OTP (e.g. 123456)"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="fk-auth-input fk-otp-input"
                  />
                </div>
                <button type="submit" className="fk-auth-cta-btn">
                  Verify &amp; Login
                </button>
                <button
                  type="button"
                  className="fk-link-back"
                  onClick={() => setOtpStep(false)}
                >
                  Change Mobile / Email
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
