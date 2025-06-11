# Sistem-rekomendasi-game-Capstone

Sebuah aplikasi web dengan fitur menampilkan list game yang hits, up to date serta dilengkapi dengan sistem rekomendasi game yang menjadi fitur utama dalam pembuatan aplikasi ini

Jalankan dashboard (3 terminal di vs code) :

- npm run start
- node src/pages/steam-proxy.js
- cd src/database
  node server.js
- uvicorn recccommendation:app --reload
- buat database: user_account (Workbench, CLI, phpMyAdmin, etc.)
- open xampp start mysql dan apache
- jika gagal login, npm install bcrypt@6.0.0

Update untuk fitur search-bar
Update untuk pembuatan halaman deskripsi game (untuk data card game rekomendasi deskripsi page otw ya... Error mulu dah-\_-) ini done

fitur keseluruhan :

- halaman homepage untuk menampilkan data game rekomendansi awal berdasarkan id game steam yang ditetapkan (done)
- menampilkan data game (done)
- halaman deskripsi game (done)
- form regis dan login lengkap dengan database dan validasi ketika berhasil login (done)
- fitur search-bar untuk mencari semua data game yang ada di steam (done)
- fitur similiar game ketika melihat deskripsi game (deskripsi outlast maka keluar outlast 2 dan seterusnya yang berkaitan) (done)
- button logout untuk ke homepage versi sebelum login. (done)
- koleksi page ketika user menyimpan data game yang diinginkan (done)
- UI halaman chatbot (done).
- fitur rekomendasi game dari machine learning berdasarkan beberapa input atau menuliskan deskripsi (coming soon)
- evaluasi UI secara keseluruhan (coming soon)
