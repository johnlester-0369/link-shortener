
import { ImageResponse } from 'next/og'

// Metadata for the generated icon
export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

// Generate favicon matching Navbar's Link2 icon design
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Matches primary color from theme (light mode default)
          background: 'rgb(68, 114, 210)',
          borderRadius: '8px'
        }}
      >
        {/* 
          SVG recreation of Link2 icon from lucide-react
          Simplified chain link design matching Navbar appearance
        */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Chain link path - matches lucide-react Link2 icon */}
          <path d="M9 17H7A5 5 0 0 1 7 7h2" />
          <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
