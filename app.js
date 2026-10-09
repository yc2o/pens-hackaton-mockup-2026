/**
 * PENSCEDULER - PENS Smart Academic Scheduler Master Controller
 * Enforces multi-role academic workflows for Mahasiswa, Dosen, and BAAK:
 * - Dynamic role-tailored sidebar navigation and view routing
 * - Mahasiswa: Clean dashboard, read-only timetable matrix, centered reschedule form, and AI Chatbot
 * - Dosen: Shift request approve/reject workflow, anonymized student roster in course details, auto-approved reschedule
 * - BAAK: Platform health summary, interactive CSV conflict resolver, dedicated requests ledger, master registries
 * - Unified Chatbot Engine: Prompt templates, interactive course selection, and slot autofill handoff
 */

// Global Multi-Role Academic Datasets
const APP_DATA = {
  mahasiswa: {
    id: "mahasiswa",
    name: "Realdho Fahryz",
    roleLabel: "Mahasiswa",
    departmentClass: "3 D4 IT A",
    idType: "NRP",
    idNumber: "1234567890",
    email: "realdho@it.student.pens.ac.id",
    avatarChar: "R",
    classes: [
      {
        id: "m-wm",
        code: "WM",
        title: "Workshop Mesin Pembelajaran",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Senin",
        time: "08:00 - 11:00",
        startHour: 8,
        durationHours: 3,
        room: "Lab C 102",
        sks: "3 SKS",
        hasShift: true,
        shiftedSchedule: "Rabu, 13:00 - 16:00 di Lab C 103 (Jadwal Pengganti)"
      },
      {
        id: "m-pmj",
        code: "PMJ",
        title: "Pemrograman Jaringan Lanjut",
        lecturer: "Nur Rosyid Mxxxx, S.Kom., M.T.",
        day: "Senin",
        time: "13:00 - 16:00",
        startHour: 13,
        durationHours: 3,
        room: "Lab C 105",
        sks: "3 SKS",
        hasShift: false
      },
      {
        id: "m-met",
        code: "MET",
        title: "Metodologi Penelitian Rekayasa",
        lecturer: "Achmad Basuki, Ph.D.",
        day: "Selasa",
        time: "08:00 - 10:00",
        startHour: 8,
        durationHours: 2,
        room: "SAW-05.02",
        sks: "2 SKS",
        hasShift: false
      },
      {
        id: "m-kw",
        code: "KW",
        title: "Kewirausahaan Teknologi",
        lecturer: "Rengga Axxxx, S.Kom., M.T.",
        day: "Selasa",
        time: "11:00 - 13:00",
        startHour: 11,
        durationHours: 2,
        room: "SAW-06.10",
        sks: "2 SKS",
        hasShift: false
      },
      {
        id: "m-k3l",
        code: "K3L",
        title: "Keamanan, Keselamatan & K3L",
        lecturer: "Yanuar Risah Pxxxx, S.Kom., M.Kom.",
        day: "Rabu",
        time: "15:00 - 17:00",
        startHour: 15,
        durationHours: 2,
        room: "SAW-06.10",
        sks: "2 SKS",
        hasShift: false
      },
      {
        id: "m-pa1",
        code: "PA1",
        title: "Proyek Akhir Tahap 1",
        lecturer: "Renovita Exxxx, S.ST., M.Tr.Kom.",
        day: "Kamis",
        time: "09:00 - 12:00",
        startHour: 9,
        durationHours: 3,
        room: "Lab Software SAW-08",
        sks: "4 SKS",
        hasShift: false
      },
      {
        id: "m-pcd",
        code: "PCD",
        title: "Pengolahan Citra Digital",
        lecturer: "Yanuar Risah Pxxxx, S.Kom., M.Kom.",
        day: "Kamis",
        time: "13:00 - 15:00",
        startHour: 13,
        durationHours: 2,
        room: "D4-201",
        sks: "2 SKS",
        hasShift: false
      },
      {
        id: "m-kp",
        code: "KP",
        title: "Kerja Praktek Industri",
        lecturer: "Renovita Exxxx, S.ST., M.Tr.Kom.",
        day: "Jumat",
        time: "08:00 - 10:00",
        startHour: 8,
        durationHours: 2,
        room: "Lab Sinyal B 204",
        sks: "2 SKS",
        hasShift: false
      },
      {
        id: "m-bik",
        code: "BIK",
        title: "Bahasa Inggris Komunikasi Profesi",
        lecturer: "Tri Harsono, Ph.D.",
        day: "Jumat",
        time: "10:00 - 12:00",
        startHour: 10,
        durationHours: 2,
        room: "B-101",
        sks: "2 SKS",
        hasShift: false
      }
    ]
  },

  dosen: {
    id: "dosen",
    name: "Dr. Ir. Budi Sxxxx, M.T.",
    roleLabel: "Dosen",
    departmentClass: "Departemen Teknik Informatika",
    idType: "NIP",
    idNumber: "197403252001121xxx",
    email: "budi.sxxxx@pens.ac.id",
    avatarChar: "B",
    classes: [
      {
        id: "d-wma",
        code: "WM-A",
        title: "Workshop Mesin Pembelajaran (3 D4 IT A)",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Senin",
        time: "08:00 - 11:00",
        startHour: 8,
        durationHours: 3,
        room: "Lab C 102",
        sks: "3 SKS",
        hasShift: false,
        hasPendingRequest: true,
        pendingRequestDetail: {
          id: "REQ-01",
          requester: "Realdho Fahryz (3 D4 IT A)",
          targetDay: "Rabu",
          targetTime: "13:00 - 16:00",
          targetRoom: "Lab C 103",
          reason: "Tabrakan jadwal ujian sertifikasi internasional"
        }
      },
      {
        id: "d-wmb",
        code: "WM-B",
        title: "Workshop Mesin Pembelajaran (3 D4 IT B)",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Selasa",
        time: "08:00 - 11:00",
        startHour: 8,
        durationHours: 3,
        room: "Lab C 102",
        sks: "3 SKS",
        hasShift: false
      },
      {
        id: "d-pba",
        code: "PBA",
        title: "Pengolahan Bahasa Alami (3 D4 IT A)",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Selasa",
        time: "13:00 - 15:00",
        startHour: 13,
        durationHours: 2,
        room: "SAW-06.10",
        sks: "2 SKS",
        hasShift: false
      },
      {
        id: "d-kcka",
        code: "KCK-A",
        title: "Kecerdasan Komputasional (4 D4 IT A)",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Rabu",
        time: "08:00 - 11:00",
        startHour: 8,
        durationHours: 3,
        room: "Lab C 104",
        sks: "3 SKS",
        hasShift: false
      },
      {
        id: "d-kckb",
        code: "KCK-B",
        title: "Kecerdasan Komputasional (4 D4 IT B)",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Kamis",
        time: "08:00 - 11:00",
        startHour: 8,
        durationHours: 3,
        room: "Lab C 104",
        sks: "3 SKS",
        hasShift: true,
        shiftedSchedule: "Jumat, 13:00 - 16:00 di Lab C 105 (Jadwal Pengganti)"
      },
      {
        id: "d-pms",
        code: "PMS",
        title: "Pemodelan & Simulasi Sistem (2 D4 IT A)",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Kamis",
        time: "13:00 - 15:00",
        startHour: 13,
        durationHours: 2,
        room: "SAW-05.02",
        sks: "2 SKS",
        hasShift: false,
        hasPendingRequest: true,
        pendingRequestDetail: {
          id: "REQ-11",
          requester: "Gita Mxxxx (2 D4 IT A)",
          targetDay: "Selasa",
          targetTime: "15:00 - 17:00",
          targetRoom: "SAW-05.02",
          reason: "Kegiatan perlombaan robotika nasional"
        }
      },
      {
        id: "d-pm",
        code: "PM",
        title: "Pembelajaran Mendalam (Pascasarjana)",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Jumat",
        time: "08:00 - 11:00",
        startHour: 8,
        durationHours: 3,
        room: "Lab Riset Lt 3",
        sks: "3 SKS",
        hasShift: false
      }
    ]
  },

  baak: {
    id: "baak",
    name: "Biro Administrasi Akademik",
    roleLabel: "BAAK",
    departmentClass: "Pusat Pelayanan & Penjadwalan",
    idType: "Unit",
    idNumber: "BAAK-PENS-01",
    email: "baak@pens.ac.id",
    avatarChar: "B",
    stats: {
      mahasiswa: 1420,
      dosen: 86,
      matakuliah: 248,
      ruangan: 42
    },
    classes: [
      {
        id: "b-wm-a",
        code: "WM-A",
        title: "Workshop Mesin Pembelajaran (3 D4 IT A)",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Senin",
        time: "08:00 - 11:00",
        startHour: 8,
        durationHours: 3,
        room: "Lab C 102",
        sks: "3 SKS",
        hasShift: true,
        shiftedSchedule: "Rabu, 13:00 - 16:00 di Lab C 103"
      },
      {
        id: "b-pmj-a",
        code: "PMJ-A",
        title: "Pemrograman Jaringan Lanjut (2 D4 IT A)",
        lecturer: "Nur Rosyid Mxxxx, S.Kom., M.T.",
        day: "Senin",
        time: "13:00 - 16:00",
        startHour: 13,
        durationHours: 3,
        room: "Lab C 105",
        sks: "3 SKS",
        hasShift: false
      },
      {
        id: "b-met-a",
        code: "MET-A",
        title: "Metodologi Penelitian Rekayasa (3 D4 IT A)",
        lecturer: "Achmad Basuki, Ph.D.",
        day: "Selasa",
        time: "08:00 - 10:00",
        startHour: 8,
        durationHours: 2,
        room: "SAW-05.02",
        sks: "2 SKS",
        hasShift: false
      },
      {
        id: "b-wm-b",
        code: "WM-B",
        title: "Workshop Mesin Pembelajaran (3 D4 IT B)",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Selasa",
        time: "08:00 - 11:00",
        startHour: 8,
        durationHours: 3,
        room: "Lab C 102",
        sks: "3 SKS",
        hasShift: false
      },
      {
        id: "b-kw-a",
        code: "KW-A",
        title: "Kewirausahaan Teknologi (3 D4 IT A)",
        lecturer: "Rengga Axxxx, S.Kom., M.T.",
        day: "Selasa",
        time: "11:00 - 13:00",
        startHour: 11,
        durationHours: 2,
        room: "SAW-06.10",
        sks: "2 SKS",
        hasShift: false
      },
      {
        id: "b-pba-a",
        code: "PBA-A",
        title: "Pengolahan Bahasa Alami (3 D4 IT A)",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Selasa",
        time: "13:00 - 15:00",
        startHour: 13,
        durationHours: 2,
        room: "SAW-06.10",
        sks: "2 SKS",
        hasShift: false
      },
      {
        id: "b-kck-a",
        code: "KCK-A",
        title: "Kecerdasan Komputasional (4 D4 IT A)",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Rabu",
        time: "08:00 - 11:00",
        startHour: 8,
        durationHours: 3,
        room: "Lab C 104",
        sks: "3 SKS",
        hasShift: false
      },
      {
        id: "b-k3l-a",
        code: "K3L-A",
        title: "Keamanan, Keselamatan & K3L (1 D4 IT A)",
        lecturer: "Yanuar Risah Pxxxx, S.Kom., M.Kom.",
        day: "Rabu",
        time: "15:00 - 17:00",
        startHour: 15,
        durationHours: 2,
        room: "SAW-06.10",
        sks: "2 SKS",
        hasShift: false
      },
      {
        id: "b-kck-b",
        code: "KCK-B",
        title: "Kecerdasan Komputasional (4 D4 IT B)",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Kamis",
        time: "08:00 - 11:00",
        startHour: 8,
        durationHours: 3,
        room: "Lab C 104",
        sks: "3 SKS",
        hasShift: true,
        shiftedSchedule: "Jumat, 13:00 - 16:00 di Lab C 105"
      },
      {
        id: "b-pa1-a",
        code: "PA1-A",
        title: "Proyek Akhir Tahap 1 (4 D4 IT A)",
        lecturer: "Renovita Exxxx, S.ST., M.Tr.Kom.",
        day: "Kamis",
        time: "09:00 - 12:00",
        startHour: 9,
        durationHours: 3,
        room: "Lab Software SAW-08",
        sks: "4 SKS",
        hasShift: false
      },
      {
        id: "b-pms-a",
        code: "PMS-A",
        title: "Pemodelan & Simulasi Sistem (2 D4 IT A)",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Kamis",
        time: "13:00 - 15:00",
        startHour: 13,
        durationHours: 2,
        room: "SAW-05.02",
        sks: "2 SKS",
        hasShift: false
      },
      {
        id: "b-pcd-a",
        code: "PCD-A",
        title: "Pengolahan Citra Digital (3 D4 IT B)",
        lecturer: "Yanuar Risah Pxxxx, S.Kom., M.Kom.",
        day: "Kamis",
        time: "13:00 - 15:00",
        startHour: 13,
        durationHours: 2,
        room: "D4-201",
        sks: "2 SKS",
        hasShift: false
      },
      {
        id: "b-kp-a",
        code: "KP-A",
        title: "Kerja Praktek Industri (3 D4 IT A)",
        lecturer: "Renovita Exxxx, S.ST., M.Tr.Kom.",
        day: "Jumat",
        time: "08:00 - 10:00",
        startHour: 8,
        durationHours: 2,
        room: "Lab Sinyal B 204",
        sks: "2 SKS",
        hasShift: false
      },
      {
        id: "b-pm-a",
        code: "PM-A",
        title: "Pembelajaran Mendalam (Pascasarjana)",
        lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
        day: "Jumat",
        time: "08:00 - 11:00",
        startHour: 8,
        durationHours: 3,
        room: "Lab Riset Lt 3",
        sks: "3 SKS",
        hasShift: false
      },
      {
        id: "b-bik-a",
        code: "BIK-A",
        title: "Bahasa Inggris Komunikasi Profesi (2 D4 IT B)",
        lecturer: "Tri Harsono, Ph.D.",
        day: "Jumat",
        time: "10:00 - 12:00",
        startHour: 10,
        durationHours: 2,
        room: "B-101",
        sks: "2 SKS",
        hasShift: false
      }
    ]
  }
};

// Master Registries for BAAK Role
const BAAK_MASTER_ROOMS = [
  { code: "C-102", name: "Ruang Workshop Komputer C-102", building: "Gedung D4" },
  { code: "C-103", name: "Laboratorium Jaringan & IoT", building: "Gedung D4" },
  { code: "C-104", name: "Laboratorium Data Science & AI", building: "Gedung D4" },
  { code: "C-105", name: "Laboratorium Rekayasa Perangkat Lunak", building: "Gedung D4" },
  { code: "SAW-06.10", name: "Ruang Kuliah Teori Pascasarjana SAW-06.10", building: "Gedung SAW" },
  { code: "SAW-08", name: "Laboratorium Software Terpadu SAW-08", building: "Gedung SAW" },
  { code: "SAW-05.02", name: "Ruang Diskusi & Seminar SAW-05.02", building: "Gedung SAW" },
  { code: "B-101", name: "Ruang Laboratorium Bahasa B-101", building: "Gedung D3" },
  { code: "B-204", name: "Laboratorium Pemrosesan Sinyal B-204", building: "Gedung D3" },
  { code: "D4-201", name: "Ruang Teori Multimedia D4-201", building: "Gedung D4" },
  { code: "Lab Riset Lt 3", name: "Laboratorium Riset Terapan", building: "Gedung Pasca" }
];

const BAAK_MASTER_SUBJECTS = [
  { code: "WMP301", name: "Workshop Mesin Pembelajaran", sks: 3 },
  { code: "PMJ301", name: "Pemrograman Jaringan Lanjut", sks: 3 },
  { code: "KCK301", name: "Kecerdasan Komputasional", sks: 3 },
  { code: "PRO401", name: "Proyek Akhir Tahap 1", sks: 4 },
  { code: "KPR201", name: "Kerja Praktek Industri", sks: 2 },
  { code: "KWR201", name: "Kewirausahaan Teknologi", sks: 2 },
  { code: "K3L201", name: "Keamanan, Keselamatan & K3L", sks: 2 },
  { code: "PCD201", name: "Pengolahan Citra Digital", sks: 2 },
  { code: "PBA201", name: "Pengolahan Bahasa Alami", sks: 2 },
  { code: "MET201", name: "Metodologi Penelitian Rekayasa", sks: 2 },
  { code: "PMS201", name: "Pemodelan & Simulasi Sistem", sks: 2 },
  { code: "BIK201", name: "Bahasa Inggris Komunikasi Profesi", sks: 2 }
];

const BAAK_MASTER_LECTURERS = [
  { name: "Dr. Ir. Budi Sxxxx, M.T.", nip: "197403252001121xxx" },
  { name: "Nur Rosyid Mxxxx, S.Kom., M.T.", nip: "198205142008121xxx" },
  { name: "Rengga Axxxx, S.Kom., M.T.", nip: "197908222005011xxx" },
  { name: "Renovita Exxxx, S.ST., M.Tr.Kom.", nip: "198811052015042xxx" },
  { name: "Yanuar Risah Pxxxx, S.Kom., M.Kom.", nip: "198501122010121xxx" },
  { name: "Achmad Basuki, Ph.D.", nip: "197006181995121xxx" },
  { name: "Tri Harsono, Ph.D.", nip: "197209241999031xxx" }
];

const BAAK_MASTER_STUDENTS = [
  { name: "Realdho Fahryz", nrp: "1234567890", cohort: "2022", major: "D4 Teknik Informatika" },
  { name: "Budi Santoso", nrp: "1234567001", cohort: "2022", major: "D4 Teknik Informatika" },
  { name: "Siti Rahmawati", nrp: "1234567002", cohort: "2022", major: "D4 Teknik Informatika" },
  { name: "Agus Prasetyo", nrp: "1234567003", cohort: "2022", major: "D4 Teknik Informatika" },
  { name: "Dewi Lestari", nrp: "1234567004", cohort: "2022", major: "D4 Teknik Informatika" },
  { name: "Eko Wibowo", nrp: "1234567005", cohort: "2022", major: "D4 Teknik Informatika" },
  { name: "Fitri Handayani", nrp: "1234567006", cohort: "2022", major: "D4 Teknik Informatika" },
  { name: "Gita Maharani", nrp: "1234567007", cohort: "2023", major: "D4 Teknik Informatika" },
  { name: "Hendra Gunawan", nrp: "1234567008", cohort: "2022", major: "D4 Teknik Informatika" },
  { name: "Indah Permata", nrp: "1234567009", cohort: "2022", major: "D4 Teknik Informatika" },
  { name: "Joko Susilo", nrp: "1234567010", cohort: "2022", major: "D4 Teknik Informatika" },
  { name: "Kartika Sari", nrp: "1234567011", cohort: "2023", major: "D4 Teknik Informatika" }
];

// Reschedule Requests Ledger (Max 10 on BAAK dashboard, full list in view-baak-requests)
let ALL_RESCHEDULE_REQUESTS = [
  {
    id: "REQ-01",
    courseId: "m-wm",
    courseTitle: "Workshop Mesin Pembelajaran (3 D4 IT A)",
    lecturerName: "Dr. Ir. Budi Sxxxx, M.T.",
    requesterRole: "Mahasiswa",
    requesterName: "Realdho Fahryz",
    originalSchedule: "Senin, 08:00 - 11:00 (Lab C 102)",
    proposedSchedule: "Rabu, 13:00 - 16:00 (Lab C 103)",
    reason: "Tabrakan jadwal ujian sertifikasi internasional",
    status: "Menunggu Persetujuan Dosen",
    submittedAt: "09 Okt 2026 08:30"
  },
  {
    id: "REQ-02",
    courseId: "d-kckb",
    courseTitle: "Kecerdasan Komputasional (4 D4 IT B)",
    lecturerName: "Dr. Ir. Budi Sxxxx, M.T.",
    requesterRole: "Dosen",
    requesterName: "Dr. Ir. Budi Sxxxx, M.T.",
    originalSchedule: "Kamis, 08:00 - 11:00 (Lab C 104)",
    proposedSchedule: "Jumat, 13:00 - 16:00 (Lab C 105)",
    reason: "Penugasan dewan riset vokasi nasional",
    status: "Disetujui",
    submittedAt: "08 Okt 2026 14:15"
  },
  {
    id: "REQ-03",
    courseId: "b-pmj-a",
    courseTitle: "Pemrograman Jaringan Lanjut (2 D4 IT A)",
    lecturerName: "Nur Rosyid Mxxxx, S.Kom., M.T.",
    requesterRole: "Dosen",
    requesterName: "Nur Rosyid Mxxxx, S.Kom., M.T.",
    originalSchedule: "Senin, 13:00 - 16:00 (Lab C 105)",
    proposedSchedule: "Selasa, 08:00 - 11:00 (Lab C 105)",
    reason: "Pemeliharaan berkala server workstation lab",
    status: "Disetujui",
    submittedAt: "08 Okt 2026 11:20"
  },
  {
    id: "REQ-04",
    courseId: "b-pcd-a",
    courseTitle: "Pengolahan Citra Digital (3 D4 IT B)",
    lecturerName: "Yanuar Risah Pxxxx, S.Kom., M.Kom.",
    requesterRole: "Mahasiswa",
    requesterName: "Dimas Sxxxx",
    originalSchedule: "Kamis, 13:00 - 15:00 (D4-201)",
    proposedSchedule: "Jumat, 08:00 - 10:00 (D4-201)",
    reason: "Kunjungan supervisi industri mahasiswa magang",
    status: "Menunggu Persetujuan Dosen",
    submittedAt: "07 Okt 2026 16:40"
  },
  {
    id: "REQ-05",
    courseId: "b-met-a",
    courseTitle: "Metodologi Penelitian Rekayasa (3 D4 IT A)",
    lecturerName: "Achmad Basuki, Ph.D.",
    requesterRole: "Dosen",
    requesterName: "Achmad Basuki, Ph.D.",
    originalSchedule: "Selasa, 08:00 - 10:00 (SAW-05.02)",
    proposedSchedule: "Kamis, 15:00 - 17:00 (SAW-05.02)",
    reason: "Rapat koordinasi senat akademik politeknik",
    status: "Disetujui",
    submittedAt: "07 Okt 2026 09:10"
  },
  {
    id: "REQ-06",
    courseId: "b-kw-a",
    courseTitle: "Kewirausahaan Teknologi (3 D4 IT A)",
    lecturerName: "Rengga Axxxx, S.Kom., M.T.",
    requesterRole: "Mahasiswa",
    requesterName: "Siti Rahmawati",
    originalSchedule: "Selasa, 11:00 - 13:00 (SAW-06.10)",
    proposedSchedule: "Rabu, 09:00 - 11:00 (SAW-06.10)",
    reason: "Jadwal kuliah tamu inkubator bisnis",
    status: "Ditolak",
    submittedAt: "06 Okt 2026 15:00"
  },
  {
    id: "REQ-07",
    courseId: "b-pa1-a",
    courseTitle: "Proyek Akhir Tahap 1 (4 D4 IT A)",
    lecturerName: "Renovita Exxxx, S.ST., M.Tr.Kom.",
    requesterRole: "Dosen",
    requesterName: "Renovita Exxxx, S.ST., M.Tr.Kom.",
    originalSchedule: "Kamis, 09:00 - 12:00 (SAW-08)",
    proposedSchedule: "Senin, 09:00 - 12:00 (SAW-08)",
    reason: "Penyamaan jadwal evaluasi berkala tahap 1",
    status: "Disetujui",
    submittedAt: "06 Okt 2026 13:30"
  },
  {
    id: "REQ-08",
    courseId: "b-bik-a",
    courseTitle: "Bahasa Inggris Komunikasi Profesi (2 D4 IT B)",
    lecturerName: "Tri Harsono, Ph.D.",
    requesterRole: "Mahasiswa",
    requesterName: "Fajar Wxxxx",
    originalSchedule: "Jumat, 10:00 - 12:00 (B-101)",
    proposedSchedule: "Kamis, 10:00 - 12:00 (B-101)",
    reason: "Persiapan pameran pekan ilmiah mahasiswa",
    status: "Menunggu Persetujuan Dosen",
    submittedAt: "05 Okt 2026 10:20"
  },
  {
    id: "REQ-09",
    courseId: "b-pm-a",
    courseTitle: "Pembelajaran Mendalam (Pascasarjana)",
    lecturerName: "Dr. Ir. Budi Sxxxx, M.T.",
    requesterRole: "Dosen",
    requesterName: "Dr. Ir. Budi Sxxxx, M.T.",
    originalSchedule: "Jumat, 08:00 - 11:00 (Lab Riset Lt 3)",
    proposedSchedule: "Sabtu, 08:00 - 11:00 (Lab Riset Lt 3)",
    reason: "Akomodasi jadwal kelas karyawan terapan",
    status: "Disetujui",
    submittedAt: "04 Okt 2026 17:00"
  },
  {
    id: "REQ-10",
    courseId: "b-k3l-a",
    courseTitle: "Keamanan, Keselamatan & K3L (1 D4 IT A)",
    lecturerName: "Yanuar Risah Pxxxx, S.Kom., M.Kom.",
    requesterRole: "Dosen",
    requesterName: "Yanuar Risah Pxxxx, S.Kom., M.Kom.",
    originalSchedule: "Rabu, 15:00 - 17:00 (SAW-06.10)",
    proposedSchedule: "Senin, 15:00 - 17:00 (SAW-06.10)",
    reason: "Simulasi tanggap darurat evakuasi gedung",
    status: "Disetujui",
    submittedAt: "04 Okt 2026 14:10"
  },
  {
    id: "REQ-11",
    courseId: "d-pms",
    courseTitle: "Pemodelan & Simulasi Sistem (2 D4 IT A)",
    lecturerName: "Dr. Ir. Budi Sxxxx, M.T.",
    requesterRole: "Mahasiswa",
    requesterName: "Gita Maharani",
    originalSchedule: "Kamis, 13:00 - 15:00 (SAW-05.02)",
    proposedSchedule: "Selasa, 15:00 - 17:00 (SAW-05.02)",
    reason: "Kegiatan perlombaan robotika nasional",
    status: "Menunggu Persetujuan Dosen",
    submittedAt: "03 Okt 2026 11:45"
  },
  {
    id: "REQ-12",
    courseId: "b-kp-a",
    courseTitle: "Kerja Praktek Industri (3 D4 IT A)",
    lecturerName: "Renovita Exxxx, S.ST., M.Tr.Kom.",
    requesterRole: "Dosen",
    requesterName: "Renovita Exxxx, S.ST., M.Tr.Kom.",
    originalSchedule: "Jumat, 08:00 - 10:00 (Lab Sinyal B 204)",
    proposedSchedule: "Rabu, 10:00 - 12:00 (Lab Sinyal B 204)",
    reason: "Supervisi langsung ke mitra industri politeknik",
    status: "Disetujui",
    submittedAt: "02 Okt 2026 09:30"
  }
];

// Anonymized Student Roster for Course Details
const DUMMY_STUDENTS_ROSTER = [
  { no: 1, name: "Budi Santoso", nrp: "1234567xxx", class: "3 D4 IT A" },
  { no: 2, name: "Siti Rahmawati", nrp: "1234568xxx", class: "3 D4 IT A" },
  { no: 3, name: "Agus Prasetyo", nrp: "1234569xxx", class: "3 D4 IT A" },
  { no: 4, name: "Dewi Lestari", nrp: "1234570xxx", class: "3 D4 IT A" },
  { no: 5, name: "Eko Wibowo", nrp: "1234571xxx", class: "3 D4 IT A" },
  { no: 6, name: "Fitri Handayani", nrp: "1234572xxx", class: "3 D4 IT A" },
  { no: 7, name: "Hendra Gunawan", nrp: "1234573xxx", class: "3 D4 IT A" },
  { no: 8, name: "Indah Permata", nrp: "1234574xxx", class: "3 D4 IT A" },
  { no: 9, name: "Joko Susilo", nrp: "1234575xxx", class: "3 D4 IT A" },
  { no: 10, name: "Kartika Sari", nrp: "1234576xxx", class: "3 D4 IT A" },
  { no: 11, name: "Lukman Hakim", nrp: "1234577xxx", class: "3 D4 IT A" },
  { no: 12, name: "Maya Anggraini", nrp: "1234578xxx", class: "3 D4 IT A" },
  { no: 13, name: "Nur Hidayat", nrp: "1234579xxx", class: "3 D4 IT A" },
  { no: 14, name: "Putri Ayu", nrp: "1234580xxx", class: "3 D4 IT A" },
  { no: 15, name: "Realdho Fahryz", nrp: "1234567890", class: "3 D4 IT A" },
  { no: 16, name: "Rizky Pratama", nrp: "1234581xxx", class: "3 D4 IT A" },
  { no: 17, name: "Sri Wahyuni", nrp: "1234582xxx", class: "3 D4 IT A" },
  { no: 18, name: "Tri Nugroho", nrp: "1234583xxx", class: "3 D4 IT A" },
  { no: 19, name: "Wahyu Setiawan", nrp: "1234584xxx", class: "3 D4 IT A" },
  { no: 20, name: "Yulia Citra", nrp: "1234585xxx", class: "3 D4 IT A" }
];

