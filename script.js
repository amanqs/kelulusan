const studentNameInput = document.getElementById('studentName');
const previewBtn = document.getElementById('previewBtn');
const downloadBtn = document.getElementById('downloadBtn');
const message = document.getElementById('message');
const suggestionsPanel = document.getElementById('suggestions');
const sklPreview = document.getElementById('sklPreview');

const studentList = [
  { name: 'AHMAD MUZAKI', file: 'SKL/SURAT KELULUSAN SDLB/AHMAD MUZAKI.pdf' },
  { name: 'BIMA NUGROHO', file: 'SKL/SURAT KELULUSAN SDLB/BIMA NUGROHO.pdf' },
  { name: 'GINA AMELIA', file: 'SKL/SURAT KELULUSAN SDLB/GINA AMELIA.pdf' },
  { name: 'IMAM GHOZALI', file: 'SKL/SURAT KELULUSAN SDLB/IMAM GHOZALI.pdf' },
  { name: 'KINANTI BENING PRIANZA', file: 'SKL/SURAT KELULUSAN SDLB/KINANTI BENING PRIANZA.pdf' },
  { name: 'MAHENDRA EVALDO', file: 'SKL/SURAT KELULUSAN SDLB/MAHENDRA EVALDO.pdf' },
  { name: 'MUHAMAD SAHRIDHO', file: 'SKL/SURAT KELULUSAN SDLB/MUHAMAD SAHRIDHO.pdf' },
  { name: 'NAETHLYANA ANGELITA', file: 'SKL/SURAT KELULUSAN SDLB/NAETHLYANA ANGELITA.pdf' },
  { name: 'NAILA AULYA NURIL MAULIDA', file: 'SKL/SURAT KELULUSAN SDLB/NAILA AULYA NURIL MAULIDA.pdf' },
  { name: 'SHINTA SELPIANI', file: 'SKL/SURAT KELULUSAN SDLB/SHINTA SELPIANI.pdf' },
  { name: 'WAHYUNI', file: 'SKL/SURAT KELULUSAN SDLB/WAHYUNI.pdf' },
  { name: 'ABDAU IQBAL LUBIS SYARIF', file: 'SKL/SURAT KELULUSAN SMPLB/ABDAU IQBAL LUBIS SYARIF.pdf' },
  { name: 'ADRIAN IBNU HABIBIE', file: 'SKL/SURAT KELULUSAN SMPLB/ADRIAN IBNU HABIBIE.pdf' },
  { name: 'AFFAN PRAMUDANA', file: 'SKL/SURAT KELULUSAN SMPLB/AFFAN PRAMUDANA.pdf' },
  { name: 'AGUS DIMAS SETIAWAN', file: 'SKL/SURAT KELULUSAN SMPLB/AGUS DIMAS SETIAWAN.pdf' },
  { name: 'AMBAR WATI', file: 'SKL/SURAT KELULUSAN SMPLB/AMBAR WATI.pdf' },
  { name: 'ARISKA PUTRI', file: 'SKL/SURAT KELULUSAN SMPLB/ARISKA PUTRI.pdf' },
  { name: 'ASA MULIA DAHAYU KAMARATIH', file: 'SKL/SURAT KELULUSAN SMPLB/ASA MULIA DAHAYU KAMARATIH.pdf' },
  { name: 'AZAHRA SAFA AULIA', file: 'SKL/SURAT KELULUSAN SMPLB/AZAHRA SAFA AULIA.pdf' },
  { name: 'DESTA GILANG PRADANA', file: 'SKL/SURAT KELULUSAN SMPLB/DESTA GILANG PRADANA.pdf' },
  { name: 'EGAR LEON RAMADANIE', file: 'SKL/SURAT KELULUSAN SMPLB/EGAR LEON RAMADANIE.pdf' },
  { name: 'EGI GALIH PRATAMA', file: 'SKL/SURAT KELULUSAN SMPLB/EGI GALIH PRATAMA.pdf' },
  { name: 'ELSYA AJENG LESTARI', file: 'SKL/SURAT KELULUSAN SMPLB/ELSYA AJENG LESTARI.pdf' },
  { name: 'FERIN ADINKA VALENTANIA', file: 'SKL/SURAT KELULUSAN SMPLB/FERIN ADINKA VALENTANIA.pdf' },
  { name: 'HERI SAPUTRA', file: 'SKL/SURAT KELULUSAN SMPLB/HERI SAPUTRA.pdf' },
  { name: 'KHOIRIL KHUSNA', file: 'SKL/SURAT KELULUSAN SMPLB/KHOIRIL KHUSNA.pdf' },
  { name: 'MA\'IMATU ZAHRO', file: 'SKL/SURAT KELULUSAN SMPLB/MA\'IMATU ZAHRO.pdf' },
  { name: 'MOHAMAD RIZKY PRATAMA', file: 'SKL/SURAT KELULUSAN SMPLB/MOHAMAD RIZKY PRATAMA.pdf' },
  { name: 'RENO PUTRA PRADANA', file: 'SKL/SURAT KELULUSAN SMPLB/RENO PUTRA PRADANA.pdf' },
  { name: 'RIZKYA WIJAYA PUTRA', file: 'SKL/SURAT KELULUSAN SMPLB/RIZKYA WIJAYA PUTRA.pdf' },
  { name: 'SATRIA ILHAM SYAH', file: 'SKL/SURAT KELULUSAN SMPLB/SATRIA ILHAM SYAH.pdf' },
  { name: 'YUDI CANDRA ALFIYAN', file: 'SKL/SURAT KELULUSAN SMPLB/YUDI CANDRA ALFIYAN.pdf' },
  { name: 'ZAINAL ARIFIN', file: 'SKL/SURAT KELULUSAN SMPLB/ZAINAL ARIFIN.pdf' },
];

