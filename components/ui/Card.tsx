'use client'

import React from 'react'
import { cn } from '@/utils/cn.util'

// ============================================================================
// Types
// ============================================================================

/**
 * Card visual style variants
 * - elevated: Default card with optional shadow elevation
 * - filled: Solid colored background
 * - outlined: Border-only style
 * - gradient: Gradient background
 */
export type CardVariant = 'elevated' | 'filled' | 'outlined' | 'gradient'

/**
 * Card color options (used with 'filled' and 'gradient' variants)
 * - neutral: Uses surface colors (default)
 * - primary/secondary/tertiary: Brand colors
 * - success/error/warning/info: Semantic status colors
 */
export type CardColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'

/**
 * Surface level controls the background color depth (for elevated variant)
 * Maps to Material Design 3 surface container hierarchy
 */
type SurfaceLevel =
  | 'surface'
  | 'lowest'
  | 'low'
  | 'default'
  | 'high'
  | 'highest'

/**
 * Shadow elevation level (0-5)
 * Maps to Material Design 3 elevation system
 */
type ShadowElevation = 0 | 1 | 2 | 3 | 4 | 5

/**
 * Padding size options
 */
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

// ============================================================================
// Root Component
// ============================================================================

export interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant style
   * @default 'elevated'
   *
   * - 'elevated': Default card with surface backgrounds and optional shadows
   * - 'filled': Solid colored background (uses color prop)
   * - 'outlined': Border-only with transparent background
   * - 'gradient': Gradient background (uses color prop)
   */
  variant?: CardVariant
  /**
   * Color scheme - used with 'filled' and 'gradient' variants
   * @default 'neutral'
   */
  color?: CardColor
  /**
   * Surface level - controls background depth for 'elevated' variant
   * @default 'default'
   */
  surfaceLevel?: SurfaceLevel
  /**
   * Shadow elevation level (0-5)
   * @default 0
   */
  shadowElevation?: ShadowElevation
  /**
   * Whether to show a border (for 'elevated' variant)
   * @default false
   */
  bordered?: boolean
  /**
   * Padding size
   * @default 'md'
   */
  padding?: CardPadding
  /**
   * Whether the card is interactive (clickable)
   * @default false
   */
  interactive?: boolean
  /**
   * @deprecated Use variant="gradient" and color prop instead
   */
  gradient?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
}

/**
 * Surface level to Tailwind class mapping
 */
const surfaceLevelClasses: Record<SurfaceLevel, string> = {
  surface: 'bg-surface-container',
  lowest: 'bg-surface-container-lowest',
  low: 'bg-surface-container-low',
  default: 'bg-surface',
  high: 'bg-surface-container-high',
  highest: 'bg-surface-container-highest',
}

/**
 * Shadow elevation to Tailwind class mapping
 */
const shadowElevationClasses: Record<ShadowElevation, string> = {
  0: 'shadow-elevation-0',
  1: 'shadow-elevation-1 hover:shadow-elevation-2 transition-shadow',
  2: 'shadow-elevation-2 hover:shadow-elevation-3 transition-shadow',
  3: 'shadow-elevation-3 hover:shadow-elevation-4 transition-shadow',
  4: 'shadow-elevation-4 hover:shadow-elevation-5 transition-shadow',
  5: 'shadow-elevation-5',
}

/**
 * Padding size to Tailwind class mapping
 */
const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

/**
 * Filled variant color classes
 */
const filledColorClasses: Record<CardColor, string> = {
  neutral: 'bg-surface-container-high text-on-surface',
  primary: 'bg-primary text-on-primary',
  secondary: 'bg-secondary text-on-secondary',
  tertiary: 'bg-tertiary text-on-tertiary',
  success: 'bg-success text-on-success',
  error: 'bg-error text-on-error',
  warning: 'bg-warning text-on-warning',
  info: 'bg-info text-on-info',
}

/**
 * Gradient variant color classes
 */
const gradientColorClasses: Record<CardColor, string> = {
  neutral: '[background:var(--color-gradient-primary)] text-white',
  primary: '[background:var(--color-gradient-primary)] text-white',
  secondary: '[background:var(--color-gradient-secondary)] text-white',
  tertiary: '[background:var(--color-gradient-tertiary)] text-white',
  success: '[background:var(--color-gradient-success)] text-white',
  error: '[background:var(--color-gradient-error)] text-white',
  warning: '[background:var(--color-gradient-warning)] text-white',
  info: '[background:var(--color-gradient-info)] text-white',
}

/**
 * Outlined variant color classes
 */
const outlinedColorClasses: Record<CardColor, string> = {
  neutral: 'bg-transparent text-on-surface border-outline-variant',
  primary: 'bg-transparent text-on-surface border-primary',
  secondary: 'bg-transparent text-on-surface border-secondary',
  tertiary: 'bg-transparent text-on-surface border-tertiary',
  success: 'bg-transparent text-on-surface border-success',
  error: 'bg-transparent text-on-surface border-error',
  warning: 'bg-transparent text-on-surface border-warning',
  info: 'bg-transparent text-on-surface border-info',
}

