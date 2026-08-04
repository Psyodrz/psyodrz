"""
JARVIS HUD v2 — Maximum Detail & Animation SVG Engine
Every panel is dense, animated, and feels like a real command center.
"""
import base64
from pathlib import Path

OUT = Path("assets/ui")
OUT.mkdir(parents=True, exist_ok=True)

# Palette
BG       = "#0a0a0f"
PANEL    = "#0d1117"
CYAN     = "#00e5ff"
VIOLET   = "#7c4dff"
AMBER    = "#ffab00"
GREEN    = "#3fb950"
RED      = "#f85149"
WHITE    = "#e6edf3"
DIM      = "#8b949e"
BORDER   = "#1a1f2b"
FONT     = "system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"
MONO     = "'Courier New',Consolas,monospace"

SHARED_STYLES = f"""
    .pulse {{ animation: pulse 3s ease-in-out infinite alternate; }}
    .pulse2 {{ animation: pulse 2s ease-in-out infinite alternate; }}
    .blink {{ animation: blink 1s step-end infinite; }}
    .scan {{ animation: scan 6s linear infinite; }}
    .float {{ animation: float 4s ease-in-out infinite; }}
    .rotate {{ animation: rotate 12s linear infinite; }}
    .slideIn {{ animation: slideIn 1.5s ease-out forwards; }}
    .glow {{ animation: glow 2s ease-in-out infinite alternate; }}
    .dataScroll {{ animation: dataScroll 8s linear infinite; }}
    .fadeInUp {{ animation: fadeInUp 1s ease-out forwards; }}
    .sweep {{ animation: sweep 3s ease-in-out infinite; }}
    @keyframes pulse {{ 0%{{opacity:.3}} 100%{{opacity:.9}} }}
    @keyframes blink {{ 50%{{opacity:0}} }}
    @keyframes scan {{ 0%{{transform:translateY(-100%)}} 100%{{transform:translateY(100%)}} }}
    @keyframes float {{ 0%,100%{{transform:translateY(0)}} 50%{{transform:translateY(-6px)}} }}
    @keyframes rotate {{ 0%{{transform:rotate(0deg)}} 100%{{transform:rotate(360deg)}} }}
    @keyframes slideIn {{ 0%{{opacity:0;transform:translateX(-20px)}} 100%{{opacity:1;transform:translateX(0)}} }}
    @keyframes glow {{ 0%{{filter:drop-shadow(0 0 2px {CYAN}40)}} 100%{{filter:drop-shadow(0 0 8px {CYAN}80)}} }}
    @keyframes dataScroll {{ 0%{{transform:translateY(0)}} 100%{{transform:translateY(-50%)}} }}
    @keyframes fadeInUp {{ 0%{{opacity:0;transform:translateY(10px)}} 100%{{opacity:1;transform:translateY(0)}} }}
    @keyframes sweep {{ 0%,100%{{opacity:.2}} 50%{{opacity:.6}} }}
"""

def hud_corners(w, h, sz=14, color=CYAN):
    return f"""
    <polyline points="{sz},1 1,1 1,{sz}" fill="none" stroke="{color}" stroke-width="1.5" class="glow"/>
    <polyline points="{w-sz},1 {w-1},1 {w-1},{sz}" fill="none" stroke="{color}" stroke-width="1.5" class="glow"/>
    <polyline points="1,{h-sz} 1,{h-1} {sz},{h-1}" fill="none" stroke="{color}" stroke-width="1.5" class="glow"/>
    <polyline points="{w-1},{h-sz} {w-1},{h-1} {w-sz},{h-1}" fill="none" stroke="{color}" stroke-width="1.5" class="glow"/>"""

def scanline_effect(w, h):
    return f'<rect x="0" y="0" width="{w}" height="3" fill="{CYAN}" opacity="0.04" class="scan"/>'

def data_ticker(x, y, texts, color=DIM):
    items = "".join(f'<tspan x="{x}" dy="14" font-size="9" fill="{color}" opacity="0.6">{t}</tspan>' for t in texts)
    return f'<text font-family="{MONO}" class="dataScroll">{items}{items}</text>'


