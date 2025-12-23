import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { BlogPost } from '../lib/supabase'
import { format } from 'date-fns'
import { he } from 'date-fns/locale'

// Demo blog content
const demoBlogPosts: Record<string, BlogPost> = {
    '1': {
        id: '1',
        title: 'המדריך המלא לטיפוח עור בחורף',
        slug: 'ultimate-winter-skincare-guide',
        excerpt: 'מזג אוויר קר יכול לגרום נזק לעור שלכם. גלו את טיפי המומחים שלנו לשמירה על עור זוהר לאורך כל החורף.',
        content: `
החורף הגיע, ואיתו מגיע סט ייחודי של אתגרים לעור שלכם. השילוב של אוויר קר בחוץ וחימום יבש בפנים יכול להשאיר את העור שלכם מתוח, קשקשי ועמום. אבל אל דאגה—עם הגישה הנכונה, תוכלו לשמור על הזוהר הקייצי כל השנה.

## הבנת אתגרי עור החורף

במהלך חודשי החורף, רמות הלחות יורדות משמעותית הן בחוץ והן בפנים. ירידה זו בלחות גורמת למחסום הטבעי של העור להיחלש, מה שמוביל לאיבוד מים מוגבר מהעור. התוצאה? יובש, רגישות ולפעמים אפילו גירוי.

## טיפים חיוניים לטיפוח עור בחורף

### 1. עברו ללחות עשירה יותר
הלחות הקלה של הקיץ לא תספיק בחורף. חפשו מוצרים עם מרכיבים כמו חומצה היאלורונית, סרמידים וחמאת שיאה שמספקים לחות עמוקה יותר ועוזרים לתקן את מחסום העור.

### 2. אל תדלגו על קרם ההגנה
כן, גם בחורף! קרני UV עדיין יכולות לפגוע בעור שלכם, במיוחד כשהן מוחזרות משלג. המשיכו להשתמש בקרם הגנה רחב טווח SPF 30 ומעלה מדי יום.

### 3. ניקוי עדין הוא המפתח
עברו לניקוי קרם או חלב במקום נוסחאות מקציפות, שיכולות לקלף שמנים טבעיים. שקלו לנקות רק פעם ביום אם העור שלכם יבש במיוחד.

### 4. הוסיפו שמן פנים
שכבו שמן פנים מזין מעל הלחות שלכם בלילה. שמנים כמו ורדים, ארגן וחוחובה יכולים לספק דחיפה נוספת של לחות.

### 5. הישארו מותברים מבפנים
שתו הרבה מים וכללו מאכלים עשירים באומגה-3 בתזונה שלכם כדי לתמוך בלחות העור מבפנים החוצה.

## טיפולים מקצועיים לחורף

שקלו להזמין טיפול פנים מלחיח כדי לתת לעור שלכם דחיפה נוספת. טיפול הפנים היוקרתי הייחודי שלנו מועיל במיוחד בחודשי החורף, מכיוון שהוא כולל טיפולי לחות עמוקים שלא ניתן לשכפל בבית.

## סיכום

עם הטיפול והתשומת לב הנכונים, העור שלכם יכול לשגשג גם בתנאי החורף הקשים ביותר. זכרו, עקביות היא המפתח—שמרו על השגרה שלכם והעור שלכם יודה לכם באביב!
    `,
        image_url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        author: 'אלנה וסקז',
        published_at: '2024-12-10T10:00:00Z',
        created_at: '2024-12-10T10:00:00Z',
    },
    '2': {
        id: '2',
        title: '5 סודות אנטי-אייג\'ינג מקוסמטיקאיות מובילות',
        slug: 'anti-aging-secrets',
        excerpt: 'למדו את הטכניקות והמרכיבים המקצועיים שבאמת עושים את ההבדל במאבק בהזדקנות.',
        content: `
כשמדובר באנטי-אייג'ינג, יש הרבה רעש בחוץ. מה באמת עובד? שאלנו את הקוסמטיקאיות המובילות שלנו לשתף את הטיפים היעילים ביותר שלהן לשמירה על עור צעיר וזוהר.

## סוד #1: עקביות על פני עוצמה

הטעות הנפוצה ביותר שאנחנו רואים? אנשים הולכים על הכל עם טיפולים אגרסיביים, ואז נשרפים. האמת היא שטיפול עדין ועקבי מנצח טיפולים אינטנסיביים מזדמנים בכל פעם.

## סוד #2: רטינואידים הם החבר הכי טוב שלכם

נגזרות ויטמין A נשארות הסטנדרט הזהב לאנטי-אייג'ינג. התחילו בריכוז נמוך והגדילו בהדרגה. השתמשו בלילה ותמיד עקבו אחרי עם קרם הגנה במהלך היום.

## סוד #3: הגנו על הצוואר והידיים

אזורים אלה מראים גיל באותה מהירות כמו הפנים שלכם אבל לעתים קרובות מוזנחים. הרחיבו את שגרת טיפוח העור שלכם לאזורים אלה לתוצאות מקיפות.

## סוד #4: שינה היא לא ניתנת למשא ומתן

אף מוצר לא יכול להחליף שינה איכותית. במהלך שינה עמוקה, הגוף שלכם מייצר הורמון גדילה, שעוזר לתקן ולהתחדש תאי עור.

## סוד #5: טיפולים מקצועיים מאיצים תוצאות

בעוד טיפול ביתי הוא חיוני, טיפולים מקצועיים יכולים להאיץ את מסע האנטי-אייג'ינג שלכם באופן משמעותי. שקלו טיפול אור LED, טיפולי פנים מיקרו-זרם, או טיפול ההתחדשות האנטי-אייג'ינג שלנו לתוצאות אופטימליות.
    `,
        image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        author: 'סופי חן',
        published_at: '2024-12-05T10:00:00Z',
        created_at: '2024-12-05T10:00:00Z',
    },
    '3': {
        id: '3',
        title: 'איך להכין את העור ליום החתונה',
        slug: 'wedding-day-skin-prep',
        excerpt: 'מדריך זמנים וטיפולים מקיף לכלות עתידיות שרוצות עור מושלם ביום המיוחד שלהן.',
        content: `
יום החתונה שלכם הוא אחד הימים המצולמים ביותר בחייכם. עור זוהר ומושלם יעזור לכם להרגיש בטוחות ויפות. הנה לוח הזמנים המקיף שלנו להכנת עור לכלות.

## 6 חודשים לפני

- הזמינו ייעוץ עם קוסמטיקאית להערכת מצב העור הנוכחי שלכם
- הקימו שגרת טיפול ביתית עקבית
- טפלו בבעיות עור גדולות כמו אקנה או היפרפיגמנטציה

## 3-4 חודשים לפני

- התחילו טיפולים מקצועיים קבועים (כל 4-6 שבועות)
- שקלו טיפולים כמו פילינג כימי או מיקרודרמברזיה
- הימנעו מניסוי מוצרים חדשים שעלולים לגרום לתגובות

## חודש לפני

- הטיפול המקצועי האחרון צריך להיות 2-3 שבועות לפני החתונה
- שמרו על השגרה הקיימת שלכם—ללא ניסויים!
- התמקדו בלחות וניהול מתח

## שבוע לפני

- עשו טיפול פנים מלחיח אחרון 5-7 ימים לפני
- קבלו הרבה שינה
- הישארו מותברים ואכלו טוב

## יום לפני

- שמרו על טיפוח עור פשוט
- הניחו מסכה מלחיחה
- קבלו שינה טובה של לילה
- הימנעו מאלכוהול ומאכלים מלוחים

הזמינו את חבילת איפור הכלה שלנו לגישה מקיפה ליופי יום החתונה שלכם!
    `,
        image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        author: 'מריה סנטוס',
        published_at: '2024-11-28T10:00:00Z',
        created_at: '2024-11-28T10:00:00Z',
    },
}

