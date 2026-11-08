// Road sign drawings for the sign round. Simplified versions of standard U.S. (MUTCD) signs,
// drawn here so the app needs no image downloads and works offline.
// Signs whose words would give away the answer are drawn without words.

(function () {
  const K = "#151515";            // sign black
  const Y = "#FFC20E";            // warning yellow
  const R = "#C8102E";            // regulatory red
  const W = "#FFFFFF";
  const O = "#F26B21";            // construction orange
  const YG = "#C6D82F";           // school yellow-green
  const BL = "#1F4E9C";           // service blue
  const BR = "#6B4423";           // recreation brown

  const ln = (d, w = 12, c = K) =>
    `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const head = (pts, c = K) => `<polygon points="${pts}" fill="${c}"/>`;
  const diamond = (inner, fill = Y) =>
    `<polygon points="100,6 194,100 100,194 6,100" fill="${K}"/>` +
    `<polygon points="100,13 187,100 100,187 13,100" fill="${fill}"/>` +
    `<polygon points="100,19 181,100 100,181 19,100" fill="none" stroke="${K}" stroke-width="3"/>` + inner;
  const octagon = (r, fill, stroke, sw) => {
    const pts = [];
    for (let k = 0; k < 8; k++) {
      const a = (Math.PI / 8) + k * (Math.PI / 4);
      pts.push((100 + r * Math.cos(a)).toFixed(1) + "," + (100 + r * Math.sin(a)).toFixed(1));
    }
    return `<polygon points="${pts.join(" ")}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ""}/>`;
  };
  const txt = (x, y, s, t, c = W, w = 800) =>
    `<text x="${x}" y="${y}" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="middle" font-family="Overpass, Arial Narrow, Arial, sans-serif">${t}</text>`;
  const person = (x, y, s = 1, c = K) => {
    // simple walking figure, (x,y) = head center
    const p = (dx, dy) => `${x + dx * s},${y + dy * s}`;
    return `<circle cx="${x}" cy="${y}" r="${9 * s}" fill="${c}"/>` +
      ln(`M${p(0, 14)} L${p(2, 48)}`, 11 * s, c) +
      ln(`M${p(2, 48)} L${p(-14, 78)}`, 10 * s, c) +
      ln(`M${p(2, 48)} L${p(18, 76)}`, 10 * s, c) +
      ln(`M${p(-14, 34)} L${p(0, 22)} L${p(16, 38)}`, 9 * s, c);
  };
  const prohibit = (inner) =>
    `<rect x="8" y="8" width="184" height="184" rx="10" fill="${W}" stroke="${K}" stroke-width="5"/>` +
    inner +
    `<circle cx="100" cy="100" r="74" fill="none" stroke="${R}" stroke-width="13"/>` +
    ln("M48 48 L152 152", 13, R);

  const S = {
    stop: octagon(94, R) + octagon(86, "none", W, 5) + txt(100, 119, 54, "STOP"),

    yield: `<polygon points="8,20 192,20 100,180" fill="${R}"/>` +
      `<polygon points="44,40 156,40 100,137" fill="${W}"/>` +
      txt(100, 74, 24, "YIELD", R),

    doNotEnter: `<rect x="8" y="8" width="184" height="184" rx="8" fill="${W}" stroke="${K}" stroke-width="4"/>` +
      `<circle cx="100" cy="100" r="82" fill="${R}"/>` +
      `<rect x="34" y="88" width="132" height="24" fill="${W}"/>` +
      txt(100, 72, 25, "DO NOT") + txt(100, 148, 25, "ENTER"),

    wrongWay: `<rect x="6" y="40" width="188" height="120" rx="8" fill="${R}"/>` +
      `<rect x="14" y="48" width="172" height="104" rx="5" fill="none" stroke="${W}" stroke-width="4"/>` +
      txt(100, 95, 36, "WRONG") + txt(100, 138, 36, "WAY"),

    stopAhead: diamond(
      `<g transform="translate(100,72) scale(0.3) translate(-100,-100)">${octagon(94, R)}</g>` +
      ln("M100 160 L100 116", 13) + head("100,100 84,124 116,124")),

    signalAhead: diamond(
      `<rect x="82" y="46" width="36" height="108" rx="8" fill="${K}"/>` +
      `<circle cx="100" cy="70" r="12" fill="#E2231A"/>` +
      `<circle cx="100" cy="100" r="12" fill="#F7B500"/>` +
      `<circle cx="100" cy="130" r="12" fill="#1EA35A"/>`),

    merge: diamond(ln("M90 168 L90 44", 15) + head("90,32 74,58 106,58") + ln("M146 166 Q146 120 96 96", 12)),

    laneEnds: diamond(ln("M78 166 L78 38", 14) + ln("M128 166 L128 118 L88 74 L88 38", 14)),

    addedLane: diamond(ln("M80 168 L80 36", 14) + ln("M154 162 Q154 118 122 104 L122 36", 14)),

    dividedBegins: diamond(
      ln("M86 168 L86 120 Q86 104 66 92 L66 40", 12) +
      ln("M114 168 L114 120 Q114 104 134 92 L134 40", 12) +
      `<path d="M100 104 Q90 120 100 150 Q110 120 100 104 Z" fill="${K}"/>`),

    reverseTurn: diamond(ln("M74 162 L74 120 L124 120 L124 82 L84 82 L84 62", 13) + head("84,40 66,66 102,66")),

    slippery: diamond(
      `<rect x="72" y="56" width="56" height="40" rx="10" fill="${K}"/>` +
      `<rect x="80" y="62" width="40" height="14" rx="4" fill="${Y}"/>` +
      ln("M78 108 C68 122 92 132 80 148", 6) + ln("M122 108 C112 122 136 132 124 148", 6)),

    tIntersection: diamond(ln("M100 168 L100 90", 16) + ln("M44 90 L156 90", 16)),

    sideRoad: diamond(ln("M96 168 L96 34", 15) + ln("M96 102 L156 70", 14)),

    roundabout: diamond(
      `<circle cx="100" cy="102" r="36" fill="none" stroke="${K}" stroke-width="11"/>` +
      `<circle cx="100" cy="102" r="12" fill="${Y}"/>` +
      head("136,92 150,114 122,112") + head("72,60 66,86 50,66") + head("80,140 106,148 86,160")),

    slowMoving: `<polygon points="100,12 190,172 10,172" fill="${R}"/>` +
      `<polygon points="100,46 160,152 40,152" fill="${O}"/>`,

    railroadAdvance: `<circle cx="100" cy="100" r="94" fill="${K}"/><circle cx="100" cy="100" r="88" fill="${Y}"/>` +
      ln("M44 44 L156 156", 11) + ln("M156 44 L44 156", 11) +
      txt(58, 116, 36, "R", K) + txt(142, 116, 36, "R", K),

    crossbuck:
      `<g transform="rotate(40 100 100)"><rect x="4" y="80" width="192" height="40" rx="4" fill="${W}" stroke="${K}" stroke-width="5"/>${txt(100, 108, 22, "RAILROAD", K)}</g>` +
      `<g transform="rotate(-40 100 100)"><rect x="4" y="80" width="192" height="40" rx="4" fill="${W}" stroke="${K}" stroke-width="5"/>${txt(100, 108, 22, "CROSSING", K)}</g>`,

    noPassing: `<polygon points="8,38 194,100 8,162" fill="${K}"/>` +
      `<polygon points="15,48 172,100 15,152" fill="${Y}"/>`,

    school: `<polygon points="100,6 192,68 192,194 8,194 8,68" fill="${K}"/>` +
      `<polygon points="100,15 184,72 184,186 16,186 16,72" fill="${YG}"/>` +
      person(80, 78, 0.95) + person(124, 92, 0.8) +
      ln("M30 176 L170 176", 6),

    pedestrian: diamond(person(100, 52, 1.15)),

    noLeft: prohibit(ln("M118 160 L118 104 Q118 84 98 84 L80 84", 15) + head("54,84 82,64 82,104")),

    noUTurn: prohibit(ln("M80 158 L80 88 A26 26 0 0 1 132 88 L132 112", 14) + head("132,140 114,110 150,110")),

    keepRight: `<rect x="36" y="6" width="128" height="188" rx="10" fill="${W}" stroke="${K}" stroke-width="5"/>` +
      `<circle cx="84" cy="128" r="18" fill="${K}"/>` +
      ln("M78 40 Q78 74 124 98 L124 146", 12) + head("124,170 108,140 140,140"),

    softShoulder: diamond(
      ln("M70 40 L70 166", 6) +
      `<g transform="rotate(16 122 110)"><rect x="98" y="88" width="50" height="34" rx="8" fill="${K}"/>` +
      `<circle cx="108" cy="126" r="8" fill="${K}"/><circle cx="138" cy="126" r="8" fill="${K}"/></g>` +
      ln("M96 150 Q120 140 150 150", 5)),

    roadWork: diamond(
      person(90, 58, 1) +
      ln("M114 92 L142 140", 7) + `<path d="M134 136 L154 150 L146 156 Z" fill="${K}"/>` +
      `<path d="M120 164 Q140 134 164 164 Z" fill="${K}"/>`, O),

    blueService: `<rect x="10" y="10" width="180" height="180" rx="14" fill="${BL}"/>` +
      `<rect x="18" y="18" width="164" height="164" rx="10" fill="none" stroke="${W}" stroke-width="4"/>` +
      `<rect x="66" y="52" width="50" height="104" rx="6" fill="${W}"/>` +
      `<rect x="74" y="62" width="34" height="24" rx="3" fill="${BL}"/>` +
      ln("M116 74 L134 74 L134 126 Q134 136 142 132 L142 90", 7, W),

    brownRecreation: `<rect x="10" y="10" width="180" height="180" rx="14" fill="${BR}"/>` +
      `<rect x="18" y="18" width="164" height="164" rx="10" fill="none" stroke="${W}" stroke-width="4"/>` +
      `<polygon points="100,46 160,150 40,150" fill="${W}"/>` +
      `<polygon points="100,98 120,150 80,150" fill="${BR}"/>` +
      ln("M30 150 L170 150", 6, W)
  };

  window.signSVG = function (name) {
    const body = S[name];
    if (!body) return "";
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Road sign picture">${body}</svg>`;
  };
})();
