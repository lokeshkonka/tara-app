import type { UserTypeOption } from "../../types/onboarding";

export const USER_TYPES_DATA: UserTypeOption[] = [
  {
    id: "smallholder",
    title: "Smallholder Farmer",
    subtitle: "Cultivating 1-5 acres with focus on sustainable yield and cost reduction",
    icon: "agriculture",
  },
  {
    id: "commercial",
    title: "Commercial Grower",
    subtitle: "Managing larger acreage transitioning to natural regenerative farming",
    icon: "landscape",
  },
  {
    id: "homestead",
    title: "Kitchen Gardener / Homesteader",
    subtitle: "Growing healthy, chemical-free organic produce for family and community",
    icon: "yard",
  },
  {
    id: "enthusiast",
    title: "Agri Student & Enthusiast",
    subtitle: "Learning natural farming wisdom and sustainable soil biology",
    icon: "school",
  },
];
