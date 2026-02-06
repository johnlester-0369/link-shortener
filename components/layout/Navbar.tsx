
'use client'

import React from 'react'
import { Link2 } from 'lucide-react'
import ThemeToggle from '@/components/theme/ThemeToggle'

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-outline-variant bg-surface/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between w-full px-4 md:px-8 lg:px-12 xl:px-32">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Link2 className="h-6 w-6 text-on-primary" />
          </div>
          <span className="text-title-lg font-bold text-on-surface">
            LinkShort
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
