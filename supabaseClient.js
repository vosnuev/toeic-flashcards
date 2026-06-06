const SUPABASE_URL = 'https://qwejbebfbwohjdhqivzm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_OD-adr7NeT45gDrwKgO2mQ_s0TEKc3y';

(() => {
    const sdk = window.supabase;
    if (!sdk || typeof sdk.createClient !== 'function') {
        console.error('Supabase SDK is not loaded.');
        return;
    }

    window.supabaseClient = sdk.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
})();
