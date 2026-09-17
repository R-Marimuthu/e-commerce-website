import './OrdersModal.css'
import { useStore } from '../context/StoreContext.jsx'

export default function OrdersModal({ isOpen, onClose }) {
  const { orders } = useStore()

  if (!isOpen) return null

  return (
    <div className="fk-orders-backdrop" onClick={onClose}>
      <div className="fk-orders-modal" onClick={(e) => e.stopPropagation()}>
        <div className="fk-orders-header">
          <h3 className="fk-orders-title">My Orders</h3>
          <button className="fk-orders-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="fk-orders-empty">
            <div className="fk-orders-empty-icon">📦</div>
            <h4>No Orders Found</h4>
            <p>You have not placed any orders yet.</p>
            <button className="fk-orders-shop-btn" onClick={onClose}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="fk-orders-list">
            {orders.map((order) => (
              <div key={order.orderId} className="fk-order-card">
                <div className="fk-order-top-bar">
                  <div>
                    <span className="fk-order-id-label">ORDER ID: </span>
                    <strong className="fk-order-id-val">{order.orderId}</strong>
                    <span className="fk-order-date">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="fk-order-total-badge">
                    Total: ₹{order.summary.finalAmount.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Items */}
                <div className="fk-order-items">
                  {order.items.map(({ product, qty }) => (
                    <div key={product.id} className="fk-order-item-row">
                      <img src={product.images[0]} alt={product.name} className="fk-order-item-img" />
                      <div className="fk-order-item-meta">
                        <span className="fk-order-item-name">{product.name}</span>
                        <span className="fk-order-item-qty">Qty: {qty} · ₹{(product.price * qty).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="fk-order-status-badge">
                        <span className="fk-status-dot" />
                        <span>Arriving Tomorrow</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Tracker Steps */}
                <div className="fk-tracker-wrap">
                  <div className="fk-tracker-steps">
                    {order.trackingSteps.map((step, idx) => (
                      <div key={idx} className={`fk-tracker-step ${step.done ? 'done' : ''}`}>
                        <div className="fk-tracker-bullet">{step.done ? '✓' : idx + 1}</div>
                        <span className="fk-tracker-label">{step.label}</span>
                        <span className="fk-tracker-time">{step.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
