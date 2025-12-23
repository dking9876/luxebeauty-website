import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'

const navLinks = [
    { name: 'בית', path: '/' },
    { name: 'שירותים', path: '/services' },
    { name: 'אודות', path: '/about' },
    { name: 'בלוג', path: '/blog' },
    { name: 'שאלות נפוצות', path: '/faq' },
]

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsOpen(false)
    }, [location])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <nav className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <Sparkles className="w-6 h-6 text-gold transition-transform group-hover:rotate-12" />
                    <span className="text-2xl font-serif font-semibold text-charcoal">
                        לוקס<span className="text-gold">ביוטי</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${location.pathname === link.path
                                ? 'text-gold'
                                : 'text-charcoal hover:text-gold'
                                }`}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold" />
                            )}
                        </Link>
                    ))}
                    <Link to="/book-online" className="btn-primary text-sm">
                        הזמן עכשיו
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-charcoal hover:text-gold transition-colors"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-lg font-medium py-2 ${location.pathname === link.path
                                ? 'text-gold'
                                : 'text-charcoal hover:text-gold'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/book-online" className="btn-primary text-center mt-2">
                        הזמן עכשיו
                    </Link>
                </div>
            </div>
        </header>
    )
}
