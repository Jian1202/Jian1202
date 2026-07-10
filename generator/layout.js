const sectionHeights = {
  header: 210,
  mission: 220,
  timeline: 190,
  radar: 300,
  skills: 260,
  projects: 250,
  footer: 86,
};

let offsetY = 0;
const sections = Object.fromEntries(Object.entries(sectionHeights).map(([name, height]) => {
  const section = { height, offsetY };
  offsetY += height;
  return [name, section];
}));

module.exports = {
  canvas: {
    width: 860,
    gutter: 28,
    radius: 22,
  },
  sections,
  totalHeight: offsetY,
};
