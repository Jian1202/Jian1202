module.exports = function skills(theme, groups, offsetY) {
  const { colors, fonts, layout } = theme;
  const { width, skillsHeight, gutter } = layout;
  const positions = [60, 318, 576];
  const maps = groups.map((group, index) => {
    const x = positions[index];
    const accent = colors[group.color];
    const items = group.items.map((item, itemIndex) => {
      const y = 110 + itemIndex * 30;

      return `
        <path d="M${x + 14} ${y - 6}H${x + 30}" stroke="${colors.line}"/>
        <circle cx="${x + 34}" cy="${y - 6}" r="3" fill="${accent}"/>
        <text x="${x + 48}" y="${y}" fill="${colors.text}" font-family="${fonts.mono}" font-size="13">${item}</text>`;
    }).join('');

    return `
      <g>
        <path d="M${x + 14} 78V${110 + (group.items.length - 1) * 30 - 6}" stroke="${colors.line}"/>
        <rect x="${x}" y="58" width="116" height="30" fill="${accent}"/>
        <text x="${x + 14}" y="79" fill="${colors.primary}" font-family="${fonts.mono}" font-size="14" font-weight="700">${group.name}</text>
        ${items}
      </g>`;
  }).join('');

  return `
    <g id="skills" transform="translate(0 ${offsetY})">
      <path d="M0 0H${width}V${skillsHeight}H0Z" fill="${colors.background}"/>
      <path d="M${gutter} 0V${skillsHeight}H${width - gutter}V0" stroke="${colors.line}"/>
      <text x="60" y="38" fill="${colors.primary}" font-family="${fonts.display}" font-size="28" font-weight="750">技术地图</text>
      <text x="60" y="218" fill="${colors.muted}" font-family="${fonts.mono}" font-size="12">things I keep coming back to</text>
      ${maps}
    </g>`;
};
