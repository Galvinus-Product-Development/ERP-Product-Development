import "./HeaderSection.css";

const HeaderSection = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>

      <section className="about-intro">
        <p>
          Welcome to <strong>Galvinus</strong>, where passion meets purpose, and
          quality meets convenience. We're more than just an online store —
          we're a community of shoppers, creators, and enthusiasts who believe
          that great products and seamless service go hand in hand. Our journey
          began with a simple idea: to make online shopping easier, faster, and
          more reliable for everyone.
        </p>
      </section>

      <section className="about-section about-row">
        <div className="about-image-placeholder"></div>
        <div className="about-text-block">
          <h2>Who We Are</h2>
          <p>
            At <strong>Galvinus</strong>, we're a team of innovators, designers,
            and customer advocates committed to transforming the way people shop
            online. From curated collections to everyday essentials, we bring
            you a wide range of products that are handpicked for quality and
            value.
          </p>
        </div>
      </section>

      <section className="about-section about-row reverse">
        <div className="about-image-placeholder"></div>

        <div className="about-text-block">
          <h2>What We Offer</h2>
          <ul>
            <li>
              User-friendly platform designed for easy browsing and secure
              checkout
            </li>
            <li>
              Diverse catalog of premium products across fashion, home goods,
              electronics, etc.
            </li>
            <li>Fast and reliable shipping</li>
            <li>24/7 customer support that puts you first</li>
          </ul>
        </div>
      </section>
      <section className="about-section about-row">
        <div className="about-image-placeholder"></div>
        <div className="about-text-block">
          <h2>Who We Are</h2>
          <p>
            At <strong>Galvinus</strong>, we're a team of innovators, designers,
            and customer advocates committed to transforming the way people shop
            online. From curated collections to everyday essentials, we bring
            you a wide range of products that are handpicked for quality and
            value.
          </p>
        </div>
      </section>

      <section className="about-section about-row reverse">
        <div className="about-image-placeholder"></div>

        <div className="about-text-block">
          <h2>What We Offer</h2>
          <ul>
            <li>
              User-friendly platform designed for easy browsing and secure
              checkout
            </li>
            <li>
              Diverse catalog of premium products across fashion, home goods,
              electronics, etc.
            </li>
            <li>Fast and reliable shipping</li>
            <li>24/7 customer support that puts you first</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HeaderSection;
