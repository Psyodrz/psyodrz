"""
Cyberpunk / Sci-Fi Single-Column HUD Engine v3.1 (100% XML Valid)
Self-Contained Local SVGs - Bulletproof Rendering - Verified with XML Parser
"""
import base64, html
import xml.etree.ElementTree as ET
from pathlib import Path

OUT = Path("assets/ui")
if OUT.exists():
    for f in OUT.glob("*.svg"):
        try:
            f.unlink()
        except Exception:
            pass
OUT.mkdir(parents=True, exist_ok=True)

# Cyberpunk Palette
BG        = "#05070c"
PANEL_BG  = "#0a0e17"
CYAN      = "#00f0ff"
VIOLET    = "#8a2be2"
AMBER     = "#ffb700"
GREEN     = "#00ff66"
WHITE     = "#f0f6fc"
DIM       = "#8b949e"
BORDER    = "#161f30"
BORDER_HI = "#00f0ff40"
FONT      = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
MONO      = "'JetBrains Mono', 'SF Mono', Consolas, 'ui-monospace', 'Liberation Mono', monospace"

STYLES = f"""
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;family=JetBrains+Mono:wght@500;600;700&amp;display=swap');

    .glow-cyan {{ filter: drop-shadow(0 0 4px {CYAN}60); }}
    .glow-violet {{ filter: drop-shadow(0 0 4px {VIOLET}60); }}
    .pulse {{ animation: pulse 3s ease-in-out infinite alternate; }}
    .pulse-fast {{ animation: pulse 1.5s ease-in-out infinite alternate; }}
    .blink {{ animation: blink 1s step-end infinite; }}
    .scanline {{ animation: scan 8s linear infinite; }}
    .float {{ animation: float 4s ease-in-out infinite; }}
    .rotate-slow {{ animation: rotate 20s linear infinite; }}
    @keyframes pulse {{ 0% {{ opacity: 0.3; }} 100% {{ opacity: 0.9; }} }}
    @keyframes blink {{ 50% {{ opacity: 0; }} }}
    @keyframes scan {{ 0% {{ transform: translateY(-100%); }} 100% {{ transform: translateY(100%); }} }}
    @keyframes float {{ 0%, 100% {{ transform: translateY(0); }} 50% {{ transform: translateY(-5px); }} }}
    @keyframes rotate {{ 0% {{ transform: rotate(0deg); }} 100% {{ transform: rotate(360deg); }} }}
"""

def hud_border(w, h, color=CYAN, corners=True):
    res = f'<rect width="{w}" height="{h}" rx="10" fill="{PANEL_BG}" stroke="{BORDER}" stroke-width="1"/>'
    res += f'<rect width="{w-2}" height="{h-2}" x="1" y="1" rx="9" fill="none" stroke="{BORDER_HI}" stroke-width="0.5"/>'
    if corners:
        sz = 14
        res += f'''
        <polyline points="{sz},2 2,2 2,{sz}" fill="none" stroke="{color}" stroke-width="1.5" class="glow-cyan"/>
        <polyline points="{w-sz},2 {w-2},2 {w-2},{sz}" fill="none" stroke="{color}" stroke-width="1.5" class="glow-cyan"/>
        <polyline points="2,{h-sz} 2,{h-2} {sz},{h-2}" fill="none" stroke="{color}" stroke-width="1.5" class="glow-cyan"/>
        <polyline points="{w-2},{h-sz} {w-2},{h-2} {w-sz},{h-2}" fill="none" stroke="{color}" stroke-width="1.5" class="glow-cyan"/>
        '''
    return res

def scan_overlay(w, h):
    return f'<rect width="{w}" height="4" fill="{CYAN}" opacity="0.04" class="scanline"/>'

