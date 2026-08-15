# TARA — Onboarding & Starting Screens

## Architecture, Data Flow & Implementation Specification

### 1. Objective

Build the TARA onboarding and starting-screen experience using a **Dummy → Context → Frontend** architecture.

The implementation must work completely with dummy data during development while keeping the frontend ready for real backend integration later.

The core principle is:

> **Dummy data should behave like a real backend. The frontend should not know whether the data comes from dummy data or the real backend.**

The architecture should allow the backend to be replaced without rewriting the UI components or screens.

---

# 2. Required Architecture

Use exactly these three conceptual layers:

```text
┌──────────────────────────────────────┐
│             FRONTEND                 │
│                                      │
│  Screens                             │
│  Reusable Components                 │
│  Animations                          │
│  Responsive Layout                   │
│  Accessibility                       │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│          CONTEXT / LOGIC             │
│                                      │
│  State Management                    │
│  Data Transformation                 │
│  Business Logic                      │
│  Loading / Error / Empty States      │
│  Backend Abstraction                │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│          DATA SOURCE                 │
│                                      │
│  Dummy Repository                    │
│          OR                          │
│  Real Backend Repository             │
└──────────────────────────────────────┘
```

The frontend must communicate with the Context/Logic layer.

The frontend must **NOT directly import dummy data files**.

The frontend must **NOT directly call backend APIs**.

---

# 3. Recommended Folder Structure

Create a scalable structure similar to:

```text
src/
│
├── app/
│   ├── routes/
│   └── providers/
│
├── components/
│   ├── ui/
│   ├── onboarding/
│   ├── voice/
│   ├── avatar/
│   ├── progress/
│   └── common/
│
├── screens/
│   ├── onboarding/
│   │   ├── WelcomeScreen
│   │   ├── LanguageScreen
│   │   ├── UserTypeScreen
│   │   ├── ProfileSetupScreen
│   │   ├── FarmSetupScreen
│   │   ├── LocationScreen
│   │   ├── PreferencesScreen
│   │   └── OnboardingCompleteScreen
│   │
│   └── home/
│       ├── StartingScreen
│       └── HomeScreen
│
├── context/
│   ├── OnboardingContext
│   ├── UserContext
│   └── AppContext
│
├── services/
│   ├── repositories/
│   │   ├── onboardingRepository
│   │   ├── userRepository
│   │   └── farmRepository
│   │
│   ├── dummy/
│   │   ├── dummyOnboardingRepository
│   │   ├── dummyUserRepository
│   │   └── dummyFarmRepository
│   │
│   └── api/
│       ├── onboardingApi
│       ├── userApi
│       └── farmApi
│
├── data/
│   ├── dummy/
│   │   ├── users
│   │   ├── languages
│   │   ├── crops
│   │   ├── locations
│   │   └── onboarding
│   │
│   └── constants/
│
├── hooks/
│   ├── useOnboarding
│   ├── useUser
│   └── useVoice
│
├── types/
│   ├── user
│   ├── onboarding
│   ├── farm
│   └── common
│
├── utils/
│   ├── validation
│   ├── formatting
│   └── storage
│
└── assets/
    ├── images/
    ├── audio/
    └── animations/
```

Adapt naming to the existing project/framework, but preserve the architectural separation.

---

# 4. Dummy Layer

The dummy layer is a **temporary backend simulation**.

Do not treat dummy data as UI-specific mock objects.

Instead, create dummy repositories that expose the same interface that the real backend will eventually expose.

Example:

```text
OnboardingRepository

getOnboardingState()
saveLanguage()
saveUserType()
saveProfile()
saveFarmDetails()
completeOnboarding()
```

The dummy implementation should simulate:

* network delay
* loading states
* successful responses
* validation failures
* occasional errors where useful for testing
* persistent onboarding state during the session

Example conceptual flow:

```text
Screen
   ↓
OnboardingContext
   ↓
OnboardingRepository
   ↓
DummyOnboardingRepository
   ↓
Dummy Data
```

Later:

```text
Screen
   ↓
OnboardingContext
   ↓
OnboardingRepository
   ↓
RealOnboardingRepository
   ↓
Backend API
```

