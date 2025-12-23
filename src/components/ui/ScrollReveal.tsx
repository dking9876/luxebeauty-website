import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ScrollRevealProps {
    children: ReactNode
    width?: "fit-content" | "100%"
    delay?: number
}

export const ScrollReveal = ({ children, width = "100%", delay = 0.25 }: ScrollRevealProps) => {
    return (
        <div style={{ position: "relative", width }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay }}
            >
                {children}
            </motion.div>
        </div>
    )
}

interface FadeInProps {
    children: ReactNode
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right'
    className?: string
}

export const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }: FadeInProps) => {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 }
    }

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    )
}
