module.exports = function footer(theme, offsetY) {
  const { colors, fonts, layout } = theme;
  const { width, footerHeight, gutter } = layout;

  return `
    <g id="footer" transform="translate(0 ${offsetY})">
      <path d="M0 0H${width}V${footerHeight - 22}C${width} ${footerHeight - 9.85} ${width - 9.85} ${footerHeight} ${width - 22} ${footerHeight}H22C9.85 ${footerHeight} 0 ${footerHeight - 9.85} 0 ${footerHeight - 22}V0Z" fill="${colors.border}"/>
      <path d="M${gutter} 0H${width - gutter}V${footerHeight - 28}H${gutter}V0Z" fill="${colors.card}" stroke="${colors.line}"/>
      <text x="60" y="50" fill="${colors.primary}" font-family="${fonts.mono}" font-size="15" font-weight="700">Jian1202</text>
      <path d="M162 45H590" stroke="${colors.border}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="622" cy="45" r="6" fill="${colors.blue}"/>
      <circle cx="646" cy="45" r="6" fill="${colors.green}"/>
      <circle cx="670" cy="45" r="6" fill="${colors.gold}"/>
      <text x="800" y="50" fill="${colors.muted}" font-family="${fonts.mono}" font-size="12" text-anchor="end">github</text>
    </g>`;
};
