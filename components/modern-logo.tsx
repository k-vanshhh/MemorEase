export default function ModernLogo({
  size = 32,
  variant = "icon",
}: {
  size?: number
  variant?: "icon" | "full"
}) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer circle for app icon */}
        <rect width="128" height="128" rx="32" fill="currentColor" opacity="0.1" />

        {/* Gift box base */}
        <path
          d="M45 55L64 42L83 55V85C83 91.627 77.627 97 71 97H57C50.373 97 45 91.627 45 85V55Z"
          fill="currentColor"
        />

        {/* Gift box ribbon */}
        <rect x="60" y="42" width="8" height="55" fill="currentColor" opacity="0.8" />

        {/* Heart inside gift */}
        <path d="M64 65C64 65 58 60 55 63C53 65 54 70 64 78C74 70 75 65 73 63C70 60 64 65 64 65Z" fill="white" />

        {/* Sparkle accents */}
        <circle cx="48" cy="50" r="2" fill="currentColor" opacity="0.7" />
        <circle cx="80" cy="48" r="2" fill="currentColor" opacity="0.7" />
        <circle cx="85" cy="65" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="42" cy="70" r="1.5" fill="currentColor" opacity="0.4" />
      </svg>

      {variant === "full" && <span className="text-lg font-semibold text-foreground hidden sm:inline">MemorEase</span>}
    </div>
  )
}
