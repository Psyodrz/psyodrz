"""
JARVIS HUD Profile — SVG Composition Engine
Generates every visual panel for the GitHub profile dashboard.
"""
import base64, textwrap
from pathlib import Path

OUT = Path("assets/ui")
OUT.mkdir(parents=True, exist_ok=True)

# ── Palette ────────────────────────────────────────────────
BG       = "#0a0a0f"
PANEL_BG = "#0d1117"
CYAN     = "#00e5ff"
VIOLET   = "#7c4dff"
AMBER    = "#ffab00"
GREEN    = "#3fb950"
WHITE    = "#e6edf3"
DIM      = "#8b949e"
BORDER   = "#1a1f2b"
FONT     = "system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"

# ── Utilities ──────────────────────────────────────────────
def _hud_corners(w, h, sz=12, color=CYAN):
    """Draw HUD targeting-bracket corners on a rectangle."""
    return f"""
    <polyline points="{sz},1 1,1 1,{sz}" fill="none" stroke="{color}" stroke-width="1.5"/>
    <polyline points="{w-sz},1 {w-1},1 {w-1},{sz}" fill="none" stroke="{color}" stroke-width="1.5"/>
    <polyline points="1,{h-sz} 1,{h-1} {sz},{h-1}" fill="none" stroke="{color}" stroke-width="1.5"/>
    <polyline points="{w-1},{h-sz} {w-1},{h-1} {w-sz},{h-1}" fill="none" stroke="{color}" stroke-width="1.5"/>"""

def _panel(w, h, content, title=None, accent=CYAN):
    title_block = ""
    if title:
        title_block = f"""
        <rect x="16" y="8" width="{len(title)*8+24}" height="22" rx="4" fill="{accent}" fill-opacity="0.12"/>
        <text x="28" y="23" font-family="{FONT}" font-size="11" font-weight="700" fill="{accent}" letter-spacing="1.5">{title.upper()}</text>"""
    return f"""<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}" xmlns="http://www.w3.org/2000/svg">
<rect width="{w}" height="{h}" rx="12" fill="{PANEL_BG}"/>
<rect width="{w}" height="{h}" rx="12" fill="none" stroke="{BORDER}" stroke-width="1"/>
{_hud_corners(w,h,14,accent)}
{title_block}
{content}
</svg>"""


