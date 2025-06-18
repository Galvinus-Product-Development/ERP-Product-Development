import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="heading">
        <section className="privacy-head-section">
          <h2 className="privacy-subtitle-heading">Privacy Policy</h2>
        </section>
      </div>
      <section className="privacy-section">
        <h2 className="privacy-subtitle-head">
          What Personal Data We Collect and Why We Collect It
        </h2>
        <div className="section">
          <h3 className="privacy-subsubtitle">1. Comments</h3>
          <p className="privacy-content">
            When visitors leave comments on the site, we collect the data shown
            in the comments form, and also the visitor’s IP address and browser
            user agent string to help spam detection.
          </p>
          <p className="privacy-content">
            An anonymized string created from your email address (also called a
            hash) may be provided to the Gravatar service to see if you are
            using it. The Gravatar service privacy policy is available here:{" "}
            <a
              href="https://automattic.com/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://automattic.com/privacy/
            </a>
            . After approval of your comment, your profile picture is visible to
            the public in the context of your comment.
          </p>
        </div>
        <div className="section">
          <h3 className="privacy-subsubtitle">2. Media</h3>
          <p className="privacy-content">
            If you upload images to the website, you should avoid uploading
            images with embedded location data (EXIF GPS) included. Visitors to
            the website can download and extract any location data from images
            on the website.
          </p>
        </div>
        <div className="section">
          <h3 className="privacy-subsubtitle">3. Contact Forms</h3>
          <p className="privacy-content">
            If you leave a comment on our site, you may opt-in to saving your
            name, email address, and website in cookies. These are for your
            convenience so that you do not have to fill in your details again
            when you leave another comment. These cookies will last for one
            year.
          </p>
          <p className="privacy-content">
            When you log in, we will also set up several cookies to save your
            login information and your screen display choices. Login cookies
            last for two days, and screen options cookies last for a year. If
            you select “Remember Me,” your login will persist for two weeks.
          </p>
        </div>
        <div className="section">
          <h3 className="privacy-subsubtitle">
            4. Embedded Content from Other Websites
          </h3>
          <p className="privacy-content">
            Articles on this site may include embedded content (e.g., videos,
            images, articles, etc.). Embedded content from other websites
            behaves in the exact same way as if the visitor has visited the
            other website.
          </p>
          <p className="privacy-content">
            These websites may collect data about you, use cookies, embed
            additional third-party tracking, and monitor your interaction with
            that embedded content, including tracing your interaction with the
            embedded content if you have an account and are logged in to that
            website.
          </p>
        </div>
        <div className="section">
          <h3 className="privacy-subsubtitle">
            5. How Long We Retain Your Data
          </h3>
          <p className="privacy-content">
            If you leave a comment, the comment and its metadata are retained
            indefinitely. For users that register on our website (if any), we
            also store the personal information they provide in their user
            profile. Website administrators can also see and edit that
            information.
          </p>
        </div>
        <div className="section">
          <h3 className="privacy-subsubtitle">
            6. What Rights You Have Over Your Data
          </h3>
          <p className="privacy-content">
            If you have an account on this site or have left comments, you can
            request to receive an exported file of the personal data we hold
            about you. You can also request that we erase any personal data we
            hold about you.
          </p>
        </div>

        <div className="section">
          <h3 className="privacy-subsubtitle">7. Where We Send Your Data</h3>
          <p className="privacy-content">
            Visitor comments may be checked through an automated spam detection
            service.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