# ══════════════════════════════════════════════════════════
#  1. HERO BANNER (1000x420)
# ══════════════════════════════════════════════════════════
def build_hero():
    photo_path = Path("assets/avatar-glow.png")
    photo_markup = ""
    if photo_path.exists():
        b64 = base64.b64encode(photo_path.read_bytes()).decode()
        photo_markup = f"""
        <g transform="translate(730, 70)">
            <clipPath id="avatarClip"><circle cx="110" cy="110" r="100"/></clipPath>
            <circle cx="110" cy="110" r="118" fill="none" stroke="{CYAN}" stroke-width="1" stroke-dasharray="6 6" opacity="0.4" class="rotate-slow" transform-origin="110 110"/>
            <circle cx="110" cy="110" r="110" fill="none" stroke="{CYAN}" stroke-width="2" opacity="0.8" class="pulse"/>
            <circle cx="110" cy="110" r="104" fill="none" stroke="{VIOLET}" stroke-width="1" opacity="0.5"/>
            <image href="data:image/png;base64,{b64}" x="10" y="10" width="200" height="200" clip-path="url(#avatarClip)" preserveAspectRatio="xMidYMid slice"/>
            <line x1="110" y1="-5" x2="110" y2="10" stroke="{CYAN}" stroke-width="1.5" opacity="0.6"/>
            <line x1="110" y1="210" x2="110" y2="225" stroke="{CYAN}" stroke-width="1.5" opacity="0.6"/>
            <line x1="-5" y1="110" x2="10" y2="110" stroke="{CYAN}" stroke-width="1.5" opacity="0.6"/>
            <line x1="210" y1="110" x2="225" y2="110" stroke="{CYAN}" stroke-width="1.5" opacity="0.6"/>
            <rect x="55" y="222" width="110" height="20" rx="4" fill="{PANEL_BG}" stroke="{CYAN}" stroke-width="0.8"/>
            <text x="110" y="235" text-anchor="middle" font-family="{MONO}" font-size="9" fill="{CYAN}" font-weight="700" letter-spacing="2">SYS.OPERATOR</text>
        </g>
        """

    svg = f"""<svg width="1000" height="420" viewBox="0 0 1000 420" xmlns="http://www.w3.org/2000/svg">
<defs><style>{STYLES}</style></defs>

{hud_border(1000, 420, CYAN)}
{scan_overlay(1000, 420)}

<g opacity="0.05">
    <path d="M0 60 H1000 M0 120 H1000 M0 180 H1000 M0 240 H1000 M0 300 H1000 M0 360 H1000" stroke="{CYAN}" stroke-width="1"/>
    <path d="M100 0 V420 M200 0 V420 M300 0 V420 M400 0 V420 M500 0 V420 M600 0 V420 M700 0 V420 M800 0 V420 M900 0 V420" stroke="{CYAN}" stroke-width="1"/>
</g>

<rect x="25" y="20" width="220" height="22" rx="4" fill="{CYAN}" fill-opacity="0.08" stroke="{CYAN}" stroke-opacity="0.3" stroke-width="0.5"/>
<text x="35" y="34" font-family="{MONO}" font-size="10" fill="{CYAN}" font-weight="700" letter-spacing="1.5">[SYS] COMMAND CENTER v3.0</text>

<text x="760" y="34" font-family="{MONO}" font-size="10" fill="{DIM}">LOC: INDIA [UTC+5:30]</text>
<circle cx="950" cy="30" r="4" fill="{GREEN}" class="pulse-fast"/>

<g transform="translate(45, 80)">
    <text x="0" y="35" font-family="{FONT}" font-size="54" font-weight="800" fill="{WHITE}" letter-spacing="-1.5">Aditya Srivastava</text>
    
    <g transform="translate(0, 50)">
        <rect x="0" y="0" width="230" height="26" rx="13" fill="{VIOLET}" fill-opacity="0.15" stroke="{VIOLET}" stroke-width="1"/>
        <text x="115" y="17" text-anchor="middle" font-family="{MONO}" font-size="11" font-weight="700" fill="{CYAN}" letter-spacing="1">FULL STACK ENGINEER</text>
        
        <rect x="240" y="0" width="210" height="26" rx="13" fill="{CYAN}" fill-opacity="0.1" stroke="{CYAN}" stroke-opacity="0.4" stroke-width="0.8"/>
        <text x="345" y="17" text-anchor="middle" font-family="{MONO}" font-size="11" font-weight="600" fill="{WHITE}" letter-spacing="0.5">SYSTEMS ARCHITECT</text>
    </g>

    <g transform="translate(0, 100)">
        <rect width="620" height="90" rx="8" fill="#030509" stroke="{BORDER}" stroke-width="1"/>
        <circle cx="16" cy="16" r="4" fill="#ff5f56"/>
        <circle cx="30" cy="16" r="4" fill="#ffbd2e"/>
        <circle cx="44" cy="16" r="4" fill="#27c93f"/>
        <text x="65" y="19" font-family="{MONO}" font-size="9" fill="{DIM}">bash - aditya@hud-main:~</text>
        
        <text x="16" y="45" font-family="{MONO}" font-size="12" fill="{GREEN}">$ <tspan fill="{WHITE}">init --role="Full-Stack Engineer" --focus="Performance &amp; Scalability"</tspan></text>
        <text x="16" y="68" font-family="{MONO}" font-size="12" fill="{CYAN}">&gt; <tspan fill="{DIM}">Architecting high-throughput applications with clean boundaries</tspan><tspan fill="{CYAN}" class="blink">_</tspan></text>
    </g>

    <g transform="translate(0, 210)">
        <rect width="180" height="30" rx="6" fill="{GREEN}" fill-opacity="0.1" stroke="{GREEN}" stroke-opacity="0.4" stroke-width="0.8"/>
        <circle cx="15" cy="15" r="4" fill="{GREEN}" class="pulse-fast"/>
        <text x="28" y="19" font-family="{MONO}" font-size="10" fill="{GREEN}" font-weight="700">STATUS: AVAILABLE</text>

        <rect x="195" width="220" height="30" rx="6" fill="{CYAN}" fill-opacity="0.08" stroke="{CYAN}" stroke-opacity="0.3" stroke-width="0.8"/>
        <text x="210" y="19" font-family="{MONO}" font-size="10" fill="{CYAN}">CORE: TS / PYTHON / REACT</text>
    </g>
</g>

{photo_markup}
</svg>"""
    (OUT / "01_hero.svg").write_text(svg, encoding="utf-8")


