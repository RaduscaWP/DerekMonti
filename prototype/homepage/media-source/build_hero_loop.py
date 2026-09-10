"""Composite licensed in-flight footage into a fixed generated cabin plate.

This is real video editing: the ocean/cloud region comes from moving source
footage. No Ken Burns still, synthetic displacement, or camera zoom is used.
Run from the repository root with Python, numpy, OpenCV, imageio-ffmpeg.
"""
from pathlib import Path
import os
import subprocess
import cv2
import imageio_ffmpeg
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
os.chdir(ROOT)  # OpenCV's Windows file API requires ASCII-relative paths.
ASSETS = Path('public/assets')
SOURCE = Path('media-source')
plate = cv2.imread(str(ASSETS / 'hero-window.png')).astype(np.float32)
h, w = plate.shape[:2]

# A soft video matte follows the photographed inner window opening. The cabin
# frame and typography-safe left portion stay pixel-stationary throughout.
outline = np.array([
    [974, 112], [1014, 114], [1080, 129], [1153, 153], [1195, 184],
    [1218, 222], [1231, 265], [1230, 326], [1221, 417], [1210, 516],
    [1194, 585], [1175, 636], [1151, 677], [1127, 707], [1087, 725],
    [1018, 735], [946, 744], [899, 738], [873, 719], [859, 690],
    [852, 651], [850, 604], [854, 525], [861, 441], [871, 350],
    [887, 268], [905, 208], [926, 161], [948, 128],
], dtype=np.float32)

def catmull_rom(points):
    curved = []
    for i in range(len(points)):
        a, b, c, d = (points[(i + k) % len(points)] for k in [-1, 0, 1, 2])
        for t in np.linspace(0, 1, 12, endpoint=False):
            curved.append(.5 * ((2*b) + (-a+c)*t + (2*a-5*b+4*c-d)*t*t
                                + (-a+3*b-3*c+d)*t*t*t))
    return np.array(curved, dtype=np.int32)

mask = np.zeros((h, w), dtype=np.uint8)
cv2.fillPoly(mask, [catmull_rom(outline)], 255)
mask = cv2.GaussianBlur(mask, (5, 5), .8).astype(np.float32)[:, :, None] / 255

cap = cv2.VideoCapture(str(SOURCE / 'mixkit-4204-720.mp4'))
fps = 24
frames = []
cap.set(cv2.CAP_PROP_POS_FRAMES, 4 * fps)
for _ in range(14 * fps):
    ok, source = cap.read()
    if not ok:
        raise RuntimeError('Source clip ended before the selected segment.')
    # Left portion excludes the airplane wing and all printed cabin branding.
    crop = source[0:720, 0:350].astype(np.float32)
    # Restrained warm color grade to fit the window-trim sunlight.
    crop *= np.array([.94, 1.04, 1.13], dtype=np.float32)
    crop += np.array([0, 3, 7], dtype=np.float32)
    frames.append(np.clip(cv2.resize(crop, (420, 660)), 0, 255))
cap.release()

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
mp4 = ASSETS / 'hero-window-loop.mp4'
process = subprocess.Popen([
    ffmpeg, '-y', '-hide_banner', '-loglevel', 'error', '-f', 'rawvideo',
    '-pix_fmt', 'bgr24', '-s', f'{w}x{h}', '-r', str(fps), '-i', '-',
    '-an', '-c:v', 'libx264', '-crf', '23', '-preset', 'slow',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(mp4),
], stdin=subprocess.PIPE)

preview_times = {0, 5*fps, 10*fps, 12*fps-1}
first = last = None
for i in range(12 * fps):
    f = frames[i + 2*fps]
    # A two-second dissolve returns naturally to the starting cloud position.
    if i >= 10*fps:
        mix = (i - 10*fps) / (2*fps)
        mix = mix*mix*(3-2*mix)
        f = f * (1-mix) + frames[i - 10*fps] * mix
    view = plate.copy()
    view[100:760, 830:1250] = f
    composite = np.clip(plate*(1-mask) + view*mask, 0, 255).astype(np.uint8)
    process.stdin.write(composite.tobytes())
    if i in preview_times:
        cv2.imwrite(str(SOURCE / f'hero-composite-{i:03d}.jpg'), composite)
    if i == 0:
        first = composite
        cv2.imwrite(str(ASSETS / 'hero-window-video-poster.webp'), composite,
                    [cv2.IMWRITE_WEBP_QUALITY, 89])
    last = composite
process.stdin.close()
if process.wait() != 0:
    raise RuntimeError('FFmpeg MP4 encoding failed')

subprocess.run([
    ffmpeg, '-y', '-hide_banner', '-loglevel', 'error', '-i', str(mp4),
    '-an', '-c:v', 'libvpx-vp9', '-crf', '34', '-b:v', '0',
    '-deadline', 'good', '-cpu-used', '2', str(ASSETS / 'hero-window-loop.webm'),
], check=True)

print({'size': [w, h], 'fps': fps, 'seconds': 12,
       'first_last_mean_absolute_difference': float(np.abs(first.astype(float)-last).mean()),
       'files': {p.name: p.stat().st_size for p in ASSETS.glob('hero-window*')}})