export default function BlogPostPage() {
    const { id } = useParams<{ id: string }>()
    const [post, setPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            fetchPost(id)
        }
    }, [id])

    async function fetchPost(postId: string) {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('id', postId)
                .single()

            if (error) throw error
            setPost(data)
        } catch {
            setPost(demoBlogPosts[postId] || null)
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

    if (!post) {
        return (
            <div className="pt-20 min-h-screen flex flex-col items-center justify-center bg-cream">
                <h1 className="text-3xl font-serif text-charcoal mb-4">הפוסט לא נמצא</h1>
                <Link to="/blog" className="text-gold hover:underline">
                    → חזרה לבלוג
                </Link>
            </div>
        )
    }

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[350px]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${post.image_url}')` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
                </div>
                <div className="relative h-full container mx-auto px-6 flex flex-col justify-end pb-12">
                    <Link
                        to="/blog"
                        className="flex items-center gap-2 text-gold mb-6 hover:text-gold-light transition-colors"
                    >
                        חזרה לבלוג
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-serif text-white mb-4 max-w-4xl">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                        <span className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gold" />
                            {post.author}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gold" />
                            {format(new Date(post.published_at), 'd בMMMM yyyy', { locale: he })}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gold" />
                            5 דקות קריאה
                        </span>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-cream">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <article className="prose prose-lg prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal-light prose-a:text-gold prose-strong:text-charcoal">
                            <div className="whitespace-pre-line text-charcoal-light leading-relaxed">
                                {post.content.split('\n\n').map((paragraph, index) => {
                                    if (paragraph.startsWith('## ')) {
                                        return (
                                            <h2 key={index} className="text-2xl font-serif text-charcoal mt-10 mb-4">
                                                {paragraph.replace('## ', '')}
                                            </h2>
                                        )
                                    }
                                    if (paragraph.startsWith('### ')) {
                                        return (
                                            <h3 key={index} className="text-xl font-serif text-charcoal mt-6 mb-3">
                                                {paragraph.replace('### ', '')}
                                            </h3>
                                        )
                                    }
                                    if (paragraph.startsWith('- ')) {
                                        return (
                                            <ul key={index} className="my-4 space-y-2">
                                                {paragraph.split('\n').map((item, itemIndex) => (
                                                    <li key={itemIndex} className="flex items-start gap-2">
                                                        <span className="text-gold mt-1">•</span>
                                                        <span>{item.replace('- ', '')}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                    }
                                    if (paragraph.trim()) {
                                        return <p key={index} className="mb-4">{paragraph}</p>
                                    }
                                    return null
                                })}
                            </div>
                        </article>

                        {/* Author Card */}
                        <div className="mt-16 p-8 bg-white rounded-sm border border-gold/10">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                                    <User className="w-8 h-8 text-gold" />
                                </div>
                                <div>
                                    <p className="font-serif text-charcoal text-lg">{post.author}</p>
                                    <p className="text-charcoal-light text-sm">קוסמטיקאית בכירה</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-16 text-center">
                            <p className="text-charcoal-light mb-4">מתעניינים בטיפולים שלנו?</p>
                            <Link to="/book-online" className="btn-primary">
                                הזמינו תור
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
