# TRACE project page

Static research page for **Teacher Rollouts for Adaptive Closed-loop Execution**.

[Live website](https://kowndinya2000.github.io/trace-icra2027/) ·
[Public repository](https://github.com/Kowndinya2000/trace-icra2027)

Under review at ICRA 2027. Built from the supplied PL-MPC/Nerfies research-page
structure, with a new responsive design using ICRA 2027 purple (`#772583`) and
amber (`#ffa300`), Outfit headings, and DM Sans body text.

## Preview

```sh
python -m http.server 8000
```

Open `http://localhost:8000`. No build, npm installation, or external runtime
dependencies are required. Fonts, images, video, and captions are served locally.

## Content order

1. Title, review status, paper, and resources.
2. The final 179-second narrated supplementary video, chapters, and transcript.
3. Key results and a manuscript-grounded abstract.
4. Problem definition and a panel-by-panel hardware-setup explanation.
5. Related work: retrieval, predictive planning, privileged teaching, and imitation,
   followed by the supplementary comparison slide and an expandable text version.
6. TRACE's execution stages and detailed deployment/training architecture walkthroughs.
7. Teacher Replay → Online Teacher → TRACE → PMBS → Spiral.
8. Hardware and simulation results, matched-label study, memory ablation, protocol.
9. Scene 05 failure analysis: TRACE and Online Teacher recordings.
10. Scope, limitations, and resources.

## Add or trim scene videos

Edit `static/data/scenes.json`. There are eight slots for each of the five methods.
Online Teacher and TRACE each contain eight full 1080p clips; the other methods
retain their placeholders. Each array's order determines the scene buttons. Remove objects to
trim a gallery. Numbered buttons identify gallery order; populated captions and
labels preserve the actual recorded scene number. Placeholder scene numbers do
not claim to identify particular benchmark trials.

Online Teacher uses recorded scenes **01, 02, 03, 04, 06, 07, 08, and 10**, in
that order, named `01_onlineteacher.mp4` through `08_onlineteacher.mp4`.
TRACE uses the same recorded scene order, named `01_trace.mp4` through
`08_trace.mp4`. Scene 05 appears separately in the failure-analysis section
(Online Teacher success, TRACE failure) and is excluded from both galleries. See [MEDIA.md](MEDIA.md)
for source mapping, encoding settings, and validation.

For every current and future demo, omit trial numbers and internal recording
identifiers from public video captions, labels, and overlays. Retain source
provenance in maintainer records. See the
[public video caption standard](MEDIA.md#public-video-labels-and-captions).

**Video standard for every method:** exclude the closing grasp-network (GN)
grid frames from gamma correction. Any brightening must stop before the first
GN-grid frame, using the actual boundary for that clip. See the
[gamma-correction rule](MEDIA.md#gamma-correction-and-closing-gn-grids), which
also applies to failure-analysis demos and footage in the overview video.

```json
{
  "label": "Scene 01",
  "src": "static/video/trace-scene-01.mp4",
  "poster": "static/images/trace-scene-01.webp",
  "caption": "Describe this actual trial, its outcome, and playback speed.",
  "captions": null
}
```

Keep `src: null` for a clearly marked "Coming soon" slot. Use MP4 with H.264/AAC
and fast-start metadata for broad browser support. `poster` and `captions` are
optional; captions should use WebVTT. The active scene alone creates a player,
and switching scenes stops and unloads the previous one. Playback is never forced.
Do not assign a result or trial description before verifying the actual clip.

## Change the overview

- `static/video/trace-overview.mp4`: final narrated 179-second, under-20 MB version.
- `static/video/trace-overview.vtt`: English captions, phrase timings interpolated
  within the provided slide-level narration cues; refine against audio if needed.
- `static/video/transcript.txt`: complete narration.
- `index.html`: accessible static transcript and chapter start times.
- `static/images/video-poster.webp`: frame extracted from the actual video.

## Sources and reported numbers

Copy is grounded in the supplied TRACE manuscript (`root.tex`) and the final
September 23, 2026 supplementary-video script. Images are web exports of its
hardware, architecture, training, and dataset figures. The PDF is compiled from
that manuscript source with anonymous document metadata. Original research sources
were not edited. `static/data/*-results.csv` contains manuscript table values.

`static/images/related-work-comparison.webp` and
`static/paper/related-work-comparison.pdf` reproduce slide 7 of the final
`3-min-icra-27-video-final.pptx` supplementary presentation, using its existing
validated PDF render. The text comparison transcribes its rows and columns.

The hardware benchmark is 20 scenes × 2 trials per method. "Zero retractions"
always refers to sensing during pushing and excludes the final graspability check.
The 2.9× comparison is 192.7 / 67.3 versus Online Teacher, rounded to one decimal.
Spiral has the shortest total time; Online Teacher has the highest success.
Simulation and hardware rates must not be mixed. Empty CSV cells match unreported
values in the manuscript, not measured zeros.

## Publish or move

Serve this folder at the repository root with GitHub Pages (branch `main`, folder
`/`). `.nojekyll` enables direct static publishing. All assets use relative paths,
so the page works at both a project URL and an account-level GitHub Pages URL.

The current draft is intentionally public on the owner's account. It is **not an
anonymous host**, even though the page omits names and affiliations. `noindex` is
an indexing request, not access control or an anonymity guarantee. Before using
the page in a double-anonymous submission, move the site contents to a separately
created anonymous repository with fresh history; review account ownership, commit
metadata, assets, and outgoing links. Publishing here can leave a discoverable
history even after migration. The future URL named in the manuscript is not
configured by this repository.

## Attribution

See [NOTICE.md](NOTICE.md). Font licenses are included under `static/fonts/`.

## Validation

See [VALIDATION.md](VALIDATION.md) for the checked browser behavior and publication
checks. No automated tracking is included.
