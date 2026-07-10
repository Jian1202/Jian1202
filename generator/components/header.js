module.exports = function header(theme) {
  const { colors, fonts, layout } = theme;
  const { width, headerHeight, gutter } = layout;
  const innerWidth = width - gutter * 2;

  return `
    <g id="header">
      <path d="M22 0H838C850.15 0 860 9.85 860 22V${headerHeight}H0V22C0 9.85 9.85 0 22 0Z" fill="${colors.border}"/>
      <path d="M${gutter} 30H${width - gutter}V176H${gutter}V30Z" fill="${colors.card}" stroke="${colors.line}"/>
      <circle cx="64" cy="58" r="5" fill="${colors.gold}"/>
      <circle cx="86" cy="58" r="5" fill="${colors.green}"/>
      <circle cx="108" cy="58" r="5" fill="${colors.blue}"/>
      <path d="M48 84H812" stroke="${colors.line}"/>
      <text x="60" y="126" fill="${colors.primary}" font-family="${fonts.display}" font-size="50" font-weight="750">渡的小窝</text>
      <text x="60" y="158" fill="${colors.text}" font-family="${fonts.display}" font-size="18" font-weight="500">哈喽，这里是渡的小窝哦</text>
      <path d="M600 106H784V152H600V106Z" fill="${colors.border}" stroke="${colors.line}"/>
      <rect x="618" y="122" width="44" height="8" rx="4" fill="${colors.blue}"/>
      <rect x="672" y="122" width="28" height="8" rx="4" fill="${colors.gold}"/>
      <rect x="710" y="122" width="54" height="8" rx="4" fill="${colors.green}"/>
      <path d="M618 140H696M706 140H764" stroke="${colors.line}" stroke-width="8" stroke-linecap="round"/>
      <text x="60" y="198" fill="${colors.muted}" font-family="${fonts.mono}" font-size="13">AI / agent / frontend / notes</text>
      <path d="M${gutter} ${headerHeight - 1}H${gutter + innerWidth}" stroke="${colors.line}"/>
    </g>`;
};
