import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ScrollReveal, FadeIn } from '../components/ui/ScrollReveal'

const faqData = [
    {
        category: 'תורים והזמנות',
        questions: [
            {
                question: 'איך אני מזמין/ה תור?',
                answer: 'תוכלו להזמין תור בקלות דרך מערכת ההזמנות המקוונת שלנו על ידי לחיצה על כפתור "הזמן עכשיו". בחרו את השירות הרצוי, בחרו תאריך ושעה פנויים, והשלימו את טופס ההזמנה. תקבלו אימייל אישור זמן קצר לאחר מכן.',
            },
            {
                question: 'מהי מדיניות הביטולים שלכם?',
                answer: 'אנו דורשים הודעה מראש של לפחות 24 שעות לביטולים או שינוי מועד. ביטולים מאוחרים או אי-הגעה עלולים להיות כרוכים בעמלת ביטול של 50% ממחיר השירות. אנו מבינים שמקרי חירום קורים, אז אנא צרו קשר בהקדם האפשרי אם אתם צריכים לשנות את התור.',
            },
            {
                question: 'כמה זמן לפני התור כדאי להגיע?',
                answer: 'אנו ממליצים להגיע 10-15 דקות לפני התור המתוכנן. זה מאפשר זמן להשלמת מסמכים נדרשים ועוזר לכם להירגע לפני שהטיפול מתחיל.',
            },
        ],
    },
    {
        category: 'שירותים וטיפולים',
        questions: [
            {
                question: 'באילו מוצרים אתם משתמשים?',
                answer: 'אנו משתמשים אך ורק במותגי טיפוח עור פרימיום ומאושרים על ידי רופאי עור, כולל לה מאר, סקינסיוטיקלס, וקו המוצרים הייחודי שלנו - לוקס ביוטי. כל המוצרים נבחרים בקפידה לאיכותם, יעילותם והתאמתם לסוגי עור שונים.',
            },
            {
                question: 'איך אני יודע/ת איזה טיפול פנים מתאים לי?',
                answer: 'בביקור הראשון שלכם, הקוסמטיקאיות שלנו יבצעו ניתוח עור מקיף כדי להבין את הצרכים והדאגות הייחודיים שלכם. על סמך ייעוץ זה, נמליץ על הטיפולים המתאימים ביותר לסוג העור והמטרות שלכם.',
            },
            {
                question: 'האם הטיפולים שלכם מתאימים לעור רגיש?',
                answer: 'כן! אנו מציעים טיפולים מיוחדים לעור רגיש ותמיד מבצעים בדיקת רגישות כאשר משתמשים במוצרים חדשים. אנא יידעו אותנו על אלרגיות או רגישויות במהלך הייעוץ.',
            },
        ],
    },
    {
        category: 'מחירים ותשלומים',
        questions: [
            {
                question: 'באילו אמצעי תשלום אתם מקבלים?',
                answer: 'אנו מקבלים את כל כרטיסי האשראי העיקריים (ויזה, מאסטרקארד, אמריקן אקספרס), כרטיסי חיוב ומזומן. אנו גם מציעים כרטיסי מתנה שניתן לרכוש בסלון או באינטרנט.',
            },
            {
                question: 'האם אתם מציעים חבילות?',
                answer: 'כן! אנו מציעים מגוון אפשרויות חבילות ללקוחות שרוצים להתחייב לשגרת טיפוח עור קבועה. רכישת חבילות כוללת הנחה של 10-20% בהתאם למספר המפגשים. שאלו את הצוות שלנו על המבצעים הנוכחיים.',
            },
            {
                question: 'האם טיפ כלול במחיר?',
                answer: 'טיפ אינו כלול במחירי השירותים שלנו. בעוד שטיפ תמיד מוערך, הוא לחלוטין לפי שיקול דעתכם. הצוות שלנו מחויב לספק שירות יוצא מן הכלל בכל מקרה.',
            },
        ],
    },
    {
        category: 'בטיחות והיגיינה',
        questions: [
            {
                question: 'אילו אמצעי בטיחות יש לכם?',
                answer: 'הבטיחות שלכם היא בעדיפות עליונה. אנו פועלים לפי פרוטוקולי היגיינה מחמירים הכוללים חיטוי של כל הציוד בין לקוחות, שימוש בפריטים חד פעמיים במידת האפשר, וניקוי עמוק קבוע של המתקן. הצוות שלנו עובר הכשרת בטיחות ובריאות באופן קבוע.',
            },
            {
                question: 'האם הקוסמטיקאיות שלכם מוסמכות?',
                answer: 'בהחלט. כל הקוסמטיקאיות שלנו מורשות ומוסמכות במלואן. רבות מהן בעלות הסמכות נוספות מתמחות בטיפולים מתקדמים ומשתתפות באופן קבוע בקורסי השתלמות כדי להישאר מעודכנות בטכניקות האחרונות.',
            },
        ],
    },
]

export default function FAQ() {
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

    const toggleItem = (key: string) => {
        setOpenItems((prev) => ({
            ...prev,
            [key]: !prev[key],
        }))
    }

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-24 bg-charcoal">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn delay={0.1}>
                        <p className="text-gold font-medium tracking-widest uppercase mb-4">שאלות נפוצות</p>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
                            שאלות ותשובות
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            מצאו תשובות לשאלות הנפוצות על השירותים שלנו,
                            תהליך ההזמנה והמדיניות שלנו.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="py-24 bg-cream">
                <div className="container mx-auto px-6 max-w-4xl">
                    {faqData.map((category, categoryIndex) => (
                        <ScrollReveal key={categoryIndex} delay={categoryIndex * 0.1}>
                            <div className="mb-12">
                                <h2 className="text-2xl font-serif text-charcoal mb-6 flex items-center gap-3">
                                    <span className="w-8 h-0.5 bg-gold" />
                                    {category.category}
                                </h2>
                                <div className="space-y-4">
                                    {category.questions.map((item, itemIndex) => {
                                        const key = `${categoryIndex}-${itemIndex}`
                                        const isOpen = openItems[key]

                                        return (
                                            <div
                                                key={key}
                                                className="bg-white rounded-sm border border-gold/10 overflow-hidden"
                                            >
                                                <button
                                                    onClick={() => toggleItem(key)}
                                                    className="w-full px-6 py-5 flex items-center justify-between text-right hover:bg-cream-dark transition-colors"
                                                >
                                                    <span className="font-medium text-charcoal pl-4">
                                                        {item.question}
                                                    </span>
                                                    <ChevronDown
                                                        className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                                            }`}
                                                    />
                                                </button>
                                                <div
                                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'
                                                        }`}
                                                >
                                                    <div className="px-6 pb-5 text-charcoal-light leading-relaxed">
                                                        {item.answer}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Still Have Questions */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-2xl mx-auto">
                        <FadeIn>
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                                <MessageCircle className="w-10 h-10 text-gold" />
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <h2 className="text-3xl font-serif text-charcoal mb-4">
                                עדיין יש לכם שאלות?
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <p className="text-charcoal-light mb-8">
                                לא מצאתם את התשובה שחיפשתם? הצוות שלנו כאן כדי לעזור.
                                פנו אלינו ונחזור אליכם בהקדם האפשרי.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.4}>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="mailto:hello@luxebeauty.co.il"
                                    className="btn-primary"
                                >
                                    שלחו לנו אימייל
                                </a>
                                <Link to="/book-online" className="btn-secondary">
                                    הזמינו ייעוץ
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </div>
    )
}
