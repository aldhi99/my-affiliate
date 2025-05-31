export interface Product {
  id: number;
  name: string;
  price: string;
  images: string[];
  description: string;
  category: string;
  subcategory?: string;
}

export const categories = [
  'Elektronik',
  'Fashion',
  'Kesehatan & Kecantikan',
  'Rumah Tangga',
  'Olahraga & Outdoor',
  'Makanan & Minuman',
  'Gaming & Hiburan',
  'Ibu & Anak',
  'Otomotif'
] as const;

export const products: Product[] = [
  {
    id: 1,
    name: 'Samsung Galaxy A54 5G 8/256GB - Awesome Black',
    price: 'Rp5.999.000 - Rp6.499.000',
    category: 'Elektronik',
    subcategory: 'Smartphone',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/16/1045828/1045828_1c1c1c1c-1c1c-1c1c-1c1c-1c1c1c1c1c1c_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/16/1045828/1045828_2c2c2c2c-2c2c-2c2c-2c2c-2c2c2c2c2c2c_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/16/1045828/1045828_3c3c3c3c-3c3c-3c3c-3c3c-3c3c3c3c3c3c_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/16/1045828/1045828_4c4c4c4c-4c4c-4c4c-4c4c-4c4c4c4c4c4c_700_700',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Galaxy A54 5G - Smartphone Android Terbaik di Kelasnya</p><br>
      <h4>Spesifikasi:</h4>
      <ul>
        <li>Layar: 6.4" FHD+ Super AMOLED 120Hz</li>
        <li>Prosesor: Exynos 1380 Octa-core</li>
        <li>RAM: 8GB</li>
        <li>Penyimpanan: 256GB (Expandable)</li>
        <li>Kamera: 50MP + 12MP + 5MP (Main + Ultra Wide + Macro)</li>
        <li>Selfie: 32MP</li>
        <li>Baterai: 5000mAh, Fast Charging 25W</li>
        <li>OS: Android 13, One UI 5.1</li>
      </ul><br>
      <h4>Garansi:</h4>
      <ul>
        <li>Garansi Resmi Samsung Indonesia</li>
        <li>Garansi Unit 12 Bulan</li>
        <li>Garansi Sparepart 12 Bulan</li>
      </ul><br>
      <p>Bonus: Casing Silicone, Screen Protector, Charger 25W</p>
    `,
  },
  {
    id: 2,
    name: 'Emina Bright Stuff Face Serum 30ml',
    price: 'Rp89.000 - Rp99.000',
    category: 'Kesehatan & Kecantikan',
    subcategory: 'Skincare',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2023/2/15/1045828/1045828_1d1d1d1d-1d1d-1d1d-1d1d-1d1d1d1d1d1d_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/2/15/1045828/1045828_2d2d2d2d-2d2d-2d2d-2d2d-2d2d2d2d2d2d_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/2/15/1045828/1045828_3d3d3d3d-3d3d-3d3d-3d3d-3d3d3d3d3d3d_700_700',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Emina Bright Stuff Face Serum - Serum Pencerah Wajah</p><br>
      <h4>Manfaat:</h4>
      <ul>
        <li>Mencerahkan kulit wajah</li>
        <li>Mengurangi noda hitam</li>
        <li>Melembabkan kulit</li>
        <li>Membuat kulit lebih glowing</li>
      </ul><br>
      <h4>Kandungan Utama:</h4>
      <ul>
        <li>Niacinamide 3%</li>
        <li>Vitamin C</li>
        <li>Alpha Arbutin</li>
        <li>Hyaluronic Acid</li>
      </ul><br>
      <p>Cara Pakai: Oleskan 2-3 tetes serum pada wajah yang sudah dibersihkan, pagi dan malam hari.</p>
    `,
  },
  {
    id: 3,
    name: 'Cosmos CB-282 Rice Cooker 1.8L',
    price: 'Rp299.000 - Rp349.000',
    category: 'Rumah Tangga',
    subcategory: 'Peralatan Dapur',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2023/1/20/1045828/1045828_1e1e1e1e-1e1e-1e1e-1e1e-1e1e1e1e1e1e_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/1/20/1045828/1045828_2e2e2e2e-2e2e-2e2e-2e2e-2e2e2e2e2e2e_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/1/20/1045828/1045828_3e3e3e3e-3e3e-3e3e-3e3e-3e3e3e3e3e3e_700_700',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Cosmos Rice Cooker CB-282 - Penanak Nasi Praktis</p><br>
      <h4>Spesifikasi:</h4>
      <ul>
        <li>Kapasitas: 1.8L (6-8 porsi)</li>
        <li>Daya: 400 Watt</li>
        <li>Material Pan: Non-stick coating</li>
        <li>Fitur: Keep Warm, Steam Tray</li>
      </ul><br>
      <h4>Keunggulan:</h4>
      <ul>
        <li>Anti lengket</li>
        <li>Mudah dibersihkan</li>
        <li>Hemat listrik</li>
        <li>Garansi 1 tahun</li>
      </ul><br>
      <p>Bonus: Sendok nasi dan centong nasi</p>
    `,
  },
  {
    id: 4,
    name: 'Nike Air Force 1 Low White',
    price: 'Rp1.999.000 - Rp2.299.000',
    category: 'Fashion',
    subcategory: 'Sepatu',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/10/1045828/1045828_1f1f1f1f-1f1f-1f1f-1f1f-1f1f1f1f1f1f_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/10/1045828/1045828_2f2f2f2f-2f2f-2f2f-2f2f-2f2f2f2f2f2f_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/10/1045828/1045828_3f3f3f3f-3f3f-3f3f-3f3f-3f3f3f3f3f3f_700_700',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Nike Air Force 1 Low - Sepatu Sneakers Iconic</p><br>
      <h4>Detail Produk:</h4>
      <ul>
        <li>Warna: White/White</li>
        <li>Material: Leather</li>
        <li>Sol: Rubber</li>
        <li>Style: Casual</li>
      </ul><br>
      <h4>Ukuran Tersedia:</h4>
      <p>36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44</p><br>
      <h4>Fitur:</h4>
      <ul>
        <li>Air-Sole unit</li>
        <li>Perforated toe box</li>
        <li>Padded ankle collar</li>
        <li>Nike branding</li>
      </ul><br>
      <p>Original Nike Indonesia - Garansi 100% Authentic</p>
    `,
  },
  {
    id: 5,
    name: 'Mamypoko Pants L 44s',
    price: 'Rp189.000 - Rp199.000',
    category: 'Ibu & Anak',
    subcategory: 'Popok',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2023/2/25/1045828/1045828_1g1g1g1g-1g1g-1g1g-1g1g-1g1g1g1g1g1g_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/2/25/1045828/1045828_2g2g2g2g-2g2g-2g2g-2g2g-2g2g2g2g2g2g_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/2/25/1045828/1045828_3g3g3g3g-3g3g-3g3g-3g3g-3g3g3g3g3g3g_700_700',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Mamypoko Pants L - Popok Celana Premium</p><br>
      <h4>Spesifikasi:</h4>
      <ul>
        <li>Ukuran: L (9-14 kg)</li>
        <li>Isi: 44 pcs</li>
        <li>Gender: Unisex</li>
      </ul><br>
      <h4>Keunggulan:</h4>
      <ul>
        <li>3D Fit System</li>
        <li>Anti bocor 12 jam</li>
        <li>Ekstra lembut</li>
        <li>Indikator pipis</li>
      </ul><br>
      <p>BPOM: NA18150102563</p>
    `,
  },
  {
    id: 6,
    name: 'Indomie Goreng Special 1 Dus (40 pcs)',
    price: 'Rp89.000 - Rp99.000',
    category: 'Makanan & Minuman',
    subcategory: 'Mie Instan',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/5/1045828/1045828_1h1h1h1h-1h1h-1h1h-1h1h-1h1h1h1h1h1h_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/5/1045828/1045828_2h2h2h2h-2h2h-2h2h-2h2h-2h2h2h2h2h2h_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/5/1045828/1045828_3h3h3h3h-3h3h-3h3h-3h3h-3h3h3h3h3h3h_700_700',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Indomie Goreng Special - Mie Goreng Instan Terlaris</p><br>
      <h4>Detail Produk:</h4>
      <ul>
        <li>Isi: 40 pcs per dus</li>
        <li>Berat: 85g per pcs</li>
        <li>Expired: 6 bulan</li>
      </ul><br>
      <h4>Kandungan:</h4>
      <ul>
        <li>Mie</li>
        <li>Bumbu</li>
        <li>Minyak</li>
        <li>Sambal</li>
      </ul><br>
      <p>BPOM: NA18150102563</p>
    `,
  },
  {
    id: 7,
    name: 'Logitech G Pro X Superlight Wireless Mouse',
    price: 'Rp1.999.000 - Rp2.299.000',
    category: 'Gaming & Hiburan',
    subcategory: 'Gaming Gear',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/12/1045828/1045828_1i1i1i1i-1i1i-1i1i-1i1i-1i1i1i1i1i1i_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/12/1045828/1045828_2i2i2i2i-2i2i-2i2i-2i2i-2i2i2i2i2i2i_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/12/1045828/1045828_3i3i3i3i-3i3i-3i3i-3i3i-3i3i3i3i3i3i_700_700',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Logitech G Pro X Superlight - Mouse Gaming Wireless Terbaik</p><br>
      <h4>Spesifikasi:</h4>
      <ul>
        <li>Sensor: HERO 25K</li>
        <li>DPI: 25,600</li>
        <li>Berat: 63g</li>
        <li>Baterai: 70 jam</li>
        <li>Koneksi: Wireless 2.4GHz</li>
      </ul><br>
      <h4>Fitur:</h4>
      <ul>
        <li>Ultra-lightweight</li>
        <li>Zero-additive PTFE feet</li>
        <li>5 programmable buttons</li>
        <li>LIGHTSYNC RGB</li>
      </ul><br>
      <p>Garansi Resmi Logitech 2 Tahun</p>
    `,
  },
  {
    id: 8,
    name: 'Shell Helix HX7 5W-40 4L',
    price: 'Rp399.000 - Rp449.000',
    category: 'Otomotif',
    subcategory: 'Oli & Pelumas',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/8/1045828/1045828_1j1j1j1j-1j1j-1j1j-1j1j-1j1j1j1j1j1j_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/8/1045828/1045828_2j2j2j2j-2j2j-2j2j-2j2j-2j2j2j2j2j2j_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/8/1045828/1045828_3j3j3j3j-3j3j-3j3j-3j3j-3j3j3j3j3j3j_700_700',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Shell Helix HX7 - Oli Mesin Semi Synthetic</p><br>
      <h4>Spesifikasi:</h4>
      <ul>
        <li>Volume: 4 Liter</li>
        <li>Viskositas: 5W-40</li>
        <li>API: SN</li>
        <li>ACEA: A3/B3, A3/B4</li>
      </ul><br>
      <h4>Keunggulan:</h4>
      <ul>
        <li>Active Cleansing Technology</li>
        <li>Performa mesin optimal</li>
        <li>Hemat bahan bakar</li>
        <li>Perlindungan mesin maksimal</li>
      </ul><br>
      <p>Original Shell Indonesia - Garansi 100% Authentic</p>
    `,
  },
  {
    id: 9,
    name: 'Decathlon Forclaz Trek 100 50L',
    price: 'Rp799.000 - Rp899.000',
    category: 'Olahraga & Outdoor',
    subcategory: 'Tas Ransel',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/15/1045828/1045828_1k1k1k1k-1k1k-1k1k-1k1k-1k1k1k1k1k1k_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/15/1045828/1045828_2k2k2k2k-2k2k-2k2k-2k2k-2k2k2k2k2k2k_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/15/1045828/1045828_3k3k3k3k-3k3k-3k3k-3k3k-3k3k3k3k3k3k_700_700',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Decathlon Forclaz Trek 100 - Tas Ransel Hiking</p><br>
      <h4>Spesifikasi:</h4>
      <ul>
        <li>Kapasitas: 50L</li>
        <li>Material: Polyester</li>
        <li>Berat: 1.5kg</li>
        <li>Dimensi: 70x35x30 cm</li>
      </ul><br>
      <h4>Fitur:</h4>
      <ul>
        <li>Adjustable shoulder straps</li>
        <li>Hip belt</li>
        <li>Rain cover</li>
        <li>Multiple compartments</li>
        <li>Hydration compatible</li>
      </ul><br>
      <p>Garansi 2 Tahun Decathlon Indonesia</p>
    `,
  },
  {
    id: 10,
    name: 'Philips Airfryer HD9200/91',
    price: 'Rp1.999.000 - Rp2.299.000',
    category: 'Rumah Tangga',
    subcategory: 'Peralatan Dapur',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/18/1045828/1045828_1l1l1l1l-1l1l-1l1l-1l1l-1l1l1l1l1l1l_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/18/1045828/1045828_2l2l2l2l-2l2l-2l2l-2l2l-2l2l2l2l2l2l_700_700',
      'https://images.tokopedia.net/img/cache/700/product-1/2023/3/18/1045828/1045828_3l3l3l3l-3l3l-3l3l-3l3l-3l3l3l3l3l3l_700_700',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Philips Airfryer HD9200/91 - Penggorengan Tanpa Minyak</p><br>
      <h4>Spesifikasi:</h4>
      <ul>
        <li>Kapasitas: 4.1L</li>
        <li>Daya: 1500W</li>
        <li>Temperature: 60-200°C</li>
        <li>Timer: 60 menit</li>
      </ul><br>
      <h4>Keunggulan:</h4>
      <ul>
        <li>Rapid Air Technology</li>
        <li>Hemat minyak hingga 90%</li>
        <li>Digital display</li>
        <li>Preset menu</li>
        <li>Dishwasher safe parts</li>
      </ul><br>
      <p>Garansi Resmi Philips 2 Tahun</p>
    `,
  },
  {
    id: 11,
    name: 'Xiaomi Smart Band 8',
    price: 'Rp549.000 - Rp599.000',
    category: 'Elektronik',
    subcategory: 'Wearable',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2024/5/31/1045828/xiaomi-band8-1.jpg',
      'https://images.tokopedia.net/img/cache/700/product-1/2024/5/31/1045828/xiaomi-band8-2.jpg',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Smartband canggih dengan fitur kesehatan lengkap</p><br>
      <h4>Fitur Utama:</h4>
      <ul>
        <li>Layar AMOLED 1.62"</li>
        <li>SpO2 & Heart Rate Monitoring</li>
        <li>110+ Mode Olahraga</li>
        <li>Waterproof 5ATM</li>
      </ul><br>
      <p>Garansi Resmi 1 Tahun</p>
    `,
  },
  {
    id: 12,
    name: 'Wardah Perfect Bright Moisturizer 20ml',
    price: 'Rp25.000 - Rp30.000',
    category: 'Kesehatan & Kecantikan',
    subcategory: 'Skincare',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2024/5/31/1045828/wardah-moisturizer-1.jpg',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Pelembap wajah pencerah dengan Vitamin B3</p><br>
      <h4>Manfaat:</h4>
      <ul>
        <li>Mencerahkan kulit kusam</li>
        <li>Menghidrasi kulit sepanjang hari</li>
        <li>Mengontrol minyak berlebih</li>
      </ul><br>
      <p>BPOM: NA18200123456</p>
    `,
  },
  {
    id: 13,
    name: 'Toyota Avanza 1.5 G M/T 2023',
    price: 'Rp248.000.000 - Rp265.000.000',
    category: 'Otomotif',
    subcategory: 'Mobil',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2024/5/31/1045828/avanza2023-1.jpg',
      'https://images.tokopedia.net/img/cache/700/product-1/2024/5/31/1045828/avanza2023-2.jpg',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>MPV keluarga nyaman dan irit BBM</p><br>
      <h4>Spesifikasi:</h4>
      <ul>
        <li>Mesin: 1500cc Dual VVT-i</li>
        <li>Transmisi: Manual 5-speed</li>
        <li>Warna: Putih, Hitam, Silver</li>
        <li>Garansi: 3 Tahun / 100.000 KM</li>
      </ul><br>
      <p>Bonus: Gratis kaca film, karpet dasar, cover jok</p>
    `,
  },
  {
    id: 14,
    name: 'Samsung Galaxy S23 Ultra',
    price: 'Rp1.299.000 - Rp1.499.000',
    category: 'Elektronik',
    subcategory: 'Smartphone',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2024/5/31/1045828/s23ultra-1.jpg',
      'https://images.tokopedia.net/img/cache/700/product-1/2024/5/31/1045828/s23ultra-2.jpg',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Smartphone flagship dengan kamera terbaik</p><br>
      <h4>Fitur Utama:</h4>
      <ul>
        <li>Layar 6.8" Dynamic AMOLED 2X</li>
        <li>Triple 200MP Ultra-wide, Wide, Telephoto</li>
        <li>Snapdragon 8 Gen 2</li>
        <li>5000mAh, 45W Fast Charging</li>
      </ul><br>
      <p>Garansi Resmi 1 Tahun</p>
    `,
  },
  {
    id: 15,
    name: 'Sony WH-1000XM5',
    price: 'Rp1.999.000 - Rp2.299.000',
    category: 'Elektronik',
    subcategory: 'Headphone',
    images: [ 
      'https://images.tokopedia.net/img/cache/700/product-1/2024/5/31/1045828/wh1000xm5-1.jpg',
      'https://images.tokopedia.net/img/cache/700/product-1/2024/5/31/1045828/wh1000xm5-2.jpg',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Headphone noise-cancelling terbaik</p><br> 
      <h4>Fitur Utama:</h4>
      <ul>
        <li>Active Noise Cancellation</li>
        <li>30-hour battery life</li>
        <li>Bluetooth 5.0</li>
      </ul><br> 
      <p>Garansi Resmi 1 Tahun</p>
    `,
  },
  {
    id: 16,
    name: 'Apple AirPods Pro 2',  
    price: 'Rp1.999.000 - Rp2.299.000',
    category: 'Elektronik',
    subcategory: 'Headphone',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2024/5/31/1045828/airpodspro2-1.jpg',
      'https://images.tokopedia.net/img/cache/700/product-1/2024/5/31/1045828/airpodspro2-2.jpg', 
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Headphone noise-cancelling terbaik</p><br> 
      <h4>Fitur Utama:</h4>
      <ul>    
        <li>Active Noise Cancellation</li>
        <li>30-hour battery life</li>
        <li>Bluetooth 5.0</li>
      </ul><br> 
      <p>Garansi Resmi 1 Tahun</p>
    `,
  },
  {
    id: 17,
    name: 'Samsung Galaxy S23 Ultra',
    price: 'Rp1.299.000 - Rp1.499.000',
    category: 'Elektronik',
    subcategory: 'Smartphone',
    images: [
      'https://images.tokopedia.net/img/cache/700/product-1/2024/5/31/1045828/s23ultra-1.jpg',
      'https://images.tokopedia.net/img/cache/700/product-1/2024/5/31/1045828/s23ultra-2.jpg',
    ],
    description: `
      <h3>Deskripsi Produk</h3> 
      <p>Smartphone flagship dengan kamera terbaik</p><br>
      <h4>Fitur Utama:</h4>
      <ul>
        <li>Layar 6.8" Dynamic AMOLED 2X</li>
        <li>Triple 200MP Ultra-wide, Wide, Telephoto</li>
        <li>Snapdragon 8 Gen 2</li>
        <li>5000mAh, 45W Fast Charging</li>
      </ul><br>
      <p>Garansi Resmi 1 Tahun</p>
    `,
  } 
];