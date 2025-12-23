import { Link } from 'react-router-dom'
import { Sparkles, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { name: 'בית', path: '/' },
        { name: 'שירותים', path: '/services' },
        { name: 'אודות', path: '/about' },
        { name: 'בלוג', path: '/blog' },
        { name: 'שאלות נפוצות', path: '/faq' },
    ]

    const servicesList = [
        'טיפולי פנים',
        'אמנות איפור',
        'ייעוץ עור',
        'טיפולי גוף',
        'חבילות כלה',
    ]

    return (
        <footer className="bg-charcoal text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-6 h-6 text-gold" />
                            <span className="text-2xl font-serif font-semibold">
                                לוקס<span className="text-gold">ביוטי</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            חוו את אמנות היופי במקדש היוקרה שלנו.
                            כאשר אלגנטיות פוגשת מומחיות.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-serif mb-6 text-gold">קישורים מהירים</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className="text-gray-400 hover:text-gold transition-colors text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-serif mb-6 text-gold">השירותים שלנו</h4>
                        <ul className="space-y-3">
                            {servicesList.map((item) => (
                                <li key={item}>
                                    <Link
                                        to="/services"
                                        className="text-gray-400 hover:text-gold transition-colors text-sm"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-serif mb-6 text-gold">צור קשר</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                <span className="text-gray-400 text-sm">
                                    רחוב היופי 123<br />
                                    תל אביב, ישראל
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gold shrink-0" />
                                <a href="tel:+972501234567" className="text-gray-400 hover:text-gold transition-colors text-sm">
                                    050-123-4567
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gold shrink-0" />
                                <a href="mailto:hello@luxebeauty.co.il" className="text-gray-400 hover:text-gold transition-colors text-sm">
                                    hello@luxebeauty.co.il
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} לוקס ביוטי. כל הזכויות שמורות.
                    </p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="text-gray-500 hover:text-gold text-sm transition-colors">
                            מדיניות פרטיות
                        </Link>
                        <Link to="/terms" className="text-gray-500 hover:text-gold text-sm transition-colors">
                            תנאי שימוש
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
