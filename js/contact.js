// Ambil elemen
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

// Event submit
form.addEventListener('submit', function(e) {
  e.preventDefault(); // cegah reload page

  // VALIDASI bisa ditambah lagi kalau mau
  if (!form.nama.value || !form.email.value || !form.pesan.value) {
    alert('Semua field wajib diisi!');
    return;
  }

  // Simulasi pengiriman
  successMsg.style.display = 'block';
  form.reset();
});
