export interface LocationStateData {
  state: string;
  districts: string[];
}

export const LOCATIONS_DATA: LocationStateData[] = [
  {
    state: "Kerala",
    districts: ["Wayanad", "Palakkad", "Idukki", "Thrissur", "Kottayam", "Kozhikode"],
  },
  {
    state: "Karnataka",
    districts: ["Mysuru", "Mandya", "Hassan", "Shivamogga", "Chikkamagaluru", "Belagavi"],
  },
  {
    state: "Tamil Nadu",
    districts: ["Coimbatore", "Erode", "Thanjavur", "Dindigul", "Salem", "Madurai"],
  },
  {
    state: "Andhra Pradesh",
    districts: ["Guntur", "Krishna", "East Godavari", "Kurnool", "Anantapur", "Chittoor"],
  },
  {
    state: "Maharashtra",
    districts: ["Pune", "Nashik", "Satara", "Kolhapur", "Solapur", "Nagpur"],
  },
];
