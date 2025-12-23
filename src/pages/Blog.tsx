import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowLeft } from 'lucide-react'
import type { BlogPost } from '../lib/supabase'
import { ScrollReveal, FadeIn } from '../components/ui/ScrollReveal'

import { format } from 'date-fns'
import { he } from 'date-fns/locale'

// Demo blog data
const demoBlogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'המדריך המלא לטיפוח עור בחורף',
        slug: 'ultimate-winter-skincare-guide',
        excerpt: 'מזג אוויר קר יכול לגרום נזק לעור שלכם. גלו את טיפי המומחים שלנו לשמירה על עור זוהר לאורך כל החורף.',
        content: '',
        image_url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: 'אלנה וסקז',
        published_at: '2024-12-10T10:00:00Z',
        created_at: '2024-12-10T10:00:00Z',
    },
    {
        id: '2',
        title: '5 סודות אנטי-אייג\'ינג מקוסמטיקאיות מובילות',
        slug: 'anti-aging-secrets',
        excerpt: 'למדו את הטכניקות והמרכיבים המקצועיים שבאמת עושים את ההבדל במאבק בהזדקנות.',
        content: '',
        image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: 'סופי חן',
        published_at: '2024-12-05T10:00:00Z',
        created_at: '2024-12-05T10:00:00Z',
    },
    {
        id: '3',
        title: 'איך להכין את העור ליום החתונה',
        slug: 'wedding-day-skin-prep',
        excerpt: 'מדריך זמנים וטיפולים מקיף לכלות עתידיות שרוצות עור מושלם ביום המיוחד שלהן.',
        content: '',
        image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: 'מריה סנטוס',
        published_at: '2024-11-28T10:00:00Z',
        created_at: '2024-11-28T10:00:00Z',
    },
    {
        id: '4',
        title: 'היתרונות של טיפולי פנים קבועים',
        slug: 'benefits-regular-facials',
        excerpt: 'למה עקביות היא המפתח כשמדובר בטיפוח עור מקצועי וכמה פעמים כדאי להזמין תורים.',
        content: '',
        image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: 'אלנה וסקז',
        published_at: '2024-11-20T10:00:00Z',
        created_at: '2024-11-20T10:00:00Z',
    },
    {
        id: '5',
        title: 'הבנת סוג העור שלכם',
        slug: 'understanding-skin-type',
        excerpt: 'לא בטוחים אם יש לכם עור שמנוני, יבש או משולב? המדריך שלנו יעזור לכם לזהות את הסוג ולבחור את המוצרים הנכונים.',
        content: '',
        image_url: 'https://images.unsplash.com/photo-1552693673-1bf958298935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: 'סופי חן',
        published_at: '2024-11-15T10:00:00Z',
        created_at: '2024-11-15T10:00:00Z',
    },
    {
        id: '6',
        title: 'זרקור על מרכיב: חומצה היאלורונית',
        slug: 'hyaluronic-acid-spotlight',
        excerpt: 'צללו עמוק לאחד המרכיבים האהובים ביותר בטיפוח העור ולמדו איך לשלב אותו בשגרה שלכם.',
        content: '',
        image_url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: 'מריה סנטוס',
        published_at: '2024-11-08T10:00:00Z',
        created_at: '2024-11-08T10:00:00Z',
    },
]

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPosts()
    }, [])

    async function fetchPosts() {
        // Always use Hebrew demo data for now
        // Supabase data is in English and RLS prevents updates
        setPosts(demoBlogPosts)
        setLoading(false)
    }


    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-24 bg-charcoal">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn delay={0.1}>
                        <p className="text-gold font-medium tracking-widest uppercase mb-4">הבלוג שלנו</p>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
                            תובנות יופי
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            טיפים מומחים, טרנדים ותובנות מצוות אנשי היופי המקצועיים שלנו.
                            הישארו מעודכנים ומעוררי השראה במסע היופי שלכם.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-24 bg-cream">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="flex justify-center">
                            <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
                        </div>
                    ) : (
                        <>
                            {/* Featured Post */}
                            {posts[0] && (
                                <ScrollReveal width="100%">
                                    <Link
                                        to={`/blog/${posts[0].id}`}
                                        className="group block mb-16"
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                            <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-lg">
                                                <img
                                                    src={posts[0].image_url}
                                                    alt={posts[0].title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="lg:pr-8">
                                                <div className="flex items-center gap-3 text-sm text-charcoal-light mb-4">
                                                    <span className="text-gold uppercase tracking-wide text-xs font-medium">מומלץ</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {format(new Date(posts[0].published_at), 'd בMMMM yyyy', { locale: he })}
                                                    </span>
                                                </div>
                                                <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-4 group-hover:text-gold transition-colors">
                                                    {posts[0].title}
                                                </h2>
                                                <p className="text-charcoal-light leading-relaxed mb-6">
                                                    {posts[0].excerpt}
                                                </p>
                                                <div className="flex items-center gap-2 text-gold">
                                                    <span className="font-medium">קראו את המאמר</span>
                                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            )}

                            {/* Post Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.slice(1).map((post, index) => (
                                    <ScrollReveal key={post.id} delay={index * 0.1}>
                                        <Link
                                            to={`/blog/${post.id}`}
                                            className="group card-luxury overflow-hidden block h-full"
                                        >
                                            <div className="aspect-[16/10] overflow-hidden">
                                                <img
                                                    src={post.image_url}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center gap-2 text-sm text-charcoal-light mb-3">
                                                    <Calendar className="w-4 h-4" />
                                                    {format(new Date(post.published_at), 'd בMMMM yyyy', { locale: he })}
                                                </div>
                                                <h3 className="text-xl font-serif text-charcoal mb-3 group-hover:text-gold transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-charcoal-light text-sm line-clamp-2 mb-4">
                                                    {post.excerpt}
                                                </p>
                                                <span className="text-gold text-sm font-medium flex items-center gap-1">
                                                    קראו עוד
                                                    <ArrowLeft className="w-4 h-4 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                </span>
                                            </div>
                                        </Link>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}