# ══════════════════════════════════════════════════════════
#  2. STATS & TELEMETRY DASHBOARD (1000x220)
# ══════════════════════════════════════════════════════════
def build_stats():
    svg = f"""<svg width="1000" height="220" viewBox="0 0 1000 220" xmlns="http://www.w3.org/2000/svg">
<defs><style>{STYLES}</style></defs>

{hud_border(1000, 220, VIOLET)}
{scan_overlay(1000, 220)}

<rect x="25" y="18" width="200" height="22" rx="4" fill="{VIOLET}" fill-opacity="0.15" stroke="{VIOLET}" stroke-opacity="0.4" stroke-width="0.5"/>
<text x="35" y="32" font-family="{MONO}" font-size="10" fill="{VIOLET}" font-weight="700" letter-spacing="1.5">[SYS] METRICS &amp; STATS</text>

<g transform="translate(25, 55)">
    <g transform="translate(0, 0)">
        <rect width="220" height="135" rx="8" fill="#030509" stroke="{BORDER}" stroke-width="1"/>
        <text x="20" y="30" font-family="{MONO}" font-size="11" fill="{DIM}">TOTAL CONTRIBUTIONS</text>
        <text x="20" y="75" font-family="{FONT}" font-size="38" font-weight="800" fill="{CYAN}">500+</text>
        <text x="20" y="105" font-family="{MONO}" font-size="10" fill="{GREEN}">Active Contributor</text>
    </g>

    <g transform="translate(243, 0)">
        <rect width="220" height="135" rx="8" fill="#030509" stroke="{BORDER}" stroke-width="1"/>
        <text x="20" y="30" font-family="{MONO}" font-size="11" fill="{DIM}">PUBLIC PROJECTS</text>
        <text x="20" y="75" font-family="{FONT}" font-size="38" font-weight="800" fill="{VIOLET}">25+</text>
        <text x="20" y="105" font-family="{MONO}" font-size="10" fill="{CYAN}">Open Source Core</text>
    </g>

    <g transform="translate(486, 0)">
        <rect width="220" height="135" rx="8" fill="#030509" stroke="{BORDER}" stroke-width="1"/>
        <text x="20" y="30" font-family="{MONO}" font-size="11" fill="{DIM}">SPECIALIZATION</text>
        <text x="20" y="70" font-family="{FONT}" font-size="22" font-weight="700" fill="{AMBER}">Full Stack</text>
        <text x="20" y="92" font-family="{FONT}" font-size="14" font-weight="600" fill="{WHITE}">System Design</text>
        <text x="20" y="112" font-family="{MONO}" font-size="10" fill="{DIM}">Clean Architecture</text>
    </g>

    <g transform="translate(730, 0)">
        <rect width="220" height="135" rx="8" fill="#030509" stroke="{BORDER}" stroke-width="1"/>
        <text x="20" y="30" font-family="{MONO}" font-size="11" fill="{DIM}">ENGINEERING BAR</text>
        <text x="20" y="75" font-family="{FONT}" font-size="38" font-weight="800" fill="{GREEN}">100%</text>
        <text x="20" y="105" font-family="{MONO}" font-size="10" fill="{GREEN}">Type Safe &amp; Tested</text>
    </g>
</g>
</svg>"""
    (OUT / "02_stats.svg").write_text(svg, encoding="utf-8")


