const { circle, group, line, path, rect, text } = require('../utils/svg');

module.exports = function footer(theme, _data, offsetY) {
  const { colors, fonts, layout } = theme;
  const { width, gutter, radius, sections } = layout;
  const height = sections.footer;

  return group([
    path({
      d: `M0 0H${width}V${height - radius}Q${width} ${height} ${width - radius} ${height}H${radius}Q0 ${height} 0 ${height - radius}Z`,
      fill: colors.border,
    }),
    rect({ x: gutter, y: 0, width: width - gutter * 2, height: height - 28, fill: colors.card, stroke: colors.border }),
    text('Jian1202', { x: 60, y: 40, fill: colors.primary, 'font-family': fonts.mono, 'font-size': 14, 'font-weight': 700 }),
    line({ x1: 154, y1: 36, x2: 560, y2: 36, stroke: colors.border, 'stroke-width': 2, 'stroke-linecap': 'round' }),
    circle({ cx: 590, cy: 36, r: 5, fill: colors.blue }),
    circle({ cx: 612, cy: 36, r: 5, fill: colors.green }),
    circle({ cx: 634, cy: 36, r: 5, fill: colors.gold }),
    text('Curiosity, the power to change.', { x: 800, y: 40, fill: colors.text, opacity: 0.75, 'font-family': fonts.mono, 'font-size': 11, 'text-anchor': 'end' }),
  ], { id: 'footer', transform: `translate(0 ${offsetY})` });
};