// System Health & Audit Trail Logs Dataset
const BAAK_SYSTEM_LOGS = [
  {
    id: "LOG-1001",
    timestamp: "10 Okt 2026 08:42",
    level: "shift",
    levelLabel: "Perubahan Jadwal",
    actor: "Dr. Ir. Budi Sxxxx, M.T.",
    module: "Scheduler Engine",
    detail: "Jadwal Workshop Mesin Pembelajaran dipindahkan ke Rabu, 13:00 - 16:00 (Lab C 103) secara otomatis.",
    status: "Sukses"
  },
  {
    id: "LOG-1002",
    timestamp: "10 Okt 2026 08:30",
    level: "info",
    levelLabel: "Info",
    actor: "Realdho Fahryz (1234567890)",
    module: "Pengajuan Mahasiswa",
    detail: "Pengajuan baru permohonan perpindahan jadwal untuk Workshop Mesin Pembelajaran diajukan.",
    status: "Terkirim"
  },
  {
    id: "LOG-1003",
    timestamp: "10 Okt 2026 07:15",
    level: "sync",
    levelLabel: "Sinkronisasi CSV",
    actor: "BAAK Admin (Biro Akademik)",
    module: "Data Ingestion",
    detail: "Sinkronisasi berkas jadwal_semester_ganjil_2026.csv berhasil memvalidasi 48 baris perkuliahan.",
    status: "Selesai"
  },
  {
    id: "LOG-1004",
    timestamp: "10 Okt 2026 06:00",
    level: "info",
    levelLabel: "Info",
    actor: "Sistem Otomatis",
    module: "Integritas Jadwal",
    detail: "Pemeriksaan integritas matriks mingguan 7 hari selesai: 0 konflik jadwal terdeteksi pada 42 ruangan.",
    status: "Optimal"
  },
  {
    id: "LOG-1005",
    timestamp: "09 Okt 2026 16:45",
    level: "warning",
    levelLabel: "Peringatan",
    actor: "Petugas Sarpras",
    module: "Manajemen Fasilitas",
    detail: "Pemeliharaan berkala AC di Ruang Workshop Komputer C-102 dijadwalkan akhir pekan.",
    status: "Perhatian"
  },
  {
    id: "LOG-1006",
    timestamp: "09 Okt 2026 14:15",
    level: "shift",
    levelLabel: "Perubahan Jadwal",
    actor: "Dr. Ir. Budi Sxxxx, M.T.",
    module: "Persetujuan Dosen",
    detail: "Permohonan perpindahan jadwal Kecerdasan Komputasional (4 D4 IT B) disetujui Dosen.",
    status: "Disetujui"
  },
  {
    id: "LOG-1007",
    timestamp: "09 Okt 2026 11:20",
    level: "error",
    levelLabel: "Error",
    actor: "Parser CSV",
    module: "Validasi Kurikulum",
    detail: "Ditemukan kode matakuliah tidak valid (XYZ999) pada baris ke-3 berkas CSV impor. Baris ditolak.",
    status: "Dicegah"
  },
  {
    id: "LOG-1008",
    timestamp: "09 Okt 2026 09:00",
    level: "info",
    levelLabel: "Info",
    actor: "BAAK Admin",
    module: "Autentikasi",
    detail: "Sesi login admin BAAK berhasil dari alamat jaringan internal (10.12.0.14).",
    status: "Sukses"
  },
  {
    id: "LOG-1009",
    timestamp: "08 Okt 2026 17:30",
    level: "sync",
    levelLabel: "Backup Sistem",
    actor: "Database Service",
    module: "Pencadangan",
    detail: "Snapshot harian PostgreSQL berhasil dibuat dan diarsipkan (Ukuran: 42.8 MB).",
    status: "Sukses"
  },
  {
    id: "LOG-1010",
    timestamp: "08 Okt 2026 13:10",
    level: "warning",
    levelLabel: "Peringatan",
    actor: "Scheduler Engine",
    module: "Deteksi Kapasitas",
    detail: "Ruang Kuliah Teori SAW-06.10 terisi 38 dari 40 kapasitas maksimum pada sesi perkuliahan siang.",
    status: "Mendekati Batas"
  }
];

// Active State Variables
let currentRole = "mahasiswa";
let activeCurrentView = "dashboard";
let selectedDashboardDay = "Hari Ini";
let activeDetailCourseId = "m-wm";
let currentLecturerFilter = "all";
let currentDayFilter = "all";
let currentSearchQuery = "";
let pendingCsvRows = [];
let currentCrudEntity = null;
let currentCrudEditIndex = null;
let currentLogLevelFilter = "all";
let currentLogSearchQuery = "";

// Simulated Current Academic Day
function getSimulatedTodayDay() {
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const currentDayIndex = new Date().getDay();
  const dayName = dayNames[currentDayIndex];
  return (dayName === "Sabtu" || dayName === "Minggu") ? "Senin" : dayName;
}

// Initialize DOM
document.addEventListener("DOMContentLoaded", () => {
  initThemeAndAccessibility();
  setupSidebarAndNavbarToggles();
  setupRoleSwitcher();
  setupProfilePopover();
  setupDashboardDragCarousel();
  setupClassesViewInteractions();
  setupChatModule();
  renderActiveRole(currentRole);
});

// ==========================================================================
// 1. THEME & WCAG ACCESSIBILITY
// ==========================================================================
function initThemeAndAccessibility() {
  const savedTheme = localStorage.getItem("penscheduler_theme") || "light";
  setAppTheme(savedTheme);

  const isDyslexia = localStorage.getItem("penscheduler_dyslexia") === "true";
  const isContrast = localStorage.getItem("penscheduler_contrast") === "true";

  if (isDyslexia) {
    document.body.classList.add("dyslexia-mode");
    const el = document.getElementById("wcag-dyslexia-toggle");
    if (el) el.checked = true;
  }
  if (isContrast) {
    document.body.classList.add("high-contrast-mode");
    const el = document.getElementById("wcag-contrast-toggle");
    if (el) el.checked = true;
  }
}

function setAppTheme(themeVal) {
  localStorage.setItem("penscheduler_theme", themeVal);
  const html = document.documentElement;

  if (themeVal === "auto") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    html.setAttribute("data-theme", isDark ? "dark" : "light");
  } else {
    html.setAttribute("data-theme", themeVal);
  }

  document.querySelectorAll(".btn-theme-pill").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.themeVal === themeVal);
  });
}

function toggleDyslexiaMode(enabled) {
  document.body.classList.toggle("dyslexia-mode", enabled);
  localStorage.setItem("penscheduler_dyslexia", enabled);
  showToast(enabled ? "Mode Ramah Disleksia Aktif" : "Mode Ramah Disleksia Nonaktif");
}

function toggleHighContrast(enabled) {
  document.body.classList.toggle("high-contrast-mode", enabled);
  localStorage.setItem("penscheduler_contrast", enabled);
  showToast(enabled ? "Mode Kontras Tinggi Aktif" : "Mode Kontras Standar Aktif");
}

// ==========================================================================
// 2. TOGGLE SIDEBAR & NAVBAR
// ==========================================================================
function setupSidebarAndNavbarToggles() {
  const sidebar = document.getElementById("app-sidebar");
  const closeArrowBtn = document.getElementById("sidebar-close-arrow-btn");
  const openArrowBtn = document.getElementById("topbar-open-arrow-btn");

  if (closeArrowBtn) {
    closeArrowBtn.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("mobile-open");
      } else {
        sidebar.classList.add("collapsed");
      }
    });
  }

  if (openArrowBtn) {
    openArrowBtn.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.add("mobile-open");
      } else {
        sidebar.classList.remove("collapsed");
      }
    });
  }

  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && sidebar.classList.contains("mobile-open")) {
      if (!sidebar.contains(e.target) && !openArrowBtn.contains(e.target)) {
        sidebar.classList.remove("mobile-open");
      }
    }
  });
}

// ==========================================================================
// 3. ROLE SWITCHER
// ==========================================================================
function setupRoleSwitcher() {
  const trigger = document.getElementById("role-select-trigger");
  const menu = document.getElementById("role-dropdown-menu");
  const items = document.querySelectorAll(".role-option-item");

  if (!trigger || !menu) return;

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
  });

  document.addEventListener("click", () => {
    menu.classList.remove("active");
  });

  items.forEach(item => {
    item.addEventListener("click", () => {
      const selected = item.dataset.role;
      if (selected && selected !== currentRole) {
        currentRole = selected;
        renderActiveRole(currentRole);
        showToast(`Beralih ke peran ${APP_DATA[selected].roleLabel}: ${APP_DATA[selected].name}`);
      }
      menu.classList.remove("active");
    });
  });
}