# ══════════════════════════════════════════════════════════
#  3. TECH MATRIX & SKILLS (1000x300)
# ══════════════════════════════════════════════════════════
def build_tech():
    skills = [
        ("Frontend Engineering (React / Next.js / Tailwind)", 94, CYAN),
        ("Backend Development (Node.js / Express / Python)", 88, VIOLET),
        ("Database & Storage (PostgreSQL / Redis / MongoDB)", 82, AMBER),
        ("System Architecture & DevOps (Docker / CI/CD / Linux)", 78, GREEN)
    ]

    bars_markup = ""
    for i, (name, pct, col) in enumerate(skills):
        y = 55 + i * 48
        w_bar = int(420 * pct / 100)
        bars_markup += f"""
        <g transform="translate(0, {y})">
            <text x="0" y="0" font-family="{FONT}" font-size="12" font-weight="600" fill="{WHITE}">{html.escape(name)}</text>
            <text x="440" y="0" text-anchor="end" font-family="{MONO}" font-size="11" font-weight="700" fill="{col}">{pct}%</text>
            <rect x="0" y="10" width="440" height="8" rx="4" fill="{BORDER}"/>
            <rect x="0" y="10" width="{w_bar}" height="8" rx="4" fill="{col}">
                <animate attributeName="width" from="0" to="{w_bar}" dur="1.5s" fill="freeze"/>
            </rect>
        </g>"""

    tech_icons = {
        "TypeScript": f'<g transform="translate(8, 7)"><rect width="16" height="16" rx="3" fill="#3178c6"/><text x="8" y="12" font-family="{FONT}" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">TS</text></g>',
        "JavaScript": f'<g transform="translate(8, 7)"><rect width="16" height="16" rx="3" fill="#f7df1e"/><text x="8" y="12" font-family="{FONT}" font-size="9" font-weight="800" fill="#000000" text-anchor="middle">JS</text></g>',
        "React.js": f'<g transform="translate(8, 7) scale(0.67)"><ellipse cx="12" cy="12" rx="11" ry="4.5" fill="none" stroke="#61dafb" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="11" ry="4.5" fill="none" stroke="#61dafb" stroke-width="1.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4.5" fill="none" stroke="#61dafb" stroke-width="1.5" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="2.5" fill="#61dafb"/></g>',
        "Next.js": f'<g transform="translate(8, 7)"><circle cx="8" cy="8" r="8" fill="#000000" stroke="#ffffff" stroke-width="1"/><path d="M5 12 V4 L12 13.5 M11 4 V9" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g>',
        "Node.js": f'<g transform="translate(8, 7)"><polygon points="8,1 15,5 15,11 8,15 1,11 1,5" fill="#339933"/><text x="8" y="11.5" font-family="{FONT}" font-size="7" font-weight="800" fill="#ffffff" text-anchor="middle">N</text></g>',
        "Python": f'<g transform="translate(8, 7) scale(0.67)"><path d="M12 2 C7 2 7 4 7 4 L7 7 L12 7 L12 8 L5 8 C5 8 2 8 2 13 C2 18 4.5 18 4.5 18 L6 18 L6 16.5 C6 14 8 14 8 14 L12 14 C14.5 14 14.5 12 14.5 12 L14.5 9 C14.5 9 14.5 7 12.5 7 L11 7 L11 8.5 C11 10 9.5 10 9.5 10 L6 10 L6 4 C6 2 12 2 12 2 Z" fill="#3776ab"/><path d="M12 22 C17 22 17 20 17 20 L17 17 L12 17 L12 16 L19 16 C19 16 22 16 22 11 C22 6 19.5 6 19.5 6 L18 6 L18 7.5 C18 10 16 10 16 10 L12 10 C9.5 10 9.5 12 9.5 12 L9.5 15 C9.5 15 9.5 17 11.5 17 L13 17 L13 15.5 C13 14 14.5 14 14.5 14 L18 14 L18 20 C18 22 12 22 12 22 Z" fill="#ffd43b"/></g>',
        "TailwindCSS": f'<g transform="translate(8, 7) scale(0.67)"><path d="M6 6 C8 3 11 3 13 5 C11 7 10.5 8.5 12 10 C14 12 17.5 10 18.5 15 C16.5 18 13.5 18 11.5 16 C13.5 14 14 12.5 12.5 11 C10.5 9 7 11 6 6 Z" fill="#06b6d4"/><path d="M1 13 C3 10 6 10 8 12 C6 14 5.5 15.5 7 17 C9 19 12.5 17 13.5 22 C11.5 25 8.5 25 6.5 23 C8.5 21 9 19.5 7.5 18 C5.5 16 2 18 1 13 Z" fill="#06b6d4"/></g>',
        "PostgreSQL": f'<g transform="translate(8, 7)"><ellipse cx="8" cy="5" rx="7" ry="3" fill="#4169e1" opacity="0.9"/><path d="M1 5 V11 C1 13 15 13 15 11 V5" fill="none" stroke="#4169e1" stroke-width="1.5"/><path d="M1 8 C1 10 15 10 15 8" fill="none" stroke="#4169e1" stroke-width="1"/></g>',
        "Docker": f'<g transform="translate(8, 7)"><rect x="1" y="8" width="4" height="3" fill="#2496ed"/><rect x="6" y="8" width="4" height="3" fill="#2496ed"/><rect x="11" y="8" width="4" height="3" fill="#2496ed"/><rect x="6" y="4" width="4" height="3" fill="#2496ed"/><rect x="11" y="4" width="4" height="3" fill="#2496ed"/><path d="M0 12 C3 12 4 14 8 14 C12 14 14 12 16 12 C16 14 14 16 8 16 C3 16 0 14 0 12 Z" fill="#2496ed"/></g>',
        "Git / GitHub": f'<g transform="translate(8, 7)"><rect x="2" y="2" width="12" height="12" rx="2" fill="#f05032" transform="rotate(45 8 8)"/><circle cx="8" cy="5" r="1.5" fill="#ffffff"/><circle cx="5" cy="11" r="1.5" fill="#ffffff"/><circle cx="11" cy="11" r="1.5" fill="#ffffff"/><line x1="8" y1="5" x2="8" y2="11" stroke="#ffffff" stroke-width="1"/><line x1="8" y1="8" x2="11" y2="11" stroke="#ffffff" stroke-width="1"/></g>',
        "REST APIs": f'<g transform="translate(8, 7)"><rect x="1" y="2" width="14" height="12" rx="3" fill="none" stroke="#00f0ff" stroke-width="1.2"/><text x="8" y="11" font-family="{MONO}" font-size="7" font-weight="800" fill="#00f0ff" text-anchor="middle">API</text></g>',
        "WebSockets": f'<g transform="translate(8, 7)"><polygon points="9,1 2,9 7,9 5,15 14,7 9,7" fill="#8a2be2"/></g>'
    }

    badge_markup = ""
    for i, (t, icon_svg) in enumerate(tech_icons.items()):
        row, col = divmod(i, 2)
        bx = col * 220
        by = row * 38
        badge_markup += f"""
        <g transform="translate({bx}, {by})">
            <rect width="205" height="30" rx="6" fill="#030509" stroke="{BORDER}" stroke-width="1"/>
            {icon_svg}
            <text x="32" y="19" font-family="{FONT}" font-size="11" font-weight="500" fill="{WHITE}">{html.escape(t)}</text>
        </g>"""

    svg = f"""<svg width="1000" height="300" viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg">
<defs><style>{STYLES}</style></defs>

{hud_border(1000, 300, CYAN)}
{scan_overlay(1000, 300)}

<rect x="25" y="18" width="220" height="22" rx="4" fill="{CYAN}" fill-opacity="0.1" stroke="{CYAN}" stroke-opacity="0.4" stroke-width="0.5"/>
<text x="35" y="32" font-family="{MONO}" font-size="10" fill="{CYAN}" font-weight="700" letter-spacing="1.5">[SYS] TECH MATRIX &amp; SKILLS</text>

<g transform="translate(25, 25)">
    {bars_markup}
</g>

<line x1="500" y1="50" x2="500" y2="260" stroke="{BORDER}" stroke-width="1" stroke-dasharray="4 4"/>

<g transform="translate(535, 60)">
    {badge_markup}
</g>
</svg>"""
    (OUT / "03_tech.svg").write_text(svg, encoding="utf-8")


