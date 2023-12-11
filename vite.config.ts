import { defineConfig } from 'vite'
import tsconfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react'
import path from 'path'

const aliases = ['components', 'utils', 'hooks', 'configs'];
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      ...aliases.map((item) => ({
        find: `@${item}`,
        replacement: path.resolve(__dirname, `./src/${item}`),
      })),
    },
  },
  
})