The Screen should remain unchanged.

---

# 5. Repository Interface

Define a stable contract before implementing dummy or real data sources.

Example:

```ts
interface OnboardingRepository {
  getState(): Promise<OnboardingState>;

  saveLanguage(language: Language): Promise<void>;

  saveUserType(userType: UserType): Promise<void>;

  saveProfile(profile: UserProfile): Promise<void>;

  saveFarm(farm: FarmProfile): Promise<void>;

  complete(): Promise<OnboardingState>;
}
```

The dummy repository and real repository must implement the same contract.

This is the most important part of the architecture.

---

# 6. Context Layer

The Context layer owns application state and business logic.

For onboarding, maintain state such as:

```text
currentStep
selectedLanguage
selectedUserType
profile
farmProfile
location
preferences
isLoading
error
isComplete
```

The UI should receive simple actions such as:

```text
selectLanguage()
selectUserType()
updateProfile()
updateFarm()
continue()
goBack()
completeOnboarding()
```

The screen should not contain backend logic.

Avoid:

```text
Screen
 ├── fetch()
 ├── API call
 ├── validation
 ├── transform data
 └── render()
```

Prefer:

```text
Screen
 └── useOnboarding()
       ├── state
       └── actions
```

---

# 7. Frontend Layer

The frontend must consist of reusable components and screen-level compositions.

Avoid creating everything as one large onboarding component.

For example:

```text
OnboardingScreen
│
├── ProgressIndicator
├── TaraAvatar
├── VoiceBubble
├── QuestionText
├── SelectionCard
├── OptionGrid
├── PrimaryButton
└── NavigationControls
```

These components must be reusable across different onboarding steps.

---

# 8. TARA Voice / Avatar System

TARA should be implemented as a reusable component rather than recreated independently on every screen.

Example:

```tsx
<TaraGuide
  message={currentMessage}
  audio={currentAudio}
  isSpeaking={isSpeaking}
  expression={expression}
/>
```

The component should support:

```text
idle
speaking
listening
happy
thinking
success
```

The current dummy voice and multilingual dummy texts should be used only for testing.

Do not hard-code these texts directly inside visual components.

Instead:

```text
Dummy Data
     ↓
Context
     ↓
TaraGuide
```

This makes it possible to later replace:

```text
Dummy voice
```

with:

```text
Real TTS / backend-generated audio
```

without changing the component.

---

# 9. Multilingual Architecture

Do not hard-code language-specific text into screens.

Use a translation/data layer.

Example:

```text
language
 ├── en
 ├── hi
 ├── ml
 ├── te
 ├── ta
 └── kn
```

The frontend should request:

```text
onboarding.welcome
onboarding.selectLanguage
onboarding.selectUserType
onboarding.complete
```

rather than directly storing:

```text
"Welcome to TARA"
```

inside components.

Dummy multilingual content can be used initially.

The architecture should later support backend/localized content without changing the UI.

---

# 10. Onboarding Flow

The onboarding flow should be state-driven.

Example:

```text
START
  ↓
WELCOME
  ↓
LANGUAGE
  ↓
USER TYPE
  ↓
PROFILE
  ↓
FARM DETAILS
  ↓
LOCATION
  ↓
PREFERENCES
  ↓
SUMMARY
  ↓
COMPLETE
  ↓
STARTING SCREEN
  ↓
HOME
```

Do not make navigation dependent on manually duplicated route logic.

The Context should know the current onboarding state.

Example:

```text
currentStep = LANGUAGE
```

The frontend renders the corresponding screen.

---

# 11. Starting Screen

After onboarding completion, show a dedicated Starting Screen.

The Starting Screen should dynamically consume the completed onboarding state.

Example:

```text
TARA
   ↓
Welcome back, {userName}

Your farm
{crop}

Location
{location}

Today's journey
{recommendedLesson}

Progress
{progress}
```

Do not hard-code:

```text
"Welcome, Lokesh"
"Banana Farmer"
"Kerala"
```

These should come from the Context.

Dummy values may be used during testing.

