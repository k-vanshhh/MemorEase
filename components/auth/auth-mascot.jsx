"use client"

import { useEffect, useRef } from "react"
import { cn } from "../../lib/utils"

export function AuthMascot({ isShy }) {
    const containerRef = useRef(null)

    // Ref for all eyes and pupils
    const eyesRef = useRef([])

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isShy) return // Don't track when shy

            eyesRef.current.forEach((eye) => {
                if (!eye) return

                const pupil = eye.querySelector('.pupil')
                if (!pupil) return

                const rect = eye.getBoundingClientRect()
                const eyeCenterX = rect.left + rect.width / 2
                const eyeCenterY = rect.top + rect.height / 2

                const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX)

                // Limit movement
                const maxDist = 6
                const distance = Math.min(
                    Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY),
                    maxDist
                )

                const pupilX = Math.cos(angle) * distance
                const pupilY = Math.sin(angle) * distance

                pupil.style.transform = `translate(${pupilX}px, ${pupilY}px) translate(-50%, -50%)`
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [isShy]) // Re-run listener logic when shy state changes (to effectively pause/resume or just check inside handler)

    const setEyeRef = (el) => {
        if (el && !eyesRef.current.includes(el)) {
            eyesRef.current.push(el)
        }
    }

    // Common Eye Component
    const Eye = ({ className }) => (
        <div
            ref={setEyeRef}
            className={cn("absolute bg-white rounded-full overflow-hidden shadow-sm", className)}
        >
            <div className="pupil absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-black rounded-full transition-all duration-200" />
            <div
                className={cn(
                    "absolute -top-full left-0 w-full h-full z-10 transition-all duration-300 ease-in-out",
                    isShy ? "top-0" : "-top-full"
                )}
                style={{ backgroundColor: 'inherit' }} // Inherit color from parent blob for the eyelid
            />
        </div>
    )

    return (
        <div className="relative w-[300px] h-[200px]" ref={containerRef}>

            {/* 2. Purple Rect Blob */}
            <div
                className={cn(
                    "absolute bottom-0 left-[130px] w-[80px] h-[140px] z-10 transition-all duration-500 ease-out",
                    "bg-[#6c5ce7] rounded-t-[20px]", // Matching accent-purple
                    isShy && "-translate-y-[10px] -rotate-[5deg]"
                )}
            >
                <div className="absolute top-0 w-full h-full rounded-t-[20px] bg-[#6c5ce7] overflow-hidden">
                    {/* Eyelid container needs to match bg color */}
                    <Eye className="w-[20px] h-[20px] top-[40px] left-[15px] [&_.is-shy]:bg-[#6c5ce7] [&>.absolute:last-child]:bg-[#6c5ce7]" />
                    <Eye className="w-[20px] h-[20px] top-[40px] right-[15px] [&_.is-shy]:bg-[#6c5ce7] [&>.absolute:last-child]:bg-[#6c5ce7]" />
                </div>
            </div>

            {/* 1. Orange Semi-Circle Blob (Updated details) */}
            <div
                className={cn(
                    "absolute bottom-0 left-[20px] w-[120px] h-[100px] z-20 transition-all duration-500 ease-out",
                    "bg-[#ff6b4a] rounded-t-[100px]", // Matching accent-orange
                    isShy && "translate-y-[10px]"
                )}
            >
                {/* Inner container to hold specific background for eyelids if needed */}
                <div className="absolute top-0 w-full h-full rounded-t-[100px] bg-[#ff6b4a] overflow-hidden">
                    <Eye className="w-[24px] h-[24px] top-[30px] left-[30px] [&>.absolute:last-child]:bg-[#ff6b4a]" />
                    <Eye className="w-[24px] h-[24px] top-[30px] right-[30px] [&>.absolute:last-child]:bg-[#ff6b4a]" />
                </div>
            </div>

            {/* 3. Black Rect Blob */}
            <div
                className={cn(
                    "absolute bottom-0 left-[190px] w-[70px] h-[90px] z-30 transition-all duration-500 ease-out",
                    "bg-[#2d3436] rounded-t-[15px]", // Matching accent-black
                    isShy && "scale-110"
                )}
            >
                <div className="absolute top-0 w-full h-full rounded-t-[15px] bg-[#2d3436] overflow-hidden">
                    <Eye className="w-[16px] h-[16px] top-[25px] left-[15px] [&>.absolute:last-child]:bg-[#2d3436]" />
                    <Eye className="w-[16px] h-[16px] top-[25px] right-[15px] [&>.absolute:last-child]:bg-[#2d3436]" />
                </div>
            </div>

        </div>
    )
}
