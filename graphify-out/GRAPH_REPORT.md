# Graph Report - .  (2026-06-02)

## Corpus Check
- Corpus is ~13,405 words - fits in a single context window. You may not need a graph.

## Summary
- 190 nodes · 234 edges · 13 communities (12 shown, 1 thin omitted)
- Extraction: 88% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.86)
- Token cost: 97,817 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Project Tech Stack|Project Tech Stack]]
- [[_COMMUNITY_Dev Dependencies & Build Scripts|Dev Dependencies & Build Scripts]]
- [[_COMMUNITY_Orbital Timeline Cards & Data|Orbital Timeline Cards & Data]]
- [[_COMMUNITY_App Shell & shadcn UI Primitives|App Shell & shadcn UI Primitives]]
- [[_COMMUNITY_shadcn components.json Config|shadcn components.json Config]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_TypeScript Compiler Config|TypeScript Compiler Config]]
- [[_COMMUNITY_Background Effects & Buttons|Background Effects & Buttons]]
- [[_COMMUNITY_Site Imagery & Branding|Site Imagery & Branding]]
- [[_COMMUNITY_Graphify Workflow Integration|Graphify Workflow Integration]]
- [[_COMMUNITY_Claude Code Hooks|Claude Code Hooks]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `package.json Manifest` - 13 edges
3. `cn()` - 9 edges
4. `timelineData` - 7 edges
5. `RadialOrbitalTimeline()` - 7 edges
6. `tailwind` - 6 edges
7. `aliases` - 6 edges
8. `BackgroundPaths()` - 6 edges
9. `Button` - 6 edges
10. `RadialOrbitalTimeline()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `React + Vite Template README` --references--> `React 19`  [INFERRED]
  README.md → package.json
- `React + Vite Template README` --references--> `Vite Build Tool`  [INFERRED]
  README.md → package.json
- `index.html Entry Point` --references--> `React 19`  [INFERRED]
  index.html → package.json
- `Site Favicon (Purple Lightning Logo)` --semantically_similar_to--> `Vite Logo (Scaffold Default)`  [INFERRED] [semantically similar]
  public/favicon.svg → src/assets/vite.svg
- `Graphify PreToolUse Bash Hook` --conceptually_related_to--> `graphify-out Directory`  [EXTRACTED]
  .claude/settings.json → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **shadcn UI primitives sharing cn() className merger** — ui_badge_badge, ui_button_button, ui_card_card, ui_aurora_background_aurorabackground, lib_utils_cn [EXTRACTED 1.00]
- **Timeline data flows from App through demo timelineData into active orbital renderer** — src_app_app, components_demo_radial_orbital_timeline_radialorbitaltimelinedemo, components_demo_radial_orbital_timeline_timelinedata, ui_radial_orbital_timeline_radialorbitaltimeline [INFERRED 0.95]
- **Portfolio content sections rendered inside orbital timeline cards** — components_demo_radial_orbital_timeline_eduentry, components_demo_radial_orbital_timeline_expentry, components_demo_radial_orbital_timeline_projentry, components_demo_radial_orbital_timeline_timelinedata [INFERRED 0.85]
- **Vite + React + Tailwind Build Stack** — vite_config_config, vite_config_plugin_react, vite_config_tailwind_plugin [EXTRACTED 0.95]
- **React Three.js 3D Rendering Stack** — package_json_three, package_json_react_three_fiber, package_json_react_three_drei [EXTRACTED 0.85]
- **shadcn UI Component Stack** — package_json_shadcn, package_json_radix_ui, components_json_config [EXTRACTED 0.85]

## Communities (13 total, 1 thin omitted)

### Community 0 - "Project Tech Stack"
Cohesion: 0.09
Nodes (28): shadcn components.json Config, radix-nova Style, ESLint Flat Config, eslint-plugin-react-hooks, eslint-plugin-react-refresh, index.html Entry Point, Google Fonts (Anton, DM Mono, EB Garamond, Playfair Display), ESLint (+20 more)

### Community 1 - "Dev Dependencies & Build Scripts"
Cohesion: 0.08
Nodes (23): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, jimp, @types/node (+15 more)

### Community 2 - "Orbital Timeline Cards & Data"
Cohesion: 0.13
Nodes (16): EduEntry(), ExpEntry(), ExpEntryProps, PINK_TAG, ProjEntry(), ProjEntryProps, ProjLink(), RadialOrbitalTimelineDemo() (+8 more)

### Community 3 - "App Shell & shadcn UI Primitives"
Cohesion: 0.15
Nodes (16): RadialOrbitalTimelineProps, TimelineItem, cn(), App(), main entry, AuroraBackground(), AuroraBackgroundProps, Badge() (+8 more)

### Community 4 - "shadcn components.json Config"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "Runtime Dependencies"
Cohesion: 0.11
Nodes (19): dependencies, class-variance-authority, clsx, @fontsource-variable/geist, framer-motion, lucide-react, @paper-design/shaders-react, radix-ui (+11 more)

### Community 6 - "TypeScript Compiler Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, baseUrl, ignoreDeprecations, isolatedModules, jsx, lib, module (+10 more)

### Community 7 - "Background Effects & Buttons"
Cohesion: 0.26
Nodes (8): BackgroundPaths(), FloatingPaths(), DemoBackgroundPaths(), EnergyRing(), ShaderPlane(), Button, ButtonProps, buttonVariants

### Community 8 - "Site Imagery & Branding"
Cohesion: 0.22
Nodes (11): Hero Stacked Cards Image, React Logo (Scaffold Default), Vite Logo (Scaffold Default), Personal Branding / Portrait Imagery, Framework Scaffold Assets (Likely Unused), Site Visual Identity (Purple Lightning Mark), Social Media Links (Bluesky, Discord, GitHub, X), index.html (HTML Entry Point) (+3 more)

### Community 9 - "Graphify Workflow Integration"
Cohesion: 0.50
Nodes (4): graphify-out Directory, Graphify Knowledge Graph Workflow, Claude Code Settings, Graphify PreToolUse Bash Hook

## Ambiguous Edges - Review These
- `Hero Stacked Cards Image` → `Personal Portrait (Background Removed)`  [AMBIGUOUS]
  None · relation: conceptually_related_to

## Knowledge Gaps
- **99 isolated node(s):** `PreToolUse`, `$schema`, `style`, `rsc`, `tsx` (+94 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Hero Stacked Cards Image` and `Personal Portrait (Background Removed)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `dependencies` connect `Runtime Dependencies` to `Dev Dependencies & Build Scripts`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `RadialOrbitalTimeline()` connect `Orbital Timeline Cards & Data` to `App Shell & shadcn UI Primitives`, `Background Effects & Buttons`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `PreToolUse`, `$schema`, `style` to the rest of the system?**
  _100 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Tech Stack` be split into smaller, more focused modules?**
  _Cohesion score 0.09259259259259259 - nodes in this community are weakly interconnected._
- **Should `Dev Dependencies & Build Scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Orbital Timeline Cards & Data` be split into smaller, more focused modules?**
  _Cohesion score 0.13438735177865613 - nodes in this community are weakly interconnected._