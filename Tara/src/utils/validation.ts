export function validateFarmerProfile(name: string, phone?: string): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  if (!name || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (phone && !/^\+?[0-9\s-]{8,15}$/.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateFarmDetails(sizeAcres: number, crops: string[]): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  if (sizeAcres <= 0) {
    errors.sizeAcres = "Farm size must be greater than 0.";
  }
  if (!crops || crops.length === 0) {
    errors.crops = "Please select at least one primary crop.";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