# ═══════════════════════════════════════════════════════
#  HERO — Cyberpunk City + HUD + Photo + Data Readouts
# ═══════════════════════════════════════════════════════
def build_hero():
    photo_path = Path("assets/avatar-glow.png")
    photo = ""
    if photo_path.exists():
        b64 = base64.b64encode(photo_path.read_bytes()).decode()
        photo = f"""
        <defs>
            <clipPath id="pClip"><circle cx="870" cy="195" r="95"/></clipPath>
            <filter id="photoGlow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <!-- Photo rings -->
        <circle cx="870" cy="195" r="105" fill="none" stroke="{CYAN}" stroke-width="1" opacity="0.2" stroke-dasharray="4 4" class="rotate" transform-origin="870 195"/>
        <circle cx="870" cy="195" r="100" fill="none" stroke="{CYAN}" stroke-width="1.5" opacity="0.5" class="pulse"/>
        <circle cx="870" cy="195" r="95" fill="{CYAN}" fill-opacity="0.03"/>
        <image href="data:image/png;base64,{b64}" x="775" y="100" width="190" height="190" clip-path="url(#pClip)" preserveAspectRatio="xMidYMid slice"/>
        <!-- Photo corner brackets -->
        <polyline points="790,115 775,115 775,130" fill="none" stroke="{CYAN}" stroke-width="1" opacity="0.4"/>
        <polyline points="950,115 965,115 965,130" fill="none" stroke="{CYAN}" stroke-width="1" opacity="0.4"/>
        <polyline points="790,275 775,275 775,260" fill="none" stroke="{CYAN}" stroke-width="1" opacity="0.4"/>
        <polyline points="950,275 965,275 965,260" fill="none" stroke="{CYAN}" stroke-width="1" opacity="0.4"/>
        <!-- Photo label -->
        <rect x="830" y="300" width="80" height="18" rx="9" fill="{PANEL}" stroke="{CYAN}" stroke-width="0.5" opacity="0.8"/>
        <text x="870" y="313" text-anchor="middle" font-family="{MONO}" font-size="8" fill="{CYAN}" letter-spacing="2">OPERATOR</text>
        """

    buildings = "M0,340 L0,290 25,290 25,260 45,260 45,230 60,230 60,265 75,265 75,235 95,235 95,205 110,205 110,245 125,245 125,195 150,195 150,265 165,265 165,215 180,215 180,175 195,175 195,225 215,225 215,185 235,185 235,255 255,255 255,205 275,205 275,165 295,165 295,215 310,215 310,245 335,245 335,195 355,195 355,235 375,235 375,175 395,175 395,225 415,225 415,255 435,255 435,205 455,205 455,165 475,165 475,215 495,215 495,185 515,185 515,245 535,245 535,205 555,205 555,235 575,235 575,195 595,195 595,255 615,255 615,215 635,215 635,175 655,175 655,225 675,225 675,265 695,265 695,205 715,205 715,245 735,245 735,215 755,215 755,260 1000,260 1000,400 0,400Z"

    # Window lights scattered on buildings
    windows = ""
    import random
    random.seed(42)  # deterministic
    for _ in range(40):
        wx = random.randint(10, 750)
        wy = random.randint(180, 330)
        wc = random.choice([CYAN, AMBER, WHITE])
        wo = random.uniform(0.2, 0.7)
        windows += f'<rect x="{wx}" y="{wy}" width="2" height="3" fill="{wc}" opacity="{wo:.1f}" rx="0.5"/>'

    svg = f"""<svg width="1000" height="400" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg">
<defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#020208"/>
        <stop offset="40%" stop-color="#060612"/>
        <stop offset="100%" stop-color="#0a0a1a"/>
    </linearGradient>
    <radialGradient id="heroG" cx="30%" cy="90%" r="50%">
        <stop offset="0%" stop-color="{CYAN}" stop-opacity="0.06"/>
        <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <radialGradient id="heroG2" cx="80%" cy="50%" r="40%">
        <stop offset="0%" stop-color="{VIOLET}" stop-opacity="0.04"/>
        <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <filter id="glow1"><feGaussianBlur stdDeviation="3"/></filter>
    <filter id="glow2"><feGaussianBlur stdDeviation="6"/></filter>
    <style>{SHARED_STYLES}
        .typing {{ animation: blink 0.8s step-end infinite; }}
    </style>
</defs>

<!-- Background layers -->
<rect width="1000" height="400" fill="url(#sky)"/>
<rect width="1000" height="400" fill="url(#heroG)"/>
<rect width="1000" height="400" fill="url(#heroG2)"/>

<!-- Stars -->
<circle cx="120" cy="30" r="1" fill="{WHITE}" opacity="0.3" class="pulse"/>
<circle cx="340" cy="15" r="0.8" fill="{WHITE}" opacity="0.4" class="pulse2"/>
<circle cx="560" cy="45" r="1.2" fill="{WHITE}" opacity="0.2" class="pulse"/>
<circle cx="780" cy="25" r="0.7" fill="{WHITE}" opacity="0.5" class="pulse2"/>
<circle cx="900" cy="50" r="1" fill="{WHITE}" opacity="0.3" class="pulse"/>
<circle cx="50" cy="60" r="0.6" fill="{CYAN}" opacity="0.3" class="pulse2"/>
<circle cx="450" cy="20" r="0.8" fill="{VIOLET}" opacity="0.3" class="pulse"/>

<!-- Perspective grid -->
<g opacity="0.06">
    <line x1="0" y1="360" x2="1000" y2="360" stroke="{CYAN}" stroke-width="0.5"/>
    <line x1="0" y1="375" x2="1000" y2="375" stroke="{CYAN}" stroke-width="0.5"/>
    <line x1="0" y1="387" x2="1000" y2="387" stroke="{CYAN}" stroke-width="0.3"/>
    <line x1="0" y1="395" x2="1000" y2="395" stroke="{CYAN}" stroke-width="0.3"/>
    <line x1="500" y1="340" x2="0" y2="400" stroke="{CYAN}" stroke-width="0.3"/>
    <line x1="500" y1="340" x2="1000" y2="400" stroke="{CYAN}" stroke-width="0.3"/>
    <line x1="500" y1="340" x2="200" y2="400" stroke="{CYAN}" stroke-width="0.2"/>
    <line x1="500" y1="340" x2="800" y2="400" stroke="{CYAN}" stroke-width="0.2"/>
</g>

<!-- City -->
<path d="{buildings}" fill="#080810" opacity="0.9"/>
<path d="{buildings}" fill="none" stroke="{CYAN}" stroke-width="0.3" opacity="0.15"/>
{windows}

<!-- HUD Frame -->
{hud_corners(1000, 400, 28, CYAN)}
{scanline_effect(1000, 400)}

<!-- Top HUD bar -->
<line x1="30" y1="18" x2="250" y2="18" stroke="{CYAN}" stroke-width="0.5" opacity="0.3"/>
<text x="35" y="14" font-family="{MONO}" font-size="8" fill="{CYAN}" opacity="0.5" letter-spacing="1.5">SYS.PROFILE.MAIN</text>
<line x1="750" y1="18" x2="970" y2="18" stroke="{CYAN}" stroke-width="0.5" opacity="0.3"/>
<text x="760" y="14" font-family="{MONO}" font-size="8" fill="{DIM}" opacity="0.5">UTC+05:30 // ACTIVE</text>
<circle cx="955" cy="12" r="3" fill="{GREEN}" opacity="0.7" class="pulse2"/>

<!-- Name block -->
<text x="55" y="115" font-family="{FONT}" font-size="13" font-weight="700" fill="{CYAN}" opacity="0.6" letter-spacing="4" class="slideIn">FULL STACK ENGINEER</text>
<text x="55" y="160" font-family="{FONT}" font-size="52" font-weight="800" fill="{WHITE}" letter-spacing="-2">Aditya Srivastava</text>

<!-- Typing terminal -->
<g transform="translate(55, 185)" class="fadeInUp">
    <rect width="380" height="55" rx="6" fill="{PANEL}" stroke="{BORDER}" stroke-width="0.5" opacity="0.9"/>
    <text x="14" y="20" font-family="{MONO}" font-size="11" fill="{GREEN}">$</text>
    <text x="28" y="20" font-family="{MONO}" font-size="11" fill="{WHITE}">building premium digital experiences<tspan fill="{CYAN}" class="typing">_</tspan></text>
    <text x="14" y="38" font-family="{MONO}" font-size="11" fill="{GREEN}">$</text>
    <text x="28" y="38" font-family="{MONO}" font-size="11" fill="{DIM}">obsessed with architecture and performance<tspan fill="{CYAN}" class="typing">_</tspan></text>
</g>

<!-- Contact bar -->
<g transform="translate(55, 260)">
    <rect width="350" height="32" rx="6" fill="{PANEL}" stroke="{BORDER}" stroke-width="0.5"/>
    <circle cx="16" cy="16" r="3" fill="{CYAN}" class="pulse2"/>
    <text x="28" y="20" font-family="{FONT}" font-size="11" fill="{DIM}">
        <tspan fill="{CYAN}">Portfolio</tspan>  //  <tspan fill="{CYAN}">LinkedIn</tspan>  //  <tspan fill="{CYAN}">Email</tspan>
    </text>
</g>

<!-- Status -->
<g transform="translate(55, 310)">
    <circle cx="5" cy="5" r="3.5" fill="{GREEN}" class="pulse"/>
    <text x="14" y="9" font-family="{MONO}" font-size="10" fill="{DIM}">AVAILABLE FOR OPPORTUNITIES</text>
</g>

<!-- Right side data readouts -->
<g transform="translate(760, 340)" opacity="0.5">
    <text font-family="{MONO}" font-size="8" fill="{DIM}">
        <tspan x="0" dy="0">LAT 26.8467</tspan>
        <tspan x="0" dy="12">LNG 80.9462</tspan>
        <tspan x="0" dy="12">NODE ACTIVE</tspan>
    </text>
</g>

<!-- Decorative HUD elements -->
<g transform="translate(460, 60)" class="float">
    <rect width="60" height="60" rx="4" fill="none" stroke="{CYAN}" stroke-width="0.5" opacity="0.15" transform="rotate(45 30 30)"/>
</g>
<g transform="translate(600, 90)" class="pulse">
    <circle cx="0" cy="0" r="2" fill="{VIOLET}" opacity="0.4"/>
    <circle cx="0" cy="0" r="8" fill="none" stroke="{VIOLET}" stroke-width="0.5" opacity="0.2"/>
</g>

{photo}
</svg>"""
    (OUT / "hero.svg").write_text(svg, encoding="utf-8")


