import { useState, useEffect } from 'react'
import { Lock, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, User, X, Plus, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { Booking, Service } from '../../lib/supabase'
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, addWeeks, subWeeks, subMonths } from 'date-fns'
import { he } from 'date-fns/locale'

// Demo data
const demoServices: Record<string, Service> = {
    '1': { id: '1', title: 'טיפול פנים יוקרתי ייחודי', description: '', duration: 90, price: 695, image_url: '', full_page_content: { sections: [], benefits: [] }, created_at: '' },
    '2': { id: '2', title: 'התחדשות אנטי-אייג\'ינג', description: '', duration: 75, price: 890, image_url: '', full_page_content: { sections: [], benefits: [] }, created_at: '' },
    '3': { id: '3', title: 'חבילת איפור כלה', description: '', duration: 120, price: 1600, image_url: '', full_page_content: { sections: [], benefits: [] }, created_at: '' },
}

const demoBookings: Booking[] = [
    { id: '1', client_name: 'שרה כהן', client_email: 'sarah@example.com', date: format(new Date(), 'yyyy-MM-dd'), time: '10:00', service_id: '1', status: 'confirmed', created_at: '' },
    { id: '2', client_name: 'אמילי לוי', client_email: 'emily@example.com', date: format(new Date(), 'yyyy-MM-dd'), time: '14:00', service_id: '2', status: 'pending', created_at: '' },
]

const ADMIN_PASSWORD = 'luxe2024' // Simple password protection

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const [bookings, setBookings] = useState<Booking[]>([])
    const [services, setServices] = useState<Record<string, Service>>({})
    const [loading, setLoading] = useState(true)
    const [currentWeek, setCurrentWeek] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [showBlockModal, setShowBlockModal] = useState(false)
    const [blockTime, setBlockTime] = useState('')
    const [blockNote, setBlockNote] = useState('')

    // Business hours
    const hours = Array.from({ length: 10 }, (_, i) => i + 9) // 9 AM to 6 PM

    // Week days
    const weekStart = startOfWeek(currentWeek, { weekStartsOn: 0 })
    const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 0 })
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

    useEffect(() => {
        if (isAuthenticated) {
            fetchData()
            setupRealtimeSubscription()
        }
    }, [isAuthenticated])

    async function fetchData() {
        try {
            // Fetch bookings
            const { data: bookingsData } = await supabase
                .from('bookings')
                .select('*')
                .gte('date', format(subMonths(new Date(), 1), 'yyyy-MM-dd'))

            // Fetch services
            const { data: servicesData } = await supabase
                .from('services')
                .select('*')

            if (servicesData) {
                const servicesMap: Record<string, Service> = {}
                servicesData.forEach(s => { servicesMap[s.id] = s })
                setServices(servicesMap)
            } else {
                setServices(demoServices)
            }

            setBookings(bookingsData || demoBookings)
        } catch {
            setServices(demoServices)
            setBookings(demoBookings)
        } finally {
            setLoading(false)
        }
    }

    function setupRealtimeSubscription() {
        const subscription = supabase
            .channel('admin-bookings')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setBookings(prev => [...prev, payload.new as Booking])
                } else if (payload.eventType === 'DELETE') {
                    setBookings(prev => prev.filter(b => b.id !== (payload.old as Booking).id))
                } else if (payload.eventType === 'UPDATE') {
                    setBookings(prev => prev.map(b => b.id === (payload.new as Booking).id ? (payload.new as Booking) : b))
                }
            })
            .subscribe()

        return () => subscription.unsubscribe()
    }

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true)
            setError('')
        } else {
            setError('סיסמה שגויה')
        }
    }

    const getBookingsForSlot = (date: Date, hour: number) => {
        const dateStr = format(date, 'yyyy-MM-dd')
        return bookings.filter(
            b => b.date === dateStr && b.time.startsWith(`${hour.toString().padStart(2, '0')}:`)
        )
    }

    const handleBlockSlot = async () => {
        if (!selectedDate || !blockTime) return

        try {
            const { error } = await supabase.from('bookings').insert({
                client_name: 'חסום',
                client_email: 'admin@luxebeauty.co.il',
                date: format(selectedDate, 'yyyy-MM-dd'),
                time: blockTime,
                service_id: '1',
                status: 'blocked',
                notes: blockNote || 'נחסם על ידי המנהל',
            })

            if (error) throw error

            // For demo mode
            setBookings(prev => [...prev, {
                id: `blocked-${Date.now()}`,
                client_name: 'חסום',
                client_email: 'admin@luxebeauty.co.il',
                date: format(selectedDate, 'yyyy-MM-dd'),
                time: blockTime,
                service_id: '1',
                status: 'blocked',
                notes: blockNote || 'נחסם על ידי המנהל',
                created_at: new Date().toISOString(),
            }])
        } catch (err) {
            console.log('Using demo mode')
            // Add to local state for demo
            setBookings(prev => [...prev, {
                id: `blocked-${Date.now()}`,
                client_name: 'חסום',
                client_email: 'admin@luxebeauty.co.il',
                date: format(selectedDate, 'yyyy-MM-dd'),
                time: blockTime,
                service_id: '1',
                status: 'blocked',
                notes: blockNote || 'נחסם על ידי המנהל',
                created_at: new Date().toISOString(),
            }])
        }

        setShowBlockModal(false)
        setBlockTime('')
        setBlockNote('')
        setSelectedDate(null)
    }

    const handleDeleteBooking = async (bookingId: string) => {
        if (!confirm('האם אתם בטוחים שברצונכם למחוק תור זה?')) return

        try {
            await supabase.from('bookings').delete().eq('id', bookingId)
        } catch {
            // Demo mode - just remove from local state
        }
        setBookings(prev => prev.filter(b => b.id !== bookingId))
    }

    const updateBookingStatus = async (bookingId: string, status: string) => {
        try {
            await supabase.from('bookings').update({ status }).eq('id', bookingId)
        } catch {
            // Demo mode
        }
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: status as Booking['status'] } : b))
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'confirmed': return 'מאושר'
            case 'pending': return 'ממתין'
            case 'blocked': return 'חסום'
            case 'cancelled': return 'בוטל'
            default: return status
        }
    }

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                            <Lock className="w-8 h-8 text-gold" />
                        </div>
                        <h1 className="text-3xl font-serif text-white mb-2">גישת מנהל</h1>
                        <p className="text-gray-400">הזינו את הסיסמה לגישה ללוח הבקרה</p>
                    </div>

                    <div className="bg-white p-8 rounded-sm">
                        <div className="mb-4">
                            <label className="block text-sm text-charcoal mb-2">סיסמה</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                                className="w-full px-4 py-3 border border-gold/20 rounded-sm focus:outline-none focus:border-gold text-right"
                                placeholder="הזינו סיסמת מנהל"
                            />
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>
                        <button onClick={handleLogin} className="btn-primary w-full">
                            גישה ללוח הבקרה
                        </button>
                        <p className="text-xs text-center text-charcoal-light mt-4">
                            סיסמת הדגמה: luxe2024
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-cream pt-20">
            {/* Header */}
            <div className="bg-charcoal py-8">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="text-gold hover:text-gold-light transition-colors"
                        >
                            התנתקות
                        </button>
                        <div className="text-left">
                            <h1 className="text-3xl font-serif text-white">לוח בקרה</h1>
                            <p className="text-gray-400">ניהול התורים והלוח שנה</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'תורים להיום', value: bookings.filter(b => b.date === format(new Date(), 'yyyy-MM-dd') && b.status !== 'blocked').length },
                        { label: 'ממתינים', value: bookings.filter(b => b.status === 'pending').length },
                        { label: 'מאושרים', value: bookings.filter(b => b.status === 'confirmed').length },
                        { label: 'חסומים', value: bookings.filter(b => b.status === 'blocked').length },
                    ].map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-sm border border-gold/10">
                            <p className="text-charcoal-light text-sm">{stat.label}</p>
                            <p className="text-3xl font-serif text-charcoal">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Week Navigation */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => setCurrentWeek(new Date())}
                        className="text-gold hover:underline text-sm"
                    >
                        היום
                    </button>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                            className="p-2 hover:bg-white rounded-full transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-serif text-charcoal">
                            {format(weekStart, 'd בMMMM', { locale: he })} - {format(weekEnd, 'd בMMMM yyyy', { locale: he })}
                        </h2>
                        <button
                            onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
                            className="p-2 hover:bg-white rounded-full transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="bg-white rounded-sm border border-gold/10 overflow-hidden">
                    {/* Header Row */}
                    <div className="grid grid-cols-8 border-b border-gold/10">
                        <div className="p-4 bg-cream-dark text-sm font-medium text-charcoal-light">
                            שעה
                        </div>
                        {weekDays.map(day => (
                            <div
                                key={day.toISOString()}
                                className={`p-4 text-center border-r border-gold/10 ${isToday(day) ? 'bg-gold/10' : 'bg-cream-dark'
                                    }`}
                            >
                                <p className="text-xs text-charcoal-light">{format(day, 'EEEE', { locale: he })}</p>
                                <p className={`text-lg font-serif ${isToday(day) ? 'text-gold' : 'text-charcoal'}`}>
                                    {format(day, 'd')}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Time Slots */}
                    {hours.map(hour => (
                        <div key={hour} className="grid grid-cols-8 border-b border-gold/10 last:border-b-0">
                            <div className="p-4 text-sm text-charcoal-light bg-cream-dark border-l border-gold/10">
                                {`${hour.toString().padStart(2, '0')}:00`}
                            </div>
                            {weekDays.map(day => {
                                const slotBookings = getBookingsForSlot(day, hour)
                                const hasBooking = slotBookings.length > 0

                                return (
                                    <div
                                        key={day.toISOString()}
                                        className={`p-2 border-r border-gold/10 min-h-[80px] relative group cursor-pointer hover:bg-cream-dark transition-colors ${isToday(day) ? 'bg-gold/5' : ''
                                            }`}
                                        onClick={() => {
                                            if (!hasBooking) {
                                                setSelectedDate(day)
                                                setBlockTime(`${hour.toString().padStart(2, '0')}:00`)
                                                setShowBlockModal(true)
                                            }
                                        }}
                                    >
                                        {slotBookings.map(booking => (
                                            <div
                                                key={booking.id}
                                                className={`p-2 rounded text-xs mb-1 ${booking.status === 'blocked'
                                                    ? 'bg-gray-200 text-gray-600'
                                                    : booking.status === 'confirmed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gold/20 text-gold-dark'
                                                    }`}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <button
                                                        onClick={() => handleDeleteBooking(booking.id)}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/50 rounded"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                    <div className="text-left">
                                                        <p className="font-medium truncate">
                                                            {booking.status === 'blocked' ? 'חסום' : booking.client_name}
                                                        </p>
                                                        <p className="text-[10px] opacity-75">
                                                            {booking.time} • {services[booking.service_id]?.title || 'שירות'}
                                                        </p>
                                                    </div>
                                                </div>
                                                {booking.status === 'pending' && (
                                                    <button
                                                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                                        className="mt-1 text-[10px] bg-green-500 text-white px-2 py-0.5 rounded hover:bg-green-600"
                                                    >
                                                        אשר
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        {!hasBooking && (
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Plus className="w-5 h-5 text-charcoal-light" />
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>

                {/* Today's Bookings List */}
                <div className="mt-8">
                    <h3 className="text-xl font-serif text-charcoal mb-4">התורים להיום</h3>
                    <div className="space-y-3">
                        {bookings
                            .filter(b => b.date === format(new Date(), 'yyyy-MM-dd') && b.status !== 'blocked')
                            .sort((a, b) => a.time.localeCompare(b.time))
                            .map(booking => (
                                <div key={booking.id} className="bg-white p-4 rounded-sm border border-gold/10 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs ${booking.status === 'confirmed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gold/20 text-gold-dark'
                                            }`}>
                                            {getStatusLabel(booking.status)}
                                        </span>
                                        {booking.status === 'pending' && (
                                            <button
                                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                                className="btn-primary text-xs py-1 px-3"
                                            >
                                                אשר
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-left">
                                            <p className="font-serif text-charcoal">{booking.client_name}</p>
                                            <p className="text-sm text-charcoal-light">
                                                {booking.time} • {services[booking.service_id]?.title || 'שירות'}
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                                            <User className="w-6 h-6 text-gold" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        {bookings.filter(b => b.date === format(new Date(), 'yyyy-MM-dd') && b.status !== 'blocked').length === 0 && (
                            <p className="text-charcoal-light text-center py-8">אין תורים מתוכננים להיום</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Block Slot Modal */}
            {showBlockModal && (
                <div className="fixed inset-0 bg-charcoal/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-sm p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={() => setShowBlockModal(false)}>
                                <X className="w-5 h-5 text-charcoal-light" />
                            </button>
                            <h3 className="text-xl font-serif text-charcoal">חסום משבצת זמן</h3>
                        </div>
                        <p className="text-charcoal-light mb-4 text-right">
                            חסום {blockTime} ב-{selectedDate && format(selectedDate, 'd בMMMM yyyy', { locale: he })}
                        </p>
                        <div className="mb-4">
                            <label className="block text-sm text-charcoal mb-2 text-right">הערה (אופציונלי)</label>
                            <input
                                type="text"
                                value={blockNote}
                                onChange={(e) => setBlockNote(e.target.value)}
                                className="w-full px-4 py-2 border border-gold/20 rounded-sm focus:outline-none focus:border-gold text-right"
                                placeholder="סיבת החסימה..."
                            />
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleBlockSlot} className="btn-primary flex-1">
                                חסום משבצת
                            </button>
                            <button onClick={() => setShowBlockModal(false)} className="btn-secondary flex-1">
                                ביטול
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