---

# 12. Dynamic UI Requirement

Every screen must be data-driven.

Bad:

```text
const title = "Choose your crop";
```

Better:

```text
const title = onboardingContent.cropSelection.title;
```

Bad:

```text
<Card>Banana</Card>
<Card>Rice</Card>
<Card>Coconut</Card>
```

Better:

```text
options.map(option => (
  <SelectionCard
    key={option.id}
    {...option}
  />
))
```

This allows the same component to work with:

* different crops
* different languages
* different user types
* different locations
* different backend responses

---

# 13. Responsive Design

All screens and components must work properly across:

```text
Mobile
Tablet
Desktop
Different screen widths
Different aspect ratios
Touch interaction
Keyboard navigation where applicable
```

Do not rely on fixed pixel positioning for major UI structures.

Prefer:

```text
Flexbox
Grid
Responsive constraints
Relative sizing
Safe spacing
Max-width containers
```

TARA's avatar, dialogue bubble, buttons, cards and content must adapt without overlapping.

---

# 14. State Handling

Every asynchronous operation must support:

```text
idle
loading
success
error
empty
```

Example:

```text
User taps Continue
       ↓
Loading state
       ↓
Repository request
       ↓
Success → next step

OR

Error → show recoverable error
```

Never leave the user with a frozen interface.

Disable or protect buttons against accidental double submission.

---

# 15. Persistence

Onboarding state should survive a refresh/reload during dummy development.

Use a small persistence abstraction:

```text
StorageService
```

Do not directly scatter:

```text
localStorage.setItem(...)
```

throughout components.

The future backend can then become the source of truth while local storage remains useful for:

* cached onboarding state
* preferences
* temporary progress
* offline support

---

# 16. Validation

Validation belongs outside the presentation components.

Example:

```text
ProfileValidator
FarmValidator
OnboardingValidator
```

The UI should receive validation results:

```text
isValid
errors
```

rather than containing complicated validation logic.

---

# 17. Backend Replacement Strategy

The final implementation must make this transition easy:

### Development

```text
Dummy Repository
```

### Integration

```text
Real Repository
```

### Production

```text
Real Repository
+
Caching
+
Authentication
+
Error Handling
+
Offline Support
```

The frontend components should remain unchanged.

Only the data implementation/configuration should change.

---

# 18. Environment-Based Data Source

Use an environment/configuration switch.

Conceptually:

```text
DATA_SOURCE=dummy
```

during development.

Later:

```text
DATA_SOURCE=api
```

for backend integration.

The application should resolve:

```text
Repository
   ↓
DummyRepository OR ApiRepository
```

from one central location.

Do not add:

```text
if (dummy) ...
```

throughout the UI.

---

# 19. Component Rules

Every reusable component should:

* have a single responsibility
* accept data through props
* avoid direct API calls
* avoid direct dummy-data imports
* avoid global side effects
* support loading/error states when relevant
* be responsive
* be reusable outside the current screen
* have predictable variants
* avoid unnecessary duplication

Example:

```tsx
<SelectionCard
  title={option.title}
  description={option.description}
  image={option.image}
  selected={selected}
  onClick={handleSelect}
/>
```

Not:

```tsx
<SelectionCard type="banana" />
```

where the component internally knows what banana means.

---

# 20. Screen Rules

Each screen should primarily handle:

```text
Layout
Composition
User interaction wiring
Visual states
```

Each screen should NOT handle:

```text
API calls
Repository implementation
Business rules
Data persistence
Complex validation
Hard-coded user data
```

---

# 21. Error Handling

Create reusable error handling.

Examples:

```text
NetworkError
ValidationError
SessionError
UnknownError
```

The UI should provide clear recovery:

```text
Try Again
Go Back
Continue Offline
```

where appropriate.

Do not expose raw backend errors to the user.

---

# 22. Testing Requirement

Every onboarding screen should be testable using dummy data without a backend.

Test at minimum:

### Happy path

```text
Welcome
→ Language
→ Profile
→ Farm
→ Location
→ Complete
→ Starting Screen
```

### Navigation

