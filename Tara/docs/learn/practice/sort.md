# Component: SortActivity

## Purpose
An interactive classification activity where the learner sorts cards or concepts into appropriate categorical buckets (e.g., "Good for Soil" vs "Not for Soil").

## Responsibilities
- Display category bucket drop zones.
- Present active item cards one at a time (or as a pool of draggable/tappable tokens).
- When an item is placed in a category, validate against `item.targetCategoryId`.
- Animate correct sorting with a green flash and pleasant sound.
- Allow immediate retry on incorrect sorting without blocking learning.
- Emit `onComplete` when all items are sorted correctly.

## Props & Contract

```typescript
export interface SortCategory {
  id: string;
  title: string;
}

export interface SortItem {
  id: string;
  text: string;
  targetCategoryId: string;
}

export interface SortActivityProps {
  /** Activity title */
  title: string;
  /** Instructions */
  instructions: string;
  /** Categories / Buckets */
  categories: SortCategory[];
  /** Items to sort */
  items: SortItem[];
  /** Callback on completion */
  onComplete: () => void;
}
```

## Design System Alignment
- Buckets: Soft off-white `#F1F4EF` container with dashed border `#BECAB9`.
- Item Cards: Soft 3D tactile card `#FFFFFF` with `3px` bottom edge.
