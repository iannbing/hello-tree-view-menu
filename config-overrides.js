// eslint-disable-next-line
const {
  override,
  useBabelRc,
  useEslintRc,
  addBundleVisualizer,
  addWebpackAlias
} = require('customize-cra'); // eslint-disable-line

module.exports = override(
  useBabelRc(),
  useEslintRc(),
  process.env.REACT_APP_BUNDLE_VISUALIZE === 'true' && addBundleVisualizer(),
  addWebpackAlias({ '@ant-design/icons': 'purched-antd-icons' }) // only include used Icons
);
