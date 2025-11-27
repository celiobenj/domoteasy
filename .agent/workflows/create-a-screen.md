---
description: Create a Screen For Mobile App in React Native
---

**Context:**
Mobile application development using React Native and TypeScript.

**Task:**
Generate the source code for the DomotEasy screen.

**Inputs:**
* **Architecture Pattern:** MVC
* **Visual Identity:** `frontend/src/theme`

**Constraints:**
* **Tech Stack:** React Native (Functional Components), TypeScript.
* **Design:** Minimalist. Follow the current design pattern.
* **Styling:** Use `StyleSheet.create`. No inline styles.
* **Dependencies:** Use React Native core components only (`View`, `Text`, `Image`, `TouchableOpacity`, etc). No external UI libraries.
* **Code Structure:** Max 400 lines per file. Separate styles if necessary.

---

# Workflow Description: Create a Screen For Mobile App in React Native

1.  **Requirement Parsing (Scope Definition):**
    * The agent accepts specific design parameters (colors, typography) and architectural rules as explicit inputs.
    * It ignores generic "persona" context to focus entirely on code generation logic.

2.  **Structural Implementation (The Task):**
    * Drafts the screen using Functional Components and TypeScript interfaces for strict typing.
    * Builds the layout using Flexbox methodology. Can use animation libraries (Reanimated/Lottie are explicitly excluded).

3.  **Constraint Verification:**
    * Ensures the design is minimalist by utilizing standard core components.

4.  **Output Formatting:**
    * Delivers a clean, linted Markdown code block containing the full component code, ensuring it is reproducible and immediately usable in the established project architecture.