# ══════════════════════════════════════════════════════════
#  1. HERO SVG
# ══════════════════════════════════════════════════════════
def build_hero():
    # Attempt to embed photo
    photo_path = Path("assets/avatar-glow.png")
    photo_embed = ""
    if photo_path.exists():
        b64 = base64.b64encode(photo_path.read_bytes()).decode()
        photo_embed = f"""
        <clipPath id="photoClip"><circle cx="870" cy="200" r="110"/></clipPath>
        <circle cx="870" cy="200" r="116" fill="none" stroke="{CYAN}" stroke-width="2" opacity="0.6"/>
        <circle cx="870" cy="200" r="122" fill="none" stroke="{CYAN}" stroke-width="1" opacity="0.2" class="pulse"/>
        <image href="data:image/png;base64,{b64}" x="760" y="90" width="220" height="220" clip-path="url(#photoClip)" preserveAspectRatio="xMidYMid slice"/>"""

    # Build city skyline path
    buildings = "M0,320 L0,280 30,280 30,250 50,250 50,220 65,220 65,260 80,260 80,230 100,230 100,200 115,200 115,240 130,240 130,190 155,190 155,260 170,260 170,210 185,210 185,170 200,170 200,220 220,220 220,180 240,180 240,250 260,250 260,200 280,200 280,160 300,160 300,210 315,210 315,240 340,240 340,190 360,190 360,230 380,230 380,170 400,170 400,220 420,220 420,250 440,250 440,200 460,200 460,160 480,160 480,210 500,210 500,180 520,180 520,240 540,240 540,200 560,200 560,230 580,230 580,190 600,190 600,250 620,250 620,210 640,210 640,170 660,170 660,220 680,220 680,260 700,260 700,200 720,200 720,240 740,240 740,210 760,210 760,250 780,250 780,190 800,190 800,230 820,230 820,270 840,270 840,240 860,240 860,210 880,210 880,250 900,250 900,220 920,220 920,260 940,260 940,230 960,230 960,280 980,280 980,310 1000,310 1000,400 0,400Z"

    svg = f"""<svg width="1000" height="400" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg">
<defs>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#05050a"/>
        <stop offset="60%" stop-color="#0a0a1a"/>
        <stop offset="100%" stop-color="#0d1020"/>
    </linearGradient>
    <radialGradient id="heroGlow" cx="50%" cy="80%" r="60%">
        <stop offset="0%" stop-color="{CYAN}" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="{BG}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#111520"/>
        <stop offset="100%" stop-color="#080a10"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="softglow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <style>
        .pulse {{ animation: pulse 3s ease-in-out infinite alternate; }}
        .typing {{ animation: blink 1s step-end infinite; }}
        .scanline {{ animation: scan 4s linear infinite; }}
        @keyframes pulse {{ from {{ opacity:0.3; }} to {{ opacity:0.8; }} }}
        @keyframes blink {{ 50% {{ opacity:0; }} }}
        @keyframes scan {{ from {{ transform:translateY(-400px); }} to {{ transform:translateY(400px); }} }}
    </style>
</defs>

<!-- Sky -->
<rect width="1000" height="400" fill="url(#skyGrad)"/>
<rect width="1000" height="400" fill="url(#heroGlow)"/>

<!-- Grid floor -->
<line x1="0" y1="350" x2="1000" y2="350" stroke="{CYAN}" stroke-opacity="0.06" stroke-width="1"/>
<line x1="0" y1="370" x2="1000" y2="370" stroke="{CYAN}" stroke-opacity="0.04" stroke-width="1"/>
<line x1="0" y1="385" x2="1000" y2="385" stroke="{CYAN}" stroke-opacity="0.02" stroke-width="1"/>

<!-- City Skyline -->
<path d="{buildings}" fill="url(#buildingGrad)" opacity="0.8"/>

<!-- Window lights -->
<g opacity="0.6">
    <rect x="108" y="210" width="3" height="4" fill="{AMBER}" rx="0.5" opacity="0.7"/>
    <rect x="142" y="200" width="3" height="4" fill="{CYAN}" rx="0.5" opacity="0.5"/>
    <rect x="193" y="180" width="3" height="4" fill="{AMBER}" rx="0.5" opacity="0.8"/>
    <rect x="288" y="170" width="3" height="4" fill="{CYAN}" rx="0.5" opacity="0.6"/>
    <rect x="390" y="180" width="3" height="4" fill="{AMBER}" rx="0.5" opacity="0.7"/>
    <rect x="470" y="170" width="3" height="4" fill="{CYAN}" rx="0.5" opacity="0.5"/>
    <rect x="530" y="190" width="3" height="4" fill="{AMBER}" rx="0.5" opacity="0.6"/>
    <rect x="648" y="180" width="3" height="4" fill="{CYAN}" rx="0.5" opacity="0.7"/>
    <rect x="788" y="200" width="3" height="4" fill="{AMBER}" rx="0.5" opacity="0.5"/>
</g>

<!-- HUD Frame -->
{_hud_corners(1000, 400, 24, CYAN)}
<line x1="40" y1="0" x2="40" y2="6" stroke="{CYAN}" stroke-width="1" opacity="0.4"/>
<line x1="960" y1="0" x2="960" y2="6" stroke="{CYAN}" stroke-width="1" opacity="0.4"/>
<line x1="0" y1="395" x2="1000" y2="395" stroke="{CYAN}" stroke-width="0.5" opacity="0.15"/>

<!-- Scanline -->
<rect x="0" y="0" width="1000" height="2" fill="{CYAN}" opacity="0.03" class="scanline"/>

<!-- Name & Title -->
<text x="60" y="140" font-family="{FONT}" font-size="52" font-weight="800" fill="{WHITE}" letter-spacing="-2">Aditya Srivastava</text>
<g filter="url(#glow)">
    <text x="60" y="180" font-family="{FONT}" font-size="20" font-weight="400" fill="{CYAN}" letter-spacing="0.5">Full Stack Engineer</text>
</g>

<!-- Typing line -->
<text x="60" y="220" font-family="{FONT}" font-size="16" fill="{DIM}">
    <tspan fill="{GREEN}">▶</tspan> building premium digital experiences<tspan fill="{CYAN}" class="typing">_</tspan>
</text>

<!-- Contact HUD Panel -->
<g transform="translate(60, 260)">
    <rect width="300" height="36" rx="6" fill="{PANEL_BG}" stroke="{BORDER}" stroke-width="1"/>
    <text x="16" y="23" font-family="{FONT}" font-size="12" fill="{DIM}">
        <tspan fill="{CYAN}">◆</tspan> Portfolio  <tspan fill="{CYAN}">◆</tspan> LinkedIn  <tspan fill="{CYAN}">◆</tspan> Email
    </text>
</g>

<!-- Status indicators -->
<g transform="translate(60, 310)">
    <circle cx="6" cy="6" r="4" fill="{GREEN}"/>
    <text x="16" y="10" font-family="{FONT}" font-size="11" fill="{DIM}">Available for opportunities</text>
</g>

<!-- Photo -->
{photo_embed}

<!-- Photo HUD label -->
<text x="870" y="340" text-anchor="middle" font-family="{FONT}" font-size="10" fill="{DIM}" letter-spacing="2">SYS.OPERATOR</text>
</svg>"""
    (OUT / "hero.svg").write_text(svg, encoding="utf-8")