```text
Next
Back
Skip where applicable
Refresh
```

### Data

```text
Different languages
Different user types
Different crops
Different locations
Long names
Missing optional fields
```

### UI

```text
Small mobile screen
Large mobile screen
Tablet
Desktop
Long text
Long translations
```

### Async states

```text
Loading
Success
Error
Retry
```

---

# 23. Dummy Data Requirements

Create realistic dummy data rather than random placeholder text.

Dummy data should represent the eventual backend structure.

Example:

```ts
{
  id: "user_001",
  name: "Ravi",
  language: "ml",
  userType: "farmer",
  location: {
    state: "Kerala",
    district: "Wayanad"
  },
  farm: {
    size: 2.5,
    unit: "acre",
    crops: ["banana", "pepper"]
  }
}
```

The same object shape should be usable when the real backend is connected.

---

# 24. Data Flow Example

For selecting a language:

```text
LanguageScreen
      ↓
useOnboarding()
      ↓
selectLanguage("ml")
      ↓
OnboardingContext
      ↓
OnboardingRepository
      ↓
DummyOnboardingRepository
      ↓
Persist State
      ↓
Context updates
      ↓
LanguageScreen re-renders
```

Later:

```text
LanguageScreen
      ↓
useOnboarding()
      ↓
selectLanguage("ml")
      ↓
OnboardingContext
      ↓
OnboardingRepository
      ↓
ApiOnboardingRepository
      ↓
Backend
      ↓
Context updates
      ↓
LanguageScreen re-renders
```

The screen remains identical.

---

# 25. Do Not Do These Things

Never:

```text
❌ Import dummy data directly into screens
❌ Call APIs directly from components
❌ Hard-code user information
❌ Hard-code crop options inside cards
❌ Duplicate TARA components across screens
❌ Put business logic inside JSX
❌ Create one giant onboarding component
❌ Use fixed absolute positioning for the entire UI
❌ Couple UI components to backend response formats
❌ Create separate UI implementations for every language
❌ Rewrite frontend components when backend integration starts
```

---

# 26. Definition of Done

The onboarding implementation is complete only when:

* [ ] All screens work without a backend.
* [ ] Dummy data behaves like a temporary backend.
* [ ] Frontend never directly imports dummy data.
* [ ] Frontend never directly calls backend APIs.
* [ ] Context owns application/onboarding state.
* [ ] Repository abstraction exists.
* [ ] Dummy and real repositories share the same contract.
* [ ] TARA is implemented as a reusable component.
* [ ] Dummy voice/text can be replaced without changing UI.
* [ ] Multilingual content is data-driven.
* [ ] Screens are responsive.
* [ ] Components are reusable.
* [ ] Loading states exist.
* [ ] Error states exist.
* [ ] Validation is separated from presentation.
* [ ] Onboarding state persists during development.
* [ ] Starting Screen dynamically uses onboarding data.
* [ ] Backend can replace dummy repository without rewriting screens.
* [ ] The same components can be reused throughout the application.

---

# 27. Core Engineering Principle

Always think in this direction:

```text
                 ┌───────────────┐
                 │   FRONTEND    │
                 │               │
                 │ Screens       │
                 │ Components    │
                 │ Animations    │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │    CONTEXT    │
                 │               │
                 │ State         │
                 │ Actions       │
                 │ Business      │
                 │ Logic         │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │  REPOSITORY   │
                 │   INTERFACE   │
                 └───────┬───────┘
                         │
                ┌────────┴────────┐
                ▼                 ▼
        ┌──────────────┐  ┌──────────────┐
        │    DUMMY     │  │ REAL BACKEND │
        │ Repository   │  │ Repository   │
        └──────────────┘  └──────────────┘
```

**The UI should never care which data source is underneath it.**

This architecture is the foundation for making TARA's onboarding, starting screens, learning modules, games, progress tracking, voice interaction, AI verification, and future backend features scale without repeatedly rebuilding the frontend.

The sustainable-farming product direction in the uploaded project material also emphasizes the transition from learning to real-world practice and progress, so keeping the data/context boundary clean will be important as those later flows are added.
