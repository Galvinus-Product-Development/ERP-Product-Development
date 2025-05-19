// src/hooks/useBreadcrumbs.js
import { useLocation, useParams } from "react-router-dom";

export function useBreadcrumbs(currentLabel = "") {
  const location = useLocation();
  const params = useParams();

  const pathname = location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = [];

  let pathAccumulator = "";

  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];

    pathAccumulator += `/${segment}`;

    // Map known route segments to readable labels
    const labelMap = {
      "shopping-page": "Shopping Page",
      "product-details": "Shopping Page",
      "cart": "Cart",
      "wishlist": "Wishlist",
      "profile": "My Profile",
      "orders": "Orders",
      "checkout": "Checkout",
      "order-confirmation": "Order Confirmation",
      "faq": "FAQ",
      "privacy-policy": "Privacy Policy",
      "terms-and-conditions": "Terms & Conditions",
    };

    // Use currentLabel (e.g., product name) for last segment if dynamic
    const isLast = i === pathSegments.length - 1;
    const label = isLast && currentLabel ? currentLabel : (labelMap[segment] || segment);

    // Avoid showing dynamic IDs in breadcrumb
    if (!/^\d+$/.test(segment) && !segment.includes("-")) {
      breadcrumbs.push({
        label: label.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        href: pathAccumulator,
      });
    } else if (isLast && currentLabel) {
      breadcrumbs.push({
        label: currentLabel,
        href: "",
      });
    }
  }

  // Always add Home at the beginning
  breadcrumbs.unshift({ label: "Home", href: "/" });

  return breadcrumbs;
}
