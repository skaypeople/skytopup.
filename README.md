# SkyTopUp Website — Starter

Website responsif untuk SkyTopUp. File ini adalah **starter frontend** yang bisa dipublikasikan sebagai situs statis di Vercel.

## Yang sudah tersedia
- Tampilan responsif dengan menu Beranda, Riwayat, dan Akun.
- Form pemesanan game/pulsa/token/pajak yang membuka WhatsApp admin `6285720458256`.
- Daftar stok akun game demo dan tombol pemesanan WhatsApp.
- Riwayat dan stok demo tersimpan di `localStorage` browser/perangkat.

## Penting: status fitur
Versi ini **belum merupakan sistem transaksi online penuh**. Login/registrasi dan panel tambah stok masih berupa demo lokal di browser. Data lokal tidak dibagikan ke perangkat lain. Pembayaran otomatis, OTP sungguhan, integrasi distributor top-up, dan database/admin online belum dihubungkan.

Jangan masukkan data pelanggan sensitif atau menerima pembayaran seolah-olah sudah otomatis sebelum backend dan proses operasional disiapkan.

## Publikasikan gratis melalui Vercel
1. Buat akun GitHub dan Vercel.
2. Buat repository GitHub baru bernama `skytopup`.
3. Unggah `index.html`, `style.css`, dan `app.js` ke root repository.
4. Di Vercel pilih **Add New → Project**, lalu impor repository `skytopup`.
5. Framework Preset: **Other**. Build Command dan Output Directory dikosongkan bila diminta.
6. Tekan **Deploy**. Vercel akan memberi alamat `*.vercel.app` jika subdomain tersedia.

## Agar menjadi online sungguhan
Tahap berikutnya:
1. Buat proyek Supabase.
2. Tambahkan Supabase Auth (email/password dan konfigurasi SMS OTP bila diperlukan).
3. Buat tabel `profiles`, `orders`, dan `game_accounts`.
4. Aktifkan Row Level Security (RLS) dan kebijakan: pengguna hanya melihat pesanan sendiri; admin mengelola stok dan seluruh pesanan.
5. Sambungkan frontend ke Supabase menggunakan Project URL dan anon/publishable key. Jangan pernah menaruh service-role key di frontend.
6. Buat akun admin melalui Supabase Auth, lalu tetapkan role admin dari dashboard/database secara aman.

Admin yang pernah diminta: username `skyofc`. Demi keamanan, password admin jangan ditanam dalam JavaScript/HTML publik. Tetapkan password kuat secara pribadi setelah sistem autentikasi online dibuat.

## Catatan bisnis
Pembayaran pajak dan token listrik memerlukan mitra/penyedia resmi. Top up game dan pulsa memerlukan distributor/API resmi atau pemrosesan manual oleh admin. Selalu tampilkan harga, biaya, status, dan kebijakan pengembalian dengan jelas.
