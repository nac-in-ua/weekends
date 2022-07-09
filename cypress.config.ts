import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  projectId: 'chg2fj',
  e2e: {
    baseUrl: process.env.SITE_URL || 'http://localhost:3121',
  },
})
