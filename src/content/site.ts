export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface SbuChip {
  readonly code: string;
  readonly name: string;
  readonly grade: string;
  readonly display: string;
}

export interface ServiceItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly linkText: string;
  readonly href: string;
  readonly fullDescription?: string;
  readonly details?: readonly string[];
  readonly deliverables?: readonly string[];
}

export interface StatItem {
  readonly value: string;
  readonly label: string;
}

export interface ProjectItem {
  readonly id: string;
  readonly title: string;
  readonly clientMeta: string;
  readonly tag: string;
  readonly image: string;
  readonly description?: string;
  readonly scope?: readonly string[];
}

export interface WhyUsPoint {
  readonly title: string;
  readonly description: string;
}

export interface NewsItem {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly category: string;
  readonly summary: string;
  readonly image: string;
  readonly content?: string;
  readonly author?: string;
}

export interface NewsSection {
  readonly label: string;
  readonly h2: string;
  readonly subtext: string;
  readonly items: readonly NewsItem[];
}

export interface PartnerItem {
  readonly id: string;
  readonly name: string;
  readonly logo?: string;
  readonly href?: string;
}

export interface FooterLink {
  readonly label: string;
  readonly href: string;
}

export interface SiteContent {
  readonly meta: {
    readonly title: string;
    readonly titleTemplate: string;
    readonly description: string;
    readonly language: string;
    readonly keywords: readonly string[];
  };
  readonly nav: {
    readonly items: readonly NavItem[];
    readonly cta: {
      readonly label: string;
      readonly href: string;
    };
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly h1: string;
    readonly subtext: string;
    readonly primaryCta: {
      readonly label: string;
      readonly href: string;
    };
    readonly secondaryCta: {
      readonly label: string;
      readonly href: string;
    };
    readonly trustLabel: string;
    readonly clientLogosCount?: number;
    readonly partners?: readonly PartnerItem[];
    readonly visualCaption: {
      readonly title: string;
      readonly subtitle: string;
    };
    readonly image?: string;
  };
  readonly credentials: {
    readonly label: string;
    readonly association: string;
    readonly chips: readonly SbuChip[];
  };
  readonly services: {
    readonly label: string;
    readonly h2: string;
    readonly subtext: string;
    readonly items: readonly ServiceItem[];
  };
  readonly stats: {
    readonly items: readonly StatItem[];
  };
  readonly projects: {
    readonly label: string;
    readonly h2: string;
    readonly linkAll: {
      readonly label: string;
      readonly href: string;
    };
    readonly items: readonly ProjectItem[];
  };
  readonly whyUs: {
    readonly label: string;
    readonly h2: string;
    readonly points: readonly WhyUsPoint[];
    readonly caption: string;
    readonly image?: string;
  };
  readonly news: {
    readonly label: string;
    readonly h2: string;
    readonly subtext: string;
    readonly items: readonly NewsItem[];
  };
  readonly ctaBand: {
    readonly h2: string;
    readonly subtext: string;
    readonly cta: {
      readonly label: string;
      readonly href: string;
    };
  };
  readonly contact: {
    readonly title: string;
    readonly subtext: string;
    readonly submitButton: string;
    readonly serviceOptions: readonly string[];
    readonly info: {
      readonly address: string;
      readonly email: string;
      readonly phone: string;
    };
  };
  readonly careers: {
    readonly h2: string;
    readonly subtext: string;
    readonly cta: {
      readonly label: string;
      readonly href: string;
    };
  };
  readonly footer: {
    readonly companyName: string;
    readonly wordmark: string;
    readonly addressLines: readonly string[];
    readonly columns: {
      readonly company: {
        readonly title: string;
        readonly links: readonly FooterLink[];
      };
      readonly services: {
        readonly title: string;
        readonly links: readonly FooterLink[];
      };
      readonly contact: {
        readonly title: string;
        readonly links: readonly FooterLink[];
      };
    };
    readonly copyright: string;
    readonly legalNote: string;
  };
}