# ═══════════════════════════════════════════════════════
#  ANIMATED DIVIDER
# ═══════════════════════════════════════════════════════
def build_divider():
    svg = f"""<svg width="1000" height="30" viewBox="0 0 1000 30" xmlns="http://www.w3.org/2000/svg">
<defs>
    <linearGradient id="dg" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="{BG}"/>
        <stop offset="15%" stop-color="{CYAN}"/>
        <stop offset="50%" stop-color="{VIOLET}"/>
        <stop offset="85%" stop-color="{CYAN}"/>
        <stop offset="100%" stop-color="{BG}"/>
    </linearGradient>
    <filter id="dglow"><feGaussianBlur stdDeviation="2"/></filter>
    <style>{SHARED_STYLES}</style>
</defs>
<line x1="0" y1="15" x2="1000" y2="15" stroke="url(#dg)" stroke-width="1" class="pulse" filter="url(#dglow)"/>
<line x1="0" y1="15" x2="1000" y2="15" stroke="url(#dg)" stroke-width="0.5" class="pulse"/>
<circle cx="500" cy="15" r="3" fill="{CYAN}" class="pulse2"/>
<circle cx="500" cy="15" r="6" fill="none" stroke="{CYAN}" stroke-width="0.5" opacity="0.3" class="pulse"/>
<!-- Side decorations -->
<rect x="200" y="13" width="20" height="4" rx="2" fill="{CYAN}" opacity="0.15" class="sweep"/>
<rect x="780" y="13" width="20" height="4" rx="2" fill="{CYAN}" opacity="0.15" class="sweep"/>
</svg>"""
    (OUT / "divider.svg").write_text(svg, encoding="utf-8")


# ═══════════════════════════════════════════════════════
#  COLUMN 1 PANELS
# ═══════════════════════════════════════════════════════
def panel_svg(w, h, title, accent, content_fn):
    content = content_fn(w, h)
    tlen = len(title) * 7 + 30
    return f"""<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}" xmlns="http://www.w3.org/2000/svg">
<defs>
    <filter id="pg"><feGaussianBlur stdDeviation="2"/></filter>
    <style>{SHARED_STYLES}</style>
</defs>
<rect width="{w}" height="{h}" rx="10" fill="{PANEL}"/>
<rect width="{w}" height="{h}" rx="10" fill="none" stroke="{BORDER}" stroke-width="1"/>
{hud_corners(w, h, 12, accent)}
{scanline_effect(w, h)}
<!-- Title -->
<rect x="14" y="8" width="{tlen}" height="20" rx="4" fill="{accent}" fill-opacity="0.1" stroke="{accent}" stroke-opacity="0.3" stroke-width="0.5"/>
<text x="24" y="22" font-family="{MONO}" font-size="9" font-weight="700" fill="{accent}" letter-spacing="1.5">{title}</text>
<!-- Status dot -->
<circle cx="{w-18}" cy="18" r="3" fill="{accent}" opacity="0.5" class="pulse2"/>
{content}
</svg>"""

