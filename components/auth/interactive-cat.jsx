"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "../../lib/utils"

export function InteractiveCat({ isShy, isTyping, isSuccess, className }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    // 'isShy' = Password focus (Hide eyes)
    // 'isTyping' = Email focus (Curious/Swipe)
    // 'isSuccess' = Login success (Jump)

    useEffect(() => {
        const handleMouseMove = (e) => {
            // General tracking
            const { innerWidth, innerHeight } = window
            setMousePos({
                x: (e.clientX - innerWidth / 2) / 30, // subtle movement
                y: (e.clientY - innerHeight / 2) / 30
            })
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <div className={cn("absolute -top-[100px] left-0 w-full flex justify-center z-20 pointer-events-none", className)}>
            <div
                className={cn(
                    "relative w-40 h-32 transition-transform duration-700 ease-in-out",
                    isSuccess ? "-translate-y-20 opacity-0" : "" // Disappear up on success? Or jump onto card? user said "jump up onto card". 
                    // Let's settle for a cute "pop up" then maybe separate success animation in page.
                    // For now, this is the "hanging" state.
                )}
            >

                {/* Tail (Absolute left of head) */}
                <div className="absolute top-10 -left-12 w-12 h-24 origin-top-right animate-[tail-flick_3s_infinite_ease-in-out]">
                    <svg viewBox="0 0 50 100" className="w-full h-full fill-orange-400 drop-shadow-md">
                        <path d="M40,10 C20,30 -10,60 10,90 C20,100 40,90 40,80 C30,60 40,40 50,10 Z" />
                    </svg>
                </div>

                {/* Head Shape */}
                <div className="relative w-40 h-32 z-10">
                    {/* Ears */}
                    <div className="absolute -top-4 left-2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[40px] border-b-orange-400 -rotate-12" />
                    <div className="absolute -top-4 right-2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[40px] border-b-orange-400 rotate-12" />

                    {/* Face Base */}
                    <div className="w-full h-full bg-orange-400 rounded-[50%_50%_45%_45%] shadow-lg relative overflow-hidden ring-1 ring-orange-500/20">
                        {/* Face markings */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-20 bg-orange-300/50 blur-sm rounded-full" />

                        {/* Eyes */}
                        <div className="absolute top-12 w-full flex justify-center gap-6">
                            <div className="w-8 h-8 bg-white rounded-full relative flex items-center justify-center overflow-hidden">
                                <div className="w-3 h-5 bg-black rounded-full transition-transform duration-100"
                                    style={isShy ? {} : { transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
                                />
                            </div>
                            <div className="w-8 h-8 bg-white rounded-full relative flex items-center justify-center overflow-hidden">
                                <div className="w-3 h-5 bg-black rounded-full transition-transform duration-100"
                                    style={isShy ? {} : { transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
                                />
                            </div>
                        </div>

                        {/* Nose & Mouth */}
                        <div className="absolute top-22 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <div className="w-3 h-2 bg-pink-300 rounded-full mb-1" />
                            <div className="w-8 h-4 border-b-2 border-orange-900/50 rounded-b-full bg-transparent" />
                        </div>
                    </div>
                </div>

                {/* Paws (The key interaction) */}
                {/* Left Paw */}
                <div
                    className={cn(
                        "absolute top-24 left-2 w-12 h-14 bg-white rounded-full border-4 border-orange-400 z-20 transition-all duration-300 ease-out shadow-sm",
                        isShy ? "top-10 left-8 rotate-45" : "", // Move to cover left eye
                        isTyping ? "animate-paw-swipe" : "" // Swipe animation
                    )}
                >
                    <div className="absolute top-2 left-3 w-2 h-3 bg-pink-200 rounded-full" />
                    <div className="absolute top-1 left-6 w-2 h-3 bg-pink-200 rounded-full" />
                    <div className="absolute top-2 left-9 w-2 h-3 bg-pink-200 rounded-full" />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-5 bg-pink-200/50 rounded-full blur-[1px]" />
                </div>

                {/* Right Paw */}
                <div
                    className={cn(
                        "absolute top-24 right-2 w-12 h-14 bg-white rounded-full border-4 border-orange-400 z-20 transition-all duration-300 ease-out shadow-sm",
                        isShy ? "top-10 right-8 -rotate-45" : "", // Move to cover right eye
                    )}
                >
                    <div className="absolute top-2 left-3 w-2 h-3 bg-pink-200 rounded-full" />
                    <div className="absolute top-1 left-6 w-2 h-3 bg-pink-200 rounded-full" />
                    <div className="absolute top-2 left-9 w-2 h-3 bg-pink-200 rounded-full" />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-5 bg-pink-200/50 rounded-full blur-[1px]" />
                </div>

            </div>

            <style jsx global>{`
        @keyframes tail-flick {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes paw-swipe {
           0%, 100% { transform: translateY(0) rotate(0); }
           50% { transform: translateY(15px) rotate(-10deg); }
        }
      `}</style>
        </div>
    )
}
