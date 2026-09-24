# Website demo video standards

## Public video labels and captions

Do not show trial numbers or internal recording identifiers in video captions,
labels, or overlays. This applies to every current and future website demo,
including failure-analysis videos. Method names, scene numbers, and meaningful
playback information can remain. Keep trial provenance in source records and
maintainer documentation rather than in the visitor-facing presentation.

## Gamma correction and closing GN grids

**For every demo video on the website, do not apply gamma correction to the
closing grasp-network (GN) grid frames.** This applies to all methods,
failure-analysis clips, and demo footage included in the supplementary overview.

If camera footage needs gamma correction, stop the filter before the first
closing GN-grid frame and keep it off through the end. Determine that boundary
for each clip from its actual frames or source edit timeline; do not assume a
fixed number of final seconds. The GN grid must retain its source gamma even
when the preceding footage is brightened. Compression and fast-start processing
can still include the full clip.

Before publishing a gamma-adjusted export, compare the transition and final GN
frames against the uncorrected source. If the boundary is unknown, leave gamma
correction off until it is identified. The current eight Online Teacher web
exports have no additional gamma correction anywhere, including their GN grids.

## Online Teacher scene videos

The eight gallery clips come from the supplied
`teacher_closed_loop_videos_1080p_20260914` folder. Source recordings remain
unchanged in upload storage. Only the web exports use the simplified filenames.

| Gallery / filename | Recorded scene | Source filename |
| --- | --- | --- |
| `01_onlineteacher.mp4` | 01 | `scene01_trial1_teacher_closed_loop_master.mp4` |
| `02_onlineteacher.mp4` | 02 | `scene02_trial1_teacher_closed_loop_master.mp4` |
| `03_onlineteacher.mp4` | 03 | `scene03_trial1_teacher_closed_loop_master.mp4` |
| `04_onlineteacher.mp4` | 04 | `scene04_trial1_teacher_closed_loop_master.mp4` |
| `05_onlineteacher.mp4` | 06 | `scene06_trial1_teacher_closed_loop_master.mp4` |
| `06_onlineteacher.mp4` | 07 | `scene07_trial1_teacher_closed_loop_master.mp4` |
| `07_onlineteacher.mp4` | 08 | `scene08_trial1_teacher_closed_loop_master.mp4` |
| `08_onlineteacher.mp4` | 10 | `scene10_trial1_teacher_closed_loop_master.mp4` |

Every recording is trial 1. Gallery captions retain the recorded scene IDs, which
must not be confused with the sequential website filenames. Playback timing,
frame counts, 1920 × 1080 resolution, and 30 fps are retained.

### Separate failure-analysis case

`failure-analysis-scene05_trial1_teacher_closed_loop_master.mp4` supplies
`failure_onlineteacher.mp4` in the separate Scene 05 failure-analysis section.
It accompanies `failure_trace.mp4`, sourced from the separately marked TRACE
failure upload. The authors identify Online Teacher success and TRACE failure;
the TRACE closing GN grid reports no viable grasp (Q = 0.000, threshold 0.70).
Do not include Scene 05 in either general gallery or confuse it with video 05,
which is recorded Scene 06. Source recordings remain unchanged in upload storage.

### Web encoding

H.264 MP4, `libx264`, `-preset slow -crf 20 -pix_fmt yuv420p`, with
`-movflags +faststart` so playback can start before the file finishes downloading.
No cropping, rescaling, frame removal, speed changes, or additional gamma filter
is applied to the video. The supplied camera views were already readable; their
existing color and tone treatment is retained. The sources contain no audio.

This is high-quality lossy compression, not a mathematically lossless export.
Representative frames and scene details are compared with the source, alongside
objective similarity checks. The originals remain available for future exports.
Posters are WebP stills extracted from the actual videos. Players use
`preload="none"`; switching scenes unloads the previous video, and videos never
autoplay. Only the selected poster is requested until the visitor presses play.

The scene manifest is revalidated on page load; the JavaScript URL is versioned
to deliver that loading behavior to returning visitors.

### Quality checks

All eight exports decoded without warnings or errors. Their frame counts,
durations, resolution, and frame rates match the sources, and each MP4 places
its playback metadata before the media data. Similarity was sampled once per
second across all clips (1,302 frame pairs). Per-clip mean SSIM ranges from
0.995120 to 0.995498 over the full frame and 0.980334 to 0.982018 over the main
camera view (790 × 590 crop at x=36, y=366), which avoids judging quality only
from the large static dashboard areas. These metrics do not imply losslessness.
Source/export frames, posters, and desktop/mobile gallery views were visually
inspected. Chrome playback and seeking were verified for every clip.

### Export sizes

Eight gallery sources total 526.4 MB; web videos total 344.0 MB, a 34.6% reduction.
Sizes below use decimal MB.