# ══════════════════════════════════════════════════════════
#  2. DIVIDER
# ══════════════════════════════════════════════════════════
def build_divider():
    svg = f"""<svg width="1000" height="24" viewBox="0 0 1000 24" xmlns="http://www.w3.org/2000/svg">
<defs>
    <linearGradient id="divGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="{BG}" />
        <stop offset="20%" stop-color="{CYAN}" />
        <stop offset="50%" stop-color="{VIOLET}" />
        <stop offset="80%" stop-color="{CYAN}" />
        <stop offset="100%" stop-color="{BG}" />
    </linearGradient>
    <style>
        .divPulse {{ animation: divp 3s ease-in-out infinite alternate; }}
        @keyframes divp {{ from {{ opacity:0.4; }} to {{ opacity:0.9; }} }}
    </style>
</defs>
<line x1="0" y1="12" x2="1000" y2="12" stroke="url(#divGrad)" stroke-width="1" class="divPulse"/>
<circle cx="500" cy="12" r="3" fill="{CYAN}" opacity="0.7" class="divPulse"/>
</svg>"""
    (OUT / "divider.svg").write_text(svg, encoding="utf-8")


# ══════════════════════════════════════════════════════════
#  3. COLUMN 1 PANELS — About / Mission / Learning
# ══════════════════════════════════════════════════════════
def build_about():
    content = f"""
    <text x="28" y="58" font-family="{FONT}" font-size="14" fill="{WHITE}" font-weight="500">
        <tspan x="28" dy="0">Full-stack engineer obsessed with</tspan>
        <tspan x="28" dy="22">crafting performant systems and</tspan>
        <tspan x="28" dy="22">interfaces that feel alive.</tspan>
    </text>
    <text x="28" y="135" font-family="{FONT}" font-size="12" fill="{DIM}">
        <tspan x="28" dy="0">Based in India · Timezone UTC+5:30</tspan>
        <tspan x="28" dy="20">Open to remote collaboration</tspan>
    </text>"""
    svg = _panel(320, 180, content, "ABOUT ME", CYAN)
    (OUT / "panel_about.svg").write_text(svg, encoding="utf-8")

def build_mission():
    content = f"""
    <g transform="translate(28, 55)">
        <circle cx="6" cy="6" r="4" fill="{GREEN}"/>
        <text x="16" y="10" font-family="{FONT}" font-size="13" fill="{WHITE}" font-weight="500">Building production-grade</text>
        <text x="16" y="30" font-family="{FONT}" font-size="13" fill="{WHITE}" font-weight="500">full-stack applications</text>
        <text x="16" y="55" font-family="{FONT}" font-size="12" fill="{DIM}">Focus: Architecture · DX · Perf</text>
    </g>"""
    svg = _panel(320, 140, content, "CURRENT MISSION", GREEN)
    (OUT / "panel_mission.svg").write_text(svg, encoding="utf-8")

def build_learning():
    items = [("Rust","70"), ("System Design","85"), ("DevOps","60")]
    bars = ""
    for i,(name,pct) in enumerate(items):
        y = 55 + i*32
        bars += f"""
        <text x="28" y="{y}" font-family="{FONT}" font-size="12" fill="{DIM}">{name}</text>
        <rect x="28" y="{y+6}" width="264" height="6" rx="3" fill="{BORDER}"/>
        <rect x="28" y="{y+6}" width="{int(264*int(pct)/100)}" height="6" rx="3" fill="{VIOLET}"/>"""
    svg = _panel(320, 165, bars, "LEARNING", VIOLET)
    (OUT / "panel_learning.svg").write_text(svg, encoding="utf-8")