def build_about():
    def c(w, h):
        return f"""
    <text x="20" y="52" font-family="{FONT}" font-size="13" fill="{WHITE}" font-weight="500">
        <tspan x="20" dy="0">Full-stack engineer obsessed with</tspan>
        <tspan x="20" dy="20">crafting performant systems and</tspan>
        <tspan x="20" dy="20">interfaces that feel alive.</tspan>
    </text>
    <line x1="20" y1="115" x2="{w-20}" y2="115" stroke="{BORDER}" stroke-width="0.5"/>
    <text x="20" y="132" font-family="{MONO}" font-size="10" fill="{DIM}">
        <tspan fill="{CYAN}">LOC</tspan> India // UTC+5:30
    </text>
    <text x="20" y="148" font-family="{MONO}" font-size="10" fill="{DIM}">
        <tspan fill="{CYAN}">MODE</tspan> Remote Collaboration
    </text>
    <text x="20" y="164" font-family="{MONO}" font-size="10" fill="{DIM}">
        <tspan fill="{GREEN}">STATUS</tspan> Open to Work
    </text>"""
    (OUT / "panel_about.svg").write_text(panel_svg(320, 185, "ABOUT ME", CYAN, c), encoding="utf-8")

def build_mission():
    def c(w, h):
        return f"""
    <g transform="translate(20, 48)">
        <circle cx="5" cy="5" r="4" fill="{GREEN}" class="pulse"/>
        <text x="16" y="9" font-family="{FONT}" font-size="12" fill="{WHITE}" font-weight="600">Production-grade Applications</text>
        <text x="16" y="28" font-family="{FONT}" font-size="12" fill="{WHITE}" font-weight="500">Real-time Systems &amp; APIs</text>
    </g>
    <line x1="20" y1="90" x2="{w-20}" y2="90" stroke="{BORDER}" stroke-width="0.5"/>
    <text x="20" y="110" font-family="{MONO}" font-size="9" fill="{DIM}" letter-spacing="0.5">
        <tspan fill="{GREEN}">FOCUS</tspan> Architecture // DX // Perf
    </text>
    <text x="20" y="128" font-family="{MONO}" font-size="9" fill="{DIM}">
        <tspan fill="{GREEN}">PRIO</tspan> Clean Code // Type Safety // Scale
    </text>"""
    (OUT / "panel_mission.svg").write_text(panel_svg(320, 148, "CURRENT MISSION", GREEN, c), encoding="utf-8")