/**
 * Card.Root - Container component for card content
 *
 * Uses composable variant + color props pattern (same as Button):
 * - variant: Controls visual style (elevated, filled, outlined, gradient)
 * - color: Controls color scheme (neutral, primary, secondary, etc.)
 *
 * @example
 * ```tsx
 * // Default elevated card
 * <Card.Root>
 *   <Card.Body>Content</Card.Body>
 * </Card.Root>
 *
 * // Elevated with shadow
 * <Card.Root variant="elevated" surfaceLevel="low" shadowElevation={2}>
 *   <Card.Body>Elevated content</Card.Body>
 * </Card.Root>
 *
 * // Filled card with color
 * <Card.Root variant="filled" color="primary">
 *   <Card.Body>Filled content</Card.Body>
 * </Card.Root>
 *
 * // Gradient card
 * <Card.Root variant="gradient" color="secondary">
 *   <Card.Title>Gradient Card</Card.Title>
 *   <Card.Body>Content with gradient background</Card.Body>
 * </Card.Root>
 *
 * // Outlined card
 * <Card.Root variant="outlined" color="primary">
 *   <Card.Body>Outlined content</Card.Body>
 * </Card.Root>
 * ```
 */
const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
  (
    {
      variant = 'elevated',
      color = 'neutral',
      surfaceLevel = 'default',
      shadowElevation = 0,
      bordered = false,
      padding = 'md',
      interactive = false,
      gradient: deprecatedGradient,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // Handle deprecated gradient prop
    const effectiveVariant = deprecatedGradient ? 'gradient' : variant
    const effectiveColor = deprecatedGradient ? deprecatedGradient : color

    // Determine background/text classes based on variant
    const getVariantClasses = (): string => {
      switch (effectiveVariant) {
        case 'filled':
          return filledColorClasses[effectiveColor]
        case 'gradient':
          return gradientColorClasses[effectiveColor]
        case 'outlined':
          return cn('border', outlinedColorClasses[effectiveColor])
        case 'elevated':
        default:
          return cn(
            surfaceLevelClasses[surfaceLevel],
            'text-on-surface',
            bordered && 'border border-outline-variant',
          )
      }
    }

    // Determine if we should show shadow
    const showShadow =
      effectiveVariant === 'elevated' || effectiveVariant === 'filled'

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-xl',
          // Variant-specific styles
          getVariantClasses(),
          // Shadow elevation (only for elevated and filled variants)
          showShadow && shadowElevationClasses[shadowElevation],
          // Padding
          padding !== 'none' && paddingClasses[padding],
          // Interactive state
          interactive &&
            'cursor-pointer hover:scale-[1.02] active:scale-[0.99] transition-transform duration-fast ease-standard',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

CardRoot.displayName = 'Card.Root'

// ============================================================================
// Header Component
// ============================================================================

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to show a divider below the header
   * @default false
   */
  withDivider?: boolean
}

/**
 * Card.Header - Header section for card title and actions
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ withDivider = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start justify-between',
          withDivider ? 'pb-4 mb-4 border-b border-current/20' : 'mb-4',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

CardHeader.displayName = 'Card.Header'

// ============================================================================
// Title Component
// ============================================================================

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level
   * @default 'h3'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * Card.Title - Title text for the card
 * Inherits text color from parent (supports all variants)
 */
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = 'h3', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'text-title-lg font-semibold leading-tight',
          'text-inherit',
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

CardTitle.displayName = 'Card.Title'

// ============================================================================
// Description Component
// ============================================================================

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

/**
 * Card.Description - Subtitle or description text
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'text-body-sm mt-1.5 leading-relaxed',
        'text-inherit opacity-80',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
})

CardDescription.displayName = 'Card.Description'

// ============================================================================
// Body Component
// ============================================================================

export type CardBodyProps = React.HTMLAttributes<HTMLDivElement>

/**
 * Card.Body - Main content area of the card
 */
const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'text-body-md leading-relaxed',
          'text-inherit',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

CardBody.displayName = 'Card.Body'

// ============================================================================
// Footer Component
// ============================================================================

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to show a divider above the footer
   * @default false
   */
  withDivider?: boolean
  /**
   * Alignment of footer content
   * @default 'right'
   */
  align?: 'left' | 'center' | 'right' | 'between'
}

const alignClasses: Record<NonNullable<CardFooterProps['align']>, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  between: 'justify-between',
}

/**
 * Card.Footer - Footer section for actions
 */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  (
    { withDivider = false, align = 'right', className, children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3',
          alignClasses[align],
          withDivider ? 'pt-4 mt-4 border-t border-current/20' : 'mt-4',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

CardFooter.displayName = 'Card.Footer'

// ============================================================================
// Compound Component Export
// ============================================================================

/**
 * Card compound component for displaying content in a contained format
 *
 * Uses composable variant + color props pattern (same as Button):
 * - variant: Controls visual style (elevated, filled, outlined, gradient)
 * - color: Controls color scheme when using filled/gradient variants
 *
 * @example
 * ```tsx
 * // Elevated card (default)
 * <Card.Root surfaceLevel="low" shadowElevation={1}>
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *   </Card.Header>
 *   <Card.Body>Content</Card.Body>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card.Root>
 *
 * // Filled card
 * <Card.Root variant="filled" color="primary">
 *   <Card.Title>Filled Card</Card.Title>
 *   <Card.Body>Content with solid background</Card.Body>
 * </Card.Root>
 *
 * // Gradient card
 * <Card.Root variant="gradient" color="secondary" shadowElevation={2}>
 *   <Card.Title>Gradient Card</Card.Title>
 *   <Card.Body>Content with gradient background</Card.Body>
 * </Card.Root>
 *
 * // Outlined card
 * <Card.Root variant="outlined" color="primary">
 *   <Card.Title>Outlined Card</Card.Title>
 *   <Card.Body>Content with border only</Card.Body>
 * </Card.Root>
 * ```
 */
const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
}

export default Card
