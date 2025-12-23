import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, ArrowRight, Check, Calendar } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Service } from '../lib/supabase'

// Demo services data
const demoServices: Record<string, Service> = {
    '1': {
        id: '1',
        title: 'טיפול פנים יוקרתי ייחודי',
        description: 'טיפול פנים מקיף המשלב ניקוי עמוק, פילינג ומסכות מזינות לעור זוהר וקורן.',
        duration: 90,
        price: 695,
        image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        full_page_content: {
            sections: [
                {
                    type: 'text',
                    content: 'טיפול הפנים היוקרתי הייחודי שלנו הוא הפינוק המושלם לעור שלכם. טיפול זה בן 90 דקות משלב את הטכניקות הטובות ביותר והמוצרים הפרימיום לתוצאות נראות שתרגישו מיד.',
                },
                {
                    type: 'text',
                    content: 'המסע שלכם מתחיל בניקוי כפול יסודי להסרת זיהומים, אחריו פילינג עדין אך יעיל שחושף עור טרי וזוהר מתחת. לאחר מכן, תיהנו ממסאז׳ פנים מרגיע שמשפר את זרימת הדם ומקדם ניקוז לימפתי.',
                },
                {
                    type: 'text',
                    content: 'הטיפול מסתיים במסכה מותאמת אישית שנבחרה במיוחד לסוג העור שלכם, אטומה עם הסרומים והלחויות הייחודיים שלנו. צאו עם עור שנראה צעיר יותר בשנים ומרגיש עור רך להפליא.',
                },
            ],
            benefits: [
                'ניקוי עמוק וחידוד נקבוביות',
                'שיפור במרקם העור ובגוון',
                'הפחתה בהופעת קווים דקים',
                'לחות משופרת וזוהר',
                'הרפיה והפגת מתחים',
                'מותאם לסוג העור שלכם',
            ],
            aftercare: 'הימנעו מחשיפה ישירה לשמש למשך 24 שעות לאחר הטיפול. השתמשו בקרם הגנה SPF 30+ מדי יום. שתו הרבה מים והימנעו מאיפור כבד למשך שארית היום.',
        },
        created_at: new Date().toISOString(),
    },
    '2': {
        id: '2',
        title: 'התחדשות אנטי-אייג\'ינג',
        description: 'טיפול מתקדם המתמקד בקווי הבעה וקמטים באמצעות טכנולוגיה חדשנית וסרומים אנטי-אייג\'ינג פרימיום.',
        duration: 75,
        price: 890,
        image_url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        full_page_content: {
            sections: [
                {
                    type: 'text',
                    content: 'הפכו את השעון לאחור עם טיפול ההתחדשות האנטי-אייג\'ינג שלנו. טיפול פנים מתקדם זה משתמש בטכנולוגיית טיפוח העור העדכנית ביותר בשילוב מרכיבים אנטי-אייג\'ינג חזקים לתוצאות מרשימות.',
                },
                {
                    type: 'text',
                    content: 'אנו משתמשים בטכנולוגיית מיקרו-זרם להרמה ומיתוח שרירי הפנים, טיפול אור LED לעידוד ייצור קולגן, ומורחים סרומים מרוכזים עם רטינול, ויטמין C וחומצה היאלורונית.',
                },
            ],
            benefits: [
                'הפחתה נראית בקווים דקים וקמטים',
                'שיפור בגמישות ומוצקות העור',
                'עידוד ייצור קולגן',
                'גוון עור בהיר ואחיד יותר',
                'לחות ממושכת',
                'לא פולשני ללא זמן החלמה',
            ],
            aftercare: 'הימנעו ממוצרי רטינול למשך 48 שעות לאחר הטיפול. השתמשו בטיפוח עדין ותמיד מרחו קרם הגנה. התוצאות משתפרות עם טיפולים קבועים.',
        },
        created_at: new Date().toISOString(),
    },
    '3': {
        id: '3',
        title: 'חבילת איפור כלה',
        description: 'חוויית יופי כלה מלאה הכוללת ניסיון, איפור ביום החתונה וערכת תיקונים. הראי מדהים ביום המיוחד שלך.',
        duration: 120,
        price: 1600,
        image_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        full_page_content: {
            sections: [
                {
                    type: 'text',
                    content: 'יום החתונה שלכם ראוי רק לשלמות. חבילת איפור הכלה שלנו נועדה להבטיח שתיראו ותרגישו מדהים מהרגע שתצעדו במעלה המעבר.',
                },
                {
                    type: 'text',
                    content: 'חבילה מקיפה זו כוללת מפגש ניסיון בו אנו עובדים יחד ליצירת המראה האידיאלי שלכם, ואחריו מריחה מושלמת ביום החתונה. אנו משתמשים רק במוצרים הטובים ביותר עמידים לאורך זמן שמצטלמים להפליא.',
                },
            ],
            benefits: [
                'מפגש ניסיון אישי כלול',
                'מוצרים פרימיום עמידים',
                'גימור מושלם לצילום',
                'ערכת תיקונים לקבלת הפנים',
                'חבילות שושבינות אופציונליות',
                'נסיעה למקום האירוע אפשרית',
            ],
            aftercare: 'שמרו את ערכת התיקונים שלכם בהישג יד לקבלת הפנים. הימנעו מנגיעה בפנים ואנו ממליצים על מריחה מחדש של ספריי קיבוע לאחר 4-6 שעות.',
        },
        created_at: new Date().toISOString(),
    },
    '4': {
        id: '4',
        title: 'עטיפת גוף מלחיחה',
        description: 'טיפול גוף יוקרתי הממלח ומחיה את העור שלך מכף רגל ועד ראש.',
        duration: 60,
        price: 640,
        image_url: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        full_page_content: {
            sections: [
                {
                    type: 'text',
                    content: 'פנקו את עצמכם בעטיפת הגוף המלחיחה שלנו, טיפול יוקרתי שעוטף את כל הגוף במרכיבים מזינים עמוקות. מושלם לעור יבש ומתוח או כטיפול לפני אירוע.',
                },
            ],
            benefits: [
                'לחות אינטנסיבית לכל הגוף',
                'עור רך וחלק יותר',
                'שיפור בגמישות העור',
                'יתרונות ניקוי רעלים',
                'הרפיה עמוקה',
                'מראה זוהר ובריא',
            ],
            aftercare: 'שתו הרבה מים לאחר הטיפול. הימנעו ממקלחת לפחות 4 שעות כדי לאפשר למוצרים להיספג במלואם.',
        },
        created_at: new Date().toISOString(),
    },
    '5': {
        id: '5',
        title: 'טיפול פנים זוהר מהיר',
        description: 'מושלם ללוחות זמנים עמוסים - טיפול מהיר אך יעיל שמשאיר את העור רענן וזוהר.',
        duration: 30,
        price: 300,
        image_url: 'https://images.unsplash.com/photo-1552693673-1bf958298935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        full_page_content: {
            sections: [
                {
                    type: 'text',
                    content: 'קצרים בזמן אבל צריכים רענון מהיר לעור? טיפול הפנים הזוהר המהיר שלנו מעניק תוצאות מרביות בזמן מינימלי. מושלם להפסקות צהריים או לפני אירועים מיוחדים.',
                },
            ],
            benefits: [
                'טיפול מהיר של 30 דקות',
                'זוהר וקרינה מידיים',
                'ניקוי עמוק',
                'ללא זמן החלמה',
                'טיפול מושלם לפני אירוע',
                'יוקרה במחיר נגיש',
            ],
            aftercare: 'ניתן להניח איפור מיד לאחר מכן. השתמשו בקרם הגנה להגנה על העור הטרי שטופל.',
        },
        created_at: new Date().toISOString(),
    },
    '6': {
        id: '6',
        title: 'ייעוץ וניתוח עור',
        description: 'הערכת עור מקיפה עם המלצות טיפול מותאמות אישית על ידי הקוסמטיקאיות המומחות שלנו.',
        duration: 45,
        price: 270,
        image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        full_page_content: {
            sections: [
                {
                    type: 'text',
                    content: 'לא בטוחים מאיפה להתחיל את מסע טיפוח העור שלכם? הייעוץ וניתוח העור המקיף שלנו הוא הצעד הראשון המושלם. באמצעות טכנולוגיית הדמיה מתקדמת, אנו מנתחים את העור שלכם ברמה עמוקה יותר.',
                },
            ],
            benefits: [
                'ניתוח עור מעמיק',
                'תוכנית טיפול מותאמת אישית',
                'המלצות על מוצרים',
                'הבנת סוג העור שלכם',
                'אסטרטגיית טיפוח עור לטווח ארוך',
                'עלות הייעוץ מזוכה בטיפול הראשון',
            ],
            aftercare: 'סקרו את תוכנית טיפוח העור המותאמת אישית שלכם והתחילו ליישם המלצות בהדרגה.',
        },
        created_at: new Date().toISOString(),
    },
}

