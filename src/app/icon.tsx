// src/app/icon.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Precise Favicon Dimensions Mapped
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      // FIXED: Background color removed entirely to ensure 100% true transparency adaptive layer
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* High-Contrast Precise Golden Code Tag Paths (</>) */}
          <path
            d="M10 9L4 16L10 23"
            stroke="#f59e0b" // Absolute crisp brand-gold parameters
            strokeWidth="3" // Marginally increased thickness for ultra-clear visibility on transparent layouts
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 5L13 27"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M22 9L28 16L22 23"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}