def build_learning():
    def c(w, h):
        items = [("Rust", 70, AMBER), ("System Design", 85, VIOLET), ("DevOps/K8s", 60, CYAN), ("ML/AI", 40, GREEN)]
        bars = ""
        for i, (name, pct, col) in enumerate(items):
            y = 50 + i * 34
            bw = int((w - 60) * pct / 100)
            bars += f"""
        <text x="20" y="{y}" font-family="{FONT}" font-size="11" fill="{DIM}">{name} <tspan fill="{col}" font-family="{MONO}" font-size="9">{pct}%</tspan></text>
        <rect x="20" y="{y+5}" width="{w-40}" height="6" rx="3" fill="{BORDER}"/>
        <rect x="20" y="{y+5}" width="{bw}" height="6" rx="3" fill="{col}" class="glow">
            <animate attributeName="width" from="0" to="{bw}" dur="1.5s" fill="freeze"/>
        </rect>"""
        return bars
    (OUT / "panel_learning.svg").write_text(panel_svg(320, 200, "LEARNING", VIOLET, c), encoding="utf-8")


# ═══════════════════════════════════════════════════════
#  COLUMN 2 PANELS
# ═══════════════════════════════════════════════════════
def build_stack():
    def c(w, h):
        techs = [
            ("TypeScript","ts"), ("React","re"), ("Next.js","nx"), ("Node.js","nd"),
            ("Python","py"), ("Tailwind","tw"), ("Docker","dk"), ("PostgreSQL","pg"),
            ("Redis","rd"), ("Git","gt")
        ]
        items = ""
        for i, (name, _) in enumerate(techs):
            row, col = divmod(i, 2)
            x = 20 + col * 148
            y = 50 + row * 27
            items += f"""
        <rect x="{x}" y="{y-12}" width="{len(name)*7+20}" height="20" rx="4" fill="{CYAN}" fill-opacity="0.05" stroke="{CYAN}" stroke-opacity="0.15" stroke-width="0.5"/>
        <text x="{x+10}" y="{y+2}" font-family="{MONO}" font-size="11" fill="{WHITE}" font-weight="500">{name}</text>"""
        return items
    (OUT / "panel_stack.svg").write_text(panel_svg(320, 190, "TECH STACK", CYAN, c), encoding="utf-8")

def build_skills():
    def c(w, h):
        skills = [("Frontend", 94, CYAN), ("Backend", 87, VIOLET), ("DevOps", 72, AMBER), ("UI/UX", 80, GREEN), ("System Design", 75, RED)]
        bars = ""
        for i, (name, pct, col) in enumerate(skills):
            y = 50 + i * 30
            bw = int((w - 60) * pct / 100)
            bars += f"""
        <text x="20" y="{y}" font-family="{FONT}" font-size="11" fill="{DIM}">{name}</text>
        <text x="{w-25}" y="{y}" text-anchor="end" font-family="{MONO}" font-size="10" fill="{col}">{pct}%</text>
        <rect x="20" y="{y+5}" width="{w-40}" height="5" rx="2.5" fill="{BORDER}"/>
        <rect x="20" y="{y+5}" width="{bw}" height="5" rx="2.5" fill="{col}">
            <animate attributeName="width" from="0" to="{bw}" dur="1.2s" fill="freeze"/>
        </rect>"""
        return bars
    (OUT / "panel_skills.svg").write_text(panel_svg(320, 210, "SKILL MATRIX", CYAN, c), encoding="utf-8")

