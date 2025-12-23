import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ArrowLeft } from 'lucide-react'
import type { Service } from '../lib/supabase'
import { ScrollReveal, FadeIn } from '../components/ui/ScrollReveal'


// Demo data for when Supabase is not connected
const demoServices: Service[] = [
    {
        id: '1',
        title: 'טיפול פנים יוקרתי ייחודי',
        description: 'טיפול פנים מקיף המשלב ניקוי עמוק, פילינג ומסכות מזינות לעור זוהר וקורן.',
        duration: 90,
        price: 695,
        image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        full_page_content: { sections: [], benefits: [] },
        created_at: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'התחדשות אנטי-אייג\'ינג',
        description: 'טיפול מתקדם המתמקד בקווי הבעה וקמטים באמצעות טכנולוגיה חדשנית וסרומים אנטי-אייג\'ינג פרימיום.',
        duration: 75,
        price: 890,
        image_url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        full_page_content: { sections: [], benefits: [] },
        created_at: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'חבילת איפור כלה',
        description: 'חוויית יופי כלה מלאה הכוללת ניסיון, איפור ביום החתונה וערכת תיקונים. הראי מדהים ביום המיוחד שלך.',
        duration: 120,
        price: 1600,
        image_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        full_page_content: { sections: [], benefits: [] },
        created_at: new Date().toISOString(),
    },
    {
        id: '4',
        title: 'עטיפת גוף מלחיחה',
        description: 'טיפול גוף יוקרתי הממלח ומחיה את העור שלך מכף רגל ועד ראש.',
        duration: 60,
        price: 640,
        image_url: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        full_page_content: { sections: [], benefits: [] },
        created_at: new Date().toISOString(),
    },
    {
        id: '5',
        title: 'טיפול פנים זוהר מהיר',
        description: 'מושלם ללוחות זמנים עמוסים - טיפול מהיר אך יעיל שמשאיר את העור רענן וזוהר.',
        duration: 30,
        price: 300,
        image_url: 'https://images.unsplash.com/photo-1552693673-1bf958298935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        full_page_content: { sections: [], benefits: [] },
        created_at: new Date().toISOString(),
    },
    {
        id: '6',
        title: 'ייעוץ וניתוח עור',
        description: 'הערכת עור מקיפה עם המלצות טיפול מותאמות אישית על ידי הקוסמטיקאיות המומחות שלנו.',
        duration: 45,
        price: 270,
        image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        full_page_content: { sections: [], benefits: [] },
        created_at: new Date().toISOString(),
    },
]

export default function Services() {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchServices()
    }, [])


    async function fetchServices() {
        // Always use Hebrew demo data for now
        // Supabase data is in English and RLS prevents updates
        setServices(demoServices)
        setLoading(false)
    }


    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-24 bg-charcoal">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn delay={0.1}>
                        <p className="text-gold font-medium tracking-widest uppercase mb-4">השירותים שלנו</p>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
                            תפריט היופי
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            גלו את המבחר האצור שלנו של טיפולי יופי פרימיום,
                            כל אחד מתוכנן להאיר את הזוהר הטבעי שלכם.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 bg-cream">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="flex justify-center">
                            <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <ScrollReveal key={service.id} delay={index * 0.1}>
                                    <Link
                                        to={`/services/${service.id}`}
                                        className="group card-luxury overflow-hidden block h-full"
                                    >
                                        <div className="aspect-[4/3] overflow-hidden">
                                            <img
                                                src={service.image_url}
                                                alt={service.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-sm text-charcoal-light mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {service.duration} דקות
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    ₪{service.price}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-serif text-charcoal mb-2 group-hover:text-gold transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-charcoal-light text-sm line-clamp-2 mb-4">
                                                {service.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-gold opacity-0 translate-x-[10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                <span className="text-sm font-medium">למידע נוסף</span>
                                                <ArrowLeft className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn direction="up">
                        <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-4">
                            לא בטוחים איזה טיפול מתאים לכם?
                        </h2>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.2}>
                        <p className="text-charcoal-light mb-8 max-w-2xl mx-auto">
                            הזמינו ייעוץ חינם עם הקוסמטיקאיות המומחות שלנו
                            ונעזור לכם למצוא את הטיפול המושלם לצרכים שלכם.
                        </p>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.4}>
                        <Link to="/book-online" className="btn-primary">
                            הזמינו ייעוץ חינם
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </div>
    )
}
