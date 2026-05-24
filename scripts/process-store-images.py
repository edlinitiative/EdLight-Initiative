"""
Process EdLight store imagery:
  1) Remove backgrounds from the three product photos (tshirt, notebook, tote)
     and write transparent PNGs back to /public/store/.
  2) Generate a real 1080x1080 PNG for the "Sponsor a Student Kit"
     by laying out the freshly background-removed swag on a branded backdrop.
"""

import os
import io
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from rembg import remove, new_session

ROOT = "/workspaces/EdLight-Initiative"
STORE_DIR = os.path.join(ROOT, "public", "store")

# ---- 1. Background removal ---------------------------------------------------

session = new_session("u2net")  # general-purpose; works well on isolated products

source_files = {
    "tshirt.png":  "tshirt.png",
    "notebook.png": "notebook.png",
    "tote.png":    "tote.png",
}

cleaned_paths = {}

for src_name, out_name in source_files.items():
    src_path = os.path.join(STORE_DIR, src_name)
    out_path = os.path.join(STORE_DIR, out_name)
    print(f"Removing background from {src_name} …")
    with open(src_path, "rb") as f:
        input_bytes = f.read()
    output_bytes = remove(input_bytes, session=session)
    img = Image.open(io.BytesIO(output_bytes)).convert("RGBA")

    # Trim transparent padding so the product fills the frame consistently.
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    # Place on a square transparent canvas with even padding (8%).
    side = max(img.size)
    pad = int(side * 0.08)
    canvas_size = side + pad * 2
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    canvas.paste(img, ((canvas_size - img.width) // 2,
                       (canvas_size - img.height) // 2), img)

    # Downscale to a sensible max (1200 px on the long edge).
    MAX = 1200
    if canvas.width > MAX:
        canvas = canvas.resize((MAX, MAX), Image.LANCZOS)

    canvas.save(out_path, "PNG", optimize=True)
    cleaned_paths[out_name] = out_path
    print(f"  → wrote {out_path} ({canvas.size})")

# ---- 2. Student Kit 1080×1080 composite --------------------------------------

print("\nBuilding Student Kit composite …")

KIT_SIZE = 1080
kit = Image.new("RGB", (KIT_SIZE, KIT_SIZE), (0, 0, 0))

# Vertical navy gradient: #001a4d → #00102e → #000a1f
top    = (0x00, 0x1a, 0x4d)
mid    = (0x00, 0x10, 0x2e)
bottom = (0x00, 0x0a, 0x1f)
px = kit.load()
for y in range(KIT_SIZE):
    t = y / (KIT_SIZE - 1)
    if t < 0.55:
        r = t / 0.55
        c = tuple(int(top[i] + (mid[i] - top[i]) * r) for i in range(3))
    else:
        r = (t - 0.55) / 0.45
        c = tuple(int(mid[i] + (bottom[i] - mid[i]) * r) for i in range(3))
    for x in range(KIT_SIZE):
        px[x, y] = c

# Radial blue glow in upper-right corner.
glow = Image.new("RGBA", (KIT_SIZE, KIT_SIZE), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
cx, cy, R = int(KIT_SIZE * 0.78), int(KIT_SIZE * 0.22), int(KIT_SIZE * 0.6)
for i in range(40, 0, -1):
    a = int(80 * (i / 40) ** 2)
    rr = int(R * (i / 40))
    gd.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=(30, 66, 159, a))
glow = glow.filter(ImageFilter.GaussianBlur(30))
kit = Image.alpha_composite(kit.convert("RGBA"), glow)

# Faint dot-grid texture.
dot_layer = Image.new("RGBA", (KIT_SIZE, KIT_SIZE), (0, 0, 0, 0))
dd = ImageDraw.Draw(dot_layer)
for y in range(0, KIT_SIZE, 28):
    for x in range(0, KIT_SIZE, 28):
        dd.ellipse([x, y, x + 1, y + 1], fill=(232, 226, 212, 25))
kit = Image.alpha_composite(kit, dot_layer)

# Soft card frame in the centre so the products sit on a "tray".
card_pad = 110
card = Image.new("RGBA", (KIT_SIZE, KIT_SIZE), (0, 0, 0, 0))
cdraw = ImageDraw.Draw(card)
cdraw.rounded_rectangle(
    [card_pad, card_pad, KIT_SIZE - card_pad, KIT_SIZE - card_pad],
    radius=18,
    fill=(255, 255, 255, 14),
    outline=(255, 255, 255, 46),
    width=2,
)
# inner hairline
cdraw.rounded_rectangle(
    [card_pad + 14, card_pad + 14, KIT_SIZE - card_pad - 14, KIT_SIZE - card_pad - 14],
    radius=10,
    outline=(255, 255, 255, 25),
    width=1,
)
kit = Image.alpha_composite(kit, card)

# Place the swag items inside the card.
def load_rgba(p):
    return Image.open(p).convert("RGBA")

tshirt   = load_rgba(cleaned_paths["tshirt.png"])
notebook = load_rgba(cleaned_paths["notebook.png"])
tote     = load_rgba(cleaned_paths["tote.png"])

def fit(img, max_w, max_h):
    img = img.copy()
    img.thumbnail((max_w, max_h), Image.LANCZOS)
    return img

# Layout: tote on the left, t-shirt back-centre (largest), notebook front-right.
tshirt_f   = fit(tshirt,   560, 560)
tote_f     = fit(tote,     420, 460)
notebook_f = fit(notebook, 380, 380)

# Soft drop shadows for grounding.
def with_shadow(rgba, offset=(0, 22), blur=18, opacity=110):
    base = Image.new("RGBA", (rgba.width + 80, rgba.height + 80), (0, 0, 0, 0))
    alpha = rgba.split()[3]
    shadow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    shadow.paste((0, 0, 0, opacity), (40 + offset[0], 40 + offset[1]), alpha)
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    shadow.paste(rgba, (40, 40), rgba)
    return shadow

# Anchors for centres of each item (rough thirds composition).
def paste_centered(canvas, img_with_shadow, cx, cy):
    x = cx - img_with_shadow.width // 2
    y = cy - img_with_shadow.height // 2
    canvas.alpha_composite(img_with_shadow, (x, y))

# t-shirt (back layer, centre, larger)
paste_centered(kit, with_shadow(tshirt_f, offset=(0, 26), blur=22, opacity=130),
               cx=int(KIT_SIZE * 0.52), cy=int(KIT_SIZE * 0.50))
# tote (left, slightly lower)
paste_centered(kit, with_shadow(tote_f, offset=(0, 22), blur=18, opacity=120),
               cx=int(KIT_SIZE * 0.27), cy=int(KIT_SIZE * 0.56))
# notebook (front-right)
paste_centered(kit, with_shadow(notebook_f, offset=(0, 18), blur=16, opacity=120),
               cx=int(KIT_SIZE * 0.74), cy=int(KIT_SIZE * 0.62))

# ---- Wordmark + meta typography ---------------------------------------------

def find_font(candidates, size):
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()

sans_bold = find_font([
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
], 38)
sans_med  = find_font([
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
], 18)
mono = find_font([
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
], 16)

draw = ImageDraw.Draw(kit)

# Bottom-left wordmark
draw.text((card_pad + 18, KIT_SIZE - card_pad - 78),
          "EdLight",
          fill=(255, 255, 255, 235),
          font=sans_bold)
draw.text((card_pad + 20, KIT_SIZE - card_pad - 32),
          "SPONSOR  ·  A  ·  STUDENT",
          fill=(255, 255, 255, 150),
          font=sans_med)

# Top-right code label
draw.text((KIT_SIZE - card_pad - 110, card_pad + 22),
          "KIT · 01",
          fill=(255, 255, 255, 140),
          font=mono)

# Top-left small contents list
contents_y = card_pad + 22
items = ["✦  T-shirt", "✦  Tote", "✦  Notebook", "✦  Program access"]
for line in items:
    draw.text((card_pad + 22, contents_y),
              line,
              fill=(255, 255, 255, 165),
              font=sans_med)
    contents_y += 26

# ---- Save -------------------------------------------------------------------

out = os.path.join(STORE_DIR, "sponsor.png")
kit.convert("RGB").save(out, "PNG", optimize=True)
print(f"  → wrote {out} ({KIT_SIZE}x{KIT_SIZE})")

print("\nDone.")