# ══════════════════════════════════════════════════════════
#  4. FEATURED PROJECTS (1000x210 Each)
# ══════════════════════════════════════════════════════════
def build_project_panel(filename, index_num, title, tagline, desc, tags, live_url=None):
    tag_markup = ""
    tx = 0
    for tag in tags:
        tw = len(tag) * 8 + 20
        tag_markup += f"""
        <rect x="{tx}" y="0" width="{tw}" height="24" rx="12" fill="{BORDER}" stroke="{CYAN}" stroke-opacity="0.2" stroke-width="0.5"/>
        <text x="{tx + tw//2}" y="16" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{CYAN}">{html.escape(tag)}</text>"""
        tx += tw + 8

    live_btn = ""
    if live_url:
        live_btn = f"""
        <g transform="translate(790, 150)">
            <rect width="140" height="32" rx="6" fill="{GREEN}" fill-opacity="0.15" stroke="{GREEN}" stroke-width="1" class="pulse-fast"/>
            <text x="70" y="20" text-anchor="middle" font-family="{MONO}" font-size="11" font-weight="700" fill="{GREEN}">LIVE DEMO</text>
        </g>"""

    svg = f"""<svg width="1000" height="210" viewBox="0 0 1000 210" xmlns="http://www.w3.org/2000/svg">
<defs><style>{STYLES}</style></defs>

{hud_border(1000, 210, CYAN)}
{scan_overlay(1000, 210)}

<g transform="translate(25, 25)">
    <rect width="220" height="160" rx="8" fill="#030509" stroke="{BORDER}" stroke-width="1"/>
    <rect width="220" height="24" rx="8" fill="{BORDER}" opacity="0.6"/>
    <circle cx="15" cy="12" r="3" fill="#ff5f56"/>
    <circle cx="27" cy="12" r="3" fill="#ffbd2e"/>
    <circle cx="39" cy="12" r="3" fill="#27c93f"/>
    
    <rect x="15" y="40" width="120" height="10" rx="5" fill="{CYAN}" opacity="0.4"/>
    <rect x="15" y="60" width="190" height="6" rx="3" fill="{DIM}" opacity="0.3"/>
    <rect x="15" y="74" width="160" height="6" rx="3" fill="{DIM}" opacity="0.2"/>
    <rect x="15" y="88" width="140" height="6" rx="3" fill="{DIM}" opacity="0.2"/>
    
    <rect x="15" y="110" width="80" height="30" rx="4" fill="{VIOLET}" opacity="0.3"/>
    <rect x="105" y="110" width="100" height="30" rx="4" fill="{CYAN}" opacity="0.2"/>
</g>

<g transform="translate(275, 30)">
    <text x="0" y="0" font-family="{MONO}" font-size="10" fill="{DIM}">PROJECT 0{index_num} // FEATURED BUILD</text>
    <text x="0" y="32" font-family="{FONT}" font-size="28" font-weight="800" fill="{WHITE}">{html.escape(title)}</text>
    <text x="0" y="52" font-family="{FONT}" font-size="13" font-weight="600" fill="{CYAN}">{html.escape(tagline)}</text>

    <text x="0" y="82" font-family="{FONT}" font-size="13" fill="{DIM}" width="650">
        <tspan x="0" dy="0">{html.escape(desc[:75])}</tspan>
        <tspan x="0" dy="20">{html.escape(desc[75:])}</tspan>
    </text>

    <g transform="translate(0, 125)">
        {tag_markup}
    </g>
</g>

{live_btn}
</svg>"""
    (OUT / filename).write_text(svg, encoding="utf-8")


