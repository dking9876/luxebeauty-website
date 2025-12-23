import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

console.log('Initializing Supabase...', { urlPresent: !!supabaseUrl, keyPresent: !!supabaseAnonKey });

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL or Key missing!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Service {
    id: string
    title: string
    description: string
    duration: number
    price: number
    image_url: string
    full_page_content: {
        sections: Array<{
            type: 'text' | 'image' | 'list'
            content: string | string[]
        }>
        benefits: string[]
        aftercare?: string
    }
    created_at: string
}

export interface Booking {
    id: string
    client_name: string
    client_email: string
    client_phone?: string
    date: string
    time: string
    service_id: string
    status: 'pending' | 'confirmed' | 'blocked' | 'cancelled'
    notes?: string
    created_at: string
    service?: Service
}

export interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    image_url: string
    author: string
    published_at: string
    created_at: string
}
