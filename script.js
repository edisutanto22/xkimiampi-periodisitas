const pages = [...document.querySelectorAll('.page')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const mainNav = document.getElementById('mainNav');
const menuToggle = document.getElementById('menuToggle');

function showPage(id) {
  pages.forEach(page => page.classList.toggle('active-page', page.id === id));
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.page === id));
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
navLinks.forEach(link => link.addEventListener('click', () => showPage(link.dataset.page)));
document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => showPage(button.dataset.go)));
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

const lessons = [
  {
    title: 'Sistem periodik unsur',
    intro: 'Tabel periodik menyusun unsur berdasarkan kenaikan nomor atom dan kemiripan sifat kimianya.',
    concept: 'Periode adalah baris mendatar, sedangkan golongan adalah kolom tegak. Unsur dalam satu golongan utama umumnya memiliki jumlah elektron valensi yang sama sehingga sifat kimianya memiliki kemiripan.',
    bullets: ['Nomor atom menunjukkan jumlah proton di dalam inti atom.', 'Periode berkaitan dengan tingkat energi utama elektron yang ditempati.', 'Golongan membantu mengenali kemiripan konfigurasi elektron valensi.'],
    example: 'Natrium (Na) dan kalium (K) berada pada golongan 1. Keduanya memiliki satu elektron valensi dan cenderung membentuk ion bermuatan +1.'
  },
  {
    title: 'Jari-jari atom',
    intro: 'Jari-jari atom merupakan ukuran relatif besar atom. Nilainya dipengaruhi oleh jumlah kulit elektron dan tarikan inti terhadap elektron.',
    concept: 'Dalam satu periode, jari-jari atom umumnya mengecil dari kiri ke kanan karena muatan inti efektif meningkat. Dalam satu golongan, jari-jari umumnya membesar dari atas ke bawah karena penambahan kulit elektron.',
    bullets: ['Ke kanan dalam satu periode: umumnya semakin kecil.', 'Ke bawah dalam satu golongan: umumnya semakin besar.', 'Tren merupakan pola umum; jenis jari-jari yang diukur dapat memengaruhi nilai.'],
    example: 'Dalam golongan 1, jari-jari atom kalium (K) umumnya lebih besar daripada natrium (Na), karena K memiliki kulit elektron lebih banyak.'
  },
  {
    title: 'Energi ionisasi',
    intro: 'Energi ionisasi adalah energi minimum yang diperlukan untuk melepaskan satu elektron dari atom netral berwujud gas pada keadaan dasar.',
    concept: 'Energi ionisasi pertama umumnya meningkat dari kiri ke kanan dalam satu periode dan menurun dari atas ke bawah dalam satu golongan. Ada pengecualian akibat konfigurasi elektron dan kestabilan subkulit.',
    bullets: ['Semakin kuat elektron ditarik inti, biasanya semakin besar energi ionisasi.', 'Atom yang lebih besar umumnya lebih mudah melepaskan elektron terluar.', 'Tren energi ionisasi tidak selalu mulus karena terdapat pengecualian.'],
    example: 'Natrium lebih mudah melepaskan elektron terluarnya dibandingkan neon. Neon memiliki konfigurasi elektron yang sangat stabil dan energi ionisasi yang jauh lebih tinggi.'
  },
  {
    title: 'Elektronegativitas dan afinitas elektron',
    intro: 'Elektronegativitas adalah kemampuan relatif atom dalam ikatan kimia untuk menarik pasangan elektron ikatan. Afinitas elektron berkaitan dengan perubahan energi saat atom gas menerima elektron.',
    concept: 'Elektronegativitas umumnya meningkat ke kanan dalam satu periode dan menurun ke bawah dalam satu golongan. Fluorin merupakan unsur dengan elektronegativitas sangat tinggi pada skala Pauling.',
    bullets: ['Elektronegativitas menggambarkan tarikan elektron dalam ikatan.', 'Afinitas elektron membahas proses penerimaan elektron oleh atom gas.', 'Keduanya bukan besaran yang sama dan pola afinitas elektron memiliki banyak pengecualian.'],
    example: 'Dalam ikatan H–F, fluorin menarik pasangan elektron ikatan lebih kuat daripada hidrogen karena elektronegativitasnya lebih tinggi.'
  }
];
const lessonContent = document.getElementById('lessonContent');
function renderLesson(index) {
  const lesson = lessons[index];
  document.querySelectorAll('.lesson-tab').forEach(tab => tab.classList.toggle('selected', Number(tab.dataset.lesson) === index));
  lessonContent.innerHTML = `
    <span class="eyebrow">MATERI ${String(index + 1).padStart(2, '0')}</span>
    <h2>${lesson.title}</h2><p>${lesson.intro}</p>
    <div class="concept-box"><strong>Konsep kunci</strong><p>${lesson.concept}</p></div>
    <h3>Hal penting untuk diingat</h3><ul>${lesson.bullets.map(item => `<li>${item}</li>`).join('')}</ul>
    <h3>Contoh dalam kehidupan kimia</h3><p>${lesson.example}</p>
    <div class="trend-diagram"><span class="tag">RANGKUMAN</span><strong>${index === 1 ? 'Jari-jari atom' : index === 2 ? 'Energi ionisasi' : index === 3 ? 'Elektronegativitas' : 'Susunan unsur'}</strong><span class="arrow">↗</span><span>${index === 1 ? 'umumnya membesar ke bawah' : index === 2 ? 'umumnya meningkat ke kanan' : index === 3 ? 'umumnya meningkat ke kanan' : 'berdasarkan nomor atom'}</span></div>
    <div class="lesson-controls"><button class="btn btn-ghost" id="lessonPrev" ${index===0?'disabled':''}>← Sebelumnya</button> <button class="btn btn-primary" id="lessonNext">${index===lessons.length-1?'Ke simulasi →':'Materi berikutnya →'}</button></div>`;
  document.getElementById('lessonPrev').addEventListener('click', () => renderLesson(Math.max(0, index - 1)));
  document.getElementById('lessonNext').addEventListener('click', () => index === lessons.length - 1 ? showPage('simulasi') : renderLesson(index + 1));
}
document.querySelectorAll('.lesson-tab').forEach(tab => tab.addEventListener('click', () => renderLesson(Number(tab.dataset.lesson))));
renderLesson(0);

