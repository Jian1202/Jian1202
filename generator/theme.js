const presets = {
  'light-blue': {
    colors: {
      background: '#F7FBFF',
      card: '#EAF6FF',
      border: '#D6ECFF',
      primary: '#0B132B',
      text: '#345B7C',
      blue: '#5DA8E8',
      green: '#5FBF9F',
      gold: '#E0B84D',
    },
    fonts: {
      display: "Inter, 'Noto Sans SC', 'Microsoft YaHei', sans-serif",
      mono: "'SFMono-Regular', Consolas, 'Liberation Mono', monospace",
    },
  },
};

function getTheme(preset) {
  const theme = presets[preset];

  if (!theme) {
    throw new Error(`未知主题 preset：${preset}`);
  }

  return theme;
}

module.exports = { getTheme, presets };
