"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "../../lib/utils"

export function InteractiveMascots({ isShy, isPeeking, hasError, className }) {
    const containerRef = useRef(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            // If "silent" (isShy/Typing), and not peeking/error, we might still want to track for other things, 
            // but the user said "become silent", implying they stop moving. 
            // We'll update state anyway, but use it conditionally.
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()

            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            setMousePos({
                x: e.clientX - centerX,
                y: e.clientY - centerY
            })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Pupil Logic
    const getPupilStyle = (factor = 1, forceDirection = null) => {
        // Error State: Sad/Downcast eyes
        if (hasError) {
            return { transform: "translate(0, 4px)" }
        }

        // Peeking/Awkward State: Look away immediately
        if (isPeeking) {
            const side = forceDirection === "left" ? -8 : 8
            return { transform: `translate(${side}px, -2px)` }
        }

        // Shy/Focused State: "Silent" / Fixed Focus
        // User said "when i type ... they all become silent". 
        // We interpret this as a fixed, steady gaze at the input (downwards), ignoring the cursor.
        if (isShy) {
            return { transform: "translate(0, 6px)" } // Fixed look down
        }

        // Default: Track Mouse
        // Increased sensitivity (factor) to make them more interactive
        const maxDist = 15 * factor
        // Using a larger divisor for x/y makes them move less per pixel of mouse move. 
        // To make them MORE interactive, we DECREASE the divisor.
        const x = Math.min(Math.max(mousePos.x / 15, -maxDist), maxDist)
        const y = Math.min(Math.max(mousePos.y / 15, -maxDist), maxDist)

        return {
            transform: `translate(${x}px, ${y}px)`
        }
    }

    return (
        <div
            ref={containerRef}
            // Increased scaling to 1.25 (scale-125) to make them larger as requested
            className={cn("relative w-full h-[360px] flex items-end justify-center scale-125 origin-bottom", className)}
        >
            <div className="relative w-[340px] h-[280px]">

                {/* 1. Purple Rectangle (Tall Back Left) */}
                <div className={cn(
                    "absolute bottom-0 left-[30px] w-[90px] h-[220px] bg-[#6c5ce7] rounded-t-3xl shadow-lg z-10 transition-all duration-500 ease-out",
                    hasError ? "brightness-90 skew-x-2" : ""
                )}>
                    <div className="absolute top-12 left-0 w-full flex justify-center gap-3">
                        <div className="w-6 h-6 bg-white rounded-full relative overflow-hidden">
                            <div className="w-3 h-3 bg-black rounded-full absolute top-[25%] left-[25%] transition-all duration-300"
                                style={getPupilStyle(1, "left")} />
                        </div>
                        <div className="w-6 h-6 bg-white rounded-full relative overflow-hidden">
                            <div className="w-3 h-3 bg-black rounded-full absolute top-[25%] left-[25%] transition-all duration-300"
                                style={getPupilStyle(1, "left")} />
                        </div>
                    </div>
                    <div className={cn(
                        "absolute top-24 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-black/20 rounded-full transition-all duration-300",
                        hasError ? "w-4 h-2 rounded-t-full rotate-180 translate-y-2 bg-black/30" : "",
                        isPeeking ? "w-2 h-2 rounded-full" : ""
                    )} />
                </div>

                {/* 2. Black Rectangle (Middle) */}
                <div className={cn(
                    "absolute bottom-0 left-[140px] w-[70px] h-[150px] bg-[#2d3436] rounded-t-2xl shadow-lg z-20 transition-all duration-500",
                    hasError ? "h-[140px] translate-y-2" : "",
                    isPeeking ? "h-[160px]" : ""
                )}>
                    <div className="absolute top-8 right-3 flex gap-2">
                        <div className="w-5 h-5 bg-white rounded-full relative overflow-hidden">
                            <div className="w-2.5 h-2.5 bg-black rounded-full absolute top-[25%] left-[25%] transition-transform duration-100"
                                style={getPupilStyle(0.8, "left")} />
                        </div>
                        <div className="w-5 h-5 bg-white rounded-full relative overflow-hidden">
                            <div className="w-2.5 h-2.5 bg-black rounded-full absolute top-[25%] left-[25%] transition-transform duration-100"
                                style={getPupilStyle(0.8, "left")} />
                        </div>
                    </div>
                </div>

                {/* 3. Orange Semi-Circle (Main) */}
                <div
                    className={cn(
                        "absolute bottom-0 left-[-30px] w-[150px] h-[110px] bg-[#ff7675] rounded-t-full shadow-md z-30 flex justify-center transition-all duration-500",
                        hasError ? "scale-95 brightness-95" : "",
                    )}
                >
                    {/* Eyes - UPDATED: Ensure they use getPupilStyle so they track! */}
                    <div className="absolute top-[40px] flex gap-8 z-10 transition-all duration-300">
                        {/* Added bg-white to eyes and moving pupils to ensure tracking logic is visible if desired, 
                  OR kept as black dots but applying transform. 
                  The user said "red and yellow ... least interactive". 
                  The previous code applied transform to the CONTAINER of the eyes or the eyes themselves.
                  Let's make them like the others: White sclera or just moving black dots?
                  The Reference images show BLACK DOTS on the Orange one.
                  So we just apply the transform to the black dots directly.
              */}
                        <div className="w-3.5 h-3.5 bg-black rounded-full transition-transform duration-75"
                            style={{
                                ...getPupilStyle(1.2), // Move more
                                ...(hasError ? { transform: 'scaleY(0.5) rotate(-10deg)' } : {})
                            }} />
                        <div className="w-3.5 h-3.5 bg-black rounded-full transition-transform duration-75"
                            style={{
                                ...getPupilStyle(1.2),
                                ...(hasError ? { transform: 'scaleY(0.5) rotate(10deg)' } : {})
                            }} />
                    </div>

                    <div className={cn(
                        "absolute top-[55px] w-6 h-3 border-b-2 border-black/80 rounded-b-full transition-all duration-300",
                        hasError ? "rotate-180 -translate-y-1 w-4 border-black/50" : "",
                        isPeeking ? "w-2 h-2 border-2 border-black/50 rounded-full bg-transparent" : ""
                    )} />

                    {isPeeking && !hasError && (
                        <div className="absolute top-4 right-10 text-cyan-500 animate-pulse text-xl">💧</div>
                    )}
                </div>

                {/* 4. Yellow Bird */}
                <div className={cn(
                    "absolute bottom-0 right-[20px] w-[60px] h-[80px] bg-[#fdcb6e] rounded-t-full shadow-sm z-40 transition-transform duration-500",
                    hasError ? "rotate-3 translate-y-2" : "",
                    isPeeking ? "translate-x-3" : ""
                )}>
                    {/* Yellow Bird Eye - UPDATED to track */}
                    <div className="absolute top-5 left-3 w-4 h-4 bg-black rounded-full flex items-center justify-center overflow-hidden">
                        <div className={cn("absolute top-[-10px] w-full h-full bg-[#fdcb6e] transition-all", hasError ? "top-0" : "")} />
                        {/* The pupil */}
                        <div className="w-1.5 h-1.5 bg-white rounded-full transition-transform duration-75"
                            style={getPupilStyle(0.5)} // Slight movement for bird
                        />
                    </div>
                    <div className={cn("absolute top-7 -right-2 w-6 h-1.5 bg-black rounded-full transition-transform", hasError ? "rotate-12" : "")} />
                </div>

            </div>
        </div>
    )
}
