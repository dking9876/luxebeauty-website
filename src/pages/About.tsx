import { Sparkles, Heart, Award, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ScrollReveal, FadeIn } from '../components/ui/ScrollReveal'
import { SectionTitle } from '../components/ui/SectionTitle'

export default function About() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-24 bg-charcoal">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl">
                        <FadeIn delay={0.1}>
                            <p className="text-gold font-medium tracking-widest uppercase mb-4">אודותינו</p>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">
                                אמנות היופי,
                                <br />
                                <span className="text-gold italic">מושלמת</span>
                            </h1>
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                במשך יותר מעשור, לוקס ביוטי הייתה היעד לאלה המחפשים
                                את הטוב ביותר בטיפולי יופי וטיפוח עור מותאם אישית.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 bg-cream overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeIn direction="left">
                            <SectionTitle
                                subtitle="הסיפור שלנו"
                                title="מורשת של מצוינות"
                                centered={false}
                            />
                            <div className="space-y-4 text-charcoal-light leading-relaxed">
                                <p>
                                    לוקס ביוטי נוסדה ב-2010 על ידי הקוסמטיקאית המפורסמת אלנה וסקז,
                                    מתוך חזון יחיד: ליצור מקדש שבו יופי ובריאות
                                    משתלבים בהרמוניה מושלמת.
                                </p>
                                <p>
                                    עם יותר מ-15 שנות ניסיון בתעשיית היופי, אלנה הרכיבה
                                    צוות של מומחיות יוצאות דופן, כל אחת מביאה את המומחיות הייחודית שלה
                                    למשימה המשותפת שלנו לעזור ללקוחות להרגיש בטוחות וזוהרות.
                                </p>
                                <p>
                                    היום, לוקס ביוטי עומדת כעדות לחזון הזה—מקום שבו
                                    טכניקות חדשניות פוגשות מסורות עתיקות, הכל מועבר
                                    עם תשומת הלב האישית שהלקוחות שלנו ראויים לה.
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn direction="right" delay={0.2}>
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="פנים ספא יוקרתי"
                                    className="rounded-sm shadow-xl"
                                />
                                <div className="absolute -bottom-8 -right-8 bg-gold p-8 rounded-sm shadow-lg">
                                    <p className="text-4xl font-serif text-white">+10</p>
                                    <p className="text-white/80 text-sm">שנים של מצוינות</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <ScrollReveal width="100%">
                        <SectionTitle
                            subtitle="הערכים שלנו"
                            title="מה מנחה אותנו"
                        />
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Sparkles,
                                title: 'מצוינות',
                                description: 'אנו שואפים לשלמות בכל טיפול, תוך שימוש במוצרים וטכניקות פרימיום בלבד.',
                            },
                            {
                                icon: Heart,
                                title: 'אכפתיות',
                                description: 'הנוחות והסיפוק שלכם הם הלב של כל מה שאנחנו עושים.',
                            },
                            {
                                icon: Award,
                                title: 'מומחיות',
                                description: 'למידה מתמדת מבטיחה שהצוות שלנו נשאר בחזית התעשייה.',
                            },
                            {
                                icon: Users,
                                title: 'קהילה',
                                description: 'אנו בונים קשרים מתמשכים עם הלקוחות שלנו, הופכים לשותפים במסע היופי שלהם.',
                            },
                        ].map((value, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <div className="text-center group">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                                        <value.icon className="w-10 h-10 text-gold group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-xl font-serif text-charcoal mb-3">{value.title}</h3>
                                    <p className="text-charcoal-light text-sm">{value.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-cream-dark">
                <div className="container mx-auto px-6">
                    <ScrollReveal width="100%">
                        <SectionTitle
                            subtitle="הצוות שלנו"
                            title="הכירו את המומחיות"
                            description="צוות המקצועניות המוסמכות המוכשרות שלנו מחויב ליופי ולבריאות שלכם."
                        />
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                name: 'אלנה וסקז',
                                role: 'מייסדת וקוסמטיקאית ראשית',
                                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                            },
                            {
                                name: 'סופי חן',
                                role: 'מאפרת בכירה',
                                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                            },
                            {
                                name: 'מריה סנטוס',
                                role: 'מומחית טיפוח עור',
                                image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                            },
                        ].map((member, index) => (
                            <ScrollReveal key={index} delay={index * 0.15}>
                                <div className="group text-center">
                                    <div className="relative overflow-hidden rounded-sm mb-6 aspect-[3/4]">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/20 transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-xl font-serif text-charcoal mb-1">{member.name}</h3>
                                    <p className="text-gold text-sm">{member.role}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-charcoal">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn direction="up">
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                            חוו את ההבדל של לוקס ביוטי
                        </h2>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.2}>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            מוכנים לגלות מה עושה אותנו מיוחדים? הזמינו את התור הראשון שלכם
                            ותנו לנו לקבל את פניכם לעולם היופי היוקרתי שלנו.
                        </p>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.4}>
                        <Link to="/book-online" className="btn-primary">
                            הזמינו תור
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </div>
    )
}
