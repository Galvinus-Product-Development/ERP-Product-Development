import React from "react";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-conditions-page">
      <div className="heading">
        <section className="terms-head-section">
          <h2 className="terms-subtitle-heading">Terms and Conditions</h2>
          <p className="terms-content-head">
            Please read these Terms and Conditions carefully before using our
            services. By accessing or using the services, you agree to be bound
            by these terms.
          </p>
        </section>
      </div>

      <section className="terms-section">
        <div className="sections">
          <h3 className="terms-subsubtitle">1. Introduction</h3>
          <p className="terms-content">
            These Terms and Conditions govern the use of our website and
            services. By accessing or using our services, you agree to comply
            with these terms.
          </p>
        </div>

        <div className="sections">
          <h3 className="terms-subsubtitle">2. User Responsibilities</h3>
          <p className="terms-content">
            You agree to use our services responsibly, ensuring that you do not
            engage in any activity that may harm or disrupt the functionality of
            our platform.
          </p>
        </div>

        <div className="sections">
          <h3 className="terms-subsubtitle">3. Account Security</h3>
          <p className="terms-content">
            You are responsible for maintaining the security and confidentiality
            of your account information, and for all activities under your
            account.
          </p>
        </div>

        <div className="sections">
          <h3 className="terms-subsubtitle">4. Privacy Policy</h3>
          <p className="terms-content">
            Our Privacy Policy outlines how we collect, use, and protect your
            personal data. By using our services, you consent to our data
            practices as described in the Privacy Policy.
          </p>
        </div>

        <div className="sections">
          <h3 className="terms-subsubtitle">5. Limitation of Liability</h3>
          <p className="terms-content">
            We are not liable for any damages, loss of data, or loss of profit
            arising out of your use or inability to use our services.
          </p>
        </div>

        <div className="sections">
          <h3 className="terms-subsubtitle">6. Termination</h3>
          <p className="terms-content">
            We reserve the right to suspend or terminate your account if you
            violate any of these terms.
          </p>
        </div>

        <div className="sections">
          <h3 className="terms-subsubtitle">7. Changes to Terms</h3>
          <p className="terms-content">
            We may update or change these Terms and Conditions from time to
            time. We will notify you of any significant changes by posting the
            updated terms on our website.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
