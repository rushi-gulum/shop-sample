/**
 * Deterministic India PIN-code serviceability engine (frontend demo).
 *
 * Given any 6-digit PIN, returns a stable, realistic delivery estimate:
 * city/state resolution by postal zone (first digit), metro express tiers,
 * COD availability, dispatch hub and return policy — no network calls,
 * the same PIN always yields the same result.
 *
 * Validation follows India Post: first digit 1–8 (0 and 9 are unused).
 */

export interface PincodeInfo {
  pin: string;
  city: string;
  state: string;
  zone: string;
  serviceable: boolean;
  express: boolean;
  /** inclusive delivery window in days */
  minDays: number;
  maxDays: number;
  cod: boolean;
  hub: string;
  exchangeAvailable: boolean;
}

interface Zone {
  name: string;
  cities: Array<{ city: string; state: string }>;
}

const ZONES: Record<string, Zone> = {
  "1": {
    name: "Delhi / North-1",
    cities: [
      { city: "New Delhi", state: "Delhi" },
      { city: "Gurugram", state: "Haryana" },
      { city: "Faridabad", state: "Haryana" },
      { city: "Sonipat", state: "Haryana" },
      { city: "Ludhiana", state: "Punjab" },
      { city: "Amritsar", state: "Punjab" },
      { city: "Chandigarh", state: "Chandigarh" },
      { city: "Jammu", state: "Jammu & Kashmir" },
      { city: "Shimla", state: "Himachal Pradesh" },
    ],
  },
  "2": {
    name: "UP / Uttarakhand",
    cities: [
      { city: "Noida", state: "Uttar Pradesh" },
      { city: "Ghaziabad", state: "Uttar Pradesh" },
      { city: "Lucknow", state: "Uttar Pradesh" },
      { city: "Kanpur", state: "Uttar Pradesh" },
      { city: "Agra", state: "Uttar Pradesh" },
      { city: "Varanasi", state: "Uttar Pradesh" },
      { city: "Prayagraj", state: "Uttar Pradesh" },
      { city: "Gorakhpur", state: "Uttar Pradesh" },
      { city: "Dehradun", state: "Uttarakhand" },
    ],
  },
  "3": {
    name: "Rajasthan / Gujarat",
    cities: [
      { city: "Jaipur", state: "Rajasthan" },
      { city: "Jodhpur", state: "Rajasthan" },
      { city: "Udaipur", state: "Rajasthan" },
      { city: "Kota", state: "Rajasthan" },
      { city: "Ajmer", state: "Rajasthan" },
      { city: "Ahmedabad", state: "Gujarat" },
      { city: "Surat", state: "Gujarat" },
      { city: "Vadodara", state: "Gujarat" },
      { city: "Rajkot", state: "Gujarat" },
    ],
  },
  "4": {
    name: "West / MP",
    cities: [
      { city: "Mumbai", state: "Maharashtra" },
      { city: "Navi Mumbai", state: "Maharashtra" },
      { city: "Thane", state: "Maharashtra" },
      { city: "Pune", state: "Maharashtra" },
      { city: "Nagpur", state: "Maharashtra" },
      { city: "Nashik", state: "Maharashtra" },
      { city: "Aurangabad", state: "Maharashtra" },
      { city: "Indore", state: "Madhya Pradesh" },
      { city: "Bhopal", state: "Madhya Pradesh" },
      { city: "Gwalior", state: "Madhya Pradesh" },
      { city: "Raipur", state: "Chhattisgarh" },
      { city: "Panaji", state: "Goa" },
    ],
  },
  "5": {
    name: "South-Central",
    cities: [
      { city: "Hyderabad", state: "Telangana" },
      { city: "Secunderabad", state: "Telangana" },
      { city: "Warangal", state: "Telangana" },
      { city: "Bengaluru", state: "Karnataka" },
      { city: "Mysuru", state: "Karnataka" },
      { city: "Mangaluru", state: "Karnataka" },
      { city: "Hubballi", state: "Karnataka" },
      { city: "Vijayawada", state: "Andhra Pradesh" },
      { city: "Visakhapatnam", state: "Andhra Pradesh" },
      { city: "Tirupati", state: "Andhra Pradesh" },
    ],
  },
  "6": {
    name: "TN / Kerala",
    cities: [
      { city: "Chennai", state: "Tamil Nadu" },
      { city: "Coimbatore", state: "Tamil Nadu" },
      { city: "Madurai", state: "Tamil Nadu" },
      { city: "Tiruchirappalli", state: "Tamil Nadu" },
      { city: "Salem", state: "Tamil Nadu" },
      { city: "Puducherry", state: "Puducherry" },
      { city: "Thiruvananthapuram", state: "Kerala" },
      { city: "Kochi", state: "Kerala" },
      { city: "Kozhikode", state: "Kerala" },
      { city: "Thrissur", state: "Kerala" },
    ],
  },
  "7": {
    name: "East / North-East",
    cities: [
      { city: "Kolkata", state: "West Bengal" },
      { city: "Howrah", state: "West Bengal" },
      { city: "Siliguri", state: "West Bengal" },
      { city: "Durgapur", state: "West Bengal" },
      { city: "Bhubaneswar", state: "Odisha" },
      { city: "Cuttack", state: "Odisha" },
      { city: "Guwahati", state: "Assam" },
      { city: "Shillong", state: "Meghalaya" },
      { city: "Agartala", state: "Tripura" },
      { city: "Port Blair", state: "Andaman & Nicobar" },
    ],
  },
  "8": {
    name: "Bihar / Jharkhand",
    cities: [
      { city: "Patna", state: "Bihar" },
      { city: "Muzaffarpur", state: "Bihar" },
      { city: "Bhagalpur", state: "Bihar" },
      { city: "Gaya", state: "Bihar" },
      { city: "Ranchi", state: "Jharkhand" },
      { city: "Jamshedpur", state: "Jharkhand" },
      { city: "Dhanbad", state: "Jharkhand" },
      { city: "Bokaro", state: "Jharkhand" },
    ],
  },
};

