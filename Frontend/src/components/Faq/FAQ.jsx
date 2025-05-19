import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index); 
  };
  return (
    <div className="faq-page">
 {/* Main Heading */}
 <div className="faq-main-heading">
        <h1>Frequently Asked Questions</h1>
        <p>
          Find answers to common queries about our services, shopping,
          payments, and more.
        </p>
      </div>

      <div className="faq-container">
        {/* Shopping Information Section */}
        <div className="faq-column">
          <h2 className="faq-heading">Shopping Information</h2>
          
          <div
            className={`faq-item ${activeIndex === 0 ? "active" : ""}`}
            onClick={() => toggleAnswer(0)}
          >


            <h3 className="faq-question">
              Delivery charges for orders from the Online Shop?
              <span className="faq-arrow">{activeIndex === 0 ? "▲" : "▼"}</span>
            </h3>
            {activeIndex === 0 && (
              <p className="faq-answer">
                A placerat ac vestibulum integer vehicula suspendisse nostra
                aptent fermentum tempor a magna erat ligula parturient curae sem
                conubia vestibulum ac inceptos sodales condimentum cursus nunc
                mi consectetur condimentum.
              </p>
            )}
          </div>

          <div
            className={`faq-item ${activeIndex === 1 ? "active" : ""}`}
            onClick={() => toggleAnswer(1)}
          >
            <h3 className="faq-question">How long will delivery take?
            <span className="faq-arrow">{activeIndex === 1 ? "▲" : "▼"}</span>
            </h3>
            {activeIndex === 1 && (
              <p className="faq-answer">
                Delivery usually takes 3–7 business days, depending on your
                location.
              </p>
            )}
          </div>

          <div
            className={`faq-item ${activeIndex === 2 ? "active" : ""}`}
            onClick={() => toggleAnswer(2)}
          >
            <h3 className="faq-question">
              What exactly happens after ordering?
              <span className="faq-arrow">{activeIndex === 2 ? "▲" : "▼"}</span>
            </h3>
            {activeIndex === 2 && (
              <p className="faq-answer">
                Once your order is placed, you will receive a confirmation email
                with the details. Our team will then process and ship your
                order.
              </p>
            )}
          </div>
        </div>

        {/* Payment Information Section */}
        <div className="faq-column">
          <h2 className="faq-heading">Payment Information</h2>

          <div
            className={`faq-item ${activeIndex === 3 ? "active" : ""}`}
            onClick={() => toggleAnswer(3)}
          >
            <h3 className="faq-question">
              When is the order payment taken from my bank account?
              <span className="faq-arrow">{activeIndex === 3 ? "▲" : "▼"}</span>
            </h3>
            {activeIndex === 3 && (
              <p className="faq-answer">
                Payment is taken at the time of checkout once the order is
                confirmed.
              </p>
            )}
          </div>

          <div className={`faq-item ${activeIndex === 4 ? "active" : ""}`}
           onClick={() => toggleAnswer(4)}>
            <h3 className="faq-question">What is a wishlist?
            <span className="faq-arrow">{activeIndex === 4 ? "▲" : "▼"}</span>
            </h3>
            {activeIndex === 4 && (
              <p className="faq-answer">
                A wishlist is a feature that allows you to save products you are
                interested in purchasing later.
              </p>
            )}
          </div>

          <div className={`faq-item ${activeIndex === 5 ? "active" : ""}`}
           onClick={() => toggleAnswer(5)}>
            <h3 className="faq-question">
              What should I do if I receive a damaged or wrong product?
              <span className="faq-arrow">{activeIndex === 5 ? "▲" : "▼"}</span>
            </h3>
            {activeIndex === 5 && (
              <p className="faq-answer">
                Please contact our support team immediately, and we will assist
                you in resolving the issue.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
 
/* const FAQ = () => {
  return (
    <div className="faq-page">
      <div className="heading">
        <section className="faq-head-section">
          <h2 className="faq-subtitle-heading">Frequently Asked Questions</h2>
          <p className="faq-content-head">
            Here are some of the most common questions we get asked. If you have a question that isn&apos;t answered here, feel free to contact us!
          </p>
        </section>
      </div>

      <section className="faq-section">
        <div className="section">
          <h3 className="faq-subsubtitle">1. How do I create an account?</h3>
          <p className="faq-content">
            To create an account, simply click the &quot;Sign Up&quot; button on the homepage and fill in the required details. Once you&apos;ve registered, you can log in and start using our services.
          </p>
        </div>

        <div className="section">
          <h3 className="faq-subsubtitle">2. How do I reset my password?</h3>
          <p className="faq-content">
            If you&apos;ve forgotten your password, click the &quot;Forgot Password&quot; link on the login page. You&apos;ll receive an email with a link to reset your password.
          </p>
        </div>

        <div className="section">
          <h3 className="faq-subsubtitle">3. How can I contact customer support?</h3>
          <p className="faq-content">
            You can contact our customer support team by clicking the &quot;Contact Us&quot; link in the footer or sending us an email directly at support@yourcompany.com.
          </p>
        </div>

        <div className="section">
          <h3 className="faq-subsubtitle">4. What payment methods do you accept?</h3>
          <p className="faq-content">
            We accept major credit cards, PayPal, and bank transfers. For further payment options, please visit our payments page.
          </p>
        </div>

        <div className="section">
          <h3 className="faq-subsubtitle">5. How can I cancel my account?</h3>
          <p className="faq-content">
            If you wish to cancel your account, please contact our support team and they will assist you with the cancellation process.
          </p>
        </div>
      </section>
    </div>
  );
};

 return (
    <div className="faq-page">
      <div className="heading">
        <section className="faq-head-section">
          <h2 className="faq-subtitle-heading">Frequently Asked Questions</h2>
          <p className="faq-content-head">
            Find answers to your most common questions. If you don&apos;t see the answer you&apos;re looking for, feel free to <a href="/contact">contact us</a>.
          </p>
        </section>
      </div>

      <section className="faq-section">
        <div className="faq-item">
          <h3 className="faq-question" onClick={() => toggleAnswer(0)}>
            1. How do I create an account?
          </h3>
          {activeIndex === 0 && (
            <p className="faq-answer">
              To create an account, simply click the &quot;Sign Up&quot; button on the homepage and fill in the required details.
            </p>
          )}
        </div>

        <div className="faq-item">
          <h3 className="faq-question" onClick={() => toggleAnswer(1)}>
            2. How do I reset my password?
          </h3>
          {activeIndex === 1 && (
            <p className="faq-answer">
              If you&apos;ve forgotten your password, click the &quot;Forgot Password&quot; link on the login page to reset it.
            </p>
          )}
        </div>

        <div className="faq-item">
          <h3 className="faq-question" onClick={() => toggleAnswer(2)}>
            3. How can I contact customer support?
          </h3>
          {activeIndex === 2 && (
            <p className="faq-answer">
              You can contact our customer support team by visiting the &quot;Contact Us&quot; page or sending us an email directly.
            </p>
          )}
        </div>

        <div className="faq-item">
          <h3 className="faq-question" onClick={() => toggleAnswer(3)}>
            4. What payment methods do you accept?
          </h3>
          {activeIndex === 3 && (
            <p className="faq-answer">
              We accept major credit cards, PayPal, and bank transfers. You can see a full list of options during checkout.
            </p>
          )}
        </div>

        <div className="faq-item">
          <h3 className="faq-question" onClick={() => toggleAnswer(4)}>
            5. How can I cancel my subscription?
          </h3>
          {activeIndex === 4 && (
            <p className="faq-answer">
              To cancel your subscription, please go to the &quot;Subscription&quot; section of your account and follow the instructions.
            </p>
          )}
        </div>
      </section>

      <div className="faq-contact">
        <h3>Didn&apos;t find your answer?</h3>
        <p>
          Feel free to <a href="/contact">contact us</a> for more assistance.
        </p>
      </div>
    </div>
  );
};

export default FAQ;

*/
