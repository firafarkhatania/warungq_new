Nama: Fira Farkhatania
NIM : 101230035
Kelas : TF23C

# WarungQ New

WarungQ New adalah aplikasi web modern yang dirancang untuk membantu warung atau usaha kuliner kecil mengelola pesanan secara sederhana dan cepat. Aplikasi ini menampilkan pengalaman seperti sistem kasir digital, dengan fokus pada kemudahan navigasi, pemilihan menu, dan proses checkout yang intuitif.

## Deskripsi Singkat

Proyek ini dibangun menggunakan React dan Vite untuk memberikan antarmuka yang cepat, ringan, dan mudah dikembangkan. WarungQ New cocok digunakan sebagai prototype atau dasar pengembangan sistem kasir digital yang dapat dikembangkan lebih lanjut dengan fitur autentikasi nyata, database, hingga integrasi pembayaran.

## Fitur Utama

- Alur login dan daftar sederhana untuk simulasi akses pengguna
- Katalog menu yang dikelompokkan berdasarkan kategori seperti makanan, minuman, dan snack
- Keranjang belanja interaktif dengan penambahan, pengurangan, dan penghapusan item
- Proses checkout dengan pilihan pembayaran tunai atau QRIS
- Riwayat transaksi beserta ringkasan pembelian
- Tampilan desain yang ramah pengguna dan menarik untuk pengalaman kasir digital

## Alur Pengguna

1. Pengguna membuka aplikasi dan masuk ke halaman autentikasi.
2. Setelah login, pengguna dapat melihat daftar menu yang tersedia.
3. Pengguna memilih item makanan/minuman dan menambahkannya ke keranjang.
4. Saat checkout, pengguna memilih metode pembayaran.
5. Pesanan kemudian disimpan ke riwayat transaksi dan menampilkan status pembayaran.

## Teknologi yang Digunakan

- React 19
- Vite
- ESLint
- Lucide React
- CSS modular untuk styling tampilan

## Menjalankan Proyek Secara Lokal

1. Clone repository ini:
   ```bash
   git clone https://github.com/firafarkhatania/warungq_new.git
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd warungq_new
   ```
3. Install dependensi:
   ```bash
   npm install
   ```
4. Jalankan development server:
   ```bash
   npm run dev
   ```
5. Buka browser ke alamat yang ditampilkan oleh Vite, biasanya http://localhost:5173

## Verifikasi yang Sudah Dilakukan

Proyek ini telah diuji secara lokal dengan hasil berikut:

- `npm run build` ✅
- `npm run lint` ✅

## Struktur Utama Proyek

- [src/App.jsx](src/App.jsx) — komponen utama aplikasi dan logika bisnis UI
- [src/main.jsx](src/main.jsx) — entry point aplikasi React
- [src/App.css](src/App.css) — styling antarmuka utama
- [public](public) — aset statis yang disediakan untuk aplikasi