// ==========================================================================
// 4. SPA NAVIGATION & ROLE-BASED SIDEBAR
// ==========================================================================
function navigateToView(viewName) {
  // Prevent Mahasiswa from entering class-detail view
  if (currentRole === "mahasiswa" && viewName === "class-detail") {
    showToast("Halaman detail matakuliah tidak diperuntukkan bagi mahasiswa.");
    return;
  }

  activeCurrentView = viewName;

  document.querySelectorAll(".nav-item-link").forEach(link => {
    link.classList.toggle("active", link.dataset.nav === viewName);
  });

  document.querySelectorAll(".view-panel").forEach(panel => {
    panel.classList.remove("active");
  });

  const targetPanel = document.getElementById(`view-${viewName}`);
  if (targetPanel) {
    targetPanel.classList.add("active");
  }

  // Update Breadcrumbs
  const breadcrumbText = document.getElementById("breadcrumb-current-text");
  const breadcrumbLabels = {
    dashboard: "Dashboard",
    classes: "Matakuliah",
    "class-detail": "Detail Matakuliah",
    schedule: "Jadwal",
    reschedule: currentRole === "mahasiswa" ? "Pengajuan Pindah Jadwal Perkuliahan" : "Pindah Jadwal Perkuliahan",
    "baak-requests": "Daftar Permintaan Pindah Jadwal",
    "baak-rooms": "Ruangan",
    "baak-subjects": "Subjek Perkuliahan",
    "baak-lecturers": "Daftar Dosen",
    "baak-students": "Daftar Mahasiswa",
    "baak-system-logs": "Log & Sistem",
    chat: "Asisten AI"
  };
  if (breadcrumbText) {
    breadcrumbText.textContent = breadcrumbLabels[viewName] || "Dashboard";
  }

  if (window.innerWidth <= 768) {
    document.getElementById("app-sidebar").classList.remove("mobile-open");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================================================
// 5. HYDRATE ACTIVE ROLE
// ==========================================================================
function renderActiveRole(roleKey) {
  const profile = APP_DATA[roleKey];
  if (!profile) return;

  // 1. Topbar & Profile
  document.getElementById("user-display-name").textContent = profile.name;
  document.getElementById("user-role-badge").textContent = profile.roleLabel;
  document.getElementById("user-avatar-circle").textContent = profile.avatarChar;
  document.getElementById("role-avatar-badge").textContent = profile.avatarChar;
  document.getElementById("current-role-title").textContent = profile.roleLabel;
  document.getElementById("current-role-desc").textContent = profile.departmentClass || "Departemen Teknik Informatika";

  document.querySelectorAll(".role-option-item").forEach(item => {
    item.classList.toggle("selected", item.dataset.role === roleKey);
  });

  // 2. Profile Popover
  document.getElementById("popover-avatar").textContent = profile.avatarChar;
  document.getElementById("popover-name").textContent = profile.name;
  document.getElementById("popover-role").textContent = profile.roleLabel;
  document.getElementById("popover-id-label").textContent = profile.idType;
  document.getElementById("popover-id-value").textContent = profile.idNumber;
  document.getElementById("popover-email-value").textContent = profile.email;

  const classRow = document.getElementById("popover-class-row");
  if (profile.departmentClass && roleKey === "mahasiswa") {
    classRow.style.display = "flex";
    document.getElementById("popover-class-value").textContent = profile.departmentClass;
  } else {
    classRow.style.display = "none";
  }

  // 3. Dynamic Sidebar Navigation per Role
  renderSidebarNavForRole(roleKey);

  // 4. Dashboard View Rendering
  renderDashboardForRole(roleKey);

  // 5. Full Classes View
  renderFullClassesView();

  // 6. Timetable Matrix for Mahasiswa and Dosen
  if (roleKey !== "baak") {
    render7Day1HourMatrix();
  }

  // 7. Reschedule Form Initialization
  populateRescheduleCourseOptions();

  // 8. BAAK Master Registries & Logs
  if (roleKey === "baak") {
    renderBaakRoomsTable();
    renderBaakSubjectsTable();
    renderBaakLecturersTable();
    renderBaakStudentsTable();
    renderBaakFullRequestsTable();
    renderBaakSystemLogs();
  }

  // 9. Reset Chat Interface for Current Role
  resetChatInterface();

  // Navigate to Dashboard
  navigateToView("dashboard");
}

// Render Role-Tailored Sidebar Navigation Items
function renderSidebarNavForRole(roleKey) {
  const navContainer = document.getElementById("sidebar-dynamic-nav");
  if (!navContainer) return;

  if (roleKey === "mahasiswa") {
    navContainer.innerHTML = `
      <a href="#" class="nav-item-link active" data-nav="dashboard" onclick="navigateToView('dashboard'); return false;" title="Dashboard">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span class="nav-text">Dashboard</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="classes" onclick="navigateToView('classes'); return false;" title="Matakuliah">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        <span class="nav-text">Matakuliah</span>
        <span class="nav-badge" id="nav-badge-classes-count">${APP_DATA.mahasiswa.classes.length}</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="schedule" onclick="navigateToView('schedule'); return false;" title="Jadwal">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span class="nav-text">Jadwal</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="reschedule" onclick="navigateToView('reschedule'); return false;" title="Pindah Jadwal">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
        <span class="nav-text">Pindah Jadwal</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="chat" onclick="navigateToView('chat'); return false;" title="Chat AI">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span class="nav-text">Chat AI</span>
      </a>
    `;
  } else if (roleKey === "dosen") {
    navContainer.innerHTML = `
      <a href="#" class="nav-item-link active" data-nav="dashboard" onclick="navigateToView('dashboard'); return false;" title="Dashboard">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span class="nav-text">Dashboard</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="classes" onclick="navigateToView('classes'); return false;" title="Matakuliah">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        <span class="nav-text">Matakuliah</span>
        <span class="nav-badge" id="nav-badge-classes-count">${APP_DATA.dosen.classes.length}</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="schedule" onclick="navigateToView('schedule'); return false;" title="Jadwal">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span class="nav-text">Jadwal</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="reschedule" onclick="navigateToView('reschedule'); return false;" title="Pindah Jadwal">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
        <span class="nav-text">Pindah Jadwal</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="chat" onclick="navigateToView('chat'); return false;" title="Chat AI">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span class="nav-text">Chat AI</span>
      </a>
    `;
  } else if (roleKey === "baak") {
    navContainer.innerHTML = `
      <a href="#" class="nav-item-link active" data-nav="dashboard" onclick="navigateToView('dashboard'); return false;" title="Dashboard">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span class="nav-text">Dashboard</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="baak-requests" onclick="navigateToView('baak-requests'); return false;" title="Permintaan Jadwal">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        <span class="nav-text">Permintaan Jadwal</span>
        <span class="nav-badge alert">${ALL_RESCHEDULE_REQUESTS.filter(r => r.status.includes('Menunggu')).length}</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="classes" onclick="navigateToView('classes'); return false;" title="Matakuliah">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        <span class="nav-text">Matakuliah</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="baak-rooms" onclick="navigateToView('baak-rooms'); return false;" title="Ruangan">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span class="nav-text">Ruangan</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="baak-subjects" onclick="navigateToView('baak-subjects'); return false;" title="Subjek">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        <span class="nav-text">Subjek</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="baak-lecturers" onclick="navigateToView('baak-lecturers'); return false;" title="Dosen">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span class="nav-text">Dosen</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="baak-students" onclick="navigateToView('baak-students'); return false;" title="Mahasiswa">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
        <span class="nav-text">Mahasiswa</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="reschedule" onclick="navigateToView('reschedule'); return false;" title="Pindah Jadwal">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
        <span class="nav-text">Pindah Jadwal</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="chat" onclick="navigateToView('chat'); return false;" title="Chat AI">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span class="nav-text">Chat AI</span>
      </a>
      <a href="#" class="nav-item-link" data-nav="baak-system-logs" onclick="navigateToView('baak-system-logs'); return false;" title="Log & Sistem">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        <span class="nav-text">Log & Sistem</span>
      </a>
    `;
  }
}

// ==========================================================================
// 6. DASHBOARD RENDERING (MAHASISWA, DOSEN, BAAK)
// ==========================================================================
function renderDashboardForRole(roleKey) {
  const container = document.getElementById("dashboard-role-content");
  if (!container) return;

  if (roleKey === "baak") {
    // BAAK Dashboard: Platform Summary, CSV Import Trigger, and Top 10 Requests
    const stats = APP_DATA.baak.stats;
    const top10Requests = ALL_RESCHEDULE_REQUESTS.slice(0, 10);

    container.innerHTML = `
      <!-- Ringkasan Platform (Platform Summary Section) -->
      <section class="section-wrapper">
        <div class="baak-summary-header-row">
          <div>
            <h2 class="section-main-title">Ringkasan Platform</h2>
            <span class="section-helper-sub">Metrik utama kapasitas akademik dan pemanfaatan sumber daya kampus</span>
          </div>
          <button type="button" class="btn-primary-action" onclick="openCsvImportModal()">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Impor Jadwal CSV</span>
          </button>
        </div>

        <div class="platform-metrics-grid">
          <div class="platform-stat-card">
            <div class="stat-icon-wrapper">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <div>
              <span class="stat-number">${stats.mahasiswa.toLocaleString('id-ID')}</span>
              <span class="stat-label">Jumlah Mahasiswa</span>
            </div>
          </div>

          <div class="platform-stat-card">
            <div class="stat-icon-wrapper">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <span class="stat-number">${stats.dosen.toLocaleString('id-ID')}</span>
              <span class="stat-label">Jumlah Dosen</span>
            </div>
          </div>

          <div class="platform-stat-card">
            <div class="stat-icon-wrapper">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <div>
              <span class="stat-number">${stats.matakuliah.toLocaleString('id-ID')}</span>
              <span class="stat-label">Jumlah Matakuliah</span>
            </div>
          </div>

          <div class="platform-stat-card">
            <div class="stat-icon-wrapper">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            </div>
            <div>
              <span class="stat-number">${stats.ruangan.toLocaleString('id-ID')}</span>
              <span class="stat-label">Jumlah Ruangan</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Jadwal Perkuliahan Kampus BAAK (Filter Hari Ini & Per Hari) -->
      <section class="clean-section-card" style="margin-top: 24px;">
        <div class="clean-section-header">
          <div class="header-title-box">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--primary-color)" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <h3 class="clean-header-title">Jadwal Kuliah Kampus</h3>
          </div>
          <!-- Quick Day Selector -->
          <div class="quick-day-picker">
            <button type="button" class="quick-day-btn ${selectedDashboardDay === 'Hari Ini' ? 'active' : ''}" data-day="Hari Ini" onclick="selectDashboardDay('Hari Ini')">Hari Ini</button>
            <button type="button" class="quick-day-btn ${selectedDashboardDay === 'Senin' ? 'active' : ''}" data-day="Senin" onclick="selectDashboardDay('Senin')">Senin</button>
            <button type="button" class="quick-day-btn ${selectedDashboardDay === 'Selasa' ? 'active' : ''}" data-day="Selasa" onclick="selectDashboardDay('Selasa')">Selasa</button>
            <button type="button" class="quick-day-btn ${selectedDashboardDay === 'Rabu' ? 'active' : ''}" data-day="Rabu" onclick="selectDashboardDay('Rabu')">Rabu</button>
            <button type="button" class="quick-day-btn ${selectedDashboardDay === 'Kamis' ? 'active' : ''}" data-day="Kamis" onclick="selectDashboardDay('Kamis')">Kamis</button>
            <button type="button" class="quick-day-btn ${selectedDashboardDay === 'Jumat' ? 'active' : ''}" data-day="Jumat" onclick="selectDashboardDay('Jumat')">Jumat</button>
          </div>
        </div>

        <div class="clean-schedule-flow" id="dashboard-schedules-container">
          <!-- Rendered via renderDashboardScheduleForDay -->
        </div>
      </section>

      <!-- Section 3: Permohonan Perubahan Jadwal Terkini -->
      <section class="clean-section-card" style="margin-top: 24px;">
        <div class="clean-section-header">
          <div class="header-title-box">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary-color)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <h3 class="clean-header-title">Permintaan Perubahan Jadwal Kuliah Terkini</h3>
          </div>
          <button type="button" class="btn-header-link" onclick="navigateToView('baak-requests')">
            <span>Lihat Semua Permintaan</span>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        <div class="history-table-viewport">
          <table class="history-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Pengaju</th>
                <th>Matakuliah</th>
                <th>Dosen Pengampu</th>
                <th>Jadwal Asli</th>
                <th>Jadwal Usulan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${top10Requests.map((r, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td><strong>${escapeHtml(r.requesterName)}</strong> <span style="font-size: 10px; color: var(--text-subtle);">(${r.requesterRole})</span></td>
                  <td>${escapeHtml(r.courseTitle)}</td>
                  <td>${escapeHtml(r.lecturerName)}</td>
                  <td>${escapeHtml(r.originalSchedule)}</td>
                  <td><strong>${escapeHtml(r.proposedSchedule)}</strong></td>
                  <td>
                    <span class="status-badge ${r.status === 'Disetujui' ? 'approved' : r.status === 'Ditolak' ? 'rejected' : 'pending'}">
                      ${escapeHtml(r.status)}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
    return;
  }

  // Mahasiswa & Dosen Dashboard: Matakuliah cards carousel and Jadwal Kuliah
  const classes = APP_DATA[roleKey].classes;
  const isMahasiswa = roleKey === "mahasiswa";

  container.innerHTML = `
    <!-- Alert Banner Perubahan Jadwal jika ada -->
    ${classes.some(c => c.hasShift) ? `
      <div class="schedule-shift-alert-banner" role="alert">
        <div class="alert-banner-left">
          <span class="alert-pill-tag">Jadwal Kelas Berubah</span>
          <p class="alert-banner-text">
            Terdapat penyesuaian jadwal kuliah aktif. Silakan tinjau kartu matakuliah bertanda amber di bawah.
          </p>
        </div>
      </div>
    ` : ''}

    <!-- Section: Matakuliah Carousel -->
    <section class="section-wrapper">
      <div class="section-header-row">
        <div class="section-heading-group">
          <h2 class="section-main-title">Matakuliah - ${classes.length}</h2>
          <span class="section-helper-sub">Daftar perkuliahan aktif terdaftar semester ini</span>
        </div>
        <a href="#" class="section-action-link" onclick="navigateToView('classes'); return false;">
          <span>Lihat semua</span>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
      </div>

      <div class="classes-drag-viewport" id="classes-drag-viewport">
        <div class="classes-drag-track">
          ${classes.map(c => `
            <article class="dashboard-class-card ${c.hasShift ? 'has-schedule-shift' : ''} ${c.hasPendingRequest ? 'has-pending-request' : ''}">
              <div>
                <div class="card-top-row">
                  <h3 class="card-title">${escapeHtml(c.title)}</h3>
                  <span class="card-code">${escapeHtml(c.code)}</span>
                </div>
                ${!isMahasiswa ? '' : `<p class="card-lecturer">${escapeHtml(c.lecturer)}</p>`}

                ${c.hasShift ? `
                  <span class="schedule-shift-highlight-badge">Jadwal Kelas Berubah</span>
                  <div class="schedule-shift-meta-diff">
                    <span class="strikethrough-old">${escapeHtml(c.day)}, ${escapeHtml(c.time)} &bull; ${escapeHtml(c.room)}</span>
                    <span class="highlight-new">${escapeHtml(c.shiftedSchedule)}</span>
                  </div>
                ` : `
                  <div class="card-meta-box">
                    <div class="card-meta-line">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span>${escapeHtml(c.day)}, ${escapeHtml(c.time)}</span>
                    </div>
                    <div class="card-meta-line">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                      <span>${escapeHtml(c.room)}</span>
                    </div>
                  </div>
                `}

                ${c.hasPendingRequest ? `
                  <div class="pending-request-card-banner">
                    <span class="pending-request-title">Permintaan Pindah Jadwal:</span>
                    <span class="pending-request-desc">${escapeHtml(c.pendingRequestDetail.requester)} mengusulkan ke ${escapeHtml(c.pendingRequestDetail.targetDay)} (${escapeHtml(c.pendingRequestDetail.targetTime)})</span>
                  </div>
                ` : ''}
              </div>

              <!-- Button Actions -->
              ${isMahasiswa ? '' : `
                <div class="card-bottom-row">
                  <button type="button" class="btn-card-action outline" onclick="openClassDetailView('${c.id}')">
                    Detail Kuliah
                  </button>
                  ${c.hasPendingRequest ? `
                    <div class="card-approve-btn-group">
                      <button type="button" class="btn-card-action primary" onclick="approveShiftRequest('${c.pendingRequestDetail.id}', '${c.id}')" title="Setujui permohonan">Setujui</button>
                      <button type="button" class="btn-card-action outline" onclick="rejectShiftRequest('${c.pendingRequestDetail.id}', '${c.id}')" title="Tolak permohonan">Tolak</button>
                    </div>
                  ` : ''}
                </div>
              `}
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Section: Jadwal Kuliah Hari Ini (Single Column, Tanpa Card Alokasi & Ruangan) -->
    <section class="clean-section-card" style="margin-top: 24px;">
      <div class="clean-section-header">
        <div class="header-title-box">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--primary-color)" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <h3 class="clean-header-title">Jadwal Kuliah</h3>
        </div>
        <!-- Quick Day Selector -->
        <div class="quick-day-picker">
          <button type="button" class="quick-day-btn ${selectedDashboardDay === 'Hari Ini' ? 'active' : ''}" data-day="Hari Ini" onclick="selectDashboardDay('Hari Ini')">Hari Ini</button>
          <button type="button" class="quick-day-btn ${selectedDashboardDay === 'Senin' ? 'active' : ''}" data-day="Senin" onclick="selectDashboardDay('Senin')">Senin</button>
          <button type="button" class="quick-day-btn ${selectedDashboardDay === 'Selasa' ? 'active' : ''}" data-day="Selasa" onclick="selectDashboardDay('Selasa')">Selasa</button>
          <button type="button" class="quick-day-btn ${selectedDashboardDay === 'Rabu' ? 'active' : ''}" data-day="Rabu" onclick="selectDashboardDay('Rabu')">Rabu</button>
          <button type="button" class="quick-day-btn ${selectedDashboardDay === 'Kamis' ? 'active' : ''}" data-day="Kamis" onclick="selectDashboardDay('Kamis')">Kamis</button>
          <button type="button" class="quick-day-btn ${selectedDashboardDay === 'Jumat' ? 'active' : ''}" data-day="Jumat" onclick="selectDashboardDay('Jumat')">Jumat</button>
        </div>
      </div>

      <div class="clean-schedule-flow" id="dashboard-schedules-container">
        <!-- Rendered via renderDashboardScheduleForDay -->
      </div>
    </section>
  `;

  renderDashboardScheduleForDay(selectedDashboardDay);
  setupDashboardDragCarousel();
}

function selectDashboardDay(dayName) {
  selectedDashboardDay = dayName;
  document.querySelectorAll(".quick-day-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.day === dayName);
  });
  renderDashboardScheduleForDay(dayName);
}

function renderDashboardScheduleForDay(dayName) {
  const container = document.getElementById("dashboard-schedules-container");
  if (!container) return;

  const profile = APP_DATA[currentRole];
  if (!profile || !profile.classes) return;

  const actualDay = dayName === "Hari Ini" ? getSimulatedTodayDay() : dayName;
  const matchingClasses = profile.classes.filter(c => c.day === actualDay);

  if (matchingClasses.length === 0) {
    container.innerHTML = `
      <div style="padding: 28px; text-align: center; color: var(--text-subtle); font-size: 12px;">
        Tidak ada jadwal perkuliahan pada hari ${escapeHtml(actualDay)}${dayName === 'Hari Ini' ? ' (Hari Ini)' : ''}.
      </div>
    `;
    return;
  }

  const isMahasiswa = currentRole === "mahasiswa";

  container.innerHTML = matchingClasses.map(c => `
    <div class="clean-schedule-row ${c.hasShift ? 'row-shifted' : ''}" ${isMahasiswa ? '' : `onclick="openClassDetailView('${c.id}')"`} style="${isMahasiswa ? 'cursor: default;' : 'cursor: pointer;'}">
      <div class="clean-schedule-time">${escapeHtml(c.time)}</div>
      <div class="clean-schedule-main">
        <h4 class="clean-schedule-title">${escapeHtml(c.title)}</h4>
        <p class="clean-schedule-sub">${escapeHtml(c.room)} &bull; ${escapeHtml(c.lecturer)}</p>
      </div>
      ${c.hasShift ? `<span class="schedule-shift-highlight-badge" style="font-size: 10px;">Jadwal Berubah</span>` : ''}
      <span class="clean-schedule-sks-badge">${escapeHtml(c.sks)}</span>
    </div>
  `).join("");
}

// Drag carousel helper
function setupDashboardDragCarousel() {
  const viewport = document.getElementById("classes-drag-viewport");
  if (!viewport) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  viewport.addEventListener("mousedown", (e) => {
    isDown = true;
    viewport.classList.add("active");
    startX = e.pageX - viewport.offsetLeft;
    scrollLeft = viewport.scrollLeft;
  });

  viewport.addEventListener("mouseleave", () => {
    isDown = false;
    viewport.classList.remove("active");
  });

  viewport.addEventListener("mouseup", () => {
    isDown = false;
    viewport.classList.remove("active");
  });

  viewport.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    const walk = (x - startX) * 1.5;
    viewport.scrollLeft = scrollLeft - walk;
  });
}

// ==========================================================================
// 7. MATAKULIAH (CLASSES VIEW)
// ==========================================================================
function setupClassesViewInteractions() {
  const searchInput = document.getElementById("classes-search-input");
  const dayFilter = document.getElementById("classes-day-filter");
  const lecturerFilter = document.getElementById("classes-lecturer-filter");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderFullClassesView();
    });
  }

  if (dayFilter) {
    dayFilter.addEventListener("change", (e) => {
      currentDayFilter = e.target.value;
      renderFullClassesView();
    });
  }

  if (lecturerFilter) {
    lecturerFilter.addEventListener("change", (e) => {
      currentLecturerFilter = e.target.value;
      renderFullClassesView();
    });
  }
}

