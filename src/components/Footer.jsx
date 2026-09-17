import './Footer.css'

export default function Footer() {
  return (
    <footer className="fk-footer">
      <div className="fk-footer-top">
        <div className="fk-footer-container">
          <div className="fk-footer-links-grid">
            <div className="fk-footer-col">
              <h5 className="fk-footer-heading">ABOUT</h5>
              <a href="#about">Contact Us</a>
              <a href="#about">About Us</a>
              <a href="#careers">Careers</a>
              <a href="#stories">Flipkart Stories</a>
              <a href="#press">Press</a>
              <a href="#corporate">Corporate Information</a>
            </div>

            <div className="fk-footer-col">
              <h5 className="fk-footer-heading">GROUP COMPANIES</h5>
              <a href="#myntra">Myntra</a>
              <a href="#cleartrip">Cleartrip</a>
              <a href="#shopsy">Shopsy</a>
            </div>

            <div className="fk-footer-col">
              <h5 className="fk-footer-heading">HELP</h5>
              <a href="#payments">Payments</a>
              <a href="#shipping">Shipping</a>
              <a href="#returns">Cancellation &amp; Returns</a>
              <a href="#faq">FAQ</a>
              <a href="#report">Report Infringement</a>
            </div>

            <div className="fk-footer-col">
              <h5 className="fk-footer-heading">CONSUMER POLICY</h5>
              <a href="#terms">Cancellation &amp; Returns</a>
              <a href="#terms">Terms Of Use</a>
              <a href="#security">Security</a>
              <a href="#privacy">Privacy</a>
              <a href="#sitemap">Sitemap</a>
              <a href="#grievance">Grievance Redressal</a>
            </div>

            <div className="fk-footer-col fk-footer-address-col">
              <h5 className="fk-footer-heading">Mail Us:</h5>
              <p>
                Flipkart Internet Private Limited,<br />
                Buildings Alyssa, Begonia &amp; Clove Embassy Tech Village,<br />
                Outer Ring Road, Devarabeesanahalli Village,<br />
                Bengaluru, 560103,<br />
                Karnataka, India
              </p>
            </div>

            <div className="fk-footer-col fk-footer-address-col">
              <h5 className="fk-footer-heading">Registered Office Address:</h5>
              <p>
                Flipkart Internet Private Limited,<br />
                Buildings Alyssa, Begonia &amp; Clove Embassy Tech Village,<br />
                Outer Ring Road, Devarabeesanahalli Village,<br />
                Bengaluru, 560103,<br />
                Karnataka, India<br />
                CIN: U51109KA2012PTC066107<br />
                Telephone: 044-45614700 / 044-67415800
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fk-footer-bottom">
        <div className="fk-footer-container fk-bottom-bar">
          <div className="fk-bottom-features">
            <span className="fk-bottom-feat">
              <span className="fk-feat-icon">💼</span> Become a Seller
            </span>
            <span className="fk-bottom-feat">
              <span className="fk-feat-icon">⭐</span> Advertise
            </span>
            <span className="fk-bottom-feat">
              <span className="fk-feat-icon">🎁</span> Gift Cards
            </span>
            <span className="fk-bottom-feat">
              <span className="fk-feat-icon">❓</span> Help Center
            </span>
          </div>

          <div className="fk-copyright">
            © 2007-2026 Flipkart.com. All rights reserved.
          </div>

          <div className="fk-payment-badges">
            <span className="fk-pay-card">VISA</span>
            <span className="fk-pay-card">MasterCard</span>
            <span className="fk-pay-card">RuPay</span>
            <span className="fk-pay-card">UPI</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
