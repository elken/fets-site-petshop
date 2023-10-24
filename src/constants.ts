export const RESOURCE_SERVER = import.meta.env.VITE_RESOURCE_SERVER || 'http://localhost:4444'
export const AUTHORIZATION_SERVER = import.meta.env.VITE_AUTHORIZATION_SERVER || 'http://localhost:4440'
export const APP_SERVER = window.location.origin
export const CLIENT = import.meta.env.VITE_OAUTH_CLIENT

/* Photoprism */
export const PHOTO_SERVER = import.meta.env.VITE_PHOTO_SERVER
export const PETS_ALBUM_ID = import.meta.env.VITE_PETS_ALBUM_ID
export const photoPrismTokenKey = 'photoPrismToken'
export const photoPrismPreviewTokenKey = 'photoPrismPreviewToken'
