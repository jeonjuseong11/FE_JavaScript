module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current", // 또는 원하는 타겟 환경 설정
        },
      },
    ],
  ],
  plugins: ["@babel/plugin-transform-unicode-sets-regex"],
};
