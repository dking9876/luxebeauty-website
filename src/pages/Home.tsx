import { Link } from 'react-router-dom'
import { ArrowLeft, Star, Clock, Award, Heart } from 'lucide-react'
import { VideoBackground } from '../components/ui/VideoBackground'
import { ScrollReveal, FadeIn } from '../components/ui/ScrollReveal'
import { SectionTitle } from '../components/ui/SectionTitle'

export default function Home() {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center">
                <VideoBackground
                    videoSrc="/assets/hero-video.mp4"
                    posterSrc="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    overlayOpacity={0.3}
                />

                {/* Hero Content */}
                <div className="relative container mx-auto px-6 py-32">
                    <div className="max-w-2xl">
                        <FadeIn direction="up" delay={0.2}>
                            <p className="text-gold font-medium tracking-widest uppercase mb-4 drop-shadow-md">
                                ברוכים הבאים ללוקס ביוטי
                            </p>
                        </FadeIn>

                        <FadeIn direction="up" delay={0.4}>
                            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-6 drop-shadow-lg">
                                כאשר יופי
                                <br />
                                פוגש <span className="text-gold italic">יוקרה</span>
                            </h1>
                        </FadeIn>

                        <FadeIn direction="up" delay={0.6}>
                            <p className="text-lg text-gray-100 mb-8 leading-relaxed drop-shadow-md max-w-lg">
                                חוו טיפולי יופי מעצבים במקדש האלגנטיות שלנו.
                                הקוסמטיקאיות המומחות שלנו מחויבות להעצמת הזוהר הטבעי שלכם.
                            </p>
                        </FadeIn>

                        <FadeIn direction="up" delay={0.8}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/book-online" className="btn-primary flex items-center justify-center gap-2 shadow-lg shadow-gold/20 hover:shadow-gold/40">
                                    <ArrowLeft className="w-4 h-4" />
                                    הזמינו את החוויה שלכם
                                </Link>
                                <Link to="/services" className="btn-secondary flex items-center justify-center gap-2 border-white text-white hover:bg-white hover:text-charcoal backdrop-blur-sm bg-white/10">
                                    גלו את השירותים
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2 backdrop-blur-sm">
                        <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse-soft" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-cream relative">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-charcoal/5 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6">
                    <ScrollReveal width="100%">
                        <SectionTitle
                            subtitle="למה לבחור בנו"
                            title="ההבדל של לוקס ביוטי"
                        />
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Star,
                                title: 'מוצרים פרימיום',
                                description: 'אנו משתמשים רק במותגי טיפוח העור היוקרתיים והמאושרים על ידי רופאי עור.',
                            },
                            {
                                icon: Award,
                                title: 'צוות מומחים',
                                description: 'הקוסמטיקאיות המוסמכות שלנו מביאות שנים של ניסיון מתמחה.',
                            },
                            {
                                icon: Clock,
                                title: 'טיפולים מותאמים',
                                description: 'כל שירות מותאם לסוג העור הייחודי שלכם ולמטרות שלכם.',
                            },
                            {
                                icon: Heart,
                                title: 'אווירה מרגיעה',
                                description: 'בריחה לסביבה שלווה שתוכננה להרפיה מושלמת.',
                            },
                        ].map((feature, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <div
                                    className="glass-luxury p-8 text-center group hover:-translate-y-2 transition-all duration-500 rounded-sm h-full"
                                >
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300 transform group-hover:scale-110">
                                        <feature.icon className="w-8 h-8 text-gold" />
                                    </div>
                                    <h3 className="text-xl font-serif text-charcoal mb-3">{feature.title}</h3>
                                    <p className="text-charcoal-light text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Services */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute -right-20 top-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-20 bottom-40 w-72 h-72 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-6 relative">
                    <ScrollReveal width="100%">
                        <SectionTitle
                            subtitle="המומחיות שלנו"
                            title="טיפולים ייחודיים"
                            description="גלו את המבחר האצור שלנו של שירותי יופי פרימיום שתוכננו להאיר את הזוהר הפנימי שלכם."
                        />
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                title: 'טיפולי פנים יוקרתיים',
                                description: 'ניקוי עמוק וטיפולי התחדשות לעור זוהר.',
                                price: 'החל מ-₪550',
                            },
                            {
                                image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                title: 'אמנות איפור',
                                description: 'איפור מקצועי לכל אירוע, מכלות ועד אדיטוריאל.',
                                price: 'החל מ-₪450',
                            },
                            {
                                image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                title: 'טיפולי גוף',
                                description: 'עטיפות גוף יוקרתיות וטיפולי פילינג.',
                                price: 'החל מ-₪650',
                            },
                        ].map((service, index) => (
                            <ScrollReveal key={index} delay={index * 0.15}>
                                <Link
                                    to="/services"
                                    className="group relative overflow-hidden rounded-sm shadow-lg block"
                                >
                                    <div className="aspect-[4/5] overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <p className="text-gold text-sm font-medium mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 absolute -top-8">{service.price}</p>
                                        <h3 className="text-2xl font-serif text-white mb-2">{service.title}</h3>
                                        <p className="text-gray-300 text-sm opacity-90 group-hover:text-white transition-colors">{service.description}</p>
                                        <div className="flex items-center gap-2 text-gold mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                            <span className="text-sm font-medium">למידע נוסף</span>
                                            <ArrowLeft className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <FadeIn delay={0.4}>
                            <Link to="/services" className="btn-secondary group">
                                צפו בכל השירותים
                            </Link>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-charcoal relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />

                <div className="container mx-auto px-6 relative">
                    <ScrollReveal width="100%">
                        <SectionTitle
                            subtitle="המלצות"
                            title="מה הלקוחות שלנו אומרים"
                            dark={true}
                        />
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "החוויה היוקרתית ביותר שחוויתי אי פעם. תשומת הלב לפרטים היא ללא תחרות.",
                                name: 'שרה מ.',
                                service: 'טיפול פנים ייחודי',
                            },
                            {
                                quote: "האיפור לחתונה שלי היה מושלם לחלוטין. הרגשתי כמו מלכה ביום המיוחד שלי.",
                                name: 'אמילי ר.',
                                service: 'חבילת כלה',
                            },
                            {
                                quote: "אני לקוחה קבועה כבר שנתיים. הצוות מבין בדיוק מה העור שלי צריך.",
                                name: 'ג\'ניפר ל.',
                                service: 'טיפולים חודשיים',
                            },
                        ].map((testimonial, index) => (
                            <ScrollReveal key={index} delay={index * 0.2}>
                                <div
                                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-8 hover:bg-white/10 transition-colors duration-300"
                                >
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                                    <div>
                                        <p className="text-white font-medium">{testimonial.name}</p>
                                        <p className="text-gold text-sm">{testimonial.service}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-cream-dark relative">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn direction="up">
                        <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">
                            מוכנים להתחיל את מסע היופי שלכם?
                        </h2>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.2}>
                        <p className="text-charcoal-light text-lg mb-8 max-w-2xl mx-auto">
                            הזמינו תור היום וחוו את הכוח המשנה של טיפוח יופי מומחה.
                        </p>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.4}>
                        <Link to="/book-online" className="btn-primary inline-flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                            <ArrowLeft className="w-4 h-4" />
                            קבעו ביקור
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </div>
    )
}
