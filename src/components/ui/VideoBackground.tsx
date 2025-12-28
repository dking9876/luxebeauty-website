import { useState } from 'react'

interface VideoBackgroundProps {
    videoSrc?: string
    posterSrc?: string
    overlayOpacity?: number
}

export const VideoBackground = ({
    videoSrc,
    posterSrc,
    overlayOpacity = 0.5
}: VideoBackgroundProps) => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Fallback Image / Poster */}
            <div
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
                style={{ backgroundImage: `url(${posterSrc})` }}
            />

            {/* Video Element */}
            {videoSrc && (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={() => setIsVideoLoaded(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
            )}

            {/* Overlay Gradient */}
            <div
                className="absolute inset-0 bg-charcoal mix-blend-multiply"
                style={{ opacity: overlayOpacity }}
            />

            {/* Animated Grain/Noise Texture (CSS-based) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    )
}