export default function ServiceDetail() {
    const { id } = useParams<{ id: string }>()
    const [service, setService] = useState<Service | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            fetchService(id)
        }
    }, [id])

    async function fetchService(serviceId: string) {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('id', serviceId)
                .single()

            if (error) throw error
            setService(data)
        } catch {
            // Use demo data if Supabase not connected
            setService(demoServices[serviceId] || null)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center bg-cream">
                <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
        )
    }

    if (!service) {
        return (
            <div className="pt-20 min-h-screen flex flex-col items-center justify-center bg-cream">
                <h1 className="text-3xl font-serif text-charcoal mb-4">השירות לא נמצא</h1>
                <Link to="/services" className="text-gold hover:underline">
                    → חזרה לשירותים
                </Link>
            </div>
        )
    }

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${service.image_url}')` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
                </div>
                <div className="relative h-full container mx-auto px-6 flex flex-col justify-end pb-16">
                    <Link
                        to="/services"
                        className="flex items-center gap-2 text-gold mb-6 hover:text-gold-light transition-colors"
                    >
                        חזרה לשירותים
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
                        {service.title}
                    </h1>
                    <div className="flex items-center gap-6 text-white/80">
                        <span className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gold" />
                            {service.duration} דקות
                        </span>
                        <span className="flex items-center gap-2">
                            ₪{service.price}
                        </span>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-cream">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Description */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-serif text-charcoal mb-6">אודות הטיפול</h2>
                                <div className="space-y-4 text-charcoal-light leading-relaxed">
                                    <p>{service.description}</p>
                                    {service.full_page_content?.sections?.map((section, index) => (
                                        <p key={index}>
                                            {typeof section.content === 'string' ? section.content : ''}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Benefits */}
                            {service.full_page_content?.benefits && (
                                <div className="mb-12">
                                    <h2 className="text-2xl font-serif text-charcoal mb-6">יתרונות</h2>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {service.full_page_content.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check className="w-4 h-4 text-gold" />
                                                </div>
                                                <span className="text-charcoal-light">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Aftercare */}
                            {service.full_page_content?.aftercare && (
                                <div className="bg-white p-6 rounded-sm border border-gold/10">
                                    <h3 className="text-lg font-serif text-charcoal mb-3">הוראות טיפול לאחר הטיפול</h3>
                                    <p className="text-charcoal-light text-sm leading-relaxed">
                                        {service.full_page_content.aftercare}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Sticky Sidebar - Booking CTA */}
                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-28">
                                <div className="bg-white p-8 rounded-sm shadow-lg border border-gold/10">
                                    <div className="text-center mb-6">
                                        <p className="text-3xl font-serif text-charcoal mb-2">₪{service.price}</p>
                                        <p className="text-charcoal-light text-sm">{service.duration} דקות</p>
                                    </div>
                                    <Link
                                        to={`/book-online?service=${service.id}`}
                                        className="btn-primary w-full flex items-center justify-center gap-2"
                                    >
                                        <Calendar className="w-5 h-5" />
                                        הזמינו טיפול זה
                                    </Link>
                                    <p className="text-center text-charcoal-light text-xs mt-4">
                                        ביטול חינם עד 24 שעות לפני
                                    </p>
                                </div>

                                {/* Quick Facts */}
                                <div className="mt-6 bg-charcoal p-6 rounded-sm">
                                    <h4 className="text-gold font-serif mb-4">עובדות מהירות</h4>
                                    <ul className="space-y-3 text-sm text-white/80">
                                        <li className="flex justify-between">
                                            <span className="text-white">{service.duration} דק׳</span>
                                            <span>משך</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-white">₪{service.price}</span>
                                            <span>מחיר</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-white">אין</span>
                                            <span>זמן החלמה</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Sticky CTA */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gold/10 p-4 shadow-lg z-40">
                <div className="flex items-center justify-between gap-4">
                    <Link
                        to={`/book-online?service=${service.id}`}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Calendar className="w-5 h-5" />
                        הזמינו עכשיו
                    </Link>
                    <div className="text-left">
                        <p className="text-xl font-serif text-charcoal">₪{service.price}</p>
                        <p className="text-charcoal-light text-xs">{service.duration} דק׳</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
