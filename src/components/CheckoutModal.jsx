import { useState } from 'react'
import './CheckoutModal.css'
import { useStore } from '../context/StoreContext.jsx'

export default function CheckoutModal({ isOpen, onClose, onOpenOrders }) {
  const {
    cart,
    cartSummary,
    user,
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    selectedAddress,
    addAddress,
    placeOrder,
  } = useStore()

  const [step, setStep] = useState(2) // Step 1 is logged in, default start at Step 2 (Address)
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [newAddr, setNewAddr] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    type: 'HOME',
  })

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [upiApp, setUpiApp] = useState('gpay')
  const [cardInfo, setCardInfo] = useState({ number: '', expiry: '', cvv: '' })
  const [completedOrder, setCompletedOrder] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleAddNewAddress = (e) => {
    e.preventDefault()
    if (!newAddr.name || !newAddr.phone || !newAddr.pincode || !newAddr.address) {
      alert('Please fill all required fields!')
      return
    }
    addAddress(newAddr)
    setShowNewAddressForm(false)
  }

  const handleFinalPayment = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      let methodLabel = 'UPI (Google Pay)'
      if (paymentMethod === 'upi') methodLabel = `UPI (${upiApp.toUpperCase()})`
      else if (paymentMethod === 'card') methodLabel = 'Credit/Debit Card'
      else if (paymentMethod === 'netbanking') methodLabel = 'Net Banking'
      else if (paymentMethod === 'cod') methodLabel = 'Cash on Delivery'

      const order = placeOrder(methodLabel)
      setCompletedOrder(order)
      setIsSubmitting(false)
      setStep(5) // Success step
    }, 1200)
  }

  return (
    <div className="fk-checkout-backdrop" onClick={onClose}>
      <div
        className="fk-checkout-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="fk-checkout-header">
          <div className="fk-checkout-brand">
            <span className="fk-logo-text">Flipkart</span>
            <span className="fk-secure-pill">🔒 100% Safe & Secure Checkout</span>
          </div>
          <button className="fk-checkout-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Success Screen */}
        {step === 5 && completedOrder ? (
          <div className="fk-order-success-screen">
            <div className="fk-success-anim-wrap">
              <div className="fk-success-checkmark">✓</div>
            </div>
            <h2 className="fk-success-title">Order Placed Successfully!</h2>
            <p className="fk-success-id">
              Order ID: <strong>{completedOrder.orderId}</strong>
            </p>
            <p className="fk-success-info">
              A confirmation email & SMS has been sent to <strong>{user.phone || '+91 98765 43210'}</strong>.
            </p>

            <div className="fk-success-card">
              <div className="fk-success-row">
                <span>Estimated Delivery:</span>
                <strong>Tomorrow by 9:00 PM</strong>
              </div>
              <div className="fk-success-row">
                <span>Delivering To:</span>
                <span>{selectedAddress?.name}, {selectedAddress?.locality}, {selectedAddress?.city}</span>
              </div>
              <div className="fk-success-row">
                <span>Amount Paid:</span>
                <strong>₹{completedOrder.summary.finalAmount.toLocaleString('en-IN')} via {completedOrder.paymentMethod}</strong>
              </div>
              <div className="fk-supercoins-reward">
                🪙 <strong>+40 SuperCoins Earned</strong> with this purchase!
              </div>
            </div>

            <div className="fk-success-actions">
              <button
                className="fk-btn-orders"
                onClick={() => {
                  onClose()
                  if (onOpenOrders) onOpenOrders()
                }}
              >
                Track Order
              </button>
              <button className="fk-btn-continue" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* 4-Step Accordion Checkout */
          <div className="fk-checkout-grid">
            <div className="fk-steps-column">
              {/* STEP 1: LOGIN */}
              <div className={`fk-step-card ${step > 1 ? 'completed' : 'active'}`}>
                <div className="fk-step-head">
                  <span className="fk-step-number">1</span>
                  <div className="fk-step-title-wrap">
                    <span className="fk-step-title">LOGIN</span>
                    {step > 1 && (
                      <span className="fk-step-done-desc">
                        {user.name} ({user.phone || '+91 98765 43210'})
                      </span>
                    )}
                  </div>
                  {step > 1 && (
                    <span className="fk-step-check">✓</span>
                  )}
                </div>
              </div>

              {/* STEP 2: DELIVERY ADDRESS */}
              <div className={`fk-step-card ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
                <div className="fk-step-head" onClick={() => step > 2 && setStep(2)}>
                  <span className="fk-step-number">2</span>
                  <div className="fk-step-title-wrap">
                    <span className="fk-step-title">DELIVERY ADDRESS</span>
                    {step > 2 && selectedAddress && (
                      <span className="fk-step-done-desc">
                        {selectedAddress.name}, {selectedAddress.address}, {selectedAddress.city} - {selectedAddress.pincode}
                      </span>
                    )}
                  </div>
                  {step > 2 && (
                    <button className="fk-change-step-btn" onClick={() => setStep(2)}>
                      CHANGE
                    </button>
                  )}
                </div>

                {step === 2 && (
                  <div className="fk-step-body">
                    {/* Saved Addresses list */}
                    <div className="fk-saved-addresses">
                      {addresses.map((addr) => (
                        <label
                          key={addr.id}
                          className={`fk-addr-radio-label ${selectedAddressId === addr.id ? 'selected' : ''}`}
                        >
                          <input
                            type="radio"
                            name="address_select"
                            checked={selectedAddressId === addr.id}
                            onChange={() => setSelectedAddressId(addr.id)}
                          />
                          <div className="fk-addr-radio-content">
                            <div className="fk-addr-type-row">
                              <span className="fk-addr-name">{addr.name}</span>
                              <span className="fk-addr-tag">{addr.type}</span>
                              <span className="fk-addr-phone">{addr.phone}</span>
                            </div>
                            <p className="fk-addr-full">
                              {addr.address}, {addr.locality}, {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                            </p>
                            {selectedAddressId === addr.id && (
                              <button
                                type="button"
                                className="fk-deliver-here-btn"
                                onClick={() => setStep(3)}
                              >
                                DELIVER HERE
                              </button>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Add New Address toggle */}
                    {!showNewAddressForm ? (
                      <button
                        type="button"
                        className="fk-add-new-addr-btn"
                        onClick={() => setShowNewAddressForm(true)}
                      >
                        + Add a new address
                      </button>
                    ) : (
                      <form className="fk-new-addr-form" onSubmit={handleAddNewAddress}>
                        <h4 className="fk-form-heading">Add New Address</h4>
                        <div className="fk-form-row">
                          <input
                            type="text"
                            placeholder="Full Name *"
                            required
                            value={newAddr.name}
                            onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                          />
                          <input
                            type="tel"
                            placeholder="10-digit mobile number *"
                            required
                            maxLength="10"
                            value={newAddr.phone}
                            onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                          />
                        </div>
                        <div className="fk-form-row">
                          <input
                            type="text"
                            placeholder="Pincode *"
                            required
                            maxLength="6"
                            value={newAddr.pincode}
                            onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                          />
                          <input
                            type="text"
                            placeholder="Locality *"
                            required
                            value={newAddr.locality}
                            onChange={(e) => setNewAddr({ ...newAddr, locality: e.target.value })}
                          />
                        </div>
                        <div className="fk-form-row full">
                          <input
                            type="text"
                            placeholder="Address (Area and Street) *"
                            required
                            value={newAddr.address}
                            onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
                          />
                        </div>
                        <div className="fk-form-row">
                          <input
                            type="text"
                            placeholder="City/District/Town *"
                            required
                            value={newAddr.city}
                            onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                          />
                          <input
                            type="text"
                            placeholder="State *"
                            required
                            value={newAddr.state}
                            onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                          />
                        </div>
                        <div className="fk-form-actions">
                          <button type="submit" className="fk-deliver-here-btn">
                            SAVE AND DELIVER HERE
                          </button>
                          <button
                            type="button"
                            className="fk-cancel-addr-btn"
                            onClick={() => setShowNewAddressForm(false)}
                          >
                            CANCEL
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>

              {/* STEP 3: ORDER SUMMARY */}
              <div className={`fk-step-card ${step === 3 ? 'active' : step > 3 ? 'completed' : ''}`}>
                <div className="fk-step-head" onClick={() => step > 3 && setStep(3)}>
                  <span className="fk-step-number">3</span>
                  <div className="fk-step-title-wrap">
                    <span className="fk-step-title">ORDER SUMMARY</span>
                    {step > 3 && (
                      <span className="fk-step-done-desc">
                        {cartSummary.totalItems} Items
                      </span>
                    )}
                  </div>
                  {step > 3 && (
                    <button className="fk-change-step-btn" onClick={() => setStep(3)}>
                      CHANGE
                    </button>
                  )}
                </div>

                {step === 3 && (
                  <div className="fk-step-body">
                    <div className="fk-summary-items-list">
                      {cart.map(({ product, qty }) => (
                        <div key={product.id} className="fk-summary-item-row">
                          <img src={product.images[0]} alt={product.name} className="fk-summary-img" />
                          <div className="fk-summary-info">
                            <h5 className="fk-summary-title">{product.name}</h5>
                            <span className="fk-summary-qty">Qty: {qty}</span>
                            <div className="fk-summary-prices">
                              <span className="fk-summary-price">₹{(product.price * qty).toLocaleString('en-IN')}</span>
                              <span className="fk-summary-mrp">₹{(product.originalPrice * qty).toLocaleString('en-IN')}</span>
                            </div>
                            <span className="fk-summary-delivery">Delivery by Tomorrow, 9 PM | Free</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="fk-summary-footer">
                      <p className="fk-confirmation-email-note">
                        Order confirmation email will be sent to <strong>{user.email || 'customer@flipkart.com'}</strong>
                      </p>
                      <button
                        className="fk-deliver-here-btn fk-continue-btn"
                        onClick={() => setStep(4)}
                      >
                        CONTINUE TO PAYMENT
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 4: PAYMENT OPTIONS */}
              <div className={`fk-step-card ${step === 4 ? 'active' : ''}`}>
                <div className="fk-step-head">
                  <span className="fk-step-number">4</span>
                  <div className="fk-step-title-wrap">
                    <span className="fk-step-title">PAYMENT OPTIONS</span>
                  </div>
                </div>

                {step === 4 && (
                  <div className="fk-step-body">
                    {/* Payment Options list */}
                    <div className="fk-payment-options">
                      {/* UPI */}
                      <label className={`fk-pay-method ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                        <div className="fk-pay-radio-row">
                          <input
                            type="radio"
                            name="pay_method"
                            checked={paymentMethod === 'upi'}
                            onChange={() => setPaymentMethod('upi')}
                          />
                          <span className="fk-pay-title">UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                        </div>
                        {paymentMethod === 'upi' && (
                          <div className="fk-pay-sub">
                            <div className="fk-upi-apps">
                              <label className="fk-upi-app">
                                <input
                                  type="radio"
                                  name="upi_app"
                                  checked={upiApp === 'gpay'}
                                  onChange={() => setUpiApp('gpay')}
                                />
                                <span>Google Pay</span>
                              </label>
                              <label className="fk-upi-app">
                                <input
                                  type="radio"
                                  name="upi_app"
                                  checked={upiApp === 'phonepe'}
                                  onChange={() => setUpiApp('phonepe')}
                                />
                                <span>PhonePe</span>
                              </label>
                              <label className="fk-upi-app">
                                <input
                                  type="radio"
                                  name="upi_app"
                                  checked={upiApp === 'paytm'}
                                  onChange={() => setUpiApp('paytm')}
                                />
                                <span>Paytm UPI</span>
                              </label>
                            </div>
                            <span className="fk-upi-hint">✓ Instant payment via your UPI app</span>
                          </div>
                        )}
                      </label>

                      {/* Credit/Debit Card */}
                      <label className={`fk-pay-method ${paymentMethod === 'card' ? 'selected' : ''}`}>
                        <div className="fk-pay-radio-row">
                          <input
                            type="radio"
                            name="pay_method"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                          />
                          <span className="fk-pay-title">Credit / Debit / ATM Card</span>
                        </div>
                        {paymentMethod === 'card' && (
                          <div className="fk-pay-sub fk-card-inputs">
                            <input
                              type="text"
                              placeholder="Card Number"
                              maxLength="19"
                              value={cardInfo.number}
                              onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                            />
                            <div className="fk-card-inline">
                              <input
                                type="text"
                                placeholder="MM / YY"
                                maxLength="5"
                                value={cardInfo.expiry}
                                onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                              />
                              <input
                                type="password"
                                placeholder="CVV"
                                maxLength="3"
                                value={cardInfo.cvv}
                                onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                              />
                            </div>
                          </div>
                        )}
                      </label>

                      {/* Net Banking */}
                      <label className={`fk-pay-method ${paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                        <div className="fk-pay-radio-row">
                          <input
                            type="radio"
                            name="pay_method"
                            checked={paymentMethod === 'netbanking'}
                            onChange={() => setPaymentMethod('netbanking')}
                          />
                          <span className="fk-pay-title">Net Banking (HDFC, SBI, ICICI, Axis)</span>
                        </div>
                      </label>

                      {/* Cash on Delivery */}
                      <label className={`fk-pay-method ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                        <div className="fk-pay-radio-row">
                          <input
                            type="radio"
                            name="pay_method"
                            checked={paymentMethod === 'cod'}
                            onChange={() => setPaymentMethod('cod')}
                          />
                          <span className="fk-pay-title">Cash on Delivery</span>
                        </div>
                      </label>
                    </div>

                    {/* Pay Button */}
                    <button
                      className="fk-pay-now-btn"
                      disabled={isSubmitting}
                      onClick={handleFinalPayment}
                    >
                      {isSubmitting
                        ? 'Processing Secure Payment...'
                        : `CONFIRM & PAY ₹${cartSummary.finalAmount.toLocaleString('en-IN')}`}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Price details */}
            <div className="fk-checkout-summary">
              <div className="fk-price-card">
                <h3 className="fk-price-card-title">PRICE DETAILS</h3>
                <div className="fk-price-lines">
                  <div className="fk-price-row">
                    <span>Price ({cartSummary.totalItems} items)</span>
                    <span>₹{cartSummary.totalMrp.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="fk-price-row">
                    <span>Discount</span>
                    <span className="fk-green-text">
                      − ₹{cartSummary.discount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="fk-price-row">
                    <span>Delivery Charges</span>
                    <span className="fk-green-text">
                      <del className="fk-del-fee">₹40</del> FREE
                    </span>
                  </div>
                  <div className="fk-price-row">
                    <span>Secured Packaging Fee</span>
                    <span>₹{cartSummary.packagingFee}</span>
                  </div>
                </div>

                <div className="fk-total-amount-row">
                  <span>Total Payable</span>
                  <span>₹{cartSummary.finalAmount.toLocaleString('en-IN')}</span>
                </div>

                {cartSummary.totalSavings > 0 && (
                  <div className="fk-savings-banner">
                    Your total savings on this order: ₹{cartSummary.totalSavings.toLocaleString('en-IN')}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
