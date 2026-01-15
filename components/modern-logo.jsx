export const ModernLogo = ({ size = 32, className = "" }) => {
  return (
    <div className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 2L2 9L16 16L30 9L16 2Z"
          fill="currentColor"
          className="text-indigo-600 dark:text-indigo-400"
        />
        <path
          d="M2 23L16 30L30 23V9L16 16L2 9V23Z"
          fill="currentColor"
          fillOpacity="0.7"
          className="text-indigo-500 dark:text-indigo-300"
        />
        <path
          d="M16 16V30L2 23V9L16 16Z"
          fill="currentColor"
          fillOpacity="0.4"
          className="text-indigo-400 dark:text-indigo-200"
        />
      </svg>
    </div>
  )
}
