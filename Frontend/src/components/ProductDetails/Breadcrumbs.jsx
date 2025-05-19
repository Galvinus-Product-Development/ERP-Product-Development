import { ChevronRight } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.css";

const Breadcrumbs = ({ path = [] }) => {
  if (!path.length) return null;

  return (
    <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        <li>
          <Link to="/" className={styles.link}>
            Home
          </Link>
        </li>

        {path.map((item, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            <ChevronRight className={styles.separatorIcon} />
            {index === path.length - 1 ? (
              <span className={styles.current}>{item.label}</span>
            ) : (
              <Link to={item.href} className={styles.link}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  path: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
};

export default Breadcrumbs;
