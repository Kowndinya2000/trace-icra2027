# Validation

Checked on September 23, 2026 in headless Chrome using Playwright against a local
HTTP server with byte-range support (needed for MP4 seeking).

- All five galleries: 8 slots each, direct selection, next/previous wrap, arrow/Home/End keyboard controls.
- Deployment/training and hardware/simulation tabs select correct panels; tables have five hardware and eight simulation methods.
- Figure enlargement, Escape dismissal, and focus restoration.
- Supplementary MP4 plays (179 seconds, 1920 px width), chapter seeking works, English caption cues load.
- No document overflow at 320, 390, 768, 1024, and 1440 px. Mobile menu opens and closes after navigation.
- All internal anchors and local files return successfully, including paper, video, figures, CSVs, captions, and fonts.
- At the initial build, a populated scene slot created a native video and switching to a placeholder unloaded it; the manifest then contained 40 empty slots.
- Missing per-method scene data falls back to eight explicit placeholders.
- Without JavaScript, paper, video, figures, narrative, default results, and transcript remain available; galleries explain the requirement.
- No browser JavaScript errors or failed asset requests in the checked flows.

Desktop and mobile screenshots were also visually reviewed. The downloadable
8-page manuscript was compiled with IEEEtran bibliography formatting, with no
undefined references or citations, then optimized for the web. Its first page,
metadata, reference section, and key results were checked.

The supplementary video is the supplied final 179-second narrated submission
version. At the initial build, full per-method scene videos were marked placeholders;
the populated galleries are documented below.
Caption phrase timings are interpolated within the supplied slide-level cues.

Chrome testing does not constitute exhaustive cross-browser or accessibility
certification. All scientific values are manuscript reports, not newly run
experiments.

## Expanded scientific content

The abstract, hardware explanation, related work, and architecture walkthroughs
were checked after the content update on September 23, 2026:

- Correct section order: abstract before problem, related work, and architecture.
- Hardware figure explains panels (a)–(d), task assumptions, partial feedback, and final graspability check.
- Four related-work themes with direct source links; four deployment-panel explanations and three training stages.
- Both architecture tabs and expanded mobile navigation work at 320, 390, 768, 1024, and 1440 px without document overflow.
- Hardware figure enlargement, internal anchors, unique element IDs, and all 40 existing scene slots verified.
- No JavaScript errors or failed runtime asset requests.

Desktop and mobile views of the new sections were visually reviewed. Scientific
copy was checked against the supplied manuscript; related-work links point to
original papers or publisher records.

## Typography readability update

Raised the minimum live text size to 14 px, with explanatory prose at 16 px.
Computed text sizes and horizontal overflow were checked in Chrome at 320, 390,
600, 768, 900, 1024, 1100, 1280, and 1440 px, including both architecture and
results tabs. The menus and scene selection worked at the revised sizes.
Desktop and phone screenshots of the hero, galleries, and results were inspected.
The stylesheet URL is versioned so returning visitors receive the new styling.

## Related-work comparison slide

Added slide 7 from the final supplementary presentation directly below the
related-work discussion, with a lossless 2560 × 1440 image, a single-page PDF,
and an expandable text transcription. The existing validated presentation PDF
was used to preserve its font rendering. The original deck was not changed.

Checked image/PDF responses, correct section placement, image enlargement,
Escape dismissal and focus restoration, and all four text comparison entries.
Chrome checks at 320, 390, 768, 1024, and 1440 px found no document overflow or
JavaScript errors; added live text remains at least 14 px, with 16 px prose.
Desktop and phone screenshots were visually reviewed.

## Populated Online Teacher gallery

On September 23, 2026, populated the eight Online Teacher slots with recorded
scenes 01, 02, 03, 04, 06, 07, 08, and 10, renamed sequentially to
`01_onlineteacher.mp4`–`08_onlineteacher.mp4`. Recorded Scene 05 stays reserved
for failure analysis. The other four methods retain their 32 placeholders.

- Every video preserves the source's 1920 × 1080 resolution, 30 fps, duration, and frame count.
- All exports decode cleanly and have MP4 fast-start metadata; source/export similarity and sizes are detailed in `MEDIA.md`.
- All eight clips play and seek in Chrome, load the correct poster, and expose HTTP byte-range responses.
- Scene labels retain recorded scene IDs; gallery button numbers identify the renamed sequence.
- No scene video downloads on initial page load; switching scenes unloads the previous player, and playing another page video pauses the active one.
- Next/previous wrapping, keyboard navigation, and layout at 320, 390, 768, 1024, and 1440 px passed without browser errors or document overflow.
- Desktop and phone screenshots were visually reviewed. Source uploads were not modified.

## Populated TRACE gallery and Scene 05 failure analysis

On September 23, 2026, populated TRACE's eight slots with recorded scenes
01, 02, 03, 04, 06, 07, 08, and 10, named `01_trace.mp4`–`08_trace.mp4`.
Scene 05 appears in a separate failure-analysis section after results and before
scope, with the full TRACE failure and Online Teacher success recordings.
Teacher Replay, PMBS, and Spiral retain their 24 placeholders.

- All nine TRACE exports retain source frame counts, durations, 1080p resolution, and 30 fps. Entire GN endings come from the uncorrected originals; internal trial labels are removed from the digital-twin footer. Quality comparisons and per-clip transition frames are recorded in `MEDIA.md`.
- The Scene 05 Online Teacher export retains all 11,664 frames and the full 388.8-second duration. Three eight-second comparisons against its source give mean SSIM 0.995040–0.997653; its full decode completes without errors.
- All ten new videos play and seek in Chrome with the correct dimensions, durations, posters, and byte-range streaming. MP4 metadata precedes media data for fast startup.
- No MP4 requests occur on initial page load. Scene switching unloads the old player; starting any gallery or failure-analysis clip pauses the previously playing video.
- Scene sequence, captions without trial IDs, next/previous wrapping, and keyboard navigation pass. Both Scene 05 clips stay outside the eight-slot galleries.
- Layouts at 320, 390, 768, 1024, and 1440 px have no horizontal overflow. New visible text is at least 14 px; explanatory text is 16 px. No browser errors occurred.
- Desktop and phone screenshots, including fresh direct links to failure analysis, were visually reviewed. Source uploads remain unchanged.
