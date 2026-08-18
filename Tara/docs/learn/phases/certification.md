# Component: CertificationPhase

## Purpose
Renders formal verifiable credentials and skill badges awarded upon completing advanced mastery levels or complete lesson tracks.

## Responsibilities
- Display digital certificate card with learner name, course title, mastered skills list, and issue date.
- Render dynamic verification QR code and cryptographic authority signature details.
- Render government / authority recognition metadata *only* when confirmed by backend configuration (never hardcoded).
- Provide actions to "View Full Certificate", "Share", and "Download".

## Non-responsibilities
- Issuing cryptographic tokens on the client (handled by `certificateService`).

## Props & Contract

```typescript
export interface CertificationPhaseProps {
  /** Certificate configuration */
  config: CertificateConfigDefinition;
  /** Learner display name */
  userName: string;
  /** Callback triggered to proceed */
  onComplete: () => void;
}

export interface CertificateConfigDefinition {
  id: string;
  titleKey: string;
  authorityName: string;
  authorityLogo?: string;
  skills: string[];
  isGovernmentApproved: boolean;
}
```

## Design System Alignment
- Certificate Surface: Warm off-white `#FFFFFF` card with gold border accents (`#CDA721`) and subtle ambient elevation.
- Typography: Plus Jakarta Sans 700 Bold header, official credential watermark layout.
