import { defineConfig, splitVendorChunkPlugin, loadEnv, UserConfig, ConfigEnv } from 'vite'

// TSConfig Paths is mostly for package Atomic Singularity, since it uses module paths
// which confuse Vite & SWC during the build
import tsconfigPaths from 'vite-tsconfig-paths'

// This is to generate types, since SWC does not do this
import dts from 'vite-plugin-dts';

// SWC for vite to actually handle the rendering
import swc from 'unplugin-swc'

export default defineConfig((config: ConfigEnv): UserConfig => {
  let plugins = [
    tsconfigPaths(),
    splitVendorChunkPlugin(),
    dts({
      rollupTypes: true,
    }),
    swc.vite({
      configFile: './config/.swcrc',
    }),
  ]

  return {
    plugins: plugins,
    build: {
      lib: {
        fileName: "atomic-singularity-tsyringe-wrapper",
        entry: "./src/index.ts",
        name: "AtomicSingularityTSyringeWrapper",
      },
      rollupOptions: {
        external: [
          /^@atomicdesign*/,
          /^node:*/
        ]
      }
    },

    clearScreen: true
  }
})