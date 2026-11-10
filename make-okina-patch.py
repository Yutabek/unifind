"""
Builds public/fonts/sofia-sans-condensed-okina-wght-normal.woff2.

Why: Uzbek Latin writes o‘ and g‘ with U+02BB (ʻ). Sofia Sans Condensed has no
glyph for U+02BB, so browsers borrow it from the next font in the stack (Onest),
which looks too big and too high next to Sofia's capitals. This script makes a
tiny font (one character) that maps U+02BB to Sofia's own quoteleft glyph, so
headlines stay in one voice.

Sofia Sans is licensed under the SIL Open Font License 1.1 and declares no
Reserved Font Name, so a modified subset may be distributed under the same
license (see LICENSE-sofia-sans-condensed.txt next to the font).

Run (needs fontTools + brotli):  python3 scripts/make-okina-patch.py
"""
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

FONTS = Path(__file__).resolve().parent.parent / "public" / "fonts"
SOURCE = FONTS / "sofia-sans-condensed-latin-wght-normal.woff2"
TARGET = FONTS / "sofia-sans-condensed-okina-wght-normal.woff2"

font = TTFont(SOURCE)
glyph = font.getBestCmap()[0x2018]  # quoteleft
for table in font["cmap"].tables:
    if table.isUnicode():
        table.cmap[0x02BB] = glyph

options = subset.Options()
options.layout_features = []
options.hinting = False
options.notdef_outline = True
options.name_IDs = [1, 2, 3, 4, 6]
options.flavor = "woff2"
subsetter = subset.Subsetter(options)
subsetter.populate(unicodes=[0x02BB])
subsetter.subset(font)
font.flavor = "woff2"
font.save(TARGET)
print(f"wrote {TARGET.name}: {TARGET.stat().st_size} bytes")
