module.exports = function timeline(theme, items, offsetY) {
  const { colors, fonts, layout } = theme;
  const { width, timelineHeight, gutter } = layout;
  const nodeColors = [colors.blue, colors.green, colors.gold, colors.line];
  const nodes = items.map((item, index) => {
    const x = 102 + index * 190;

    return `
      <g transform="translate(${x} 120)">
        <rect x="-10" y="-10" width="20" height="20" fill="${nodeColors[index]}"/>
        <circle r="4" fill="${colors.card}"/>
        <text x="0" y="42" fill="${colors.primary}" font-family="${fonts.display}" font-size="16" font-weight="650" text-anchor="middle">${item}</text>
      </g>`;
  }).join('');

  return `
    <g id="timeline" transform="translate(0 ${offsetY})">
      <path d="M0 0H${width}V${timelineHeight}H0Z" fill="${colors.card}"/>
      <path d="M${gutter} 0V${timelineHeight}H${width - gutter}V0" stroke="${colors.line}"/>
      <text x="60" y="48" fill="${colors.primary}" font-family="${fonts.display}" font-size="28" font-weight="750">最近在做</text>
      <path d="M92 120H768" stroke="${colors.border}" stroke-width="3" stroke-linecap="round"/>
      ${nodes}
    </g>`;
};
