bisa bantu saya untuk membuat sebuah ui/ux untuk android dengan menggunakan dasar dari penugasan saya yg ada di pdf untuk promt nya seperti ini .

Design a highly detailed, professional, and modern multi-screen mobile app UI for a "Smart Greenhouse Auto-Control" system. The design must use a cohesive design system. 

GLOBAL DESIGN SYSTEM:
- Background Color: Light Gray (#F8F9FA) for the main canvas to make cards pop.
- Card Color: Pure White (#FFFFFF) with a very soft, subtle drop shadow (e.g., Y: 4, Blur: 10, Opacity: 5%).
- Primary Color: Soft Pastel Blue (#3B82F6) for main buttons and active states.
- Success Color: Emerald Green (#22C55E) for "ON" states and stable conditions.
- Warning/Off Color: Slate Gray (#64748B) or soft Orange (#F97316) for alerts.
- Typography: Use "Inter" or "SF Pro Display". Use bold weights for numbers and headings, and regular weights for secondary text.
- Corner Radius: 16px for all cards, 12px for buttons, and 24px for large hero elements.
- Navigation: Include a persistent Bottom Navigation Bar on all screens (except Login) with 4 uniform outline icons: Home, Chart (History), Clock (Schedule), and Gear (Settings).

Generate the following 5 specific screens side-by-side:

1. LOGIN SCREEN:
- Minimalist and secure layout.
- Top: A modern, abstract leaf or greenhouse vector logo. Below it, an H1 bold title "Magetan Greenhouse" and a subtitle "Sistem Otomasi berbasis Fuzzy Logic".
- Middle: Two large, rounded input fields with a light gray border. Field 1 placeholder: "ID Operator / Email". Field 2 placeholder: "Kata Sandi" (include a small eye icon on the right edge).
- Bottom: A right-aligned small text link "Lupa kata sandi?". Below that, a full-width, thick Primary Blue button labeled "Masuk Sistem" in bold white text.

2. DASHBOARD SCREEN (Home):
- Top App Bar: Text "Beranda" and a notification bell icon on the right.
- Hero Card (Top): A prominent card showing real-time climate. Large bold text "28°C" in the center. Below it, secondary text "Kelembaban 65%". Include a dynamic weather icon (e.g., a sun with a cloud). At the bottom of the card, a small green pill-shaped tag with white text "Kondisi Stabil".
- AI Analysis Card (Middle 1): Title "Transparansi Fuzzy Logic" (H3 bold). Body text: "Sensor membaca suhu PANAS dan kelembaban NORMAL. Keputusan inferensi: Kipas ON, Pemanas OFF." Make this card have a subtle blue background tint.
- Setpoint Control Card (Middle 2): Title "Atur Target Suhu". A horizontal layout containing a gray circular "-" button, a large central text "25°C", and a primary blue circular "+" button.
- Actuators Grid (Bottom): A 2-column grid. Left card: Fan outline icon, text "Kipas Sirkulasi", and a bright green badge saying "ON". Right card: Fire/Heater outline icon, text "Pemanas", and a slate gray badge saying "OFF".

3. ANALYTICS & HISTORY SCREEN:
- Top App Bar: Text "Riwayat Data".
- Filter Row: A horizontally scrolling row of filter chips. Chip 1: "Hari Ini" (Solid blue background, white text). Chip 2: "7 Hari" (White background, gray text, gray border). Chip 3: "30 Hari".
- Chart Section: A large, elegant smooth curved line chart (spline area chart). Show two intersecting lines (Blue for Humidity, Orange for Temperature) with a soft, semi-transparent gradient fill under the curves. Include X-axis labels (time: 08:00, 12:00, 16:00).
- Log List Section: Title "Aktivitas Terakhir". A vertical list of 3 items. Each item has a circular icon, a timestamp (e.g., "14:05 WIB"), and a description (e.g., "Suhu ruangan mencapai 30°C. Kipas sirkulasi otomatis diaktifkan.").
- FAB: A Primary Blue Floating Action Button at the bottom right corner with a white "Download" icon.

4. SCHEDULING SCREEN (RTC Management):
- Top App Bar: Text "Jadwal Operasional".
- Content: A vertical list of large, spacious cards.
- Card 1: Bold title "Jadwal Siang". Below it, text "Waktu: 06:00 - 18:00" and "Suhu Target: 24°C". On the right side of the card, a green active iOS-style toggle switch.
- Card 2: Bold title "Jadwal Malam". Below it, text "Waktu: 18:00 - 06:00" and "Suhu Target: 27°C". On the right side, a gray inactive toggle switch.
- FAB: A Primary Blue Floating Action Button at the bottom right corner with a white "+" icon to add a new schedule.

5. SETTINGS & TESTING SCREEN:
- Top App Bar: Text "Profil & Pengaturan".
- Profile Header: A large circular avatar placeholder. Below it, bold text "Operator Sistem", and subtext "ID: 25051204370" with a green connection dot.
- Settings Group 1 (Tampilan): Title "Preferensi". Row item "Mode Gelap" with an inactive toggle switch.
- Settings Group 2 (Simulasi & Pengujian): Title "Mode Pengembang". Row item "Aktifkan Simulasi Sensor" with an active green toggle switch. Below it, two prominent horizontal slider components (track bars) with draggable thumbs. Label the first slider "Manipulasi Suhu (0-50°C)" and the second "Manipulasi Kelembaban (0-100%)".
- Bottom: A full-width button with a soft red outline and red text labeled "Keluar (Logout)".