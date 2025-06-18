// import React, { useState } from "react";
// import "./CategorySection.css";
// import {
//   FaMobileAlt,
//   FaDesktop,
//   FaClock,
//   FaCamera,
//   FaHeadphones,
//   FaGamepad,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// const categories = [
//   { label: "Phones", icon: <FaMobileAlt /> },
//   { label: "Computers", icon: <FaDesktop /> },
//   { label: "SmartWatch", icon: <FaClock /> },
//   { label: "Camera", icon: <FaCamera /> },
//   { label: "HeadPhones", icon: <FaHeadphones /> },
//   { label: "Gaming", icon: <FaGamepad /> },
// ];

// const CategorySlider = () => {
//   const [activeIndex, setActiveIndex] = useState(3); // Camera as default

//   const handleSelect = (index) => {
//     setActiveIndex(index);
//   };

//   return (
//     <div className="category-slider">
//       <div>
//         <h2>Shop by Category</h2>
//       </div>
//       <div>
//         <div className="categories1234">
//           <button className="arrow-btn">
//             <FaChevronLeft />
//           </button>

//           <div className="category-list">
//             {categories.map((category, index) => (
//               <div
//                 key={category.label}
//                 className={`category-card ${
//                   activeIndex === index ? "active" : ""
//                 }`}
//                 onClick={() => handleSelect(index)}
//               >
//                 <div className="icon">{category.icon}</div>
//                 <p>{category.label}</p>
//               </div>
//             ))}
//           </div>

//           <button className="arrow-btn">
//             <FaChevronRight />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategorySlider;

import React, { useState } from "react";
import "./CategorySection.css";
import {
  FaMobileAlt,
  FaDesktop,
  FaClock,
  FaCamera,
  FaHeadphones,
  FaGamepad,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const categories = [
  { label: "Phones", icon: <FaMobileAlt /> },
  { label: "Computers", icon: <FaDesktop /> },
  { label: "SmartWatch", icon: <FaClock /> },
  { label: "Camera", icon: <FaCamera /> },
  { label: "HeadPhones", icon: <FaHeadphones /> },
  { label: "Gaming", icon: <FaGamepad /> },
];

const VISIBLE_COUNT = 4;

const CategorySlider = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(3); // Default: Camera

  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + VISIBLE_COUNT < categories.length) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="category-slider">
      <h2>Shop by Category</h2>
      <div className="categories1234">
        <button
          className="arrow-btn"
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          <FaChevronLeft />
        </button>

        <div className="category-list">
          {categories
            .slice(startIndex, startIndex + VISIBLE_COUNT)
            .map((category, index) => {
              const actualIndex = startIndex + index;
              return (
                <div
                  key={category.label}
                  className={`category-card ${
                    activeIndex === actualIndex ? "active" : ""
                  }`}
                  onClick={() => handleSelect(actualIndex)}
                >
                  <div className="icon">{category.icon}</div>
                  <p>{category.label}</p>
                </div>
              );
            })}
        </div>

        <button
          className="arrow-btn"
          onClick={handleNext}
          disabled={startIndex + VISIBLE_COUNT >= categories.length}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CategorySlider;
