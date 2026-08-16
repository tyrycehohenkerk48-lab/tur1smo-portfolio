from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
EXPORTS = ROOT / "public" / "brand" / "exports"
WORDMARK_SOURCE = EXPORTS / "tur1smo-wordmark.png"
FLAG_SOURCE = EXPORTS / "tur1smo-wave-flag.png"

INK = (17, 17, 15)
PAPER = (232, 229, 220)
ORANGE = (255, 90, 10)
BMW_BLUE = (0, 102, 177)


def sharpened_wordmark_alpha() -> Image.Image:
    source = Image.open(WORDMARK_SOURCE).convert("RGBA")
    alpha = source.getchannel("A").filter(ImageFilter.GaussianBlur(3.5))
    contrast = [max(0, min(255, round((value - 92) * 255 / 71))) for value in range(256)]
    alpha = alpha.point(contrast)
    return alpha.resize((8192, 1010), Image.Resampling.LANCZOS)


def export_wordmark(color: tuple[int, int, int], filename: str) -> None:
    alpha = sharpened_wordmark_alpha()
    alpha_pixels = np.asarray(alpha, dtype=np.uint8)
    output = np.zeros((alpha.height, alpha.width, 4), dtype=np.uint8)
    output[..., :3][alpha_pixels > 0] = color
    output[..., 3] = alpha_pixels
    Image.fromarray(output, "RGBA").save(EXPORTS / filename, optimize=True)


def export_flag(base_color: tuple[int, int, int], filename: str) -> None:
    source = Image.open(FLAG_SOURCE).convert("RGBA").resize((4096, 2340), Image.Resampling.LANCZOS)
    pixels = np.asarray(source, dtype=np.float32)
    luminance = (
        pixels[..., 0] * 0.2126
        + pixels[..., 1] * 0.7152
        + pixels[..., 2] * 0.0722
    )
    visible = pixels[..., 3] > 8
    reference = float(np.median(luminance[visible])) if np.any(visible) else 128.0
    shade = np.clip(luminance / max(reference, 1.0), 0.38, 1.42)[..., None]
    rgb = np.clip(np.asarray(base_color, dtype=np.float32) * shade, 0, 255)
    rgb[pixels[..., 3] == 0] = 0
    output = np.dstack((rgb, pixels[..., 3])).astype(np.uint8)
    Image.fromarray(output, "RGBA").save(EXPORTS / filename, optimize=True)


if __name__ == "__main__":
    EXPORTS.mkdir(parents=True, exist_ok=True)
    export_wordmark(INK, "tur1smo-wordmark-ink-hq.png")
    export_wordmark(PAPER, "tur1smo-wordmark-paper-hq.png")
    export_flag(ORANGE, "tur1smo-flag-orange-hq.png")
    export_flag(BMW_BLUE, "tur1smo-flag-bmw-blue-hq.png")
