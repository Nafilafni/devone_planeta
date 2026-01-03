// Ambil data jadwal dari LocalStorage
function planetaAmbilJadwal() {
  return JSON.parse(localStorage.getItem('planeta_jadwal')) || [];
}

// Tampilkan ringkasan jadwal di dashboard
function planetaTampilkanJadwal() {
  const jadwal = planetaAmbilJadwal();
  const container = document.getElementById('daftar-jadwal');

  if (!container) return;

  if (jadwal.length === 0) {
    container.innerHTML =
      '<p style="color:#6b7280;">Belum ada jadwal. Klik “Tambah” untuk mulai.</p>';
    return;
  }

  // Ambil maksimal 3 jadwal terdekat
  const tampil = jadwal
    .filter(j => j.tanggal)
    .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
    .slice(0, 3);

  container.innerHTML = tampil.map(item => {
    const tgl = new Date(item.tanggal).toLocaleDateString('id-ID', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });

    return `
      <div class="jadwal-item">
        <h5>${item.judul}</h5>
        <small>${tgl}</small>
      </div>
    `;
  }).join('');
}

// Jalan saat dashboard dibuka
document.addEventListener('DOMContentLoaded', planetaTampilkanJadwal);
