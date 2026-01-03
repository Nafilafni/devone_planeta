let waktuAwal = 25 * 60; // detik
let waktu = waktuAwal;
let interval = null;
let aktif = false;

const timerEl = document.getElementById('timer');
const matkulEl = document.getElementById('fokusMatkul');

function updateTimer() {
  const menit = Math.floor(waktu / 60);
  const detik = waktu % 60;
  timerEl.textContent =
    `${menit.toString().padStart(2,'0')}:${detik.toString().padStart(2,'0')}`;
}

function mulaiFokus() {
  if (aktif) return;

  if (!matkulEl.value) {
    alert('Pilih mata kuliah dulu');
    return;
  }

  aktif = true;

  interval = setInterval(() => {
    if (waktu <= 0) {
      selesaiOtomatis();
      return;
    }
    waktu--;
    updateTimer();
  }, 1000);
}

function pauseFokus() {
  aktif = false;
  clearInterval(interval);
}

function resetFokus() {
  pauseFokus();
  waktu = waktuAwal;
  updateTimer();
}

function selesaiOtomatis() {
  pauseFokus();

  const durasiDipakai = Math.ceil((waktuAwal - waktu) / 60);

  if (durasiDipakai >= 1) {
    simpanRiwayatFokus(durasiDipakai);
  }

  alert('Sesi fokus selesai 🎉');
  resetFokus();
}

function selesaiManual() {
  pauseFokus();

  const durasiDipakai = Math.ceil((waktuAwal - waktu) / 60);

  if (durasiDipakai < 1) {
    alert('Belum ada durasi fokus yang tercatat');
    return;
  }

  simpanRiwayatFokus(durasiDipakai);
  alert('Fokus disimpan');
  resetFokus();
}

function simpanRiwayatFokus(durasiMenit) {
  const data = JSON.parse(localStorage.getItem('planeta_fokus')) || [];

  data.push({
    matkul: matkulEl.value,
    durasi: durasiMenit, // ⬅️ INI YANG DIPAKAI STATISTIK
    tanggal: new Date().toISOString()
  });

  localStorage.setItem('planeta_fokus', JSON.stringify(data));
}

updateTimer();