const elements = {
  Li:{name:'Litium',z:3,period:2,group:1,radius:152,ionization:520.2,en:0.98},
  Na:{name:'Natrium',z:11,period:3,group:1,radius:186,ionization:495.8,en:0.93},
  K:{name:'Kalium',z:19,period:4,group:1,radius:227,ionization:418.8,en:0.82},
  Be:{name:'Berilium',z:4,period:2,group:2,radius:112,ionization:899.5,en:1.57},
  Mg:{name:'Magnesium',z:12,period:3,group:2,radius:160,ionization:737.7,en:1.31},
  Ca:{name:'Kalsium',z:20,period:4,group:2,radius:197,ionization:589.8,en:1.00},
  C:{name:'Karbon',z:6,period:2,group:14,radius:67,ionization:1086.5,en:2.55},
  N:{name:'Nitrogen',z:7,period:2,group:15,radius:56,ionization:1402.3,en:3.04},
  O:{name:'Oksigen',z:8,period:2,group:16,radius:48,ionization:1313.9,en:3.44},
  F:{name:'Fluorin',z:9,period:2,group:17,radius:42,ionization:1681,en:3.98}
};
const elementA = document.getElementById('elementA');
const elementB = document.getElementById('elementB');
const property = document.getElementById('property');
const feedback = document.getElementById('simulationFeedback');
const propertyMeta = {
  radius:{key:'radius',label:'Jari-jari atom',unit:'pm',trend:'umumnya mengecil ke kanan dan membesar ke bawah dalam tabel periodik.'},
  ionization:{key:'ionization',label:'Energi ionisasi pertama',unit:'kJ/mol',trend:'umumnya meningkat ke kanan dan menurun ke bawah, dengan beberapa pengecualian.'},
  electronegativity:{key:'en',label:'Elektronegativitas (Pauling)',unit:'',trend:'umumnya meningkat ke kanan dan menurun ke bawah; pola gas mulia tidak dibahas di simulasi ini.'}
};
function updateSimulation() {
  const a = elements[elementA.value], b = elements[elementB.value];
  document.getElementById('symbolA').textContent = elementA.value;
  document.getElementById('symbolB').textContent = elementB.value;
  document.getElementById('nameA').textContent = a.name;
  document.getElementById('nameB').textContent = b.name;
  document.getElementById('periodA').textContent = `Periode ${a.period} · Golongan ${a.group}`;
  document.getElementById('periodB').textContent = `Periode ${b.period} · Golongan ${b.group}`;
  document.getElementById('choiceALabel').textContent = elementA.value;
  document.getElementById('choiceBLabel').textContent = elementB.value;
  const meta = propertyMeta[property.value];
  document.querySelector('.trend-visual>span').textContent = meta.label;
  const va = a[meta.key], vb = b[meta.key], max = Math.max(va, vb, 1);
  document.querySelector('.trend-bar').innerHTML = `<i style="width:${Math.max(12,va/max*100)}%"></i><i style="width:${Math.max(12,vb/max*100)}%"></i>`;
  document.querySelector('.trend-visual small').textContent = `A: ${va}${meta.unit ? ' '+meta.unit : ''} · B: ${vb}${meta.unit ? ' '+meta.unit : ''}. Tren umum: ${meta.trend}`;
  document.querySelectorAll('input[name="prediction"]').forEach(r => r.checked = r.value === 'A');
  feedback.className = 'feedback neutral';
  feedback.textContent = 'Pilih prediksi, lalu tekan “Periksa prediksi”.';
}
[elementA, elementB, property].forEach(control => control.addEventListener('change', updateSimulation));
document.getElementById('checkPrediction').addEventListener('click', () => {
  const a = elements[elementA.value], b = elements[elementB.value], meta = propertyMeta[property.value];
  const selected = document.querySelector('input[name="prediction"]:checked').value;
  const va = a[meta.key], vb = b[meta.key];
  const correct = va === vb ? 'same' : va > vb ? 'A' : 'B';
  const isCorrect = selected === correct;
  feedback.className = `feedback ${isCorrect ? 'success' : 'error'}`;
  const answerName = correct === 'same' ? 'keduanya memiliki nilai sama dalam data simulasi' : `${correct === 'A' ? a.name : b.name} (${correct === 'A' ? elementA.value : elementB.value}) memiliki nilai lebih besar`;
  feedback.textContent = `${isCorrect ? 'Benar!' : 'Belum tepat.'} ${answerName}. ${meta.label}: ${a.name} = ${va}${meta.unit ? ' '+meta.unit : ''}; ${b.name} = ${vb}${meta.unit ? ' '+meta.unit : ''}.`;
});
document.getElementById('resetSimulation').addEventListener('click', () => {
  elementA.value = 'Na'; elementB.value = 'K'; property.value = 'radius'; updateSimulation();
});
updateSimulation();

