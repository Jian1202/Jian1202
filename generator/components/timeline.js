const { circle, group, line, rect, text } = require('../utils/svg');

module.exports = function timeline(data, theme, offsetY) {
  const { colors, fonts, layout } = theme;
  const { width, gutter, sections } = layout;
  const height = sections.timeline;
  const positions = [150, 430, 710];
  const stops = data.entries.map((entry, index) => {
    const x = positions[index];
    const accent = colors[entry.color];

    return group([
      rect({ x: x - 26, y: 88, width: 52, height: 22, rx: 11, fill: colors.background, stroke: colors.border }),
      text(entry.year, { x, y: 103, fill: colors.text, 'font-family': fonts.mono, 'font-size': 11, 'text-anchor': 'middle' }),
      circle({ cx: x, cy: 132, r: 9, fill: accent }),
      circle({ cx: x, cy: 132, r: 3, fill: colors.card }),
      text(entry.focus, { x, y: 164, fill: colors.primary, 'font-family': fonts.display, 'font-size': 16, 'font-weight': 700, 'text-anchor': 'middle' }),
    ]);
  });

  return group([
    rect({ width, height, fill: colors.background }),
    line({ x1: gutter, y1: 0, x2: gutter, y2: height, stroke: colors.border }),
    line({ x1: width - gutter, y1: 0, x2: width - gutter, y2: height, stroke: colors.border }),
    text(data.title, { x: 60, y: 46, fill: colors.primary, 'font-family': fonts.display, 'font-size': 28, 'font-weight': 750 }),
    text(data.eyebrow, { x: 800, y: 44, fill: colors.text, opacity: 0.62, 'font-family': fonts.mono, 'font-size': 11, 'text-anchor': 'end' }),
    line({ x1: 150, y1: 132, x2: 710, y2: 132, stroke: colors.border, 'stroke-width': 3, 'stroke-linecap': 'round' }),
    stops,
  ], { id: 'timeline', transform: `translate(0 ${offsetY})` });
};
