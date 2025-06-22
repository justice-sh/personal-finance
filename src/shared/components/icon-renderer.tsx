import React from "react"

export interface IconRendererProps {
  /**
   * The icon to render. Can be a ReactNode (e.g., JSX element like <svg /> or <Settings />)
   * or a React component type (e.g., Settings from 'lucide-react').
   */
  icon?: React.ReactNode | React.ComponentType<React.SVGProps<SVGSVGElement>>
  /**
   * Children to render if no icon is provided.
   */
  children?: React.ReactNode
}

/**
 * Renders an icon based on its type (ReactNode or ComponentType),
 * falling back to children if no icon is provided.
 */
export const IconRenderer: React.FC<IconRendererProps> = ({ icon, children }) => {
  // Determine if the provided 'icon' is a React component type (function or class)
  const isIconComponent = typeof icon === "function"

  return isIconComponent
    ? React.createElement(icon as React.ComponentType<React.SVGProps<SVGSVGElement>>) // If it's a component type, create an
    : icon
      ? icon
      : children
}
