// ContactUs.jsx
import { useState } from "react";
import './ContactUs.css';

const sections = [
  {
    category: 'Account',
    questions: [
      {
        question: 'How do I reset my password?',
        answer: 'Go to "Forgot Password" on the login page and follow the email instructions.'
      },
      {
        question: "How can I update my email or mobile number?",
        answer: "Login to your account, go to 'Account Settings' and update your contact info.",
      },
      {
        question: "I'm locked out of my account. What should I do?",
        answer: "Contact support via the Help button immediately for assistance.",
      },
    ]
  },
  {
    category: 'Delivery Related',
    questions: [
     {
        question: "How can I track my order?",
        answer: "Go to 'My Orders' section, select your order, and click tracking details.",
      },
      {
        question: "Can I change my delivery address after placing an order?",
        answer: "Address can only be changed if the order has not been shipped. Contact support ASAP.",
      },
      {
        question: "What should I do if I receive a damaged product?",
        answer: "Click 'Help' next to the product and upload images for support.",
      },
    ]
  },
  {
    category: 'Refund Related',
    questions: [
      {
        question: "How do I request a refund?",
        answer: "Go to 'My Orders', select the order, and click 'Request Refund'.",
      },
      {
        question: "How long does it take to receive a refund?",
        answer: "Most refunds are processed within 5-7 business days after approval.",
      },
      {
        question: "How will I receive my refund?",
        answer: "Refunds will be credited to the original payment method or as store credit.",
      },
    ]
  },
  {
    category: 'Payment Related',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept credit/debit cards, UPI, net banking, and wallets.'
      },
      {
        question: 'Why was my payment declined?',
        answer: 'Please verify your card details and ensure your bank has not blocked the transaction.',
      }
    ]
  },
  {
    category: 'Return & Exchange Related',
    questions: [
      {
        question: 'How do I return a product?',
        answer: 'Go to "My Orders", select the order, and click "Return Request".'
      },
      {
        question: 'Are returns free?',
        answer: 'Returns are free in most cases. See the return policy for exceptions.'
      }
    ]
  },
  {
    category: 'Cancellation Related',
    questions: [
      {
        question: "Can I cancel my order before it's shipped?",
        answer: "Yes, go to 'My Orders' and click 'Cancel' if the option is still available.",
      },
      {
        question: "What happens if I cancel a prepaid order?",
        answer: "The amount will be refunded to the original payment method or as store credit.",
      },
    ]
  }
];

const ContactUs = () => {
  const [openIndexes, setOpenIndexes] = useState({});
 

  const toggleAnswer = (sectionIndex, questionIndex) => {
    const key = `${sectionIndex}-${questionIndex}`;
    setOpenIndexes((prev) => {
      const isAlreadyOpen = prev[key];
    return isAlreadyOpen ? {} : { [key]: true }; // Only one open at a time
  });
};

const isSectionActive = (sectionIndex) => {
  return Object.keys(openIndexes).some(key => key.startsWith(`${sectionIndex}-`) && openIndexes[key]);
};

  return (
    <div className="contact-us-container">
      <h1>Galvinus Help Center | 24×7 Customer Support</h1>
      <p className="description">
        Welcome to the Galvinus Help Center — your 24×7 destination for quick support, answers, and guidance...
      </p>
      <p className="subtitle">Choose the type of issue you need help with</p>

      {sections.map((section, sectionIndex) => {
        const active = isSectionActive(sectionIndex);
        return (
          <div className="section" key={section.category}>
            <div className="section-row">
              <div className={"section-title-contact"}>
                {section.category}
              </div>
              <div className="thin-divider" />
              <div className={`section-content ${active ? 'active' : ''}`}>
                {section.questions.map((item, questionIndex) => {
                  const isOpen = openIndexes[`${sectionIndex}-${questionIndex}`];
                  return (
                    <div className="faq-item" key={item.question}>
                      <div
                        className="question"
                        onClick={() => toggleAnswer(sectionIndex, questionIndex)}
                      >
                        {item.question}
                      </div>
                      {isOpen && <div className="answer">{item.answer}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactUs;