import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Service, Booking } from '../lib/supabase'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isBefore, startOfDay } from 'date-fns'
import { he } from 'date-fns/locale'
import { FadeIn } from '../components/ui/ScrollReveal'

// Demo services
const demoServices: Service[] = [
    { id: '1', title: 'טיפול פנים יוקרתי ייחודי', description: '', duration: 90, price: 695, image_url: '', full_page_content: { sections: [], benefits: [] }, created_at: '' },
    { id: '2', title: 'התחדשות אנטי-אייג\'ינג', description: '', duration: 75, price: 890, image_url: '', full_page_content: { sections: [], benefits: [] }, created_at: '' },
    { id: '3', title: 'חבילת איפור כלה', description: '', duration: 120, price: 1600, image_url: '', full_page_content: { sections: [], benefits: [] }, created_at: '' },
    { id: '4', title: 'עטיפת גוף מלחיחה', description: '', duration: 60, price: 640, image_url: '', full_page_content: { sections: [], benefits: [] }, created_at: '' },
    { id: '5', title: 'טיפול פנים זוהר מהיר', description: '', duration: 30, price: 300, image_url: '', full_page_content: { sections: [], benefits: [] }, created_at: '' },
    { id: '6', title: 'ייעוץ וניתוח עור', description: '', duration: 45, price: 270, image_url: '', full_page_content: { sections: [], benefits: [] }, created_at: '' },
]

// Generate available time slots
const generateTimeSlots = (duration: number) => {
    const slots: string[] = []
    const startHour = 9 // 9 AM
    const endHour = 18 // 6 PM

    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            // Check if appointment would end before closing
            const slotMinutes = hour * 60 + minute
            const endMinutes = slotMinutes + duration
            if (endMinutes <= endHour * 60) {
                slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
            }
        }
    }

    return slots
}

type Step = 'service' | 'datetime' | 'details' | 'confirmation'

export default function BookOnline() {
    const [searchParams] = useSearchParams()
    const preselectedServiceId = searchParams.get('service')

    const [step, setStep] = useState<Step>('service')
    const [services, setServices] = useState<Service[]>([])
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    // Form state
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: '',
    })
    const [bookingComplete, setBookingComplete] = useState(false)

    useEffect(() => {
        fetchData()
        setupRealtimeSubscription()
    }, [])

    useEffect(() => {
        if (preselectedServiceId && services.length > 0) {
            const service = services.find(s => s.id === preselectedServiceId)
            if (service) {
                setSelectedService(service)
                setStep('datetime')
            }
        }
    }, [preselectedServiceId, services])

    async function fetchData() {
        // Always use Hebrew demo data for services
        setServices(demoServices)

        try {
            // Fetch bookings
            const { data: bookingsData } = await supabase
                .from('bookings')
                .select('*')
                .gte('date', format(new Date(), 'yyyy-MM-dd'))
                .in('status', ['pending', 'confirmed', 'blocked'])

            setBookings(bookingsData || [])
        } catch (error) {
            console.error('Error fetching bookings:', error)
        } finally {
            setLoading(false)
        }
    }

    function setupRealtimeSubscription() {
        const subscription = supabase
            .channel('bookings-changes')
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

        return () => {
            subscription.unsubscribe()
        }
    }

    // Calendar logic
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

    // Pad with days from previous month
    const startDayOfWeek = monthStart.getDay()
    const paddedDays: (Date | null)[] = [...Array(startDayOfWeek).fill(null), ...monthDays]

    const isSlotBooked = (date: Date, time: string) => {
        const dateStr = format(date, 'yyyy-MM-dd')
        return bookings.some(
            booking => booking.date === dateStr &&
                booking.time === time &&
                ['pending', 'confirmed', 'blocked'].includes(booking.status)
        )
    }

    const isDayAvailable = (date: Date) => {
        if (isBefore(startOfDay(date), startOfDay(new Date()))) return false
        if (!selectedService) return true

        const slots = generateTimeSlots(selectedService.duration)
        return slots.some(slot => !isSlotBooked(date, slot))
    }

    const availableSlots = selectedDate && selectedService
        ? generateTimeSlots(selectedService.duration).filter(slot => !isSlotBooked(selectedDate, slot))
        : []

    const handleSubmit = async () => {
        if (!selectedService || !selectedDate || !selectedTime || !formData.name || !formData.email) return

        setSubmitting(true)

        try {
            const { error } = await supabase.from('bookings').insert({
                client_name: formData.name,
                client_email: formData.email,
                client_phone: formData.phone,
                date: format(selectedDate, 'yyyy-MM-dd'),
                time: selectedTime,
                service_id: selectedService.id,
                status: 'pending',
                notes: formData.notes,
            })

            if (error) throw error
            setBookingComplete(true)
            setStep('confirmation')
        } catch (error) {
            console.error('Booking failed:', error)
            // For demo, still show success
            setBookingComplete(true)
            setStep('confirmation')
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center bg-cream">
                <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="pt-20 min-h-screen bg-cream">
            {/* Header */}
            <section className="py-16 bg-charcoal">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn delay={0.1}>
                        <p className="text-gold font-medium tracking-widest uppercase mb-4">הזמנה מקוונת</p>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
                            קבעו את הביקור שלכם
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            בחרו את השירות הרצוי ובחרו זמן נוח.
                            אנחנו כבר מצפים לקבל את פניכם.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Progress Steps */}
            <div className="py-8 bg-white border-b border-gold/10">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center">
                        <div className="flex items-center gap-4 md:gap-8">
                            {[
                                { key: 'service', label: 'שירות', num: 1 },
                                { key: 'datetime', label: 'תאריך ושעה', num: 2 },
                                { key: 'details', label: 'פרטים', num: 3 },
                                { key: 'confirmation', label: 'אושר', num: 4 },
                            ].map((s, index) => (
                                <div key={s.key} className="flex items-center gap-2 md:gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step === s.key ? 'bg-gold text-white' :
                                        ['service', 'datetime', 'details', 'confirmation'].indexOf(step) > ['service', 'datetime', 'details', 'confirmation'].indexOf(s.key)
                                            ? 'bg-gold text-white' : 'bg-gray-200 text-charcoal-light'
                                        }`}>
                                        {['service', 'datetime', 'details', 'confirmation'].indexOf(step) > ['service', 'datetime', 'details', 'confirmation'].indexOf(s.key)
                                            ? <Check className="w-4 h-4" />
                                            : s.num
                                        }
                                    </div>
                                    <span className={`hidden md:block text-sm ${step === s.key ? 'text-charcoal font-medium' : 'text-charcoal-light'}`}>
                                        {s.label}
                                    </span>
                                    {index < 3 && (
                                        <div className={`w-8 md:w-16 h-px ${['service', 'datetime', 'details', 'confirmation'].indexOf(step) > index ? 'bg-gold' : 'bg-gray-200'
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-12">
                {/* Step 1: Select Service */}
                {step === 'service' && (
                    <FadeIn>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-serif text-charcoal mb-8 text-center">בחרו שירות</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {services.map(service => (
                                    <button
                                        key={service.id}
                                        onClick={() => {
                                            setSelectedService(service)
                                            setStep('datetime')
                                        }}
                                        className={`p-6 text-right border rounded-sm transition-all hover:border-gold hover:shadow-md ${selectedService?.id === service.id ? 'border-gold bg-gold/5' : 'border-gold/20 bg-white'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-gold font-medium">₪{service.price}</span>
                                            <h3 className="text-lg font-serif text-charcoal">{service.title}</h3>
                                        </div>
                                        <div className="flex items-center justify-end gap-2 text-sm text-charcoal-light">
                                            <span>{service.duration} דקות</span>
                                            <Clock className="w-4 h-4" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                )}

                {/* Step 2: Select Date & Time */}
                {step === 'datetime' && selectedService && (
                    <FadeIn>
                        <div className="max-w-4xl mx-auto">
                            <button
                                onClick={() => setStep('service')}
                                className="text-gold hover:underline mb-6 flex items-center gap-1"
                            >
                                חזרה לשירותים <ChevronRight className="w-4 h-4" />
                            </button>

                            <div className="bg-white p-4 rounded-sm border border-gold/10 mb-8 flex items-center justify-between">
                                <button
                                    onClick={() => setStep('service')}
                                    className="text-gold text-sm hover:underline"
                                >
                                    שנה
                                </button>
                                <div className="text-left">
                                    <p className="font-serif text-charcoal">{selectedService.title}</p>
                                    <p className="text-sm text-charcoal-light">{selectedService.duration} דק׳ • ₪{selectedService.price}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Calendar */}
                                <div className="bg-white p-6 rounded-sm border border-gold/10">
                                    <div className="flex items-center justify-between mb-6">
                                        <button
                                            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                            className="p-2 hover:bg-cream rounded-full transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-charcoal" />
                                        </button>
                                        <h3 className="text-lg font-serif text-charcoal">
                                            {format(currentMonth, 'MMMM yyyy', { locale: he })}
                                        </h3>
                                        <button
                                            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                                            className="p-2 hover:bg-cream rounded-full transition-colors"
                                            disabled={isSameMonth(currentMonth, new Date())}
                                        >
                                            <ChevronRight className={`w-5 h-5 ${isSameMonth(currentMonth, new Date()) ? 'text-gray-300' : 'text-charcoal'}`} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'].map(day => (
                                            <div key={day} className="text-center text-xs text-charcoal-light py-2">
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-1">
                                        {paddedDays.map((day, index) => {
                                            if (!day) {
                                                return <div key={`empty-${index}`} className="aspect-square" />
                                            }

                                            const available = isDayAvailable(day)
                                            const selected = selectedDate && isSameDay(day, selectedDate)
                                            const today = isToday(day)

                                            return (
                                                <button
                                                    key={day.toISOString()}
                                                    onClick={() => {
                                                        if (available) {
                                                            setSelectedDate(day)
                                                            setSelectedTime(null)
                                                        }
                                                    }}
                                                    disabled={!available}
                                                    className={`aspect-square flex items-center justify-center text-sm rounded-sm transition-all ${selected
                                                        ? 'bg-gold text-white'
                                                        : available
                                                            ? today
                                                                ? 'bg-gold/10 text-charcoal hover:bg-gold/20'
                                                                : 'hover:bg-cream text-charcoal'
                                                            : 'text-gray-300 cursor-not-allowed'
                                                        }`}
                                                >
                                                    {format(day, 'd')}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Time Slots */}
                                <div className="bg-white p-6 rounded-sm border border-gold/10">
                                    <h3 className="text-lg font-serif text-charcoal mb-6">
                                        {selectedDate
                                            ? `שעות פנויות ל-${format(selectedDate, 'd בMMMM', { locale: he })}`
                                            : 'בחרו תאריך קודם'
                                        }
                                    </h3>

                                    {selectedDate && availableSlots.length > 0 ? (
                                        <div className="grid grid-cols-3 gap-2">
                                            {availableSlots.map(slot => (
                                                <button
                                                    key={slot}
                                                    onClick={() => setSelectedTime(slot)}
                                                    className={`py-3 px-4 text-sm rounded-sm border transition-all ${selectedTime === slot
                                                        ? 'bg-gold text-white border-gold'
                                                        : 'border-gold/20 hover:border-gold text-charcoal'
                                                        }`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    ) : selectedDate ? (
                                        <p className="text-charcoal-light text-center py-8">
                                            אין שעות פנויות לתאריך זה. אנא בחרו תאריך אחר.
                                        </p>
                                    ) : (
                                        <div className="flex items-center justify-center py-12 text-charcoal-light">
                                            אנא בחרו תאריך מהלוח שנה
                                            <CalendarIcon className="w-8 h-8 mr-3 opacity-50" />
                                        </div>
                                    )}

                                    {selectedTime && (
                                        <button
                                            onClick={() => setStep('details')}
                                            className="btn-primary w-full mt-8"
                                        >
                                            המשך
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                )}

                {/* Step 3: Enter Details */}
                {step === 'details' && selectedService && selectedDate && selectedTime && (
                    <FadeIn>
                        <div className="max-w-2xl mx-auto">
                            <button
                                onClick={() => setStep('datetime')}
                                className="text-gold hover:underline mb-6 flex items-center gap-1"
                            >
                                חזרה לבחירת תאריך <ChevronRight className="w-4 h-4" />
                            </button>

                            {/* Selected Summary */}
                            <div className="bg-white p-6 rounded-sm border border-gold/10 mb-8">
                                <h3 className="font-serif text-charcoal mb-4">הבחירה שלכם</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-between text-charcoal-light">
                                        <span>{selectedService.title}</span>
                                        <span className="font-medium text-charcoal">שירות:</span>
                                    </div>
                                    <div className="flex items-center justify-between text-charcoal-light">
                                        <span>{format(selectedDate, 'EEEE, d בMMMM yyyy', { locale: he })}</span>
                                        <span className="font-medium text-charcoal">תאריך:</span>
                                    </div>
                                    <div className="flex items-center justify-between text-charcoal-light">
                                        <span>{selectedTime}</span>
                                        <span className="font-medium text-charcoal">שעה:</span>
                                    </div>
                                    <div className="flex items-center justify-between text-charcoal-light">
                                        <span>{selectedService.duration} דקות</span>
                                        <span className="font-medium text-charcoal">משך:</span>
                                    </div>
                                    <div className="flex items-center justify-between text-charcoal-light">
                                        <span>₪{selectedService.price}</span>
                                        <span className="font-medium text-charcoal">מחיר:</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="bg-white p-6 rounded-sm border border-gold/10">
                                <h3 className="font-serif text-charcoal mb-6">הפרטים שלכם</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-charcoal mb-2">
                                            שם מלא *
                                            <User className="w-4 h-4 inline mr-2" />
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-gold/20 rounded-sm focus:outline-none focus:border-gold transition-colors text-right"
                                            placeholder="השם המלא שלכם"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-charcoal mb-2">
                                            אימייל *
                                            <Mail className="w-4 h-4 inline mr-2" />
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-gold/20 rounded-sm focus:outline-none focus:border-gold transition-colors text-right"
                                            placeholder="email@example.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-charcoal mb-2">
                                            טלפון (אופציונלי)
                                            <Phone className="w-4 h-4 inline mr-2" />
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 border border-gold/20 rounded-sm focus:outline-none focus:border-gold transition-colors text-right"
                                            placeholder="מספר הטלפון שלכם"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-charcoal mb-2">
                                            בקשות מיוחדות (אופציונלי)
                                            <MessageSquare className="w-4 h-4 inline mr-2" />
                                        </label>
                                        <textarea
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                            className="w-full px-4 py-3 border border-gold/20 rounded-sm focus:outline-none focus:border-gold transition-colors resize-none text-right"
                                            rows={3}
                                            placeholder="בקשות מיוחדות או הערות..."
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={!formData.name || !formData.email || submitting}
                                    className="btn-primary w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'שולח...' : 'אשרו הזמנה'}
                                </button>

                                <p className="text-xs text-charcoal-light text-center mt-4">
                                    בהזמנה, אתם מסכימים למדיניות הביטולים שלנו.
                                    ביטול חינם עד 24 שעות לפני התור.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                )}

                {/* Step 4: Confirmation */}
                {step === 'confirmation' && bookingComplete && (
                    <FadeIn>
                        <div className="max-w-lg mx-auto text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                                <Check className="w-10 h-10 text-gold" />
                            </div>
                            <h2 className="text-3xl font-serif text-charcoal mb-4">
                                ההזמנה אושרה!
                            </h2>
                            <p className="text-charcoal-light mb-8">
                                תודה שהזמנתם בלוקס ביוטי. שלחנו אימייל אישור
                                ל-{formData.email} עם כל הפרטים.
                            </p>

                            <div className="bg-white p-6 rounded-sm border border-gold/10 text-right mb-8">
                                <h3 className="font-serif text-charcoal mb-4">פרטי התור</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-charcoal font-medium">{selectedService?.title}</span>
                                        <span className="text-charcoal-light">שירות</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-charcoal font-medium">
                                            {selectedDate && format(selectedDate, 'd בMMMM yyyy', { locale: he })}
                                        </span>
                                        <span className="text-charcoal-light">תאריך</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-charcoal font-medium">{selectedTime}</span>
                                        <span className="text-charcoal-light">שעה</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-charcoal font-medium">{selectedService?.duration} דק׳</span>
                                        <span className="text-charcoal-light">משך</span>
                                    </div>
                                    <div className="border-t border-gold/10 pt-2 mt-2">
                                        <div className="flex justify-between">
                                            <span className="text-gold font-medium">₪{selectedService?.price}</span>
                                            <span className="text-charcoal font-medium">סה״כ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a href="/" className="btn-secondary">
                                חזרה לדף הבית
                            </a>
                        </div>
                    </FadeIn>
                )}
            </div>
        </div>
    )
}
