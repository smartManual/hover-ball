import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import copy from 'rollup-plugin-copy'

export default [
  {
    input: './src/index.ts',
    output: [
      // ES module
      {
        file: 'dist/hoverball.esm.js',
        format: 'esm',
      },
      // CommonJS module (Node.js)
      {
        file: 'dist/hoverball.cjs.js',
        format: 'cjs',
      },
      // UMD (browser script tag)
      {
        name: 'HoverBall',
        file: 'dist/hoverball.min.js',
        format: 'umd',
        exports: 'default',
        // plugins: [terser()]
      }
    ],
    plugins: [
      copy({
        targets: [
          { src: ['src/font/*.ttf', 'src/font/*.woff', 'src/font/*.woff2'], dest: 'dist/css' } // 复制字体到输出目录
        ]
      }),
      postcss({
        // 抽离为独立文件
        extract: 'css/index.css', 
        // 禁用 CSS Modules
        modules: false,
        // 使用 Less 处理器
        use: ['less'], 
        plugins: [
          autoprefixer(),
          cssnano()
        ],
      }),
      // 解析 node_modules 中的模块
      resolve(), 
      // 转换 CJS 模块
      commonjs(), 
      typescript({
        tsconfig: './tsconfig.json',
        // 生成 .d.ts 文件
        declaration: false,
        declarationDir: 'dist'
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      // 代码压缩
      terser()
    ]
  },
  // 专门用于生成 .d.ts 的配置
  {
    input: 'src/interface/index.ts',
    output: [{ file: 'dist/types/index.d.ts', format: 'esm' }],
    plugins: [dts()]
  }
]