def build_architecture():
    def c(w, h):
        return f"""
    <text x="20" y="52" font-family="{MONO}" font-size="11" fill="{WHITE}">
        <tspan x="20" dy="0" fill="{CYAN}">//</tspan> Clean boundaries between layers</tspan>
        <tspan x="20" dy="18" fill="{CYAN}">//</tspan> Type-safety from DB to UI</tspan>
        <tspan x="20" dy="18" fill="{CYAN}">//</tspan> Ship fast, observe everything</tspan>
        <tspan x="20" dy="18" fill="{CYAN}">//</tspan> Automate the boring parts</tspan>
    </text>
    <line x1="20" y1="125" x2="{w-20}" y2="125" stroke="{BORDER}" stroke-width="0.5"/>
    <g transform="translate(20, 138)">
        <rect width="65" height="22" rx="4" fill="{CYAN}" fill-opacity="0.08" stroke="{CYAN}" stroke-opacity="0.25" stroke-width="0.5" class="glow"/>
        <text x="32" y="15" text-anchor="middle" font-family="{MONO}" font-size="8" fill="{CYAN}" font-weight="700">MONOREPO</text>
        <rect x="75" width="50" height="22" rx="4" fill="{VIOLET}" fill-opacity="0.08" stroke="{VIOLET}" stroke-opacity="0.25" stroke-width="0.5" class="glow"/>
        <text x="100" y="15" text-anchor="middle" font-family="{MONO}" font-size="8" fill="{VIOLET}" font-weight="700">CI/CD</text>
        <rect x="135" width="55" height="22" rx="4" fill="{GREEN}" fill-opacity="0.08" stroke="{GREEN}" stroke-opacity="0.25" stroke-width="0.5" class="glow"/>
        <text x="162" y="15" text-anchor="middle" font-family="{MONO}" font-size="8" fill="{GREEN}" font-weight="700">TESTED</text>
        <rect x="200" width="60" height="22" rx="4" fill="{AMBER}" fill-opacity="0.08" stroke="{AMBER}" stroke-opacity="0.25" stroke-width="0.5" class="glow"/>
        <text x="230" y="15" text-anchor="middle" font-family="{MONO}" font-size="8" fill="{AMBER}" font-weight="700">DOCKER</text>
    </g>"""
    (OUT / "panel_architecture.svg").write_text(panel_svg(320, 180, "ARCHITECTURE", AMBER, c), encoding="utf-8")


# ═══════════════════════════════════════════════════════
#  PROJECT CARDS
# ═══════════════════════════════════════════════════════
def build_project(filename, title, desc, tags, has_live=False):
    tag_items = ""
    x_off = 20
    for tag in tags:
        tw = len(tag) * 7 + 18
        tag_items += f"""
    <rect x="{x_off}" y="130" width="{tw}" height="20" rx="10" fill="{BORDER}" stroke="{CYAN}" stroke-opacity="0.15" stroke-width="0.5"/>
    <text x="{x_off + tw//2}" y="144" text-anchor="middle" font-family="{MONO}" font-size="9" fill="{DIM}">{tag}</text>"""
        x_off += tw + 5

    live = ""
    if has_live:
        live = f"""
    <rect x="400" y="130" width="55" height="20" rx="10" fill="{GREEN}" fill-opacity="0.12" stroke="{GREEN}" stroke-opacity="0.4" stroke-width="0.5" class="glow"/>
    <circle cx="414" cy="140" r="3" fill="{GREEN}" class="pulse2"/>
    <text x="432" y="144" font-family="{MONO}" font-size="9" fill="{GREEN}" font-weight="700">LIVE</text>"""

    # Abstract wireframe preview
    preview = f"""
    <rect x="20" y="42" width="{490-40}" height="75" rx="6" fill="{BG}" stroke="{BORDER}" stroke-width="0.5"/>
    <!-- Wireframe elements -->
    <rect x="30" y="52" width="100" height="8" rx="4" fill="{BORDER}" opacity="0.8"/>
    <rect x="30" y="66" width="200" height="5" rx="2.5" fill="{BORDER}" opacity="0.5"/>
    <rect x="30" y="76" width="170" height="5" rx="2.5" fill="{BORDER}" opacity="0.35"/>
    <rect x="30" y="86" width="140" height="5" rx="2.5" fill="{BORDER}" opacity="0.25"/>
    <rect x="30" y="96" width="80" height="5" rx="2.5" fill="{BORDER}" opacity="0.2"/>
    <!-- Decorative -->
    <rect x="380" y="52" width="60" height="55" rx="6" fill="{CYAN}" fill-opacity="0.03" stroke="{CYAN}" stroke-opacity="0.1" stroke-width="0.5"/>
    <text x="410" y="83" text-anchor="middle" font-family="{FONT}" font-size="20" fill="{CYAN}" opacity="0.15" class="float">&#x2B21;</text>
    <!-- Animated scan -->
    <rect x="20" y="42" width="{490-40}" height="2" fill="{CYAN}" opacity="0.06" class="scan"/>
    """

    # Multiline desc
    d1 = desc[:55]
    d2 = desc[55:]

    svg = f"""<svg width="490" height="220" viewBox="0 0 490 220" xmlns="http://www.w3.org/2000/svg">
<defs>
    <filter id="cg"><feGaussianBlur stdDeviation="2"/></filter>
    <style>{SHARED_STYLES}</style>
</defs>
<rect width="490" height="220" rx="10" fill="{PANEL}"/>
<rect width="490" height="220" rx="10" fill="none" stroke="{BORDER}" stroke-width="1"/>
{hud_corners(490, 220, 12, CYAN)}
{scanline_effect(490, 220)}
<!-- Title -->
<rect x="14" y="8" width="{len(title)*8+24}" height="20" rx="4" fill="{CYAN}" fill-opacity="0.1" stroke="{CYAN}" stroke-opacity="0.3" stroke-width="0.5"/>
<text x="26" y="22" font-family="{MONO}" font-size="10" font-weight="700" fill="{CYAN}" letter-spacing="1.5">{title}</text>
<circle cx="472" cy="18" r="3" fill="{CYAN}" opacity="0.4" class="pulse2"/>
{preview}
{tag_items}
{live}
<text x="20" y="175" font-family="{FONT}" font-size="11" fill="{DIM}">
    <tspan x="20" dy="0">{d1}</tspan>
    <tspan x="20" dy="16">{d2}</tspan>
</text>
</svg>"""
    (OUT / filename).write_text(svg, encoding="utf-8")


