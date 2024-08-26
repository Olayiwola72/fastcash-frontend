import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  // Access the port from the loaded environment variables
  const port : number = process.env && process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 3000; // Fallback to 3000 if VITE_PORT is not defined
  
  return {
    plugins: [
      react(), // Adds React support
      visualizer({ 
        open: false,    // Do not automatically open the visualization file
      })
    ],
    server: {
      port: port, // Use the dynamic port
      open: true, // Open browser on startup 
      strictPort: true, // Exit if specified port is already in use
      host: true
    },
    build: {
      outDir: '../resources/static/', // Compile for Spring Boot Backend Integration
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
      chunkSizeWarningLimit: 500, // Adjust the warning limit
    },
  }
});
