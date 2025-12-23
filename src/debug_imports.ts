console.log('Debug imports starting');

try {
    await import('./lib/supabase');
    console.log('✅ Supabase imported');
} catch (e) {
    console.error('❌ Supabase failed', e);
}

try {
    await import('./components/layout/Header');
    console.log('✅ Header imported');
} catch (e) {
    console.error('❌ Header failed', e);
}

try {
    await import('./components/layout/Footer');
    console.log('✅ Footer imported');
} catch (e) {
    console.error('❌ Footer failed', e);
}

try {
    await import('./components/layout/Layout');
    console.log('✅ Layout imported');
} catch (e) {
    console.error('❌ Layout failed', e);
}

try {
    await import('./pages/Home');
    console.log('✅ Home imported');
} catch (e) {
    console.error('❌ Home failed', e);
}

try {
    await import('./pages/About');
    console.log('✅ About imported');
} catch (e) {
    console.error('❌ About failed', e);
}

try {
    await import('./pages/Services');
    console.log('✅ Services imported');
} catch (e) {
    console.error('❌ Services failed', e);
}

try {
    await import('./pages/BookOnline');
    console.log('✅ BookOnline imported');
} catch (e) {
    console.error('❌ BookOnline failed', e);
}

try {
    await import('./pages/admin/Dashboard');
    console.log('✅ AdminDashboard imported');
} catch (e) {
    console.error('❌ AdminDashboard failed', e);
}

try {
    await import('./App');
    console.log('✅ App imported');
} catch (e) {
    console.error('❌ App failed', e);
}

console.log('Debug imports finished');
