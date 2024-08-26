/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: number
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_API_USERNAME: string
  readonly VITE_API_PASSWORD: string
  readonly VITE_PASSWORD_REGEX: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_LINKEDIN_URL: string
  readonly VITE_TWITTER_URL: string
  readonly VITE_GITHUB_URL: string
  readonly VITE_GOOGLE_DRIVE_CV_URL: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }