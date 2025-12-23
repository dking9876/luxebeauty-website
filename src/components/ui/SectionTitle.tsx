import { Star } from 'lucide-react'
import { FadeIn } from './ScrollReveal'

interface SectionTitleProps {
    title: string
    subtitle?: string
    description?: string
    centered?: boolean
    dark?: boolean
}

export const SectionTitle = ({
    title,
    subtitle,
    description,
    centered = true,
    dark = false
}: SectionTitleProps) => {
    return (
        <div className={`mb-16 ${centered ? 'text-center' : 'text-right'}`}>
            {subtitle && (
                <FadeIn delay={0.1}>
                    <div className={`flex items-center gap-4 mb-3 ${centered ? 'justify-center' : 'justify-start'}`}>
                        {centered && <div className="h-px w-12 bg-gradient-to-l from-gold to-transparent opacity-50" />}
                        <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm drop-shadow-sm">
                            {subtitle}
                        </p>
                        {centered && <div className="h-px w-12 bg-gradient-to-r from-gold to-transparent opacity-50" />}
                    </div>
                </FadeIn>
            )}

            <FadeIn delay={0.2}>
                <h2 className={`text-4xl md:text-5xl font-serif mb-6 ${dark ? 'text-white' : 'text-charcoal'} relative inline-block`}>
                    {title}
                    <div className="absolute -top-6 -right-8 text-gold/10 pointer-events-none transform rotate-12">
                        <Star className="w-12 h-12 fill-current" />
                    </div>
                </h2>
            </FadeIn>

            {description && (
                <FadeIn delay={0.3}>
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full opacity-60" />
                        <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${dark ? 'text-gray-300' : 'text-charcoal-light'}`}>
                            {description}
                        </p>
                    </div>
                </FadeIn>
            )}
        </div>
    )
}