const questions = [
  {q:'Apa dasar utama penyusunan unsur dalam tabel periodik modern?',o:['Kenaikan massa jenis','Kenaikan nomor atom','Urutan warna unsur','Kenaikan titik leleh','Jumlah neutron yang sama'],a:1,e:'Tabel periodik modern disusun berdasarkan kenaikan nomor atom, yaitu jumlah proton dalam inti.'},
  {q:'Baris mendatar pada tabel periodik disebut …',o:['Golongan','Periode','Blok','Deret isotop','Valensi'],a:1,e:'Baris mendatar disebut periode, sedangkan kolom tegak disebut golongan.'},
  {q:'Unsur Na dan K berada dalam golongan yang sama. Kesamaan yang paling tepat adalah …',o:['Jumlah kulit elektronnya sama','Nomor atomnya sama','Keduanya memiliki satu elektron valensi','Jari-jari atomnya sama','Keduanya gas mulia'],a:2,e:'Na dan K merupakan logam alkali golongan 1 dan memiliki satu elektron valensi.'},
  {q:'Dalam satu golongan dari atas ke bawah, jari-jari atom secara umum …',o:['Mengecil','Membesar','Selalu tetap','Menjadi nol','Berubah acak tanpa pola'],a:1,e:'Jari-jari atom umumnya membesar ke bawah karena jumlah kulit elektron bertambah.'},
  {q:'Mengapa jari-jari atom umumnya mengecil dari kiri ke kanan dalam satu periode?',o:['Jumlah proton berkurang','Kulit elektron selalu bertambah','Muatan inti efektif meningkat','Atom kehilangan semua elektronnya','Nomor atom menurun'],a:2,e:'Dalam satu periode, proton bertambah sementara elektron tambahan masuk ke kulit utama yang sama; tarikan inti efektif umumnya meningkat.'},
  {q:'Energi ionisasi adalah energi yang diperlukan untuk …',o:['Menambah neutron pada inti','Melepaskan elektron dari atom gas','Membentuk ikatan kovalen saja','Mencairkan unsur','Memecah inti menjadi proton'],a:1,e:'Energi ionisasi merupakan energi minimum untuk melepaskan elektron dari atom gas dalam keadaan dasar.'},
  {q:'Manakah pernyataan umum yang benar tentang energi ionisasi dalam satu golongan dari atas ke bawah?',o:['Selalu meningkat','Umumnya menurun','Selalu sama','Selalu menjadi negatif','Tidak berkaitan dengan elektron'],a:1,e:'Energi ionisasi umumnya menurun ke bawah golongan karena elektron terluar lebih jauh dari inti dan terlindung oleh elektron dalam.'},
  {q:'Elektronegativitas menggambarkan kemampuan atom untuk …',o:['Menarik pasangan elektron dalam ikatan','Menambah jumlah proton','Mengubah neutron menjadi elektron','Memperbesar nomor atom','Melepas semua elektron sekaligus'],a:0,e:'Elektronegativitas adalah kemampuan relatif atom dalam ikatan kimia untuk menarik pasangan elektron ikatan.'},
  {q:'Unsur manakah yang memiliki elektronegativitas sangat tinggi pada skala Pauling?',o:['Kalium','Natrium','Kalsium','Fluorin','Litium'],a:3,e:'Fluorin memiliki elektronegativitas sangat tinggi dibandingkan unsur lain pada skala Pauling.'},
  {q:'Pernyataan manakah yang paling tepat tentang tren periodisitas?',o:['Semua sifat berubah tanpa pola','Tren umum tidak memiliki pengecualian','Afinitas elektron dan elektronegativitas adalah hal yang sama','Tren periodik membantu memperkirakan sifat unsur, tetapi beberapa sifat memiliki pengecualian','Unsur dalam periode yang sama selalu memiliki sifat identik'],a:3,e:'Tren periodik membantu memprediksi sifat unsur, tetapi terdapat pengecualian karena konfigurasi elektron dan faktor lain.'}
];
let currentQuestion = 0;
let answers = Array(questions.length).fill(null);
let quizStarted = false;
const quizIntro = document.getElementById('quizIntro');
const quizBox = document.getElementById('quizBox');
const quizResult = document.getElementById('quizResult');
function renderQuestion() {
  const item = questions[currentQuestion];
  document.getElementById('questionCounter').textContent = `SOAL ${currentQuestion+1} DARI ${questions.length}`;
  document.getElementById('answeredCounter').textContent = `${answers.filter(v=>v!==null).length} dijawab`;
  document.getElementById('quizProgress').style.width = `${(currentQuestion+1)/questions.length*100}%`;
  document.getElementById('questionText').textContent = `${currentQuestion+1}. ${item.q}`;
  document.getElementById('answerOptions').innerHTML = item.o.map((option,index)=>`<button class="answer-option ${answers[currentQuestion]===index?'selected':''}" data-answer="${index}"><span class="option-letter">${String.fromCharCode(65+index)}</span><span>${option}</span></button>`).join('');
  document.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => {
    answers[currentQuestion] = Number(button.dataset.answer);
    renderQuestion();
  }));
  document.getElementById('prevQuestion').disabled = currentQuestion === 0;
  document.getElementById('nextQuestion').classList.toggle('hidden', currentQuestion === questions.length-1);
  document.getElementById('submitQuiz').classList.toggle('hidden', currentQuestion !== questions.length-1);
}
document.getElementById('startQuiz').addEventListener('click', () => {
  quizStarted = true; answers = Array(questions.length).fill(null); currentQuestion = 0;
  quizIntro.classList.add('hidden'); quizResult.classList.add('hidden'); quizBox.classList.remove('hidden'); renderQuestion();
});
document.getElementById('prevQuestion').addEventListener('click', () => { if(currentQuestion>0){currentQuestion--;renderQuestion();} });
document.getElementById('nextQuestion').addEventListener('click', () => {
  if (answers[currentQuestion] === null) { alert('Pilih satu jawaban terlebih dahulu.'); return; }
  if(currentQuestion<questions.length-1){currentQuestion++;renderQuestion();}
});
document.getElementById('submitQuiz').addEventListener('click', () => {
  if (answers[currentQuestion] === null) { alert('Pilih satu jawaban terlebih dahulu.'); return; }
  const unanswered = answers.filter(v=>v===null).length;
  if (unanswered) { alert(`Masih ada ${unanswered} soal yang belum dijawab. Periksa kembali jawabanmu.`); return; }
  showResult();
});
function showResult() {
  const correct = answers.reduce((sum,answer,index)=>sum+(answer===questions[index].a?1:0),0);
  const score = Math.round(correct / questions.length * 100);
  const name = document.getElementById('studentName').value.trim() || 'Siswa';
  const category = score >= 90 ? 'Sangat Baik' : score >= 80 ? 'Baik' : score >= 70 ? 'Cukup' : 'Perlu Belajar Lagi';
  quizBox.classList.add('hidden'); quizResult.classList.remove('hidden');
  quizResult.innerHTML = `
    <div class="score-header"><div class="score-circle"><strong>${score}</strong><span>NILAI / 100</span></div><div class="score-summary"><span class="eyebrow">HASIL EVALUASI</span><h2>Bagus, ${escapeHtml(name)}!</h2><p>Kategori: <strong>${category}</strong>. ${score>=70?'Terus pertahankan dan perdalam pemahamanmu.':'Pelajari kembali materi yang belum dikuasai, lalu coba lagi.'}</p><button id="retryQuiz" class="btn btn-primary">Ulangi kuis ↻</button> <button id="backToLessons" class="btn btn-ghost">Kembali ke materi</button></div></div>
    <div class="score-stats"><div class="score-stat"><strong>${correct}</strong><span>Jawaban benar</span></div><div class="score-stat"><strong>${questions.length-correct}</strong><span>Jawaban salah</span></div><div class="score-stat"><strong>${questions.length}</strong><span>Total soal</span></div></div>
    <h3>Pembahasan jawaban</h3><div class="review-list">${questions.map((q,i)=>`<article class="review-item ${answers[i]===q.a?'correct':'incorrect'}"><strong>${i+1}. ${escapeHtml(q.q)}</strong><p><b>Jawabanmu:</b> ${escapeHtml(q.o[answers[i]])} ${answers[i]===q.a?'✓':'·'} <br><b>Kunci:</b> ${String.fromCharCode(65+q.a)}. ${escapeHtml(q.o[q.a])}<br>${escapeHtml(q.e)}</p></article>`).join('')}</div>`;
  document.getElementById('retryQuiz').addEventListener('click', () => {
    answers = Array(questions.length).fill(null); currentQuestion = 0;
    quizResult.classList.add('hidden'); quizBox.classList.remove('hidden'); renderQuestion();
  });
  document.getElementById('backToLessons').addEventListener('click', () => showPage('materi'));
  quizResult.scrollIntoView({behavior:'smooth',block:'start'});
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
