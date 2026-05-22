Project Overview

CheFu Store is a cross-platform software distribution platform built with Next.js (App Router). It provides a fast, SEO-optimized marketplace for downloading desktop applications for Windows, macOS, and Linux.

The system prioritizes:

Performance
SEO optimization
Clean architecture
Minimal client-side JavaScript
Scalable component structure
⚙️ Core Architecture Rules
🟢 Server Components First (Default)

All components MUST be Server Components by default unless interactivity is required.

Use Server Components for:

Page layouts
App listings (CheFu Store software catalog)
SEO content pages
Metadata (generateMetadata, OpenGraph, etc.)
Fetching data from APIs or databases
Static or dynamic server-rendered content
🔴 "use client" Usage Rules (STRICT)

Only use "use client" when absolutely required for:

Button interactions (click handlers, toggles)
Forms (input handling, validation, submission state)
Modals / dialogs
State-heavy UI (useState, useReducer)
Animations and dynamic UI behavior
Client-only browser APIs:
window
document
localStorage
sessionStorage

❌ NEVER use "use client" for full pages or layouts unless absolutely necessary.

🚀 Performance Guidelines
Minimize JavaScript sent to the browser
Prefer server rendering over client hydration
Avoid unnecessary React state usage
Keep client components small and isolated
Do not fetch primary page data inside useEffect
Avoid converting entire pages into client components
🔍 SEO Rules
Always prioritize server-rendered content for indexable pages
Ensure metadata is defined using generateMetadata
Use semantic HTML structure
Avoid rendering critical content only on the client
Ensure app listings are fully visible in initial HTML
🧩 Component Design Pattern

Preferred structure:

Server Component (page/layout)
Fetches data
Renders structure
Passes props to client components if needed
Client Component (isolated)
Handles interaction only
No unnecessary data fetching
📦 CheFu Store Domain Rules

Key sections of the platform:

App marketplace (browse/download apps)
App detail pages
Categories (Productivity, Dev Tools, Utilities, etc.)
User library (installed apps)
Updates system

All app listing data should be server-fetched and SEO-friendly.

❌ Anti-Patterns (DO NOT DO THIS)
Adding "use client" at the top of all components
Fetching main data inside useEffect
Turning entire pages into client components
Blocking SSR unnecessarily
Mixing UI state logic into server components
Rendering empty HTML that fills only after JS loads
🎯 Goal of This Project

Build a fast, scalable, SEO-optimized app store that:

Loads instantly with server-rendered HTML
Uses minimal client-side JavaScript
Separates logic cleanly between server and client
Provides smooth UX without sacrificing performance
🧱 Final Rule

If it does not require interactivity, it MUST be a Server Component.