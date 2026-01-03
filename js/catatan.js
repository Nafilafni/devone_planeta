function ambilCatatan() {
  return JSON.parse(localStorage.getItem('planeta_catatan')) || [];
}

function simpanCatatan() {
  const matkul = matkulCatatan.value;
  const judul = judulCatatan.value.trim();
  const deskripsi = deskripsiCatatan.value.trim();
  const file = fileCatatan.files[0];

  if (!matkul || !judul) {
    alert('Mata kuliah & judul wajib diisi');
    return;
  }

  if (!file) {
    tambahCatatan(matkul, judul, deskripsi, null);
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    tambahCatatan(matkul, judul, deskripsi, {
      name: file.name,
      type: file.type,
      data: reader.result
    });
  };
  reader.readAsDataURL(file);
}

function tambahCatatan(matkul, judul, deskripsi, file) {
  const data = ambilCatatan();

  data.push({
  id: Date.now(), 
  matkul,
  judul,
  deskripsi,
  file
});

  localStorage.setItem('planeta_catatan', JSON.stringify(data));

  matkulCatatan.value = '';
  judulCatatan.value = '';
  deskripsiCatatan.value = '';
  fileCatatan.value = '';

  renderCatatan();
}

function renderCatatan() {
  const data = ambilCatatan();
  const el = document.getElementById('daftar-catatan');

  if (data.length === 0) {
    el.innerHTML = '<p>Belum ada catatan.</p>';
    return;
  }

  // grouping per matkul
  const group = {};
  data.forEach(c => {
    if (!group[c.matkul]) group[c.matkul] = [];
    group[c.matkul].push(c);
  });

  el.innerHTML = Object.keys(group).map(matkul => `
    <div class="matkul-group">
      <h3>${matkul}</h3>

      ${group[matkul].map((c, i) => `
        <div class="catatan-item">
          <div>
            <h4>${c.judul}</h4>
            <p>${c.deskripsi || ''}</p>
            ${c.file ? previewFile(c.file) : ''}
          </div>

          <button class="btn danger"
            onclick="hapusCatatan(${c.id})">
            Hapus
            </button>

        </div>
      `).join('')}
    </div>
  `).join('');
}

function previewFile(file) {
  if (file.type.startsWith('image')) {
    return `<img src="${file.data}" class="preview-img">`;
  }

  if (file.type === 'application/pdf') {
    return `
      <a href="${file.data}" target="_blank" class="btn ghost">
        Lihat PDF
      </a>
    `;
  }

  return '';
}

function hapusCatatan(id) {
  let data = ambilCatatan();
  data = data.filter(c => c.id !== id);
  localStorage.setItem('planeta_catatan', JSON.stringify(data));
  renderCatatan();
}

document.addEventListener('DOMContentLoaded', renderCatatan);
