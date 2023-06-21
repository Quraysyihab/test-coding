// sec input data club
// Simpan referensi ke elemen-elemen HTML yang dibutuhkan
const clubNameInput = document.getElementById("club-name");
const clubCityInput = document.getElementById("club-city");
const saveButton = document.getElementById("save-button");
const kelasmenBody = document.getElementById("kelasmen-body");

// Tambahkan event listener untuk tombol Save
saveButton.addEventListener("click", function () {
  // Ambil nilai dari input nama klub dan kota klub
  const clubName = clubNameInput.value;
  const clubCity = clubCityInput.value;

  // Cek apakah nama klub sudah ada dalam data
  const existingClub = data.find((item) => item.name === clubName);
  if (existingClub) {
    showNotification("error", "Nama klub sudah ada dalam data!");
    return;
  }

  // Cek apakah input klub dan kota kosong
  if (!clubName || !clubCity) {
    showNotification("error", "Mohon lengkapi data klub!");
    return;
  }

  // Buat objek baru untuk klub yang akan ditambahkan
  const newClub = {
    name: clubName,
    city: clubCity,
  };

  // Tambahkan klub baru ke dalam array data
  data.push(newClub);

  // Perbarui tampilan tabel dengan data terbaru
  renderTable();

  // Reset nilai input setelah disimpan
  clubNameInput.value = "";
  clubCityInput.value = "";
});

// Fungsi untuk merender tabel dengan data terbaru
function renderTable() {
  // Bersihkan konten tbody
  kelasmenBody.innerHTML = "";

  // Iterasi melalui array data dan tambahkan setiap klub ke dalam tabel
  data.forEach((club, index) => {
    const newRow = document.createElement("tr");

    const noCell = document.createElement("td");
    noCell.textContent = index + 1;

    const nameCell = document.createElement("td");
    nameCell.textContent = club.name;

    const cityCell = document.createElement("td");
    cityCell.textContent = club.city;

    newRow.appendChild(noCell);
    newRow.appendChild(nameCell);
    newRow.appendChild(cityCell);

    kelasmenBody.appendChild(newRow);
  });
}

// Fungsi untuk menampilkan notifikasi menggunakan Noty
function showNotification(type, text) {
  new Noty({
    type: type,
    text: text,
    timeout: 3000, // Durasi tampilan notifikasi dalam milidetik (di sini: 3 detik)
    theme: "nest", // Tema notifikasi yang digunakan
    progressBar: false, // Menonaktifkan progress bar
    closeWith: ["click"], // Menutup notifikasi saat diklik
    animation: {
      open: "animated fadeInRight", // Animasi ketika notifikasi muncul
      close: "animated fadeOutRight", // Animasi ketika notifikasi ditutup
    },
  }).show();
}
// Inisialisasi array data
let data = [];

// Panggil fungsi renderTable() untuk menampilkan tabel awal
renderTable();

// sec input skor
// Simpan referensi ke elemen-elemen HTML yang dibutuhkan
const club1Input = document.getElementById("club1");
const club2Input = document.getElementById("club2");
const score1Input = document.getElementById("score1");
const score2Input = document.getElementById("score2");
const addScoreButton = document.getElementById("add-score-button");
const scoreListTextarea = document.getElementById("score-list");
const resultTableBody = document.getElementById("result-table-body");
const klasemenTableBody = document.getElementById("kelasmen-body");

// Objek untuk melacak skor dan klub yang berhadapan
const matches = {};
// Objek untuk melacak poin klub
const points = {};

// Tambahkan event listener untuk tombol Add Score
addScoreButton.addEventListener("click", function () {
  // Ambil nilai dari input club dan score
  const club1 = club1Input.value;
  const club2 = club2Input.value;
  const score1 = score1Input.value;
  const score2 = score2Input.value;

  // Validasi input
  if (!club1 || !club2 || !score1 || !score2) {
    alert("Harap lengkapi semua input!");
    return;
  }

  // Cek apakah pertandingan antara kedua klub sudah terjadi
  const matchKey1 = `${club1}-${club2}`;
  const matchKey2 = `${club2}-${club1}`;

  if (matches[matchKey1] || matches[matchKey2]) {
    alert("Pertandingan antara kedua klub sudah terjadi!");
    return;
  }

  // Buat string skor pertandingan
  const scoreText = `${club1} ${score1} - ${score2} ${club2}\n`;

  // Tambahkan skor ke dalam textarea
  scoreListTextarea.value += scoreText;

  // Tandai pertandingan antara kedua klub sebagai sudah terjadi
  matches[matchKey1] = true;

  // Tambahkan poin ke klub sesuai dengan hasil pertandingan
  if (!points[club1]) {
    points[club1] = 0;
  }
  if (!points[club2]) {
    points[club2] = 0;
  }

  if (score1 > score2) {
    // Club 1 menang
    points[club1] += 3;
  } else if (score1 < score2) {
    // Club 2 menang
    points[club2] += 3;
  } else {
    // Seri
    points[club1] += 1;
    points[club2] += 1;
  }

  // Tampilkan hasil pertandingan di tabel
  const newRow = document.createElement("tr");

  const club1Cell = document.createElement("td");
  club1Cell.textContent = club1;

  const scoreCell = document.createElement("td");
  scoreCell.textContent = `${score1} - ${score2}`;

  const club2Cell = document.createElement("td");
  club2Cell.textContent = club2;

  newRow.appendChild(club1Cell);
  newRow.appendChild(scoreCell);
  newRow.appendChild(club2Cell);

  resultTableBody.appendChild(newRow);

  // Perbarui tampilan tabel klasemen
  renderKlasemenTable();

  // Reset nilai input setelah disimpan
  club1Input.value = "";
  club2Input.value = "";
  score1Input.value = "";
  score2Input.value = "";
});

// Fungsi untuk merender tabel klasemen
function renderKlasemenTable() {
  // Menghapus semua data pada tabel klasemen sebelum merender ulang
  while (klasemenTableBody.firstChild) {
    klasemenTableBody.removeChild(klasemenTableBody.firstChild);
  }

  // Mengurutkan klub berdasarkan poin tertinggi
  const sortedClubs = Object.keys(points).sort(function (club1, club2) {
    return points[club2] - points[club1];
  });

  // Menambahkan data klasemen ke dalam tabel
  sortedClubs.forEach(function (club) {
    const newRow = document.createElement("tr");

    const clubCell = document.createElement("td");
    clubCell.textContent = club;

    const pointsCell = document.createElement("td");
    pointsCell.textContent = points[club];

    newRow.appendChild(clubCell);
    newRow.appendChild(pointsCell);

    klasemenTableBody.appendChild(newRow);
  });
}

// Fungsi untuk merender tabel klasemen
function renderKlasemenTable() {
  // Menghapus semua data pada tabel klasemen sebelum merender ulang
  while (klasemenTableBody.firstChild) {
    klasemenTableBody.removeChild(klasemenTableBody.firstChild);
  }

  // Menambahkan data klasemen ke dalam tabel
  sortedClubs.forEach(function (club) {
    const newRow = document.createElement("tr");

    const clubCell = document.createElement("td");
    clubCell.textContent = club;

    const pointsCell = document.createElement("td");
    pointsCell.textContent = points[club];

    newRow.appendChild(clubCell);
    newRow.appendChild(pointsCell);

    klasemenTableBody.appendChild(newRow);
  });
}
