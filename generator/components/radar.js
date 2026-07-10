module.exports = function radar(theme, data, offsetY) {
  const { colors, fonts, layout } = theme;
  const { width, radarHeight, gutter } = layout;
  const centerX = 640;
  const centerY = 156;
  const metrics = [
    { value: data.contributions, label: '今年 contributions', color: colors.blue },
    { value: data.repositories, label: '公开仓库', color: colors.green },
    { value: data.stars, label: '收下的星星', color: colors.gold },
  ];
  const languageBars = data.languages.map((language, index) => {
    const x = 58 + index * 190;
    const fill = colors[language.color];

    return `
      <g transform="translate(${x} 288)">
        <text x="0" y="0" fill="${colors.text}" font-family="${fonts.mono}" font-size="12">${language.name}</text>
        <text x="145" y="0" fill="${colors.muted}" font-family="${fonts.mono}" font-size="12" text-anchor="end">${language.percent}%</text>
        <path d="M0 14H145" stroke="${colors.border}" stroke-width="6" stroke-linecap="round"/>
        <path d="M0 14H${Math.round(145 * language.percent / 100)}" stroke="${fill}" stroke-width="6" stroke-linecap="round"/>
      </g>`;
  }).join('');
  const metricRows = metrics.map((metric, index) => {
    const y = 104 + index * 48;

    return `
      <g transform="translate(60 ${y})">
        <circle cx="5" cy="-5" r="5" fill="${metric.color}"/>
        <text x="24" y="2" fill="${colors.primary}" font-family="${fonts.mono}" font-size="20" font-weight="700">${metric.value}</text>
        <text x="72" y="1" fill="${colors.text}" font-family="${fonts.display}" font-size="15">${metric.label}</text>
      </g>`;
  }).join('');

  return `
    <g id="radar" transform="translate(0 ${offsetY})">
      <path d="M0 0H${width}V${radarHeight}H0Z" fill="${colors.background}"/>
      <path d="M${gutter} 0V${radarHeight}H${width - gutter}V0" stroke="${colors.line}"/>
      <text x="60" y="48" fill="${colors.primary}" font-family="${fonts.display}" font-size="28" font-weight="750">小窝雷达</text>
      <text x="60" y="74" fill="${colors.muted}" font-family="${fonts.mono}" font-size="12">从 GitHub 捞到的几条小信号</text>
      ${metricRows}
      <path d="M60 234H390" stroke="${colors.border}"/>
      <text x="60" y="264" fill="${colors.text}" font-family="${fonts.display}" font-size="14">常出现的语言</text>
      ${languageBars}
      <g transform="translate(${centerX} ${centerY})">
        <circle r="112" stroke="${colors.border}" stroke-width="1.5"/>
        <circle r="74" stroke="${colors.line}" stroke-width="1.5" stroke-dasharray="4 7"/>
        <circle r="37" stroke="${colors.line}" stroke-width="1.5"/>
        <path d="M-126 0H126M0 -126V126" stroke="${colors.border}"/>
        <path d="M0 0L92 -58A109 109 0 0 1 110 6Z" fill="${colors.blue}" opacity="0.16"/>
        <path d="M0 0L92 -58" stroke="${colors.blue}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="-56" cy="34" r="6" fill="${colors.green}"/>
        <circle cx="38" cy="-45" r="5" fill="${colors.gold}"/>
        <circle cx="78" cy="50" r="4" fill="${colors.blue}"/>
        <circle r="8" fill="${colors.primary}"/>
        <circle r="3" fill="${colors.card}"/>
      </g>
      <text x="640" y="302" fill="${colors.muted}" font-family="${fonts.mono}" font-size="12" text-anchor="middle">慢慢把地图补全</text>
    </g>`;
};
