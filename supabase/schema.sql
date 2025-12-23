-- LuxeBeauty Database Schema (Hebrew)
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  full_page_content JSONB DEFAULT '{"sections": [], "benefits": []}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- BOOKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  service_id UUID REFERENCES services(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'blocked', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- BLOG_POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT DEFAULT 'צוות לוקס ביוטי',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_service_id ON bookings(service_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for services and blog posts
CREATE POLICY "Services are viewable by everyone" ON services
  FOR SELECT USING (true);

CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (true);

-- Anyone can read bookings (for availability check)
CREATE POLICY "Bookings are viewable for availability" ON bookings
  FOR SELECT USING (true);

-- Anyone can create bookings (for public booking)
CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- ============================================
-- SAMPLE DATA - HEBREW
-- ============================================
INSERT INTO services (title, description, duration, price, image_url, full_page_content) VALUES
(
  'טיפול פנים יוקרתי ייחודי',
  'טיפול פנים מקיף המשלב ניקוי עמוק, פילינג ומסכות מזינות לעור זוהר וקורן.',
  90,
  695,
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '{"sections": [{"type": "text", "content": "טיפול הפנים היוקרתי הייחודי שלנו הוא הפינוק המושלם לעור שלכם."}], "benefits": ["ניקוי עמוק", "שיפור במרקם העור", "לחות משופרת"], "aftercare": "הימנעו מחשיפה לשמש למשך 24 שעות."}'
),
(
  'התחדשות אנטי-אייג''ינג',
  'טיפול מתקדם המתמקד בקווי הבעה וקמטים באמצעות טכנולוגיה חדשנית וסרומים אנטי-אייג''ינג פרימיום.',
  75,
  890,
  'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '{"sections": [{"type": "text", "content": "הפכו את השעון לאחור עם טיפול ההתחדשות האנטי-אייג''ינג שלנו."}], "benefits": ["הפחתת קווים דקים", "שיפור בגמישות", "עידוד קולגן"], "aftercare": "השתמשו בטיפוח עדין למשך 48 שעות."}'
),
(
  'חבילת איפור כלה',
  'חוויית יופי כלה מלאה הכוללת ניסיון, איפור ביום החתונה וערכת תיקונים.',
  120,
  1600,
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '{"sections": [], "benefits": ["מפגש ניסיון כלול", "מוצרים פרימיום", "ערכת תיקונים כלולה"], "aftercare": "שמרו את ערכת התיקונים בהישג יד."}'
),
(
  'עטיפת גוף מלחיחה',
  'טיפול גוף יוקרתי הממלח ומחיה את העור שלכם.',
  60,
  640,
  'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '{"sections": [], "benefits": ["לחות לכל הגוף", "עור רך", "הרפיה"], "aftercare": "שתו הרבה מים."}'
),
(
  'טיפול פנים זוהר מהיר',
  'טיפול מהיר אך יעיל שמשאיר את העור רענן וזוהר.',
  30,
  300,
  'https://images.unsplash.com/photo-1552693673-1bf958298935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '{"sections": [], "benefits": ["30 דקות בלבד", "זוהר מיידי", "ללא זמן החלמה"], "aftercare": "מרחו קרם הגנה."}'
),
(
  'ייעוץ וניתוח עור',
  'הערכת עור מקיפה עם המלצות טיפול מותאמות אישית.',
  45,
  270,
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '{"sections": [], "benefits": ["ניתוח מעמיק", "תוכנית מותאמת אישית", "המלצות מוצרים"], "aftercare": "סקרו את התוכנית שלכם."}'
);

INSERT INTO blog_posts (title, slug, excerpt, content, image_url, author) VALUES
(
  'המדריך המלא לטיפוח עור בחורף',
  'ultimate-winter-skincare-guide',
  'מזג אוויר קר יכול לגרום נזק לעור שלכם. גלו את טיפי המומחים שלנו לשמירה על עור זוהר.',
  'החורף הגיע, ואיתו מגיעים אתגרים לעור שלכם. השילוב של אוויר קר בחוץ וחימום יבש בפנים יכול להשאיר את העור שלכם מתוח ועמום. הנה הטיפים המובילים שלנו לטיפוח עור בחורף...',
  'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'אלנה וסקז'
),
(
  '5 סודות אנטי-אייג''ינג מקוסמטיקאיות מובילות',
  'anti-aging-secrets',
  'למדו את הטכניקות והמרכיבים המקצועיים שבאמת עושים את ההבדל.',
  'כשמדובר באנטי-אייג''ינג, יש הרבה רעש בחוץ. מה באמת עובד? שאלנו את הקוסמטיקאיות המובילות שלנו לשתף את הטיפים היעילים ביותר שלהן...',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'סופי חן'
),
(
  'איך להכין את העור ליום החתונה',
  'wedding-day-skin-prep',
  'מדריך זמנים וטיפולים מקיף לכלות עתידיות.',
  'יום החתונה שלכם הוא אחד הימים המצולמים ביותר בחייכם. עור זוהר ומושלם יעזור לכם להרגיש בטוחות ויפות...',
  'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'מריה סנטוס'
);

-- Enable realtime for bookings
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
