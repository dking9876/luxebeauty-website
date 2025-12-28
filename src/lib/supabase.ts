import { createClient } from '@supabase/supabase-js'

// Fallback to empty strings if env vars missing - app will use demo data
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

const envVarsPresent = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY

if (!envVarsPresent) {
    console.warn('Supabase env vars not configured - using demo mode');
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