function renderFullClassesView() {
  const grid = document.getElementById("classes-full-grid");
  const lecturerFilterWrapper = document.getElementById("lecturer-filter-wrapper");
  const lecturerSelect = document.getElementById("classes-lecturer-filter");

  if (!grid) return;

  // Toggle Lecturer Filter (BAAK only)
  if (lecturerFilterWrapper) {
    lecturerFilterWrapper.style.display = currentRole === "baak" ? "block" : "none";
  }

  // Populate Lecturer Filter for BAAK
  if (currentRole === "baak" && lecturerSelect && lecturerSelect.options.length <= 1) {
    lecturerSelect.innerHTML = `<option value="all">Semua Dosen</option>` +
      BAAK_MASTER_LECTURERS.map(l => `<option value="${escapeHtml(l.name)}">${escapeHtml(l.name)}</option>`).join("");
  }

  const classes = APP_DATA[currentRole].classes;
  const isMahasiswa = currentRole === "mahasiswa";
  const isDosen = currentRole === "dosen";
  const isBaak = currentRole === "baak";

  const filtered = classes.filter(c => {
    const matchSearch = !currentSearchQuery ||
      c.title.toLowerCase().includes(currentSearchQuery) ||
      c.code.toLowerCase().includes(currentSearchQuery) ||
      (c.lecturer && c.lecturer.toLowerCase().includes(currentSearchQuery)) ||
      c.room.toLowerCase().includes(currentSearchQuery);

    const matchDay = currentDayFilter === "all" || c.day === currentDayFilter;
    const matchLecturer = currentRole !== "baak" || currentLecturerFilter === "all" || c.lecturer === currentLecturerFilter;

    return matchSearch && matchDay && matchLecturer;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 48px; text-align: center; color: var(--text-subtle); background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        Tidak ditemukan matakuliah yang sesuai dengan filter pencarian.
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(c => `
    <div class="class-card-item ${c.hasShift ? 'has-schedule-shift' : ''} ${c.hasPendingRequest && isDosen ? 'has-pending-request' : ''}">
      <div>
        <div class="card-top-row">
          <h3 class="card-title">${escapeHtml(c.title)}</h3>
          <span class="card-code">${escapeHtml(c.code)}</span>
        </div>
        ${isDosen ? '' : `<p class="card-lecturer">${escapeHtml(c.lecturer)}</p>`}

        ${c.hasShift ? `
          <span class="schedule-shift-highlight-badge">Jadwal Kelas Berubah</span>
          <div class="schedule-shift-meta-diff">
            <span class="strikethrough-old">${escapeHtml(c.day)}, ${escapeHtml(c.time)} &bull; ${escapeHtml(c.room)}</span>
            <span class="highlight-new">${escapeHtml(c.shiftedSchedule)}</span>
          </div>
        ` : `
          <div class="card-meta-box">
            <div class="card-meta-line">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Jadwal: ${escapeHtml(c.day)}, ${escapeHtml(c.time)}</span>
            </div>
            <div class="card-meta-line">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span>Ruangan: ${escapeHtml(c.room)}</span>
            </div>
            <div class="card-meta-line">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/></svg>
              <span>Bobot: ${escapeHtml(c.sks)}</span>
            </div>
          </div>
        `}

        ${c.hasPendingRequest && isDosen ? `
          <div class="pending-request-card-banner">
            <span class="pending-request-title">Permintaan Pindah Jadwal:</span>
            <span class="pending-request-desc">${escapeHtml(c.pendingRequestDetail.requester)} mengajukan perpindahan ke ${escapeHtml(c.pendingRequestDetail.targetDay)} (${escapeHtml(c.pendingRequestDetail.targetTime)}) di ${escapeHtml(c.pendingRequestDetail.targetRoom)}</span>
            <div style="display: flex; gap: 6px; margin-top: 8px;">
              <button type="button" class="btn-card-action primary" onclick="approveShiftRequest('${c.pendingRequestDetail.id}', '${c.id}')">Setujui Permintaan</button>
              <button type="button" class="btn-card-action outline" onclick="rejectShiftRequest('${c.pendingRequestDetail.id}', '${c.id}')">Tolak</button>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Action Footer -->
      ${isMahasiswa ? '' : `
        <div class="card-detailed-actions">
          <button type="button" class="btn-card-action outline" onclick="openClassDetailView('${c.id}')">
            Detail Kuliah
          </button>
        </div>
      `}
    </div>
  `).join("");
}

// Approve / Reject Shift Request by Dosen
function approveShiftRequest(requestId, classId) {
  const dosenClasses = APP_DATA.dosen.classes;
  const targetClass = dosenClasses.find(c => c.id === classId);
  if (targetClass) {
    targetClass.hasPendingRequest = false;
    targetClass.hasShift = true;
    targetClass.shiftedSchedule = `${targetClass.pendingRequestDetail.targetDay}, ${targetClass.pendingRequestDetail.targetTime} di ${targetClass.pendingRequestDetail.targetRoom} (Disetujui)`;
  }

  // Update in global requests ledger
  const req = ALL_RESCHEDULE_REQUESTS.find(r => r.id === requestId);
  if (req) {
    req.status = "Disetujui";
  }

  renderActiveRole("dosen");
  showToast("Permintaan perpindahan jadwal telah DISETUJUI.");
}

function rejectShiftRequest(requestId, classId) {
  const dosenClasses = APP_DATA.dosen.classes;
  const targetClass = dosenClasses.find(c => c.id === classId);
  if (targetClass) {
    targetClass.hasPendingRequest = false;
  }

  const req = ALL_RESCHEDULE_REQUESTS.find(r => r.id === requestId);
  if (req) {
    req.status = "Ditolak";
  }

  renderActiveRole("dosen");
  showToast("Permintaan perpindahan jadwal DITOLAK.");
}

// ==========================================================================
// 8. DEDICATED CLASS DETAIL VIEW (DOSEN & BAAK ONLY)
// ==========================================================================
function openClassDetailView(classId) {
  if (currentRole === "mahasiswa") {
    showToast("Halaman detail matakuliah tidak diperuntukkan bagi mahasiswa.");
    return;
  }

  activeDetailCourseId = classId;
  const profile = APP_DATA[currentRole];
  const c = profile.classes.find(item => item.id === classId) || profile.classes[0];
  if (!c) return;

  const isDosen = currentRole === "dosen";
  const isBaak = currentRole === "baak";

  // Header Details
  document.getElementById("detail-course-title").textContent = c.title;
  // Metadata without type: "WM-A • 3 SKS • Lab C 102"
  document.getElementById("detail-course-subtitle").textContent = `${c.code} • ${c.sks} • ${c.room}`;

  const container = document.getElementById("class-detail-content-area");
  if (!container) return;

  container.innerHTML = `
    ${c.hasShift ? `
      <div class="schedule-shift-alert-banner">
        <div class="alert-banner-left">
          <span class="alert-pill-tag">Kelas Pengganti Aktif</span>
          <p class="alert-banner-text">
            Sesi pekan ini telah dialihkan ke <strong>${escapeHtml(c.shiftedSchedule)}</strong>.
          </p>
        </div>
      </div>
    ` : ''}

    ${c.hasPendingRequest && isDosen ? `
      <div class="pending-request-card-banner" style="margin-bottom: 16px;">
        <span class="pending-request-title">Permintaan Persetujuan Pindah Jadwal:</span>
        <span class="pending-request-desc">${escapeHtml(c.pendingRequestDetail.requester)} mengajukan pemindahan ke <strong>${escapeHtml(c.pendingRequestDetail.targetDay)} (${escapeHtml(c.pendingRequestDetail.targetTime)})</strong> di <strong>${escapeHtml(c.pendingRequestDetail.targetRoom)}</strong> dengan alasan: "${escapeHtml(c.pendingRequestDetail.reason)}"</span>
        <div style="display: flex; gap: 8px; margin-top: 10px;">
          <button type="button" class="btn-primary-action" onclick="approveShiftRequest('${c.pendingRequestDetail.id}', '${c.id}')">Setujui Permintaan</button>
          <button type="button" class="btn-card-action outline" onclick="rejectShiftRequest('${c.pendingRequestDetail.id}', '${c.id}')">Tolak Permintaan</button>
        </div>
      </div>
    ` : ''}

    <div class="detail-summary-strip">
      <div class="detail-metric-card">
        <span class="detail-metric-title">Jadwal Perkuliahan</span>
        <span class="detail-metric-value">${escapeHtml(c.day)}, ${escapeHtml(c.time)}</span>
      </div>
      <div class="detail-metric-card">
        <span class="detail-metric-title">Alokasi Ruangan</span>
        <span class="detail-metric-value">${escapeHtml(c.room)}</span>
      </div>
      ${isBaak ? `
        <div class="detail-metric-card">
          <span class="detail-metric-title">Dosen Pengampu</span>
          <span class="detail-metric-value">${escapeHtml(c.lecturer)}</span>
        </div>
      ` : ''}
      <div class="detail-metric-card">
        <span class="detail-metric-title">Total Mahasiswa Terdaftar</span>
        <span class="detail-metric-value">${DUMMY_STUDENTS_ROSTER.length} Mahasiswa</span>
      </div>
    </div>

    <div class="detail-grid-sections">
      <!-- Kolom Kiri: Rencana Perkuliahan Semester (RPS 16 Pekan) -->
      <div class="clean-section-card">
        <div class="clean-section-header">
          <h3 class="clean-header-title">Rencana Perkuliahan 16 Pekan (RPS)</h3>
        </div>
        <div style="padding: 12px; overflow-x: auto;">
          <table class="syllabus-timeline-table">
            <thead>
              <tr>
                <th>Pekan</th>
                <th>Materi Pokok Bahasan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Pekan 1 - 2</td><td>Pengenalan Konsep & Arsitektur Sistem</td><td><span class="status-badge approved">Selesai</span></td></tr>
              <tr><td>Pekan 3 - 5</td><td>Implementasi Model Dasar & Preprocessing</td><td><span class="status-badge approved">Selesai</span></td></tr>
              <tr><td>Pekan 6 - 7</td><td>Algoritma Optimasi & Pipeline Evaluasi</td><td><span class="status-badge approved">Selesai</span></td></tr>
              <tr class="active-week-highlight-row">
                <td><strong>Pekan 8</strong></td>
                <td><strong>Transfer Learning & Deep Neural Network</strong></td>
                <td><span class="status-badge pending">Sedang Berlangsung</span></td>
              </tr>
              <tr><td>Pekan 9</td><td>Evaluasi Tengah Semester (ETS)</td><td><span class="status-badge">Mendatang</span></td></tr>
              <tr><td>Pekan 10 - 12</td><td>Model Deployment & Servicing API</td><td><span class="status-badge">Mendatang</span></td></tr>
              <tr><td>Pekan 13 - 15</td><td>Pengujian Performa & Fine-Tuning</td><td><span class="status-badge">Mendatang</span></td></tr>
              <tr><td>Pekan 16</td><td>Evaluasi Akhir Semester (EAS)</td><td><span class="status-badge">Mendatang</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Kolom Kanan: Daftar Mahasiswa Terdaftar (Dummy Sensor) -->
      <div class="clean-section-card">
        <div class="clean-section-header">
          <h3 class="clean-header-title">Daftar Mahasiswa Terdaftar</h3>
          <span style="font-size: 11px; color: var(--text-subtle);">${DUMMY_STUDENTS_ROSTER.length} Orang</span>
        </div>
        <div style="padding: 12px; max-height: 420px; overflow-y: auto;">
          <table class="history-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Mahasiswa</th>
                <th>NRP</th>
              </tr>
            </thead>
            <tbody>
              ${DUMMY_STUDENTS_ROSTER.map(s => `
                <tr>
                  <td>${s.no}</td>
                  <td><strong>${escapeHtml(s.name)}</strong></td>
                  <td><code>${escapeHtml(s.nrp)}</code></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  navigateToView("class-detail");
}

// ==========================================================================
// 9. TIMETABLE MATRIX (READ-ONLY FOR MAHASISWA, HIGHLIGHTS FOR SHIFTS)
// ==========================================================================
function render7Day1HourMatrix() {
  const daysHeaderRow = document.getElementById("matrix-header-days-row");
  const hoursHeaderRow = document.getElementById("matrix-header-hours-row");
  const tbody = document.getElementById("matrix-body-rooms");

  if (!daysHeaderRow || !hoursHeaderRow || !tbody) return;

  const weekDays = [
    { name: "Senin", date: "12 Okt" },
    { name: "Selasa", date: "13 Okt" },
    { name: "Rabu", date: "14 Okt" },
    { name: "Kamis", date: "15 Okt" },
    { name: "Jumat", date: "16 Okt" },
    { name: "Sabtu", date: "17 Okt" },
    { name: "Minggu", date: "18 Okt" }
  ];

  const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const campusRooms = [
    "Lab C 102",
    "Lab C 103",
    "Lab C 104",
    "Lab C 105",
    "SAW-06.10",
    "Lab Software SAW-08",
    "SAW-05.02",
    "Lab Sinyal B 204",
    "B-101",
    "D4-201"
  ];

  // 1. Days Row
  let daysHtml = '<th class="room-col-header" rowspan="2">Ruangan</th>';
  weekDays.forEach(day => {
    daysHtml += `<th class="matrix-day-th" colspan="${hours.length}">${day.name}, ${day.date}</th>`;
  });
  daysHeaderRow.innerHTML = daysHtml;

  // 2. Hours Row
  let hoursHtml = "";
  weekDays.forEach(() => {
    hours.forEach(h => {
      const hStr = h < 10 ? `0${h}:00` : `${h}:00`;
      hoursHtml += `<th class="matrix-hour-th">${hStr}</th>`;
    });
  });
  hoursHeaderRow.innerHTML = hoursHtml;

  // 3. Rooms and Time Slots
  const classes = APP_DATA[currentRole].classes || [];
  const isMahasiswa = currentRole === "mahasiswa";
  let bodyHtml = "";

  campusRooms.forEach(roomName => {
    bodyHtml += `<tr><td class="room-col-cell">${escapeHtml(roomName)}</td>`;

    weekDays.forEach(day => {
      let skipHours = 0;

      hours.forEach(h => {
        if (skipHours > 0) {
          skipHours--;
          return;
        }

        const matched = classes.find(c => {
          const roomMatch = c.room.includes(roomName) || roomName.includes(c.room.replace("Lab Software ", ""));
          const dayMatch = c.day === day.name;
          const hourMatch = c.startHour === h;
          return roomMatch && dayMatch && hourMatch;
        });

        if (matched) {
          const colSpan = matched.durationHours || 2;
          skipHours = colSpan - 1;

          // Distinction for changed or requested schedules
          const isShifted = matched.hasShift;
          const isRequested = matched.hasPendingRequest;
          const blockClass = isShifted ? 'matrix-slot-block shifted' : isRequested ? 'matrix-slot-block requested' : 'matrix-slot-block';

          bodyHtml += `
            <td class="matrix-slot-cell" colspan="${colSpan}">
              <span class="${blockClass}" ${isMahasiswa ? 'style="cursor: default;"' : `onclick="openClassDetailView('${matched.id}')"`} title="${isMahasiswa ? matched.title : 'Buka detail kelas'}">
                ${escapeHtml(matched.code)} - ${escapeHtml(matched.title.substring(0, 16))} (${matched.time})
                ${isShifted ? ' [Berubah]' : isRequested ? ' [Permintaan]' : ''}
              </span>
            </td>
          `;
        } else {
          bodyHtml += `<td class="matrix-slot-cell"></td>`;
        }
      });
    });

    bodyHtml += `</tr>`;
  });

  tbody.innerHTML = bodyHtml;
}

// ==========================================================================
// 10. CENTERED PINDAH JADWAL MODULE & OVERLAY RECOMMENDATIONS
// ==========================================================================
function populateRescheduleCourseOptions() {
  const select = document.getElementById("reschedule-course-select");
  const titleEl = document.getElementById("reschedule-page-title");
  if (!select) return;

  const isMahasiswa = currentRole === "mahasiswa";
  const isBaak = currentRole === "baak";

  if (titleEl) {
    titleEl.textContent = isMahasiswa ? "Pengajuan Pindah Jadwal Perkuliahan" : "Pindah Jadwal Perkuliahan";
  }

  const classes = APP_DATA[currentRole].classes || [];

  select.innerHTML = `<option value="">-- Pilih Matakuliah --</option>` +
    classes.map(c => {
      // Prefix with lecturer name for BAAK role
      const prefix = isBaak ? `[${c.lecturer}] ` : "";
      return `<option value="${c.id}">${escapeHtml(prefix)}${escapeHtml(c.title)} (${escapeHtml(c.day)}, ${escapeHtml(c.time)} &bull; ${escapeHtml(c.room)})</option>`;
    }).join("");

  onRescheduleCourseChange("");
}

function onRescheduleCourseChange(courseId) {
  const fieldset = document.getElementById("reschedule-parameters-fieldset");
  const btnRec = document.getElementById("btn-request-recommendation");
  const btnSubmit = document.getElementById("btn-submit-reschedule");
  const infoBox = document.getElementById("current-schedule-info-box");

  if (!courseId) {
    if (fieldset) fieldset.disabled = true;
    if (btnRec) btnRec.disabled = true;
    if (btnSubmit) btnSubmit.disabled = true;
    if (infoBox) infoBox.style.display = "none";
    return;
  }

  const profile = APP_DATA[currentRole];
  const c = profile.classes.find(item => item.id === courseId);

  if (c && infoBox) {
    infoBox.style.display = "block";
    document.getElementById("current-course-name").textContent = c.title;
    document.getElementById("current-course-schedule").textContent = `${c.day}, ${c.time} • ${c.room} (${c.sks})`;
  }

  if (fieldset) fieldset.disabled = false;
  if (btnRec) btnRec.disabled = false;
  if (btnSubmit) btnSubmit.disabled = false;
}

// Open Recommendation Overlay Modal
function requestSystemRecommendations() {
  const modal = document.getElementById("recommendations-overlay-modal");
  const container = document.getElementById("modal-recommendations-container");
  if (!modal || !container) return;

  const courseSelect = document.getElementById("reschedule-course-select");
  const selectedText = courseSelect && courseSelect.value ? courseSelect.options[courseSelect.selectedIndex].text : "Matakuliah";

  document.getElementById("modal-rec-course-title").textContent = selectedText.split("(")[0].trim();

  // 5 Recommendation slot cards
  const slots = [
    { day: "Rabu", time: "13:00 - 16:00", room: "Lab C 103", note: "Bebas Sesi Praktikum Lain" },
    { day: "Kamis", time: "13:00 - 15:00", room: "SAW-06.10", note: "Kapasitas 40 Kursi Mahasiswa" },
    { day: "Jumat", time: "08:00 - 11:00", room: "Lab C 102", note: "Slot Pagi Kosong & Workstation Siap" },
    { day: "Selasa", time: "15:00 - 17:00", room: "Lab Software SAW-08", note: "Bebas Bentrok Dosen" },
    { day: "Senin", time: "13:00 - 15:00", room: "Lab Sinyal B 204", note: "Laboratorium Tersedia Penuh" }
  ];

  container.innerHTML = slots.map(s => `
    <div class="overlay-rec-card" onclick="applyRecommendationSlot('${s.day}', '${s.time}', '${s.room}')">
      <div class="overlay-rec-header">
        <span class="overlay-rec-day">${escapeHtml(s.day)}</span>
        <span class="overlay-rec-badge">${escapeHtml(s.note)}</span>
      </div>
      <div class="overlay-rec-time">${escapeHtml(s.time)}</div>
      <div class="overlay-rec-room">Ruangan: <strong>${escapeHtml(s.room)}</strong></div>
      <button type="button" class="btn-card-action primary" style="width: 100%; margin-top: 10px;">
        Pilih Slot Ini &rarr;
      </button>
    </div>
  `).join("");

  modal.style.display = "flex";
}

function closeRecommendationOverlay() {
  const modal = document.getElementById("recommendations-overlay-modal");
  if (modal) modal.style.display = "none";
}

function applyRecommendationSlot(day, time, room) {
  const daySelect = document.getElementById("reschedule-target-day");
  const timeSelect = document.getElementById("reschedule-target-time");
  const roomSelect = document.getElementById("reschedule-target-room");

  if (daySelect) daySelect.value = day;
  if (timeSelect) timeSelect.value = time;
  if (roomSelect) roomSelect.value = room;

  closeRecommendationOverlay();
  showToast(`Slot rekomendasi ${day} (${time} di ${room}) diterapkan ke formulir.`);
}

function submitRescheduleRequest() {
  const courseSelect = document.getElementById("reschedule-course-select");
  const targetDay = document.getElementById("reschedule-target-day");
  const targetTime = document.getElementById("reschedule-target-time");
  const targetRoom = document.getElementById("reschedule-target-room");
  const durationSelect = document.getElementById("reschedule-duration-select");

  if (!courseSelect || !courseSelect.value) {
    showToast("Silakan pilih matakuliah terlebih dahulu.");
    return;
  }

  const courseTitle = courseSelect.options[courseSelect.selectedIndex].text.split("(")[0].trim();
  const isMahasiswa = currentRole === "mahasiswa";
  const isDosen = currentRole === "dosen";
  const isBaak = currentRole === "baak";

  // Auto-approve for Dosen and BAAK
  const status = isMahasiswa ? "Menunggu Persetujuan Dosen" : "Disetujui";

  const newRequest = {
    id: `REQ-${Date.now().toString().slice(-4)}`,
    courseId: courseSelect.value,
    courseTitle: courseTitle,
    lecturerName: isDosen ? APP_DATA.dosen.name : isMahasiswa ? "Dr. Ir. Budi Sxxxx, M.T." : "BAAK",
    requesterRole: APP_DATA[currentRole].roleLabel,
    requesterName: APP_DATA[currentRole].name,
    originalSchedule: "Jadwal Reguler",
    proposedSchedule: `${targetDay.value}, ${targetTime.value} (${targetRoom.value})`,
    reason: `Perpindahan sesi perkuliahan (${durationSelect.value})`,
    status: status,
    submittedAt: "09 Okt 2026 14:30"
  };

  ALL_RESCHEDULE_REQUESTS.unshift(newRequest);

  if (!isMahasiswa) {
    // If Dosen or BAAK, update course schedule immediately
    const profile = APP_DATA[currentRole];
    const c = profile.classes.find(item => item.id === courseSelect.value);
    if (c) {
      c.hasShift = true;
      c.shiftedSchedule = `${targetDay.value}, ${targetTime.value} di ${targetRoom.value} (${durationSelect.value})`;
    }
  }

  // Refresh views
  renderActiveRole(currentRole);
  showToast(isMahasiswa ? "Permohonan berhasil diajukan. Menunggu persetujuan dosen." : "Jadwal perkuliahan berhasil diperbarui (Otomatis Disetujui).");
}

// ==========================================================================
// 11. CHATBOT MODULE (AI ASSISTANT)
// ==========================================================================
function setupChatModule() {
  const sendBtn = document.getElementById("btn-chat-send");
  const chatInput = document.getElementById("chat-user-input");

  if (sendBtn && chatInput) {
    sendBtn.addEventListener("click", () => handleUserChatMessage());
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleUserChatMessage();
      }
    });
  }
}

function resetChatInterface() {
  const stream = document.getElementById("chat-messages-stream");
  const templatesContainer = document.getElementById("chat-templates-container");
  if (!stream || !templatesContainer) return;

  const isMahasiswa = currentRole === "mahasiswa";
  const isDosen = currentRole === "dosen";
  const isBaak = currentRole === "baak";

  // Role-tailored prompt templates
  let templates = [];
  if (isMahasiswa) {
    templates = [
      { id: "tmpl-schedule-today", label: "Apa jadwal saya hari ini?" },
      { id: "tmpl-my-courses", label: "List mata kuliah saya" },
      { id: "tmpl-reschedule-rec", label: "Cari rekomendasi jadwal kosong untuk pindah jadwal" }
    ];
  } else if (isDosen) {
    templates = [
      { id: "tmpl-schedule-today", label: "Apa jadwal mengajar saya hari ini?" },
      { id: "tmpl-my-courses", label: "Daftar kelas yang saya ampu" },
      { id: "tmpl-reschedule-rec", label: "Cari slot kosong untuk memindahkan perkuliahan" }
    ];
  } else if (isBaak) {
    templates = [
      { id: "tmpl-baak-rooms", label: "Status okupansi ruangan kampus hari ini" },
      { id: "tmpl-baak-util", label: "Ringkasan pemanfaatan jadwal mingguan" },
      { id: "tmpl-reschedule-rec", label: "Cari slot ruangan kosong untuk perubahan jadwal" }
    ];
  }

  templatesContainer.innerHTML = templates.map(t => `
    <button type="button" class="chat-prompt-pill" onclick="triggerChatTemplate('${t.id}')">
      ${escapeHtml(t.label)}
    </button>
  `).join("");

  // Initial welcome message
  const welcomeText = isMahasiswa
    ? `Halo Realdho Fahryz. Saya Asisten AI Akademik PENSCEDULER. Anda dapat menanyakan jadwal hari ini, daftar matakuliah, atau mencari rekomendasi slot kosong untuk pindah jadwal.`
    : isDosen
    ? `Selamat datang Dr. Ir. Budi Sxxxx, M.T. Saya siap membantu memeriksa jadwal mengajar, daftar kelas, serta mencarikan slot kosong bebas konflik untuk memindahkan jadwal perkuliahan.`
    : `Halo Tim BAAK. Saya siap membantu memantau ketersediaan ruangan kampus, rekapitulasi jadwal, dan rekomendasi slot perpindahan perkuliahan.`;

  stream.innerHTML = `
    <div class="chat-bubble ai">
      <div class="chat-bubble-avatar">AI</div>
      <div class="chat-bubble-content">
        <p>${escapeHtml(welcomeText)}</p>
      </div>
    </div>
  `;
}

function triggerChatTemplate(templateId) {
  if (templateId === "tmpl-schedule-today") {
    appendUserChatMessage("Apa jadwal saya hari ini?");
    setTimeout(() => {
      const classes = APP_DATA[currentRole].classes || [];
      const todayClasses = classes.filter(c => c.day === "Senin");
      if (todayClasses.length === 0) {
        appendAiChatMessage("Tidak ada jadwal perkuliahan pada hari ini (Senin). Anda dapat memeriksa hari lain melalui menu Jadwal.");
      } else {
        const text = `Berikut adalah jadwal perkuliahan Anda untuk hari ini (Senin):<br><br>` +
          todayClasses.map(c => `&bull; <strong>${escapeHtml(c.title)}</strong> (${c.time}) di <strong>${escapeHtml(c.room)}</strong>`).join("<br>");
        appendAiChatMessage(text);
      }
    }, 400);
  } else if (templateId === "tmpl-my-courses") {
    appendUserChatMessage("List mata kuliah saya");
    setTimeout(() => {
      const classes = APP_DATA[currentRole].classes || [];
      const text = `Berikut adalah seluruh matakuliah terdaftar Anda semester ini (${classes.length} matakuliah):<br><br>` +
        classes.map((c, idx) => `${idx + 1}. <strong>${escapeHtml(c.title)}</strong> (${c.sks}) &bull; ${c.day}, ${c.time}`).join("<br>");
      appendAiChatMessage(text);
    }, 400);
  } else if (templateId === "tmpl-baak-rooms") {
    appendUserChatMessage("Status okupansi ruangan kampus hari ini");
    setTimeout(() => {
      appendAiChatMessage(`Dari 42 total ruangan perkuliahan di sistem, 36 ruangan sedang digunakan aktif untuk praktikum dan teori. 6 laboratorium memiliki slot kosong pada sesi siang (pukul 13:00 - 16:00).`);
    }, 400);
  } else if (templateId === "tmpl-baak-util") {
    appendUserChatMessage("Ringkasan pemanfaatan jadwal mingguan");
    setTimeout(() => {
      appendAiChatMessage(`Terdapat 248 matakuliah terjadwal untuk semester ini dengan tingkat utilitas ruang sebesar 85.7%. Beban hari terpadat adalah Selasa dan Kamis.`);
    }, 400);
  } else if (templateId === "tmpl-reschedule-rec") {
    const isBaak = currentRole === "baak";
    appendUserChatMessage(isBaak ? "Cari slot ruangan kosong untuk perubahan jadwal" : "Cari rekomendasi jadwal kosong untuk pindah jadwal");

    setTimeout(() => {
      const classes = APP_DATA[currentRole].classes || [];
      const dropdownHtml = `
        <p>Silakan pilih matakuliah yang ingin dipindahkan jadwalnya:</p>
        <div style="margin: 12px 0;">
          <select class="form-select" id="chat-course-picker" onchange="generateChatRecommendations(this.value)">
            <option value="">-- Pilih Matakuliah --</option>
            ${classes.map(c => {
              const prefix = isBaak ? `[${c.lecturer}] ` : "";
              return `<option value="${c.id}">${escapeHtml(prefix)}${escapeHtml(c.title)} (${c.day}, ${c.time})</option>`;
            }).join("")}
          </select>
        </div>
      `;
      appendAiChatMessage(dropdownHtml);
    }, 400);
  }
}

function generateChatRecommendations(courseId) {
  if (!courseId) return;

  const profile = APP_DATA[currentRole];
  const c = profile.classes.find(item => item.id === courseId);
  if (!c) return;

  const isBaak = currentRole === "baak";
  const prefix = isBaak ? `[${c.lecturer}] ` : "";

  // 3 Slots in chat stream
  const slots = [
    { day: "Rabu", time: "13:00 - 16:00", room: "Lab C 103", note: "Bebas Bentrok & Siap Digunakan" },
    { day: "Kamis", time: "13:00 - 15:00", room: "SAW-06.10", note: "Kapasitas 40 Kursi" },
    { day: "Jumat", time: "08:00 - 11:00", room: "Lab C 102", note: "Workstation Lengkap" }
  ];

  const html = `
    <p>Ditemukan slot kosong rekomendasi sistem untuk <strong>${escapeHtml(prefix)}${escapeHtml(c.title)}</strong>:</p>
    <div class="chat-rec-cards-list">
      ${slots.map(s => `
        <div class="chat-rec-slot-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 700; color: var(--text-main); font-size: 12px;">${escapeHtml(s.day)}, ${escapeHtml(s.time)}</span>
            <span class="badge-rec-status" style="font-size: 10px;">${escapeHtml(s.note)}</span>
          </div>
          <div style="font-size: 11px; color: var(--text-subtle); margin: 4px 0;">Ruangan: <strong>${escapeHtml(s.room)}</strong></div>
          <button type="button" class="btn-card-action primary" style="width: 100%; margin-top: 6px;" onclick="applyChatSlotToReschedule('${c.id}', '${s.day}', '${s.time}', '${s.room}')">
            Terapkan ke Formulir Pindah Jadwal &rarr;
          </button>
        </div>
      `).join("")}
    </div>
  `;

  appendAiChatMessage(html);
}

function applyChatSlotToReschedule(courseId, day, time, room) {
  navigateToView("reschedule");
  const courseSelect = document.getElementById("reschedule-course-select");
  if (courseSelect) {
    courseSelect.value = courseId;
    onRescheduleCourseChange(courseId);
  }
  applyRecommendationSlot(day, time, room);
  showToast("Parameter rekomendasi dari AI berhasil diterapkan ke formulir.");
}

function handleUserChatMessage() {
  const input = document.getElementById("chat-user-input");
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  appendUserChatMessage(text);
  input.value = "";

  // Natural response
  setTimeout(() => {
    appendAiChatMessage(`Terima kasih atas pesan Anda: "${escapeHtml(text)}". Anda dapat memanfaatkan tombol template cepat di bagian atas untuk pengecekan jadwal atau pencarian slot pemindahan perkuliahan.`);
  }, 500);
}

function appendUserChatMessage(text) {
  const stream = document.getElementById("chat-messages-stream");
  if (!stream) return;

  const bubble = document.createElement("div");
  bubble.className = "chat-bubble user";
  bubble.innerHTML = `
    <div class="chat-bubble-content">
      <p>${escapeHtml(text)}</p>
    </div>
    <div class="chat-bubble-avatar user">${APP_DATA[currentRole].avatarChar}</div>
  `;
  stream.appendChild(bubble);
  stream.scrollTop = stream.scrollHeight;
}

function appendAiChatMessage(htmlContent) {
  const stream = document.getElementById("chat-messages-stream");
  if (!stream) return;

  const bubble = document.createElement("div");
  bubble.className = "chat-bubble ai";
  bubble.innerHTML = `
    <div class="chat-bubble-avatar">AI</div>
    <div class="chat-bubble-content">
      ${htmlContent}
    </div>
  `;
  stream.appendChild(bubble);
  stream.scrollTop = stream.scrollHeight;
}

// ==========================================================================
// 12. BAAK MASTER REGISTRIES & CRUD WORKFLOWS
// ==========================================================================
function openBaakCrudModal(entity, editIndex = null) {
  currentCrudEntity = entity;
  currentCrudEditIndex = editIndex;

  const modal = document.getElementById("baak-crud-modal");
  const titleEl = document.getElementById("baak-crud-modal-title");
  const container = document.getElementById("baak-crud-form-container");
  if (!modal || !titleEl || !container) return;

  const isEdit = editIndex !== null;
  const entityLabels = {
    room: "Ruangan Perkuliahan",
    subject: "Subjek Perkuliahan",
    lecturer: "Dosen Pengampu",
    student: "Mahasiswa"
  };

  titleEl.textContent = `${isEdit ? 'Ubah Data' : 'Tambah'} ${entityLabels[entity]}`;

  let fieldsHtml = "";
  if (entity === "room") {
    const item = isEdit ? BAAK_MASTER_ROOMS[editIndex] : { code: "", name: "", building: "Gedung D4" };
    fieldsHtml = `
      <div class="form-group">
        <label class="form-label" for="crud-room-code">Label Ruangan</label>
        <input type="text" id="crud-room-code" class="form-input" required value="${escapeHtml(item.code)}" placeholder="Contoh: C-102">
      </div>
      <div class="form-group">
        <label class="form-label" for="crud-room-name">Nama Ruangan</label>
        <input type="text" id="crud-room-name" class="form-input" required value="${escapeHtml(item.name)}" placeholder="Contoh: Ruang Workshop Komputer">
      </div>
      <div class="form-group">
        <label class="form-label" for="crud-room-building">Gedung</label>
        <select id="crud-room-building" class="form-select" required>
          <option value="Gedung D4" ${item.building === 'Gedung D4' ? 'selected' : ''}>Gedung D4</option>
          <option value="Gedung D3" ${item.building === 'Gedung D3' ? 'selected' : ''}>Gedung D3</option>
          <option value="Gedung Pasca" ${item.building === 'Gedung Pasca' ? 'selected' : ''}>Gedung Pasca</option>
          <option value="Gedung SAW" ${item.building === 'Gedung SAW' ? 'selected' : ''}>Gedung SAW</option>
        </select>
      </div>
    `;
  } else if (entity === "subject") {
    const item = isEdit ? BAAK_MASTER_SUBJECTS[editIndex] : { code: "", name: "", sks: 3 };
    fieldsHtml = `
      <div class="form-group">
        <label class="form-label" for="crud-subj-code">Kode Subjek</label>
        <input type="text" id="crud-subj-code" class="form-input" required value="${escapeHtml(item.code)}" placeholder="Contoh: WMP301">
      </div>
      <div class="form-group">
        <label class="form-label" for="crud-subj-name">Nama Subjek</label>
        <input type="text" id="crud-subj-name" class="form-input" required value="${escapeHtml(item.name)}" placeholder="Contoh: Workshop Mesin Pembelajaran">
      </div>
      <div class="form-group">
        <label class="form-label" for="crud-subj-sks">Satuan Kredit Semester (SKS)</label>
        <input type="number" id="crud-subj-sks" class="form-input" min="1" max="6" required value="${item.sks}">
      </div>
    `;
  } else if (entity === "lecturer") {
    const item = isEdit ? BAAK_MASTER_LECTURERS[editIndex] : { name: "", nip: "" };
    fieldsHtml = `
      <div class="form-group">
        <label class="form-label" for="crud-lect-name">Nama Dosen Lengkap</label>
        <input type="text" id="crud-lect-name" class="form-input" required value="${escapeHtml(item.name)}" placeholder="Contoh: Dr. Ir. Budi Sxxxx, M.T.">
      </div>
      <div class="form-group">
        <label class="form-label" for="crud-lect-nip">Nomor Induk Pegawai (NIP)</label>
        <input type="text" id="crud-lect-nip" class="form-input" required value="${escapeHtml(item.nip)}" placeholder="Contoh: 197403252001121xxx">
      </div>
    `;
  } else if (entity === "student") {
    const item = isEdit ? BAAK_MASTER_STUDENTS[editIndex] : { name: "", nrp: "", cohort: "2023", major: "D4 Teknik Informatika" };
    fieldsHtml = `
      <div class="form-group">
        <label class="form-label" for="crud-stud-name">Nama Mahasiswa</label>
        <input type="text" id="crud-stud-name" class="form-input" required value="${escapeHtml(item.name)}" placeholder="Contoh: Realdho Fahryz">
      </div>
      <div class="form-group">
        <label class="form-label" for="crud-stud-nrp">Nomor Registrasi Pokok (NRP)</label>
        <input type="text" id="crud-stud-nrp" class="form-input" required value="${escapeHtml(item.nrp)}" placeholder="Contoh: 1234567890">
      </div>
      <div class="form-row-grid">
        <div class="form-group">
          <label class="form-label" for="crud-stud-cohort">Angkatan</label>
          <input type="text" id="crud-stud-cohort" class="form-input" required value="${escapeHtml(item.cohort)}" placeholder="Contoh: 2022">
        </div>
        <div class="form-group">
          <label class="form-label" for="crud-stud-major">Jurusan / Program Studi</label>
          <input type="text" id="crud-stud-major" class="form-input" required value="${escapeHtml(item.major)}" placeholder="Contoh: D4 Teknik Informatika">
        </div>
      </div>
    `;
  }

  container.innerHTML = fieldsHtml;
  modal.style.display = "flex";
}

function closeBaakCrudModal() {
  const modal = document.getElementById("baak-crud-modal");
  if (modal) modal.style.display = "none";
}

function saveBaakCrudItem(e) {
  if (e) e.preventDefault();

  const isEdit = currentCrudEditIndex !== null;

  if (currentCrudEntity === "room") {
    const code = document.getElementById("crud-room-code").value.trim();
    const name = document.getElementById("crud-room-name").value.trim();
    const building = document.getElementById("crud-room-building").value.trim();
    if (!code || !name) return;

    const data = { code, name, building };
    if (isEdit) {
      BAAK_MASTER_ROOMS[currentCrudEditIndex] = data;
    } else {
      BAAK_MASTER_ROOMS.unshift(data);
    }
    APP_DATA.baak.stats.ruangan = BAAK_MASTER_ROOMS.length;
    renderBaakRoomsTable();
  } else if (currentCrudEntity === "subject") {
    const code = document.getElementById("crud-subj-code").value.trim();
    const name = document.getElementById("crud-subj-name").value.trim();
    const sks = parseInt(document.getElementById("crud-subj-sks").value, 10) || 2;
    if (!code || !name) return;

    const data = { code, name, sks };
    if (isEdit) {
      BAAK_MASTER_SUBJECTS[currentCrudEditIndex] = data;
    } else {
      BAAK_MASTER_SUBJECTS.unshift(data);
    }
    APP_DATA.baak.stats.matakuliah = BAAK_MASTER_SUBJECTS.length;
    renderBaakSubjectsTable();
  } else if (currentCrudEntity === "lecturer") {
    const name = document.getElementById("crud-lect-name").value.trim();
    const nip = document.getElementById("crud-lect-nip").value.trim();
    if (!name || !nip) return;

    const data = { name, nip };
    if (isEdit) {
      BAAK_MASTER_LECTURERS[currentCrudEditIndex] = data;
    } else {
      BAAK_MASTER_LECTURERS.unshift(data);
    }
    APP_DATA.baak.stats.dosen = BAAK_MASTER_LECTURERS.length;
    renderBaakLecturersTable();
  } else if (currentCrudEntity === "student") {
    const name = document.getElementById("crud-stud-name").value.trim();
    const nrp = document.getElementById("crud-stud-nrp").value.trim();
    const cohort = document.getElementById("crud-stud-cohort").value.trim();
    const major = document.getElementById("crud-stud-major").value.trim();
    if (!name || !nrp) return;

    const data = { name, nrp, cohort, major };
    if (isEdit) {
      BAAK_MASTER_STUDENTS[currentCrudEditIndex] = data;
    } else {
      BAAK_MASTER_STUDENTS.unshift(data);
    }
    APP_DATA.baak.stats.mahasiswa = BAAK_MASTER_STUDENTS.length;
    renderBaakStudentsTable();
  }

  closeBaakCrudModal();
  showToast(isEdit ? "Perubahan data master berhasil disimpan." : "Data master baru berhasil ditambahkan.");

  if (activeCurrentView === "dashboard" && currentRole === "baak") {
    renderDashboardForRole("baak");
  }
}

function deleteBaakMasterItem(entity, index) {
  if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

  if (entity === "room") {
    BAAK_MASTER_ROOMS.splice(index, 1);
    APP_DATA.baak.stats.ruangan = BAAK_MASTER_ROOMS.length;
    renderBaakRoomsTable();
  } else if (entity === "subject") {
    BAAK_MASTER_SUBJECTS.splice(index, 1);
    APP_DATA.baak.stats.matakuliah = BAAK_MASTER_SUBJECTS.length;
    renderBaakSubjectsTable();
  } else if (entity === "lecturer") {
    BAAK_MASTER_LECTURERS.splice(index, 1);
    APP_DATA.baak.stats.dosen = BAAK_MASTER_LECTURERS.length;
    renderBaakLecturersTable();
  } else if (entity === "student") {
    BAAK_MASTER_STUDENTS.splice(index, 1);
    APP_DATA.baak.stats.mahasiswa = BAAK_MASTER_STUDENTS.length;
    renderBaakStudentsTable();
  }

  showToast("Data master berhasil dihapus.");

  if (activeCurrentView === "dashboard" && currentRole === "baak") {
    renderDashboardForRole("baak");
  }
}

function renderBaakRoomsTable() {
  const tbody = document.getElementById("baak-rooms-tbody");
  if (!tbody) return;

  tbody.innerHTML = BAAK_MASTER_ROOMS.map((r, idx) => `
    <tr>
      <td><code>${escapeHtml(r.code)}</code></td>
      <td><strong>${escapeHtml(r.name)}</strong></td>
      <td>${escapeHtml(r.building)}</td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button type="button" class="btn-card-action outline" style="flex: initial; padding: 4px 10px;" onclick="openBaakCrudModal('room', ${idx})">Ubah</button>
          <button type="button" class="btn-card-action outline" style="flex: initial; padding: 4px 10px; color: var(--accent-rose); border-color: var(--accent-rose);" onclick="deleteBaakMasterItem('room', ${idx})">Hapus</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderBaakSubjectsTable() {
  const tbody = document.getElementById("baak-subjects-tbody");
  if (!tbody) return;

  tbody.innerHTML = BAAK_MASTER_SUBJECTS.map((s, idx) => `
    <tr>
      <td><code>${escapeHtml(s.code)}</code></td>
      <td><strong>${escapeHtml(s.name)}</strong></td>
      <td>${s.sks} SKS</td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button type="button" class="btn-card-action outline" style="flex: initial; padding: 4px 10px;" onclick="openBaakCrudModal('subject', ${idx})">Ubah</button>
          <button type="button" class="btn-card-action outline" style="flex: initial; padding: 4px 10px; color: var(--accent-rose); border-color: var(--accent-rose);" onclick="deleteBaakMasterItem('subject', ${idx})">Hapus</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderBaakLecturersTable() {
  const tbody = document.getElementById("baak-lecturers-tbody");
  if (!tbody) return;

  tbody.innerHTML = BAAK_MASTER_LECTURERS.map((l, idx) => `
    <tr>
      <td><strong>${escapeHtml(l.name)}</strong></td>
      <td><code>${escapeHtml(l.nip)}</code></td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button type="button" class="btn-card-action outline" style="flex: initial; padding: 4px 10px;" onclick="openBaakCrudModal('lecturer', ${idx})">Ubah</button>
          <button type="button" class="btn-card-action outline" style="flex: initial; padding: 4px 10px; color: var(--accent-rose); border-color: var(--accent-rose);" onclick="deleteBaakMasterItem('lecturer', ${idx})">Hapus</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderBaakStudentsTable() {
  const tbody = document.getElementById("baak-students-tbody");
  if (!tbody) return;

  tbody.innerHTML = BAAK_MASTER_STUDENTS.map((s, idx) => `
    <tr>
      <td><strong>${escapeHtml(s.name)}</strong></td>
      <td><code>${escapeHtml(s.nrp)}</code></td>
      <td>${escapeHtml(s.cohort)}</td>
      <td>${escapeHtml(s.major)}</td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button type="button" class="btn-card-action outline" style="flex: initial; padding: 4px 10px;" onclick="openBaakCrudModal('student', ${idx})">Ubah</button>
          <button type="button" class="btn-card-action outline" style="flex: initial; padding: 4px 10px; color: var(--accent-rose); border-color: var(--accent-rose);" onclick="deleteBaakMasterItem('student', ${idx})">Hapus</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderBaakFullRequestsTable() {
  const tbody = document.getElementById("baak-full-requests-tbody");
  if (!tbody) return;

  tbody.innerHTML = ALL_RESCHEDULE_REQUESTS.map((r, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${escapeHtml(r.requesterName)}</strong> <span style="font-size: 10px; color: var(--text-subtle);">(${r.requesterRole})</span></td>
      <td>${escapeHtml(r.courseTitle)}</td>
      <td>${escapeHtml(r.lecturerName)}</td>
      <td>${escapeHtml(r.originalSchedule)}</td>
      <td><strong>${escapeHtml(r.proposedSchedule)}</strong></td>
      <td>${escapeHtml(r.reason)}</td>
      <td>
        <span class="status-badge ${r.status === 'Disetujui' ? 'approved' : r.status === 'Ditolak' ? 'rejected' : 'pending'}">
          ${escapeHtml(r.status)}
        </span>
      </td>
    </tr>
  `).join("");
}

// System Health & Audit Logs Controller
function filterBaakLogs(level) {
  currentLogLevelFilter = level;
  document.querySelectorAll(".log-filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.level === level);
  });
  renderBaakSystemLogs();
}

function onBaakLogSearch(query) {
  currentLogSearchQuery = query.toLowerCase().trim();
  renderBaakSystemLogs();
}

function renderBaakSystemLogs() {
  const tbody = document.getElementById("baak-system-logs-tbody");
  if (!tbody) return;

  const filtered = BAAK_SYSTEM_LOGS.filter(log => {
    const matchLevel = currentLogLevelFilter === "all" || log.level === currentLogLevelFilter;
    const matchSearch = !currentLogSearchQuery ||
      log.detail.toLowerCase().includes(currentLogSearchQuery) ||
      log.actor.toLowerCase().includes(currentLogSearchQuery) ||
      log.module.toLowerCase().includes(currentLogSearchQuery) ||
      log.id.toLowerCase().includes(currentLogSearchQuery);
    return matchLevel && matchSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-subtle); padding: 24px;">
          Tidak ada rekaman log yang sesuai dengan filter pencarian.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(log => `
    <tr>
      <td><span style="font-family: monospace; font-size: 10px; color: var(--text-subtle);">${escapeHtml(log.timestamp)}</span></td>
      <td>
        <span class="status-badge ${log.level === 'error' ? 'rejected' : log.level === 'warning' ? 'pending' : log.level === 'shift' ? 'shifted' : 'approved'}">
          ${escapeHtml(log.levelLabel)}
        </span>
      </td>
      <td><strong>${escapeHtml(log.actor)}</strong></td>
      <td><code>${escapeHtml(log.module)}</code></td>
      <td>${escapeHtml(log.detail)}</td>
      <td><span class="status-badge ${log.status === 'Dicegah' ? 'rejected' : 'approved'}">${escapeHtml(log.status)}</span></td>
    </tr>
  `).join("");
}

// CSV Import Modal & Conflict Resolver
function openCsvImportModal() {
  const modal = document.getElementById("csv-import-modal");
  if (modal) {
    modal.style.display = "flex";
    resetCsvPreview();
  }
}

function closeCsvImportModal() {
  const modal = document.getElementById("csv-import-modal");
  if (modal) modal.style.display = "none";
}

function resetCsvPreview() {
  const box = document.getElementById("csv-preview-box");
  const parseTable = document.getElementById("csv-parsed-table-wrapper");
  if (box) box.style.display = "none";
  if (parseTable) parseTable.style.display = "none";
}

function simulateFileUpload() {
  const box = document.getElementById("csv-preview-box");
  const parseTable = document.getElementById("csv-parsed-table-wrapper");
  const tbody = document.getElementById("csv-parsed-tbody");

  // Sample CSV ingestion with 1 valid row, 1 missing lecturer (highlighted red & editable), 1 missing class (highlighted red & editable)
  pendingCsvRows = [
    {
      id: 1,
      code: "WMP301",
      title: "Workshop Mesin Pembelajaran",
      lecturer: "Dr. Ir. Budi Sxxxx, M.T.",
      day: "Senin",
      time: "08:00 - 11:00",
      room: "Lab C 102",
      errorType: null
    },
    {
      id: 2,
      code: "IOT402",
      title: "Internet of Things Terapan",
      lecturer: "Dosen Tidak Ditemukan", // Error: Lecturer not found
      day: "Rabu",
      time: "13:00 - 16:00",
      room: "Lab C 103",
      errorType: "lecturer"
    },
    {
      id: 3,
      code: "XYZ999", // Error: Class not found
      title: "Kelas Tidak Terdaftar",
      lecturer: "Nur Rosyid Mxxxx, S.Kom., M.T.",
      day: "Kamis",
      time: "09:00 - 11:00",
      room: "SAW-06.10",
      errorType: "class"
    }
  ];

  if (tbody) {
    tbody.innerHTML = pendingCsvRows.map(row => `
      <tr class="${row.errorType ? 'csv-error-row' : ''}">
        <td>
          ${row.errorType === 'class' ? `
            <input type="text" class="csv-cell-input" value="${escapeHtml(row.code)}" onchange="updateCsvCell(${row.id}, 'code', this.value)" title="Kode tidak terdaftar, silakan perbaiki">
          ` : `<code>${escapeHtml(row.code)}</code>`}
        </td>
        <td>
          ${row.errorType === 'class' ? `
            <input type="text" class="csv-cell-input" value="${escapeHtml(row.title)}" onchange="updateCsvCell(${row.id}, 'title', this.value)" title="Kelas tidak ditemukan di kurikulum">
          ` : escapeHtml(row.title)}
        </td>
        <td>
          ${row.errorType === 'lecturer' ? `
            <select class="csv-cell-select" onchange="updateCsvCell(${row.id}, 'lecturer', this.value)" title="Dosen tidak ditemukan, silakan pilih dosen valid">
              <option value="">-- Pilih Dosen Pengampu --</option>
              ${BAAK_MASTER_LECTURERS.map(l => `<option value="${escapeHtml(l.name)}">${escapeHtml(l.name)}</option>`).join('')}
            </select>
          ` : escapeHtml(row.lecturer)}
        </td>
        <td>${escapeHtml(row.day)}, ${escapeHtml(row.time)}</td>
        <td>${escapeHtml(row.room)}</td>
        <td>
          ${row.errorType ? `<span class="badge-rec-status" style="background: var(--accent-rose-light); color: var(--accent-rose); border-color: var(--accent-rose);">Perlu Koreksi</span>` : `<span class="status-badge approved">Valid</span>`}
        </td>
      </tr>
    `).join("");
  }

  if (box) box.style.display = "block";
  if (parseTable) parseTable.style.display = "block";
  showToast("Berkas CSV berhasil diuraikan. Periksa baris bertanda merah sebelum konfirmasi.");
}

function updateCsvCell(rowId, field, value) {
  const row = pendingCsvRows.find(r => r.id === rowId);
  if (row) {
    row[field] = value;
    if (field === "lecturer" && value) {
      row.errorType = null;
    }
    if (field === "code" && value !== "XYZ999") {
      row.errorType = null;
    }
    showToast(`Data baris ${rowId} diperbarui.`);
  }
}

function confirmCsvImport() {
  const hasUnresolved = pendingCsvRows.some(r => r.errorType !== null);
  if (hasUnresolved) {
    showToast("Harap perbaiki kolom bertanda merah terlebih dahulu.");
    return;
  }

  closeCsvImportModal();
  showToast("Data jadwal CSV berhasil disinkronkan ke master jadwal perkuliahan.");
}

// ==========================================================================
// 13. USER PROFILE POPOVER & LOGOUT
// ==========================================================================
function setupProfilePopover() {
  const widget = document.getElementById("user-profile-widget");
  const popover = document.getElementById("profile-details-popover");

  if (!widget || !popover) return;

  widget.addEventListener("click", (e) => {
    e.stopPropagation();
    popover.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!popover.contains(e.target) && !widget.contains(e.target)) {
      popover.classList.remove("active");
    }
  });
}

function performLogout() {
  document.getElementById("app-shell").style.display = "none";
  document.getElementById("landing-page-shell").style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });
  showToast("Anda telah keluar ke landing page PENSCEDULER.");
}

function enterAppDashboard() {
  document.getElementById("landing-page-shell").style.display = "none";
  document.getElementById("app-shell").style.display = "flex";
  navigateToView("dashboard");
  showToast("Selamat datang di sistem PENSCEDULER.");
}

// Toast Feedback Utility
function showToast(msg) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "toast-container";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    <span>${escapeHtml(msg)}</span>
  `;
  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, 2800);
}

// Escape HTML Utility
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