# ══════════════════════════════════════════════════════════
#  4. COLUMN 2 PANELS — Stack / Skills / Architecture
# ══════════════════════════════════════════════════════════
def build_stack():
    techs = ["TypeScript","React","Next.js","Node.js","Python","Tailwind","Docker","PostgreSQL"]
    items = ""
    for i, t in enumerate(techs):
        row = i // 2
        col = i % 2
        x = 28 + col * 148
        y = 50 + row * 30
        items += f"""
        <text x="{x+14}" y="{y+4}" font-family="{FONT}" font-size="12" fill="{WHITE}" font-weight="500">
            <tspan fill="{CYAN}" font-size="8">▪</tspan> {t}
        </text>"""
    svg = _panel(320, 180, items, "TECH STACK", CYAN)
    (OUT / "panel_stack.svg").write_text(svg, encoding="utf-8")

def build_skills():
    skills = [("Frontend","92"),("Backend","85"),("DevOps","70"),("UI/UX","80")]
    bars = ""
    for i,(name,pct) in enumerate(skills):
        y = 55 + i*30
        w = int(264*int(pct)/100)
        bars += f"""
        <text x="28" y="{y}" font-family="{FONT}" font-size="12" fill="{DIM}">{name} <tspan fill="{CYAN}">{pct}%</tspan></text>
        <rect x="28" y="{y+6}" width="264" height="5" rx="2.5" fill="{BORDER}"/>
        <rect x="28" y="{y+6}" width="{w}" height="5" rx="2.5" fill="{CYAN}"/>"""
    svg = _panel(320, 190, bars, "SKILLS", CYAN)
    (OUT / "panel_skills.svg").write_text(svg, encoding="utf-8")

def build_architecture():
    content = f"""
    <text x="28" y="58" font-family="{FONT}" font-size="13" fill="{WHITE}" font-weight="500">
        <tspan x="28" dy="0">Clean boundaries between layers.</tspan>
        <tspan x="28" dy="22">Type-safety from DB to UI.</tspan>
        <tspan x="28" dy="22">Ship fast, observe everything.</tspan>
    </text>
    <g transform="translate(28, 130)">
        <rect width="80" height="24" rx="4" fill="{CYAN}" fill-opacity="0.1" stroke="{CYAN}" stroke-opacity="0.3" stroke-width="0.5"/>
        <text x="40" y="16" text-anchor="middle" font-family="{FONT}" font-size="10" fill="{CYAN}" font-weight="600">MONOREPO</text>
        <rect x="95" width="80" height="24" rx="4" fill="{VIOLET}" fill-opacity="0.1" stroke="{VIOLET}" stroke-opacity="0.3" stroke-width="0.5"/>
        <text x="135" y="16" text-anchor="middle" font-family="{FONT}" font-size="10" fill="{VIOLET}" font-weight="600">CI/CD</text>
        <rect x="190" width="80" height="24" rx="4" fill="{GREEN}" fill-opacity="0.1" stroke="{GREEN}" stroke-opacity="0.3" stroke-width="0.5"/>
        <text x="230" y="16" text-anchor="middle" font-family="{FONT}" font-size="10" fill="{GREEN}" font-weight="600">TESTING</text>
    </g>"""
    svg = _panel(320, 180, content, "ARCHITECTURE", AMBER)
    (OUT / "panel_architecture.svg").write_text(svg, encoding="utf-8")


