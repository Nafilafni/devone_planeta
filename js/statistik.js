function ambilFokus() {
  return JSON.parse(localStorage.getItem('planeta_fokus')) || [];
}

function renderStatistik() {
  const data = ambilFokus();

  // TOTAL SESI
  document.getElementById('totalSesi').textContent = data.length;

  // TOTAL MENIT (PAKAI DATA ASLI)
  const totalMenit = data.reduce((sum, d) => {
    return sum + Number(d.durasi || 0);
  }, 0);

  document.getElementById('totalMenit').textContent =
    `${totalMenit} menit`;

  // ===== GROUP PER MATKUL =====
  const group = {};
  data.forEach(d => {
    if (!group[d.matkul]) group[d.matkul] = 0;
    group[d.matkul] += Number(d.durasi || 0);
  });

  const statMatkul = document.getElementById('statMatkul');

  if (Object.keys(group).length === 0) {
    statMatkul.innerHTML = '<p>Belum ada data.</p>';
  } else {
    statMatkul.innerHTML = Object.keys(group).map(matkul => `
      <div class="stat-row">
        <span>${matkul}</span>
        <strong>${group[matkul]} menit</strong>
      </div>
    `).join('');
  }

  // ===== RIWAYAT =====
  const riwayat = document.getElementById('riwayatFokus');

  if (data.length === 0) {
    riwayat.innerHTML = '<li>Belum ada riwayat.</li>';
  } else {
    riwayat.innerHTML = data.slice(-5).reverse().map(d => `
      <li>
        <strong>${d.matkul}</strong>
        <span>
          ${d.durasi} menit ·
          ${new Date(d.tanggal).toLocaleDateString('id-ID')}
        </span>
      </li>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', renderStatistik);
