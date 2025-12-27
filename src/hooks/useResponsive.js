import { useMediaQuery } from 'react-responsive'

/**
 * Custom responsive hooks using react-responsive library
 * Breakpoints following the react-responsive guide best practices
 */

// Mobile: 320px - 480px
export const useMobile = () => {
  return useMediaQuery({ query: '(max-width: 480px)' })
}

// Tablet: 481px - 768px
export const useTablet = () => {
  return useMediaQuery({ query: '(min-width: 481px) and (max-width: 768px)' })
}

// Tablet Large: 769px - 1024px
export const useTabletLg = () => {
  return useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' })
}

// Desktop: 1025px and above
export const useDesktop = () => {
  return useMediaQuery({ query: '(min-width: 1025px)' })
}

// Mobile or Tablet (up to 768px)
export const useMobileOrTablet = () => {
  return useMediaQuery({ query: '(max-width: 768px)' })
}

// Tablet or above (481px and above)
export const useTabletOrAbove = () => {
  return useMediaQuery({ query: '(min-width: 481px)' })
}

// Large screens (1025px and above - tablet-lg and desktop)
export const useTabletLgOrAbove = () => {
  return useMediaQuery({ query: '(min-width: 769px)' })
}

// Portrait orientation
export const usePortrait = () => {
  return useMediaQuery({ query: '(orientation: portrait)' })
}

// Landscape orientation
export const useLandscape = () => {
  return useMediaQuery({ query: '(orientation: landscape)' })
}

// Retina/High DPI screens
export const useRetina = () => {
  return useMediaQuery({ query: '(min-resolution: 2dppx)' })
}

