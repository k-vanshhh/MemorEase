export function ModernLogo({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gift Box */}
      <rect x="8" y="14" width="32" height="24" rx="2" fill="none" stroke="#10b981" strokeWidth="2" />

      {/* Box Ribbon/Cross */}
      <line x1="24" y1="14" x2="24" y2="38" stroke="#10b981" strokeWidth="2" />
      <line x1="8" y1="26" x2="40" y2="26" stroke="#10b981" strokeWidth="2" />

      {/* Heart accent */}
      <path
        d="M24 18C24 18 22 16 20 16C18.5 16 17.5 17 17.5 18.5C17.5 20 24 26 24 26C24 26 30.5 20 30.5 18.5C30.5 17 29.5 16 28 16C26 16 24 18 24 18Z"
        fill="#ec4899"
      />

      {/* Sparkles */}
      <circle cx="38" cy="12" r="1.5" fill="#fbbf24" />
      <circle cx="10" cy="10" r="1" fill="#fbbf24" />
    </svg>
  )
}