# ══════════════════════════════════════════════════════════
#  5. FOOTER (1000x120)
# ══════════════════════════════════════════════════════════
def build_footer():
    svg = f"""<svg width="1000" height="120" viewBox="0 0 1000 120" xmlns="http://www.w3.org/2000/svg">
<defs><style>{STYLES}</style></defs>

{hud_border(1000, 120, CYAN)}
{scan_overlay(1000, 120)}

<text x="500" y="45" text-anchor="middle" font-family="{FONT}" font-size="14" fill="{WHITE}" font-style="italic" class="pulse">
    "Any sufficiently advanced technology is indistinguishable from magic." — Arthur C. Clarke
</text>

<line x1="100" y1="65" x2="900" y2="65" stroke="{BORDER}" stroke-width="1"/>

<text x="500" y="88" text-anchor="middle" font-family="{MONO}" font-size="10" fill="{DIM}" letter-spacing="1">
    DESIGNED &amp; ENGINEERED BY ADITYA SRIVASTAVA // BUILT WITH PRECISION &amp; OBSESSION
</text>
</svg>"""
    (OUT / "05_footer.svg").write_text(svg, encoding="utf-8")


if __name__ == "__main__":
    print(">> Generating Cyberpunk Single-Column HUD Engine v3.1...")
    build_hero(); print("  [OK] 01_hero.svg")
    build_stats(); print("  [OK] 02_stats.svg")
    build_tech(); print("  [OK] 03_tech.svg")
    
    build_project_panel("04_project_trecab.svg", 1, "TreCab", "Full-Stack Ride-Hailing Platform", "Real-time tracking, WebSocket integrations, and clean API boundaries. Built for high performance.", ["React", "Node.js", "WebSocket", "Maps API"])
    build_project_panel("04_project_dreamscape.svg", 2, "Dreamscape Maze", "Immersive 3D WebGL Experience", "Interactive 3D maze environment leveraging WebGL & Three.js. Optimized for cross-device fluidity.", ["Three.js", "WebGL", "GLSL", "JavaScript"])
    build_project_panel("04_project_skillsynergy.svg", 3, "SkillSynergy", "AI-Assisted Learning Platform", "Collaborative system matching developers with personalized AI learning paths at scale.", ["React", "TypeScript", "REST API", "AI"])
    build_project_panel("04_project_portfolio.svg", 4, "Portfolio V2", "High-Performance Portfolio Site", "Personal web portfolio featuring modern glassmorphism, responsive design, and smooth animations.", ["Next.js", "TypeScript", "TailwindCSS"], "https://psyodrz.github.io/PortfolioV2/")
    print("  [OK] 04_projects (4x)")
    
    build_footer(); print("  [OK] 05_footer.svg")

    # XML Validation Check
    print("\n>> Running XML Validation on all output SVGs...")
    all_valid = True
    for svg_file in OUT.glob("*.svg"):
        try:
            ET.parse(svg_file)
            print(f"  [OK] {svg_file.name}: 100% VALID XML")
        except Exception as e:
            print(f"  [FAIL] {svg_file.name}: INVALID XML -> {e}")
            all_valid = False

    if all_valid:
        print("\n[SUCCESS] ALL SVGs pass 100% XML Validation!")
    else:
        raise RuntimeError("XML Validation failed for some SVGs!")

