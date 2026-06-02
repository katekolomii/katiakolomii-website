# Graph Report - katiakolomii-website  (2026-06-02)

## Corpus Check
- 29 files · ~278,253 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1023 nodes · 2620 edges · 50 communities (47 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d831bc88`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

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
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]

## God Nodes (most connected - your core abstractions)
1. `beginWork()` - 63 edges
2. `push()` - 61 edges
3. `completeWork()` - 37 edges
4. `runWithFiberInDEV()` - 35 edges
5. `commitMutationEffectsOnFiber()` - 35 edges
6. `updateSuspenseComponent()` - 33 edges
7. `commitLayoutEffectOnFiber()` - 32 edges
8. `getComponentNameFromFiber()` - 27 edges
9. `commitPassiveMountOnFiber()` - 26 edges
10. `captureCommitPhaseError()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `React + Vite Template README` --references--> `React 19`  [INFERRED]
  README.md → package.json
- `React + Vite Template README` --references--> `Vite Build Tool`  [INFERRED]
  README.md → package.json
- `index.html Entry Point` --references--> `React 19`  [INFERRED]
  index.html → package.json
- `Site Favicon (Purple Lightning Logo)` --semantically_similar_to--> `Vite Logo (Scaffold Default)`  [INFERRED] [semantically similar]
  public/favicon.svg → src/assets/vite.svg
- `React Compiler` --rationale_for--> `React 19`  [EXTRACTED]
  README.md → package.json

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **shadcn UI primitives sharing cn() className merger** — ui_badge_badge, ui_button_button, ui_card_card, ui_aurora_background_aurorabackground, lib_utils_cn [EXTRACTED 1.00]
- **Timeline data flows from App through demo timelineData into active orbital renderer** — src_app_app, components_demo_radial_orbital_timeline_radialorbitaltimelinedemo, components_demo_radial_orbital_timeline_timelinedata, ui_radial_orbital_timeline_radialorbitaltimeline [INFERRED 0.95]
- **Portfolio content sections rendered inside orbital timeline cards** — components_demo_radial_orbital_timeline_eduentry, components_demo_radial_orbital_timeline_expentry, components_demo_radial_orbital_timeline_projentry, components_demo_radial_orbital_timeline_timelinedata [INFERRED 0.85]
- **Vite + React + Tailwind Build Stack** — vite_config_config, vite_config_plugin_react, vite_config_tailwind_plugin [EXTRACTED 0.95]
- **React Three.js 3D Rendering Stack** — package_json_three, package_json_react_three_fiber, package_json_react_three_drei [EXTRACTED 0.85]
- **shadcn UI Component Stack** — package_json_shadcn, package_json_radix_ui, components_json_config [EXTRACTED 0.85]

## Communities (50 total, 3 thin omitted)

### Community 0 - "Project Tech Stack"
Cohesion: 0.08
Nodes (30): shadcn components.json Config, radix-nova Style, ESLint Flat Config, eslint-plugin-react-hooks, eslint-plugin-react-refresh, index.html Entry Point, Google Fonts (Anton, DM Mono, EB Garamond, Playfair Display), ESLint (+22 more)

### Community 1 - "Dev Dependencies & Build Scripts"
Cohesion: 0.05
Nodes (43): dependencies, class-variance-authority, clsx, @fontsource-variable/geist, framer-motion, lucide-react, @paper-design/shaders-react, radix-ui (+35 more)

### Community 2 - "Orbital Timeline Cards & Data"
Cohesion: 0.06
Nodes (40): BackgroundPaths(), FloatingPaths(), DemoBackgroundPaths(), EduEntry(), ExpEntry(), ExpEntryProps, PINK_TAG, ProjEntry() (+32 more)

### Community 3 - "App Shell & shadcn UI Primitives"
Cohesion: 0.08
Nodes (82): addObjectDiffToProperties(), addObjectToProperties(), addValueToProperties(), bubbleNestedEffectDurations(), callComponentWillReceiveProps(), captureCommitPhaseError(), clearHydrationBoundary(), commitActivityHydrationCallbacks() (+74 more)

### Community 4 - "shadcn components.json Config"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "Runtime Dependencies"
Cohesion: 0.03
Nodes (17): callCallback(), commitCallbacks(), commitHiddenCallbacks(), copyWithRename(), copyWithRenameImpl(), createFiberFromElement(), handleEventsForInputEventPolyfill(), hideDehydratedBoundary() (+9 more)

### Community 6 - "TypeScript Compiler Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, baseUrl, ignoreDeprecations, isolatedModules, jsx, lib, module (+10 more)

### Community 7 - "Background Effects & Buttons"
Cohesion: 0.08
Nodes (58): applyDerivedStateFromProps(), bailoutHooks(), bailoutOnAlreadyFinishedWork(), beginWork(), checkDidRenderIdHook(), checkIfContextChanged(), checkScheduledUpdateOrContext(), checkShouldComponentUpdate() (+50 more)

### Community 8 - "Site Imagery & Branding"
Cohesion: 0.22
Nodes (11): Hero Stacked Cards Image, React Logo (Scaffold Default), Vite Logo (Scaffold Default), Personal Branding / Portrait Imagery, Framework Scaffold Assets (Likely Unused), Site Visual Identity (Purple Lightning Mark), Social Media Links (Bluesky, Discord, GitHub, X), index.html (HTML Entry Point) (+3 more)

### Community 9 - "Graphify Workflow Integration"
Cohesion: 0.50
Nodes (4): graphify-out Directory, Graphify Knowledge Graph Workflow, Claude Code Settings, Graphify PreToolUse Bash Hook

### Community 13 - "Community 13"
Cohesion: 0.06
Nodes (55): cancelCallback(), checkIfRootIsPrerendering(), clearContainerSparingly(), commitBeforeMutationEffects(), commitDoubleInvokeEffectsInDEV(), commitRoot(), computeExpirationTime(), constructSelectEvent() (+47 more)

### Community 14 - "Community 14"
Cohesion: 0.10
Nodes (38): advanceTimers(), bubbleProperties(), claimNextRetryLane(), completeWork(), cutOffTailIfNeeded(), describeAncestors(), describeDiff(), emitPendingHydrationWarnings() (+30 more)

### Community 15 - "Community 15"
Cohesion: 0.08
Nodes (20): aggregateErrors(), checkKeyStringCoercion(), cloneAndReplaceKey(), Component(), elementRefGetterWithDeprecationWarning(), enqueueTask(), escape(), flushActQueue() (+12 more)

### Community 16 - "Community 16"
Cohesion: 0.06
Nodes (34): browserHash, chunks, react-Cvh7Ylf6, configHash, hash, lockfileHash, file, fileHash (+26 more)

### Community 17 - "Community 17"
Cohesion: 0.10
Nodes (35): chainThenableValue(), createCache(), createFormDataWithSubmitter(), dispatchActionState(), dispatchOptimisticSetState(), dispatchReducerAction(), dispatchSetState(), dispatchSetStateInternal() (+27 more)

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (29): addFiberToLanesMap(), attachPingListener(), attachSuspenseRetryListeners(), completeUnitOfWork(), getRetryCache(), getSuspendedThenable(), handleThrow(), isThenableResolved() (+21 more)

### Community 19 - "Community 19"
Cohesion: 0.11
Nodes (27): accumulateEnterLeaveListenersForEvent(), accumulateTwoPhaseListeners(), batchedUpdates$1(), createAndAccumulateChangeEvent(), createDispatchListener(), dispatchEventForPluginEventSystem(), executeDispatch(), findInstanceBlockingEvent() (+19 more)

### Community 20 - "Community 20"
Cohesion: 0.11
Nodes (26): accumulateOrCreateContinuousQueuedReplayableEvent(), attemptContinuousHydration(), attemptHydrationAtCurrentPriority(), attemptReplayContinuousQueuedEvent(), attemptReplayContinuousQueuedEventInMap(), clearIfContinuousEvent(), dispatchContinuousEvent(), dispatchDiscreteEvent() (+18 more)

### Community 21 - "Community 21"
Cohesion: 0.15
Nodes (22): bailoutOffscreenComponent(), canHydrateHydrationBoundary(), createFiberFromDehydratedFragment(), findFirstSuspended(), getBumpedLaneForHydration(), getRemainingWorkInPrimaryTree(), getSuspendedTreeContext(), isSuspenseInstanceFallback() (+14 more)

### Community 22 - "Community 22"
Cohesion: 0.15
Nodes (21): areHookInputsEqual(), checkIfUseWrappedInAsyncCatch(), createThenableState(), rerenderActionState(), rerenderOptimistic(), rerenderReducer(), rerenderTransition(), trackUsedThenable() (+13 more)

### Community 23 - "Community 23"
Cohesion: 0.14
Nodes (19): acquireSingletonInstance(), assertIsMounted(), attemptExplicitHydrationTarget(), commitHydratedActivityInstance(), commitHydratedContainer(), commitHydratedSuspenseInstance(), findCurrentFiberUsingSlowPath(), findInstanceBlockingTarget() (+11 more)

### Community 24 - "Community 24"
Cohesion: 0.21
Nodes (19): canHydrateInstance(), checkAttributeStringCoercion(), coerceFormActionProp(), diffHydratedProperties(), getAttributeAlias(), getValueForAttributeOnCustomComponent(), hydrateAttribute(), hydrateBooleanAttribute() (+11 more)

### Community 25 - "Community 25"
Cohesion: 0.23
Nodes (13): detectEnvironment(), getMode(), getScriptSrc(), inject(), isBrowser(), isDevelopment(), isProduction(), loadProps() (+5 more)

### Community 26 - "Community 26"
Cohesion: 0.18
Nodes (17): accumulateSuspenseyCommitOnFiber(), acquireResource(), adoptPreloadPropsForScript(), adoptPreloadPropsForStylesheet(), describeLinkForResourceErrorDEV(), escapeSelectorAttributeValueInsideDoubleQuotes(), getHoistableRoot(), getResource() (+9 more)

### Community 27 - "Community 27"
Cohesion: 0.18
Nodes (17): attemptEarlyBailoutIfNoScheduledUpdate(), compare(), createLaneMap(), FiberRootNode(), getChildHostContextProd(), getHydratableHoistableCache(), getOwnHostContext(), mountHookTypesDev() (+9 more)

### Community 28 - "Community 28"
Cohesion: 0.15
Nodes (16): mountCallback(), mountDeferredValue(), mountDeferredValueImpl(), mountEvent(), mountId(), mountOptimistic(), mountRef(), mountRefresh() (+8 more)

### Community 29 - "Community 29"
Cohesion: 0.30
Nodes (15): added(), describeElementDiff(), describeExpandedElement(), describeFiberType(), describeNode(), describePropertiesDiff(), describePropValue(), describeSiblingFiber() (+7 more)

### Community 30 - "Community 30"
Cohesion: 0.22
Nodes (14): checkControlledValueProps(), checkForUnmatchedText(), getComponentNameFromOwner(), getCurrentFiberOwnerNameInDevOrNull(), getDeclarationErrorAddendum(), markNodeAsHoistable(), preconnectAs(), preloadStylesheet() (+6 more)

### Community 31 - "Community 31"
Cohesion: 0.19
Nodes (14): createFunctionComponentUpdateQueue(), mountEffect(), mountEffectImpl(), mountImperativeHandle(), mountLayoutEffect(), mountSyncExternalStore(), pushSimpleEffect(), pushStoreConsistencyCheck() (+6 more)

### Community 32 - "Community 32"
Cohesion: 0.26
Nodes (12): checkKeyStringCoercion(), defineKeyPropWarningGetter(), elementRefGetterWithDeprecationWarning(), getComponentNameFromType(), getOwner(), getTaskName(), hasValidKey(), isValidElement() (+4 more)

### Community 33 - "Community 33"
Cohesion: 0.15
Nodes (13): addTrappedEventListener(), camelize(), getEventPriority(), listenToAllSupportedEvents(), listenToNativeEvent(), listenToNonDelegatedEvent(), resetTextContent(), resolveUpdatePriority() (+5 more)

### Community 34 - "Community 34"
Cohesion: 0.23
Nodes (12): getToStringValue(), initInput(), initTextarea(), isCheckable(), restoreStateOfTarget(), setDefaultValue(), track(), trackValueOnNode() (+4 more)

### Community 35 - "Community 35"
Cohesion: 0.24
Nodes (10): buildHydrationDiffNode(), canHydrateTextInstance(), getNextHydratable(), getNextHydratableInstanceAfterHydrationBoundary(), mountActionState(), popHydrationState(), popToNextHostParent(), queueHydrationError() (+2 more)

### Community 36 - "Community 36"
Cohesion: 0.29
Nodes (10): deferHiddenOffscreenComponent(), getSuspendedCache(), mountSuspenseOffscreenState(), peekCacheFromPool(), pushHiddenContext(), pushOffscreenSuspenseHandler(), pushTransition(), reuseHiddenContextOnStack() (+2 more)

### Community 37 - "Community 37"
Cohesion: 0.39
Nodes (9): checkCSSPropertyStringCoercion(), checkFormFieldValueStringCoercion(), createPortal$1(), diffHydratedStyles(), diffHydratedTextForDevWarnings(), normalizeMarkupForTextOrAttribute(), testStringCoercion(), typeName() (+1 more)

### Community 38 - "Community 38"
Cohesion: 0.33
Nodes (9): describeBuiltInComponentFrame(), describeFiber(), describeFunctionComponentFrameWithoutLineNumber(), describeNativeComponentFrame(), disableLogs(), formatOwnerStack(), getCurrentFiberStackInDev(), getStackByFiberInDevAndProd() (+1 more)

### Community 39 - "Community 39"
Cohesion: 0.32
Nodes (8): captureCommitPhaseErrorOnRoot(), createCapturedValueAtFiber(), createClassErrorUpdate(), createRootErrorUpdate(), createUpdate(), enqueueCapturedUpdate(), recordEffectError(), throwException()

### Community 40 - "Community 40"
Cohesion: 0.29
Nodes (8): commitUpdate(), isCustomElement(), updateProperties(), validateProperties$2(), validatePropertiesInDevelopment(), validateProperty(), validateProperty$1(), warnUnknownProperties()

### Community 41 - "Community 41"
Cohesion: 0.29
Nodes (7): getCurrentDebugTask(), throwOnInvalidObjectType(), throwOnInvalidObjectTypeImpl(), warnOnFunctionType(), warnOnFunctionTypeImpl(), warnOnSymbolType(), warnOnSymbolTypeImpl()

### Community 42 - "Community 42"
Cohesion: 0.60
Nodes (6): commitPlacement(), getHostSibling(), insertOrAppendPlacementNode(), insertOrAppendPlacementNodeIntoContainer(), isHostParent(), isSingletonScope()

### Community 43 - "Community 43"
Cohesion: 0.33
Nodes (6): commitRootWhenReady(), estimateBandwidth(), insertSuspendedStylesheets(), isLikelyStaticResource(), onUnsuspend(), waitForCommitToBeReady()

### Community 44 - "Community 44"
Cohesion: 0.70
Nodes (5): handleActionReturnValue(), notifyActionListeners(), onActionError(), onActionSuccess(), runActionStateAction()

### Community 45 - "Community 45"
Cohesion: 0.40
Nodes (5): readContext(), readContextDuringReconciliation(), readContextForConsumer(), use(), useHostTransitionStatus()

### Community 46 - "Community 46"
Cohesion: 0.67
Nodes (4): checkIfSnapshotChanged(), forceStoreRerender(), subscribeToStore(), updateStoreInstance()

### Community 47 - "Community 47"
Cohesion: 0.67
Nodes (4): describeHydratableInstanceForDevWarnings(), getPropNameFromAttributeName(), getStylesObjectFromElement(), warnForExtraAttributes()

## Ambiguous Edges - Review These
- `Hero Stacked Cards Image` → `Personal Portrait (Background Removed)`  [AMBIGUOUS]
  None · relation: conceptually_related_to

## Knowledge Gaps
- **129 isolated node(s):** `PreToolUse`, `hash`, `configHash`, `lockfileHash`, `browserHash` (+124 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Hero Stacked Cards Image` and `Personal Portrait (Background Removed)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `push()` connect `Community 27` to `App Shell & shadcn UI Primitives`, `Community 35`, `Runtime Dependencies`, `Community 36`, `Background Effects & Buttons`, `Community 39`, `Community 40`, `Community 13`, `Community 14`, `Community 17`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 29`, `Community 31`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **What connects `PreToolUse`, `hash`, `configHash` to the rest of the system?**
  _129 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Tech Stack` be split into smaller, more focused modules?**
  _Cohesion score 0.08172043010752689 - nodes in this community are weakly interconnected._
- **Should `Dev Dependencies & Build Scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `Orbital Timeline Cards & Data` be split into smaller, more focused modules?**
  _Cohesion score 0.06110102843315184 - nodes in this community are weakly interconnected._
- **Should `App Shell & shadcn UI Primitives` be split into smaller, more focused modules?**
  _Cohesion score 0.08280638361939174 - nodes in this community are weakly interconnected._