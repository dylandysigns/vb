import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fetchInstagramFeed } from './lib/instagram-feed'
import { fetchInstagramImage } from './lib/instagram-image-proxy'

const instagramFeedDevApi = () => ({
  name: 'instagram-feed-dev-api',
  configureServer(server: any) {
    server.middlewares.use('/api/instagram-feed', async (req: any, res: any) => {
      if (req.method !== 'GET') {
        res.statusCode = 405
        res.setHeader('Allow', 'GET')
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Method not allowed' }))
        return
      }

      try {
        const posts = await fetchInstagramFeed()
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ posts }))
      } catch (error) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            error: 'Unexpected error while fetching Instagram feed',
            details: error instanceof Error ? error.message : 'Unknown error',
          }),
        )
      }
    })

    server.middlewares.use('/api/instagram-image', async (req: any, res: any) => {
      if (req.method !== 'GET') {
        res.statusCode = 405
        res.setHeader('Allow', 'GET')
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Method not allowed' }))
        return
      }

      try {
        const requestUrl = new URL(req.url, 'http://localhost')
        const { buffer, contentType } = await fetchInstagramImage(requestUrl.searchParams.get('url'))
        res.statusCode = 200
        res.setHeader('Content-Type', contentType)
        res.end(buffer)
      } catch (error) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            error: 'Unexpected error while fetching Instagram image',
            details: error instanceof Error ? error.message : 'Unknown error',
          }),
        )
      }
    })
  },
})

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    instagramFeedDevApi(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
