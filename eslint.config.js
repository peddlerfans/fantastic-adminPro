import antfu from "@antfu/eslint-config";
import vueI18n from "@intlify/eslint-plugin-vue-i18n";

export default antfu(
  {
    unocss: true,
    ignores: ["public", "dist*", "src/ui/shadcn/ui"],
  },

  // 基础规则
  {
    rules: {
      "eslint-comments/no-unlimited-disable": "off",
      curly: ["off", "all"],
      "ts/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      // 尝试使用不同的可能前缀 (@stylistic/, style/, eslintstyle/) 以及无前缀的标准名
      'space-before-blocks': 'off', // 标准名
      '@stylistic/space-before-blocks': 'off', // @stylistic 插件的标准前缀
      'style/space-before-blocks': 'off', // 基于你的内联注释
      'eslintstyle/space-before-blocks': 'off', // 基于错误信息
      // 关闭 antfu/if-newline 规则 (直接来自 @antfu 配置)
      'antfu/if-newline': 'off',
      // 关闭 no-trailing-spaces 规则
      'no-trailing-spaces': 'off',
      '@stylistic/no-trailing-spaces': 'off',
      'style/no-trailing-spaces': 'off',
      'eslintstyle/no-trailing-spaces': 'off',
      // 关闭 no-multiple-empty-lines 规则
      'no-multiple-empty-lines': 'off',
      '@stylistic/no-multiple-empty-lines': 'off',
      'style/no-multiple-empty-lines': 'off',
      'eslintstyle/no-multiple-empty-lines': 'off',
      // 关闭 no-unused-vars 规则
      'no-unused-vars': 'off',
      '@stylistic/no-unused-vars': 'off',
      'style/no-unused-vars': 'off',
      'eslintstyle/no-unused-vars': 'off',
      // 关闭 quotes 规则
      'quotes': 'off',
      '@stylistic/quotes': 'off',
      'style/quotes': 'off',
      'eslintstyle/quotes': 'off',
      // 关闭 no-unused-expressions 规则
      'no-unused-expressions': 'off',
      '@stylistic/no-unused-expressions': 'off',
      // 关闭 comma-dangle 规则
      'comma-dangle': 'off',
      '@stylistic/comma-dangle': 'off',
      'style/comma-dangle': 'off',
      'eslintstyle/comma-dangle': 'off',
    },
  },
  {
    files: ["src/**/*.vue"],
    rules: {
      "vue/block-order": [
        "error",
        {
          order: ["route", "i18n", "script", "template", "style"],
        },
      ],
    },
  },
  ...vueI18n.configs["flat/recommended"],
  {
    rules: {
      "@intlify/vue-i18n/no-raw-text": "off",
    },
    settings: {
      "vue-i18n": {
        localeDir: "./src/locales/lang/*.{json,json5,yaml,yml}",
        messageSyntaxVersion: "^10.0.0",
      },
    },
  }
)
