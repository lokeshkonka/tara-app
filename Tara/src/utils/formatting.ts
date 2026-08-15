export function formatAcreage(acres: number): string {
  return `${acres.toFixed(1).replace(/\.0$/, "")} Acres`;
}

export function formatXp(xp: number): string {
  return `+${xp} XP`;
}

export function formatCropList(crops: string[]): string {
  if (!crops || crops.length === 0) return "General Farmland";
  if (crops.length === 1) return crops[0];
  if (crops.length === 2) return `${crops[0]} & ${crops[1]}`;
  return `${crops.slice(0, 2).join(", ")} +${crops.length - 2} more`;
}