function normalize(text) {
  return text
    .trim()
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function findStudent(name) {
  const normalizedName = normalize(name);
  return studentList.find((student) => normalize(student.name) === normalizedName) || null;
}

function getSuggestions(name) {
  const query = normalize(name);
  if (!query) return [];

  const tokens = query.split(' ');
  const suggestions = studentList
    .map((student) => ({
      student,
      normalized: normalize(student.name),
    }))
    .map((item) => {
      const containsAllTokens = tokens.every((token) => item.normalized.includes(token));
      const startsWith = item.normalized.startsWith(query);
      const score = startsWith ? 2 : containsAllTokens ? 1 : 0;
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((item) => item.student.name);

  return suggestions;
}

function renderSuggestions(suggestions = []) {
  if (!suggestions.length) {
    suggestionsPanel.innerHTML = '';
    return;
  }

  suggestionsPanel.innerHTML = `
    <div class="suggestions-label">Mungkin maksud Anda:</div>
    <ul>${suggestions.map((suggestion) => `<li>${suggestion}</li>`).join('')}</ul>
  `;
}

function renderPreview(student) {
  if (!student) {
    sklPreview.innerHTML = `
      <div class="label">Hasil Tidak Tersedia</div>
      <p>Nama tidak ditemukan di daftar kelulusan SLBN Grobogan. Pastikan nama ditulis sesuai dengan daftar.</p>
    `;
    return;
  }

  sklPreview.innerHTML = `
    <div class="label">SURAT KETERANGAN LULUS</div>
    <h3>${student.name}</h3>
    <p>Telah dinyatakan lulus pada jenjang SDLB/SMPLB SLBN Grobogan dan berhak menerima Surat Keterangan Lulus (SKL).</p>
    <ul>
      <li>Sekolah: SLBN Grobogan</li>
      <li>Program: SDLB / SMPLB</li>
      <li>Dokumen SKL: tersedia untuk diunduh</li>
    </ul>
  `;
}

function showMessage(text, type = 'info') {
  message.textContent = text;
  message.style.color = type === 'error' ? 'var(--danger)' : type === 'success' ? 'var(--success)' : 'var(--muted)';
}

previewBtn.addEventListener('click', () => {
  const name = studentNameInput.value;

  if (!name.trim()) {
    showMessage('Masukkan nama lengkap siswa untuk memeriksa status kelulusan.', 'error');
    sklPreview.innerHTML = '<p><em>Masukkan nama lalu klik "Cek Lulus".</em></p>';
    renderSuggestions([]);
    downloadBtn.disabled = true;
    return;
  }

  const student = findStudent(name);
  if (!student) {
    const suggestions = getSuggestions(name);
    showMessage('Nama tidak ditemukan atau belum dinyatakan lulus.', 'error');
    renderPreview(null);
    renderSuggestions(suggestions);
    downloadBtn.disabled = true;
    return;
  }

  showMessage('Selamat! Siswa dinyatakan lulus. Tombol unduh SKL aktif.', 'success');
  renderPreview(student);
  renderSuggestions([]);
  downloadBtn.disabled = false;
  downloadBtn.dataset.file = student.file;
});

downloadBtn.addEventListener('click', () => {
  const filePath = downloadBtn.dataset.file;
  if (!filePath) {
    showMessage('SKL belum tersedia. Cek nama lebih dahulu.', 'error');
    return;
  }

  const link = document.createElement('a');
  link.href = encodeURI(filePath);
  link.download = filePath.substring(filePath.lastIndexOf('/') + 1);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showMessage('Pengunduhan SKL dimulai. Pastikan browser menerima popup unduhan.', 'success');
});
