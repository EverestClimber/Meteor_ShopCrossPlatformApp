import { Platform, Dimensions } from 'react-native';

// EXPORT OTHER FILES
// ================================================
export * from './appConfig';
export * from './colorConfig';
export * from './stylesConfig';
export * from './imagesConfig';

// GENERAL CONSTANTS
// ========================================
export const SCREEN_WIDTH = Dimensions.get('window').width;

// API KEYS
// ========================================
export const SENTRY_DSN = 'https://d9141702e0d74c6596639938c7376c23:f6b137ce16cf4de5974d605bc6ca3111@sentry.io/167808';
export const AMPLITUDE_API_KEY = 'da1b46ecc6798912871093e26122b8a1';