# ══════════════════════════════════════════════════════════
#  5. PROJECT CARDS
# ══════════════════════════════════════════════════════════
def build_project(filename, title, desc, tags, live_url=None):
    tag_items = ""
    x_off = 24
    for tag in tags:
        tw = len(tag)*7 + 16
        tag_items += f"""
        <rect x="{x_off}" y="140" width="{tw}" height="22" rx="11" fill="{BORDER}"/>
        <text x="{x_off + tw//2}" y="155" text-anchor="middle" font-family="{FONT}" font-size="10" fill="{DIM}" font-weight="500">{tag}</text>"""
        x_off += tw + 6

    live_badge = ""
    if live_url:
        live_badge = f"""
        <rect x="340" y="140" width="60" height="22" rx="11" fill="{GREEN}" fill-opacity="0.15" stroke="{GREEN}" stroke-opacity="0.3" stroke-width="0.5"/>
        <text x="370" y="155" text-anchor="middle" font-family="{FONT}" font-size="10" fill="{GREEN}" font-weight="600">LIVE</text>"""

    # Abstract preview graphic
    preview = f"""
    <rect x="24" y="45" width="440" height="80" rx="8" fill="{BG}" stroke="{BORDER}" stroke-width="0.5"/>
    <rect x="34" y="55" width="120" height="8" rx="4" fill="{BORDER}"/>
    <rect x="34" y="70" width="200" height="6" rx="3" fill="{BORDER}" opacity="0.6"/>
    <rect x="34" y="82" width="160" height="6" rx="3" fill="{BORDER}" opacity="0.4"/>
    <rect x="34" y="94" width="180" height="6" rx="3" fill="{BORDER}" opacity="0.3"/>
    <rect x="380" y="55" width="70" height="60" rx="6" fill="{CYAN}" fill-opacity="0.05" stroke="{CYAN}" stroke-opacity="0.15" stroke-width="0.5"/>
    <text x="415" y="90" text-anchor="middle" font-family="{FONT}" font-size="18" fill="{CYAN}" opacity="0.3">⟡</text>"""

    content = f"""
    {preview}
    {tag_items}
    {live_badge}
    <text x="24" y="190" font-family="{FONT}" font-size="12" fill="{DIM}">
        <tspan x="24" dy="0">{desc[:55]}</tspan>
        <tspan x="24" dy="18">{desc[55:]}</tspan>
    </text>"""

    svg = _panel(490, 225, content, title, CYAN)
    (OUT / filename).write_text(svg, encoding="utf-8")


# ══════════════════════════════════════════════════════════
#  6. FOOTER
# ══════════════════════════════════════════════════════════
def build_footer():
    svg = f"""<svg width="1000" height="80" viewBox="0 0 1000 80" xmlns="http://www.w3.org/2000/svg">
<defs>
    <style>
        .footPulse {{ animation: fp 5s ease-in-out infinite alternate; }}
        @keyframes fp {{ from {{ opacity:0.5; }} to {{ opacity:1; }} }}
    </style>
</defs>
<rect width="1000" height="80" fill="{BG}"/>
<text x="500" y="35" text-anchor="middle" font-family="{FONT}" font-size="13" fill="{DIM}" font-style="italic" class="footPulse">
    "Any sufficiently advanced technology is indistinguishable from magic." — Arthur C. Clarke
</text>
<text x="500" y="60" text-anchor="middle" font-family="{FONT}" font-size="11" fill="{BORDER}">
    Designed with precision · Built with obsession · Maintained from Asia/Kolkata
</text>
</svg>"""
    (OUT / "footer.svg").write_text(svg, encoding="utf-8")


# ══════════════════════════════════════════════════════════
#  RUN
# ══════════════════════════════════════════════════════════
if __name__ == "__main__":
    print(">> Building JARVIS HUD Profile...")
    build_hero()
    print("  [ok] hero.svg")
    build_divider()
    print("  [ok] divider.svg")
    build_about()
    build_mission()
    build_learning()
    print("  [ok] Column 1 panels")
    build_stack()
    build_skills()
    build_architecture()
    print("  [ok] Column 2 panels")
    build_project("project_trecab.svg", "TRECAB", "Full-stack ride-hailing platform with real-time tracking, WebSocket integrations, and clean API boundaries.", ["React","Node.js","WebSocket","Maps"])
    build_project("project_dreamscape.svg", "DREAMSCAPE MAZE", "Immersive 3D web experience leveraging WebGL and Three.js. Built for max device compatibility.", ["Three.js","WebGL","GLSL"])
    build_project("project_skillsynergy.svg", "SKILLSYNERGY", "Collaborative platform matching users with AI-assisted learning paths at scale.", ["React","TypeScript","API","AI"])
    build_project("project_portfolio.svg", "PORTFOLIO V2", "High-performance personal portfolio built with Next.js, fluid animations, and premium design.", ["Next.js","TypeScript","Tailwind"], "https://psyodrz.github.io/PortfolioV2/")
    print("  [ok] Project cards")
    build_footer()
    print("  [ok] footer.svg")
    print(f"\n[DONE] All assets generated -> {OUT}/")

