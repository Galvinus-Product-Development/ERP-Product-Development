// Simulated delay to mimic network call
const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const user_id = '6f94aefc-36a1-4e7d-8c7f-2a81bbffb002'; 
// Mock coupon data
const mockCoupons = [
  {
    id: "coupon1",
    code: "NEWUSER200",
    discount: 200,
    description: "Flat ₹200 off for new users",
    minCartValue: 1000,
  },
  {
    id: "coupon2",
    code: "SAVE10",
    discount: 100,
    description: "Save ₹100 on orders above ₹500",
    minCartValue: 500,
  },
  {
    id: "coupon3",
    code: "FREESHIP",
    discount: 50,
    description: "₹50 off as shipping cashback",
    minCartValue: 300,
  },
];

// Fake API call to get coupons
export const fetchAvailableCoupons = async (user_id) => {
    await mockDelay(500); // simulate API delay
    if (user_id === "6f94aefc-36a1-4e7d-8c7f-2a81bbffb002") {
        return mockCoupons;
      }
      return [];
 
};
