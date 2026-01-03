function getJadwal() {
  return JSON.parse(localStorage.getItem('planeta_jadwal')) || [];
}

function setJadwal(data) {
  localStorage.setItem('planeta_jadwal', JSON.stringify(data));
}

// SIMPAN DARI FORM
function planetaSimpanJadwal() {
  const judul = document.getElementById('input-judul').value.trim();
  const tanggal = document.getElementById('input-tanggal').value;

  if (!judul || !tanggal) {
    alert('Judul & tanggal wajib diisi');
    return;
  }

  const jadwal = getJadwal();
  jadwal.push({ judul, tanggal });
  setJadwal(jadwal);

  document.getElementById('input-judul').value = '';
  document.getElementById('input-tanggal').value = '';

  planetaRender();
}

// HAPUS DARI LIST
function planetaHapusJadwal(index) {
  const jadwal = getJadwal();
  jadwal.splice(index, 1);
  setJadwal(jadwal);
  planetaRender();
}

// TAMPILKAN LIST
function planetaTampilkanJadwal() {
  const jadwal = getJadwal();
  const el = document.getElementById('daftar-jadwal');

  if (jadwal.length === 0) {
    el.innerHTML = '<p style="color:#94a3b8">Belum ada jadwal.</p>';
    return;
  }

  el.innerHTML = jadwal.map((j, i) => `
    <div class="jadwal-item">
      <div>
        <strong>${j.judul}</strong><br>
        <small>${j.tanggal}</small>
      </div>
      <button onclick="planetaHapusJadwal(${i})">Hapus</button>
    </div>
  `).join('');
}

// INIT KALENDER
function planetaInitCalendar() {
  const el = document.getElementById('calendar');
  el.innerHTML = '';

  const jadwal = getJadwal();

  const calendar = new FullCalendar.Calendar(el, {
    initialView: 'dayGridMonth',
    locale: 'id',
    selectable: true,

    events: jadwal.map(j => ({
      title: j.judul,
      start: j.tanggal
    })),

    // KLIK TANGGAL = TAMBAH
    dateClick(info) {
      const judul = prompt('Judul kegiatan:');
      if (!judul) return;

      const data = getJadwal();
      data.push({ judul, tanggal: info.dateStr });
      setJadwal(data);

      calendar.addEvent({
        title: judul,
        start: info.dateStr
      });

      planetaTampilkanJadwal();
    },

    // KLIK EVENT = HAPUS
    eventClick(info) {
      if (!confirm(`Hapus "${info.event.title}"?`)) return;

      const newData = getJadwal().filter(j =>
        !(j.judul === info.event.title &&
          j.tanggal === info.event.startStr)
      );

      setJadwal(newData);
      info.event.remove();
      planetaTampilkanJadwal();
    }
  });

  calendar.render();
}

// RENDER SEMUA
function planetaRender() {
  planetaTampilkanJadwal();
  planetaInitCalendar();
}

document.addEventListener('DOMContentLoaded', planetaRender);
