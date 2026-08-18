# Component: VerifyPhase

## Purpose
Bridges digital learning with real-world farm practice through guided camera observation, evidence capture, and Computer Vision (CV) verification.

## Responsibilities
- Present the real-world field mission instructions (e.g. "Find a patch of soil and snap a clear photo").
- Provide camera viewfinder capture (`VerificationCamera`) with framing guidelines and lighting tips.
- Invoke the CV verification service boundary (`ICVVerificationService`) to analyze image quality and target detection.
- Display instant outcome via `VerificationResult`:
  - **Success**: Verified badge, +XP reward banner, Tara congratulatory speech, and "Continue" CTA.
  - **Needs Improvement**: Clear helpful guidance ("Photo was a bit blurry, try holding the camera closer with good light"), and "Try Again" CTA.
- Support replaceable mock / real CV service backend without UI modifications.

## Non-responsibilities
- Executing raw neural network weights on the UI thread (delegated to `cvVerificationService`).
- Over-promising soil laboratory metrics from simple smartphone images (keeps mission grounded).

## Props & Contract

```typescript
export interface VerifyPhaseProps {
  /** Verification task configuration */
  config: VerificationConfigDefinition;
  /** Callback on successful verification */
  onComplete: (evidence: { photoUri: string; verifiedAt: string; confidence: number }) => void;
}

export interface VerificationConfigDefinition {
  type: "soil_photo" | "leaf_photo" | "water_setup" | "observation";
  titleKey: string;
  instructions: string[];
  cvConfig: {
    requiresSoilDetection?: boolean;
    rejectBlurredImages?: boolean;
    detectFaces?: boolean;
    minimumQuality?: number;
  };
}
```

## Supported States
1. **Briefing**: Mission instructions card with "Open Camera" CTA.
2. **Capturing**: Camera viewfinder active with reticle and shutter button.
3. **Analyzing**: Spinner card with Tara ("Tara is checking your photo...").
4. **Verified**: Success checkmark + XP pill + "Continue" button.
5. **Retry**: Friendly retry card with specific photography advice.