| File | Duration | Source MB | Web MB |
| --- | ---: | ---: | ---: |
| `01_onlineteacher.mp4` | 143.93 s | 56.6 | 36.5 |
| `02_onlineteacher.mp4` | 165.60 s | 67.8 | 44.7 |
| `03_onlineteacher.mp4` | 103.13 s | 41.4 | 26.9 |
| `04_onlineteacher.mp4` | 164.33 s | 66.6 | 43.9 |
| `05_onlineteacher.mp4` | 112.97 s | 46.3 | 30.1 |
| `06_onlineteacher.mp4` | 295.33 s | 121.4 | 79.7 |
| `07_onlineteacher.mp4` | 189.70 s | 73.5 | 48.1 |
| `08_onlineteacher.mp4` | 126.87 s | 52.9 | 34.3 |


## TRACE gallery and Scene 05 comparison

The eight TRACE gallery clips use the same recorded scene order as Online Teacher:
01, 02, 03, 04, 06, 07, 08, 10. Files are `01_trace.mp4` through `08_trace.mp4`.
The separately marked Scene 05 upload supplies `failure_trace.mp4`; it appears
beside the reserved Online Teacher success recording in `#failure-analysis`.
Public captions and overlays omit trial identifiers. Source filenames below are
maintainer provenance only.

### Gamma and label processing

Use the supplied gamma-corrected camera footage where a corrected counterpart
exists; Scene 04 and the TRACE failure case use the supplied original footage.
Several corrected uploads also brightened the closing GN grids, so every TRACE
export takes its entire closing GN segment from the corresponding original.
The transition was identified per clip, not by assuming a common tail length.
No gamma filter is applied to any GN segment. No additional gamma is applied to
the already-corrected camera footage.

The small internal recording label in the digital-twin footer is removed before
the GN transition. A blank neighboring footer strip (x=1732, y=1000, 2 × 16 px)
is expanded over the label (x=1734, y=1000, 66 × 16 px), following the footer's
existing background through loading and execution. This leaves the graspability
score, status, plot, and main scene label intact. The GN segment bypasses this edit.

These necessary edits are encoded with H.264 `libx264 -preset slow -crf 16`,
`yuv420p`, and MP4 fast-start metadata. The compact inputs did not warrant
aggressive recompression: preserving their detail takes priority over shrinking
already-small files. All exports retain 1920 × 1080, 30 fps, every source frame,
and original timing. Uploaded sources remain unchanged.

| Web file | Recorded scene | GN starts at frame (zero-based) | Web MB | Body source |
| --- | ---: | ---: | ---: | --- |
| `01_trace.mp4` | 01 | 2016 | 9.91 | `scene01_trial3_student_closed_loop_memory_master_gamma_corrected.mp4` |
| `02_trace.mp4` | 02 | 1717 | 6.60 | `scene02_trial1_student_closed_loop_memory_master_gamma_corrected.mp4` |
| `03_trace.mp4` | 03 | 1675 | 6.61 | `scene03_trial1_student_closed_loop_memory_master_gamma_corrected.mp4` |
| `04_trace.mp4` | 04 | 1700 | 6.65 | `scene04_trial1_student_closed_loop_memory_master.mp4` |
| `05_trace.mp4` | 06 | 1916 | 8.35 | `scene06_trial2_student_closed_loop_memory_master_gamma_corrected.mp4` |
| `06_trace.mp4` | 07 | 2936 | 13.02 | `scene07_trial2_student_closed_loop_memory_master_gamma_corrected.mp4` |
| `07_trace.mp4` | 08 | 2521 | 10.88 | `scene08_trial2_student_closed_loop_memory_master_gamma_corrected.mp4` |
| `08_trace.mp4` | 10 | 2010 | 9.98 | `scene10_trial1_trace_closed_loop_memory_master_gamma_corrected.mp4` |
| `failure_trace.mp4` | 05 | 1529 | 6.24 | `failure-case-put it separate-scene05_trial1_student_closed_loop_memory_master.mp4` |

### Validation

All TRACE exports preserve source frame counts and durations, decode successfully,
and place MP4 playback metadata before media data. Comparing the pre-GN portion
against the selected body source at one sample per second gives per-clip mean
SSIM 0.998851–0.999094. Comparing every closing GN frame against the
uncorrected original gives mean SSIM 0.999797–0.999851. Closing-grid mean
RGB changes are less than 0.01 on the 0–255 scale, consistent with encoding
roundoff rather than a gamma lift. The first GN frames, endings, and cleared
footer labels were visually inspected. These encodes are not mathematically lossless.

The Online Teacher failure-analysis counterpart uses the same CRF 20 web settings
as its main gallery, with no gamma correction: 155.5 MB → 101.7 MB (34.6% smaller),
retaining all 11,664 frames at 1080p/30 fps and the full 388.8-second duration.
Three eight-second source comparisons at 30, 190, and 380 seconds give mean
SSIM 0.995040–0.997653; the complete export decodes without errors and includes
fast-start metadata.
The TRACE Scene 05 recording's GN grid reports Q = 0.000 and no viable grasp;
Online Teacher's corresponding recording ends with a graspable configuration
and successful retrieval. The comparison is presented as an observed difference,
not a controlled attribution of failure to a particular component.
