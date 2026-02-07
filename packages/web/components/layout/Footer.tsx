
import React from 'react'
import Link from '@/components/ui/Link'
import Divider from '@/components/ui/Divider'
import { Link2, Github, ExternalLink } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-outline-variant/50 bg-gradient-to-b from-surface-container to-surface-container-high">
      <div className="container mx-auto px-4 py-16 lg:px-8 xl:px-32">
        <div className="mx-auto max-w-4xl">
          {/* Main Content */}
          <div className="text-center">
            {/* Logo & Brand */}
            <div className="mb-6 inline-flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-elevation-2">
                <Link2 className="h-8 w-8 text-on-primary" strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <h2 className="text-headline-md font-bold text-on-surface">
                  LinkShort
                </h2>
                <p className="text-label-sm text-on-surface-variant">
                  URL Shortener
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-body-lg text-on-surface-variant">
              The fastest and most reliable way to shorten your URLs.
              <br />
              Create memorable links for better sharing and tracking.
            </p>

            {/* GitHub Link - Featured Card */}
            <div className="mb-12 inline-block">
              <Link
                href="https://github.com/johnlester-0369"
                className="group inline-flex items-center gap-3 rounded-2xl border border-outline-variant/50 bg-surface-container-highest px-6 py-4 shadow-elevation-1 transition-all duration-normal hover:border-primary/50 hover:bg-surface-container-highest hover:shadow-elevation-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container transition-colors group-hover:bg-primary/10">
                  <Github className="h-6 w-6 text-on-surface transition-colors group-hover:text-primary" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-title-md font-semibold text-on-surface transition-colors group-hover:text-primary">
                      View on GitHub
                    </span>
                    <ExternalLink className="h-4 w-4 text-on-surface-variant transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </div>
                  <span className="text-body-sm text-on-surface-variant">
                    @johnlester-0369
                  </span>
                </div>
              </Link>
            </div>

            {/* Divider */}
            <Divider />

            {/* Copyright & Tech Stack */}
            <div className="space-y-2">
              <p className="text-body-sm text-on-surface-variant">
                &copy; {currentYear} LinkShort. All rights reserved.
              </p>
              <p className="flex items-center justify-center gap-2 text-label-sm text-on-surface-variant/70">
                <span>Built with</span>
                <span className="font-semibold text-primary">Next.js</span>
                <span>•</span>
                <span className="font-semibold text-secondary">TypeScript</span>
                <span>•</span>
                <span className="font-semibold text-tertiary">Tailwind CSS</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
