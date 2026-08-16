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
    id: "enthusiast",
    title: "Young Enthusiast",
    subtitle: "Learning natural farming wisdom and sustainable soil biology",
    icon: "school",
  },
];
