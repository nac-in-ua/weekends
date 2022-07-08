import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  e2e: {
    baseUrl: process.env.SITE_URL || 'http://localhost:3121',
  },
  projectId: 'chg2fj',
})