# ═══════════════════════════════════════════════════════
#  FOOTER
# ═══════════════════════════════════════════════════════
def build_footer():
    svg = f"""<svg width="1000" height="80" viewBox="0 0 1000 80" xmlns="http://www.w3.org/2000/svg">
<defs><style>{SHARED_STYLES}</style></defs>
<rect width="1000" height="80" fill="{BG}"/>
{hud_corners(1000, 80, 16, CYAN)}
<text x="500" y="32" text-anchor="middle" font-family="{FONT}" font-size="12" fill="{DIM}" font-style="italic" class="pulse">
    "Any sufficiently advanced technology is indistinguishable from magic." -- Arthur C. Clarke
</text>
<text x="500" y="55" text-anchor="middle" font-family="{MONO}" font-size="9" fill="{BORDER}" letter-spacing="1">
    DESIGNED WITH PRECISION // BUILT WITH OBSESSION // MAINTAINED FROM ASIA/KOLKATA
</text>
</svg>"""
    (OUT / "footer.svg").write_text(svg, encoding="utf-8")


# ═══════════════════════════════════════════════════════
#  RUN
# ═══════════════════════════════════════════════════════
if __name__ == "__main__":
    print(">> JARVIS HUD v2 -- Maximum Detail Build")
    build_hero();       print("  [ok] hero.svg")
    build_divider();    print("  [ok] divider.svg")
    build_about();      print("  [ok] panel_about.svg")
    build_mission();    print("  [ok] panel_mission.svg")
    build_learning();   print("  [ok] panel_learning.svg")
    build_stack();      print("  [ok] panel_stack.svg")
    build_skills();     print("  [ok] panel_skills.svg")
    build_architecture(); print("  [ok] panel_architecture.svg")
    build_project("project_trecab.svg", "TRECAB", "Full-stack ride-hailing platform with real-time tracking, WebSocket integrations, and clean API boundaries.", ["React", "Node.js", "WebSocket", "Maps"])
    build_project("project_dreamscape.svg", "DREAMSCAPE MAZE", "Immersive 3D web experience leveraging WebGL and Three.js. Built for max device compatibility.", ["Three.js", "WebGL", "GLSL"])
    build_project("project_skillsynergy.svg", "SKILLSYNERGY", "Collaborative platform matching users with AI-assisted learning paths at production scale.", ["React", "TypeScript", "API", "AI"])
    build_project("project_portfolio.svg", "PORTFOLIO V2", "High-performance portfolio with Next.js, fluid animations, glassmorphism, and premium design.", ["Next.js", "TypeScript", "Tailwind"], has_live=True)
    print("  [ok] project cards x4")
    build_footer();     print("  [ok] footer.svg")
    print(f"\n[DONE] All assets -> {OUT}/")
