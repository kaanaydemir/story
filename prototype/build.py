#!/usr/bin/env python3
"""KANDİL — Bölüm 1 prototipi için küçük derleyici.

src/index.html şablonuna src/style.css ve src/*.js dosyalarını (ad sırasıyla)
gömer ve tek, kendi kendine yeten dist/bolum1.html dosyasını yazar.
"""
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
DIST = ROOT / "dist"


def main() -> int:
    template = (SRC / "index.html").read_text(encoding="utf-8")
    css = (SRC / "style.css").read_text(encoding="utf-8")
    js_files = sorted(SRC.glob("*.js"))
    if not js_files:
        print("src/*.js bulunamadı", file=sys.stderr)
        return 1
    parts = []
    for f in js_files:
        code = f.read_text(encoding="utf-8")
        if "</script" in code.lower():
            print(f"{f.name}: '</script' dizisi gömülü betiği bozar", file=sys.stderr)
            return 1
        parts.append(f"/* ---- {f.name} ---- */\n{code}\n")
    js = "(function(){\n'use strict';\n" + "\n".join(parts) + "\n})();\n"
    if "/*__CSS__*/" not in template or "/*__JS__*/" not in template:
        print("şablonda yer tutucular eksik", file=sys.stderr)
        return 1
    out = template.replace("/*__CSS__*/", css).replace("/*__JS__*/", js)
    DIST.mkdir(exist_ok=True)
    target = DIST / "bolum1.html"
    target.write_text(out, encoding="utf-8")
    print(f"yazıldı: {target.relative_to(ROOT)} ({len(out.encode('utf-8')) // 1024} KB, {len(js_files)} JS dosyası)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
