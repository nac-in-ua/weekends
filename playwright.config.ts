import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'
require('dotenv').config()

const config: PlaywrightTestConfig = {
  testDir: './src/e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['github'], ['html']] : [['list'], ['html']],
  globalSetup: require.resolve('./global-setup'),
  use: {
    actionTimeout: 0,
    trace: process.env.CI ? 'on-first-retry' : 'on',
    baseURL: process.env.SITE_URL,
    storageState: 'state.json',
    colorScheme: 'light',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
  outputDir: 'test-results/',
  webServer: {
    command: 'npm run start',
    port: Number(process.env.PORT),
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
}

export default config