export const siteContent: SiteContent = {
  meta: {
    title: "PT Pragata Makmur Persada — Kontraktor Infrastruktur Telekomunikasi",
    titleTemplate: "%s | PT Pragata Makmur Persada",
    description:
      "Kontraktor infrastruktur telekomunikasi: instalasi fiber optik, menara BTS, survey & design jaringan, dan managed services. Anggota GABPEKNAS dengan 5 subklasifikasi SBU.",
    language: "id",
    keywords: [
      "kontraktor telekomunikasi",
      "instalasi fiber optik",
      "menara BTS",
      "jaringan telekomunikasi",
      "kontraktor Jakarta",
      "GABPEKNAS",
    ],
  },
  nav: {
    items: [
      { label: "Tentang", href: "#tentang" },
      { label: "Layanan", href: "#layanan" },
      { label: "Kapabilitas", href: "#kapabilitas" },
      { label: "Proyek", href: "#proyek" },
      { label: "Berita", href: "#berita" },
      { label: "Karier", href: "#karier" },
      { label: "Kontak", href: "#kontak" },
    ],
    cta: {
      label: "Hubungi Kami",
      href: "#kontak",
    },
  },
  hero: {
    eyebrow: "KONTRAKTOR INFRASTRUKTUR TELEKOMUNIKASI",
    h1: "Membangun Tulang Punggung Jaringan Telekomunikasi Indonesia",
    subtext:
      "Dari survei dan desain jaringan, instalasi fiber optik, hingga menara BTS — kami mengeksekusi proyek dengan standar teknis dan K3 yang terukur.",
    primaryCta: {
      label: "Diskusikan Proyek",
      href: "#kontak",
    },
    secondaryCta: {
      label: "Lihat Kapabilitas",
      href: "#kapabilitas",
    },
    trustLabel: "Dipercaya oleh operator telekomunikasi, ISP, dan pemilik proyek",
    partners: [
      { id: "partner-1", name: "Telkom Indonesia" },
      { id: "partner-2", name: "Indosat Ooredoo Hutchison" },
      { id: "partner-3", name: "XL Axiata" },
      { id: "partner-4", name: "Smartfren" },
      { id: "partner-5", name: "Tower Bersama Group" },
      { id: "partner-6", name: "Protelindo" },
      { id: "partner-7", name: "Moratelindo" },
      { id: "partner-8", name: "Bali Towerindo" },
    ],
    visualCaption: {
      title: "Teknisi splicing fiber optik di site",
      subtitle: "BANDUNG REGION · BACKBONE FO 2025",
    },
    image: "/images/hero-fiber-optic.jpg",
  },
  credentials: {
    label: "KUALIFIKASI & KEANGGOTAAN",
    association: "Anggota GABPEKNAS",
    chips: [
      {
        code: "BS009",
        name: "Konstruksi Sentral Telekomunikasi",
        grade: "K",
        display: "SBU BS009 · K",
      },
      {
        code: "EL005",
        name: "Konstruksi Jaringan Transmisi Telekomunikasi",
        grade: "M1",
        display: "SBU EL005 · M1",
      },
      {
        code: "EL008",
        name: "Instalasi Jaringan Distribusi Telekomunikasi",
        grade: "M1",
        display: "SBU EL008 · M1",
      },
      {
        code: "SI001",
        name: "Konstruksi Saluran Air, Pelabuhan, Dam",
        grade: "M1",
        display: "SBU SI001 · M1",
      },
      {
        code: "SI003",
        name: "Konstruksi Jalan Raya",
        grade: "M1",
        display: "SBU SI003 · M1",
      },
    ],
  },
  services: {
    label: "LAYANAN",
    h2: "Empat lini pekerjaan, satu standar eksekusi",
    subtext:
      "Setiap paket dikerjakan dengan metode kerja tertulis, pengawasan lapangan, dan pelaporan progres berkala.",
    items: [
      {
        id: "01",
        title: "Instalasi Fiber Optik",
        description:
          "Backbone, distribusi, dan FTTH: penggalian, penarikan kabel, splicing, terminasi, hingga pengukuran.",
        linkText: "Selengkapnya →",
        href: "#kontak",
        fullDescription:
          "Layanan komprehensif instalasi jaringan kabel serat optik untuk kebutuhan rute jarak jauh (long-haul backbone), jaringan distribusi antar-site, hingga jaringan akses pelanggan (FTTH/FTTx). Dikerjakan sesuai standar ITU-T dan K3 dengan verifikasi alat terkalibrasi.",
        details: [
          "Penggelaran kabel bawah tanah (trenching / boring HDD) & kabel udara (aerial)",
          "Penyambungan core fiber menggunakan Core Alignment Fusion Splicer",
          "Terminasi ODF, ODC, Joint Closure, dan FAT/ODP dengan batas redaman ketat",
          "Pengujian akhir end-to-end: OTDR Test (Optical Time Domain Reflectometer) & OPM",
        ],
        deliverables: [
          "Laporan pengukuran OTDR & Power Meter bergaransi",
          "As-Built Drawing (ABD) & Single Line Diagram (SLD)",
          "Dokumentasi visual tahapan galian dan penyambungan site",
        ],
      },
      {
        id: "02",
        title: "Menara & BTS",
        description:
          "Pondasi, erection menara, instalasi perangkat BTS, dan commissioning site.",
        linkText: "Selengkapnya →",
        href: "#kontak",
        fullDescription:
          "Konstruksi sipil fisik (civil work), pendirian menara telekomunikasi (tower erection), hingga instalasi perangkat radio pemancar dan transmisi microwave dengan standar keamanan struktural tinggi.",
        details: [
          "Pekerjaan pondasi tower (bored pile / telapak) sesuai kalkulasi geoteknik",
          "Erection menara SST (Self Supporting Tower), Monopole, maupun Guyed Mast",
          "Instalasi antena sektoral, microwave dish, RRU, feeder/jumper, dan sistem grounding",
          "Instalasi power supply, kabinet baterai, rectifier, genset, dan integrasi site",
        ],
        deliverables: [
          "Sertifikasi uji kelayakan struktur & verticality menara",
          "Laporan grounding test resistansi rendah (< 0.5 ohm)",
          "Site Acceptance Documentation (ATP siap operator)",
        ],
      },
      {
        id: "03",
        title: "Survey & Design",
        description:
          "Survei rute, desain jaringan, dan perhitungan BoQ sebelum pekerjaan dimulai.",
        linkText: "Selengkapnya →",
        href: "#kontak",
        fullDescription:
          "Tahap krusial perencanaan jaringan telekomunikasi yang presisi untuk meminimalkan deviasi biaya, menghindari hambatan utilitas publik, dan memastikan efisiensi rute penggelaran.",
        details: [
          "Survei rute kabel (Route Survey) & Line of Sight (LoS) Survey untuk gelombang mikro",
          "Soil investigation (sondir / bor log) untuk kelayakan daya dukung tanah pondasi",
          "Penyusunan gambar teknik rinci (Detailed Engineering Design / DED)",
          "Kalkulasi Bill of Quantity (BoQ) dan analisa perizinan Right-of-Way (ROW)",
        ],
        deliverables: [
          "Buku laporan survei rute & pemetaan koordinat GIS / KMZ",
          "Paket gambar kerja AutoCAD lengkap (DED & As-Plan)",
          "Dokumen estimasi BoQ material dan jasa yang terverifikasi",
        ],
      },
      {
        id: "04",
        title: "Managed Services",
        description:
          "Pemeliharaan preventif, penanganan gangguan, dan operasional jaringan berkelanjutan.",
        linkText: "Selengkapnya →",
        href: "#kontak",
        fullDescription:
          "Layanan operasional dan pemeliharaan infrastruktur telekomunikasi secara berkelanjutan dengan komitmen Service Level Agreement (SLA) ketat guna menjamin ketersediaan jaringan 24/7/365.",
        details: [
          "Preventive Maintenance berkala pada menara, grounding, genset, dan jalur kabel",
          "Corrective Maintenance & tim siaga tanggap darurat kabel putus (fiber cut)",
          "Penyediaan armada teknisi mobile, perkakas fusion splicer cadangan, dan genset mobile",
          "Monitoring kondisi site dan pelaporan performa berkala ke klien",
        ],
        deliverables: [
          "Respon pemulihan gangguan sesuai target SLA (MTTR)",
          "Laporan audit fisik dan checklist bulanan seluruh site",
          "Kesiapan tim teknis darurat 24 jam sehari",
        ],
      },
    ],
  },
  stats: {
    items: [
      { value: "12+", label: "Tahun pengalaman" },
      { value: "300+", label: "Tenaga kerja" },
      { value: "2.500 km", label: "Fiber terpasang" },
      { value: "450+", label: "Site BTS" },
    ],
  },
  projects: {
    label: "PROYEK",
    h2: "Portofolio pelaksanaan",
    linkAll: {
      label: "Lihat semua proyek →",
      href: "#kontak",
    },
    items: [
      {
        id: "p1",
        title: "Backbone Fiber Optik — Jawa Barat",
        clientMeta: "Klien: Operator Telekomunikasi · 2025",
        tag: "Fiber Optik",
        image: "/images/project-fiber-optic.jpg",
      },
      {
        id: "p2",
        title: "Instalasi BTS — Regional Bandung",
        clientMeta: "Klien: Tower Provider · 2024",
        tag: "Menara & BTS",
        image: "/images/project-bts-tower.jpg",
      },
      {
        id: "p3",
        title: "FTTH Distribution — Jabodetabek",
        clientMeta: "Klien: ISP Nasional · 2024",
        tag: "Managed Services",
        image: "/images/project-ftth.jpg",
      },
    ],
  },
  whyUs: {
    label: "MENGAPA KAMI",
    h2: "Alasan tim procurement memilih kami",
    points: [
      {
        title: "SDM dan alat sendiri",
        description: "Tidak bergantung pada subkontrak untuk pekerjaan inti.",
      },
      {
        title: "K3 sebagai syarat, bukan formalitas",
        description: "Prosedur kerja, APD, dan pengawasan harian di setiap site.",
      },
      {
        title: "Kualifikasi SBU lengkap",
        description: "Lima subklasifikasi aktif, siap untuk pra-kualifikasi tender.",
      },
      {
        title: "Jangkauan lintas provinsi",
        description: "Tim mobile untuk pekerjaan di luar Jawa.",
      },
    ],
    caption: "Tim pelaksana di lapangan",
    image: "/images/why-us-team.jpg",
  },
  news: {
    label: "BERITA & UPDATE",
    h2: "Kabar terbaru dan progres proyek",
    subtext:
      "Informasi terkini mengenai aktivitas konstruksi jaringan, standar keselamatan kerja, dan milestone proyek di lapangan.",
    items: [
      {
        id: "news-1",
        title: "Penyelesaian Rute Backbone Fiber Optik Jawa Barat Segmen 2",
        date: "28 Oktober 2026",
        category: "Proyek FO",
        summary:
          "Tim teknisi PT Pragata Makmur Persada berhasil menuntaskan penarikan dan uji kelayakan OTDR kabel fiber optik sepanjang 120 km.",
        image: "/images/project-fiber-optic.jpg",
        content:
          "PT Pragata Makmur Persada secara resmi menyelesaikan paket pekerjaan penggelaran dan terminasi kabel serat optik backbone sepanjang 120 km pada Segmen 2 wilayah Jawa Barat.\n\nPekerjaan yang berlangsung selama 3 bulan ini mencakup galian subduct dengan metode HDD (Horizontal Directional Drilling) di titik persimpangan protokol, penarikan kabel 96 core, penempatan joint closure, hingga pengujian redaman akhir dengan mesin OTDR Anritsu.\n\nSeluruh hasil pengukuran redaman menunjukkan rata-rata di bawah 0.22 dB/km pada panjang gelombang 1550 nm, memenuhi standar acceptance criteria dari operator telekomunikasi nasional. Keberhasilan ini semakin mempertegas komitmen PT Pragata Makmur Persada dalam menghadirkan tulang punggung konektivitas digital yang handal di Indonesia.",
      },
      {
        id: "news-2",
        title: "Perluasan Implementasi K3 dan Sertifikasi Tenaga Ahli Menara",
        date: "15 September 2026",
        category: "HSE / K3",
        summary:
          "Sebagai komitmen terhadap zero-accident, seluruh rigger dan teknisi menara BTS telah memperbarui sertifikasi ketinggian dan keselamatan kerja.",
        image: "/images/why-us-team.jpg",
        content:
          "Dalam rangka menjaga standar keselamatan dan kesehatan kerja tertinggi di setiap lokasi proyek, PT Pragata Makmur Persada menyelenggarakan program pembaruan sertifikasi Tenaga Kerja Pada Ketinggian (TKPK) tingkat 1 dan 2 bagi seluruh rigger dan tim pelaksana lapangan.\n\nPelatihan ini diselenggarakan bekerja sama dengan lembaga sertifikasi kompetensi K3 Kemnaker RI, mencakup teknik penggunaan full body harness ganda, instalasi lifeline vertikal, prosedur penyelamatan darurat (tower rescue), serta inspeksi berkala APD sebelum memulai pekerjaan erection menara.\n\nDengan perolehan sertifikasi aktif ini, PT Pragata Makmur Persada mempertahankan rekor Zero Accident pada seluruh paket proyek menara dan pekerjaan tiang telekomunikasi sepanjang tahun 2026.",
      },
      {
        id: "news-3",
        title: "Modernisasi Jaringan Distribusi FTTH di Kawasan Jabodetabek",
        date: "10 Agustus 2026",
        category: "Infrastruktur",
        summary:
          "Pemasangan Optical Distribution Cabinet (ODC) dan FAT baru guna mendukung perluasan kapasitas bandwidth broadband perumahan.",
        image: "/images/project-ftth.jpg",
        content:
          "Menjawab tingginya permintaan konektivitas internet berkecepatan tinggi bagi sektor perumahan dan komersial, PT Pragata Makmur Persada menyelesaikan modernisasi jaringan distribusi Fiber-to-the-Home (FTTH) pada cluster-cluster perumahan di Jabodetabek.\n\nLingkup kerja meliputi pemasangan tiang distribusi galvanis, penarikan kabel feeder dan distribusi, integrasi Optical Distribution Cabinet (ODC), serta pemasangan Fiber Access Terminal (FAT) dengan kapasitas hingga 16 port per titik.\n\nSistem distribusi baru ini memfasilitasi migrasi pelanggan ke kapasitas bandwidth gigabit dengan tingkat latensi rendah dan stabilitas transmisi yang optimal.",
      },
    ],
  },
  ctaBand: {
    h2: "Punya paket pekerjaan yang perlu dieksekusi?",
    subtext:
      "Kirimkan lingkup pekerjaan dan lokasi. Kami balas dengan pendekatan teknis dan estimasi awal.",
    cta: {
      label: "Ajukan Penawaran",
      href: "#kontak",
    },
  },
  contact: {
    title: "Hubungi Kami",
    subtext:
      "Sampaikan lingkup pekerjaan, lokasi, dan tenggat. Tim kami akan merespons dengan pendekatan teknis awal.",
    submitButton: "Kirim Permintaan",
    serviceOptions: [
      "Fiber Optik",
      "Menara & BTS",
      "Survey & Design",
      "Managed Services",
      "Lainnya",
    ],
    info: {
      address:
        "Epicentrum Walk Lt. 5, Suite South 529A, Jl. HR. Rasuna Said, Kuningan, Jakarta Selatan 12940",
      email: "info@pragata.co.id",
      phone: "+62 21 0000 0000",
    },
  },
  careers: {
    h2: "Bergabung dengan tim",
    subtext:
      "Kami membuka posisi untuk pekerjaan lapangan dan kantor pendukung di beberapa region.",
    cta: {
      label: "Lihat lowongan",
      href: "https://www.linkedin.com",
    },
  },
  footer: {
    companyName: "PT Pragata Makmur Persada",
    wordmark: "PRAGATA",
    addressLines: [
      "Epicentrum Walk Lt. 5, Suite South 529A",
      "Jl. HR. Rasuna Said, Kuningan",
      "Jakarta Selatan 12940",
    ],
    columns: {
      company: {
        title: "PERUSAHAAN",
        links: [
          { label: "Tentang Kami", href: "#tentang" },
          { label: "Kapabilitas", href: "#kapabilitas" },
          { label: "Proyek", href: "#proyek" },
          { label: "HSE / K3", href: "#kapabilitas" },
        ],
      },
      services: {
        title: "LAYANAN",
        links: [
          { label: "Fiber Optik", href: "#layanan" },
          { label: "Menara & BTS", href: "#layanan" },
          { label: "Survey & Design", href: "#layanan" },
          { label: "Managed Services", href: "#layanan" },
        ],
      },
      contact: {
        title: "KONTAK",
        links: [
          { label: "info@pragata.co.id", href: "mailto:info@pragata.co.id" },
          { label: "+62 21 0000 0000", href: "tel:+622100000000" },
          { label: "LinkedIn", href: "https://www.linkedin.com" },
          { label: "Karier", href: "#karier" },
        ],
      },
    },
    copyright: "© 2026 PT Pragata Makmur Persada. Seluruh hak cipta dilindungi.",
    legalNote: "NIB · Akta · SBU tersedia atas permintaan",
  },
};