const METRO_CITIES = new Set([
  "New Delhi",
  "Mumbai",
  "Navi Mumbai",
  "Thane",
  "Bengaluru",
  "Hyderabad",
  "Secunderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Gurugram",
  "Noida",
  "Ghaziabad",
]);

/** Fulfilment hubs mapped by postal zone — matches the 4 Ganesh Electronics warehouses. */
const HUBS: Record<string, string> = {
  "1": "Bahadurgarh (NCR)",
  "2": "Bahadurgarh (NCR)",
  "3": "Bahadurgarh (NCR)",
  "4": "Bhiwandi (Mumbai)",
  "5": "Hoskote (Bengaluru)",
  "6": "Sriperumbudur (Chennai)",
  "7": " Dankuni (Kolkata)",
  "8": "Dankuni (Kolkata)",
};

export const PINCODE_REGEX = /^[1-8][0-9]{5}$/;

/** Stable 0–999 hash from the PIN — drives city pick and flags deterministically. */
function pinHash(pin: string): number {
  let h = 0;
  for (let i = 0; i < pin.length; i++) h = (h * 31 + (pin.charCodeAt(i) - 48)) % 1000;
  return h;
}

function digitSum(pin: string): number {
  return pin.split("").reduce((n, d) => n + (d.charCodeAt(0) - 48), 0);
}

/** Human delivery date for an eta-in-days, en-IN formatted (e.g. "Wed, 24 Sep"). */
export function deliveryEtaFromToday(maxDays: number): string {
  const eta = new Date(Date.now() + maxDays * 24 * 60 * 60 * 1000);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(eta);
}

export function lookupPincode(pin: string): PincodeInfo {
  const zone = ZONES[pin[0]];
  const h = pinHash(pin);
  const sum = digitSum(pin);
  const loc = zone.cities[h % zone.cities.length];
  const metro = METRO_CITIES.has(loc.city);

  // ~5% of PINs (deterministic) are not yet serviceable — remote/rural routes.
  const serviceable = h % 19 !== 0;
  // ~11% are COD-restricted (high-value theft-route or prepaid-only routes).
  const cod = serviceable && h % 9 !== 0;

  let minDays: number;
  let maxDays: number;
  if (metro) {
    minDays = 1;
    maxDays = sum % 2 === 0 ? 1 : 2;
  } else if (serviceable && sum % 3 === 0) {
    minDays = 2;
    maxDays = 3;
  } else {
    minDays = 3;
    maxDays = 4 + (h % 3); // 4–6 days
  }

  return {
    pin,
    city: loc.city,
    state: loc.state,
    zone: zone.name,
    serviceable,
    express: metro,
    minDays,
    maxDays,
    cod,
    hub: HUBS[pin[0]].trim(),
    exchangeAvailable: serviceable && h % 4 !== 0,
  };
}

export const DEMO_PINCODES: Array<{ pin: string; label: string }> = [
  { pin: "400050", label: "Mumbai" },
  { pin: "110001", label: "New Delhi" },
  { pin: "560001", label: "Bengaluru" },
  { pin: "700001", label: "Kolkata" },
];
