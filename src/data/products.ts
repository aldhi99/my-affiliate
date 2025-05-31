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
  'Perlengkapan Rumah',
  'Olahraga & Outdoor',
  'Kesehatan & Kecantikan',
  'Aksesoris',
  'Peralatan Dapur',
  'Gaming & Hiburan'
] as const;

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Earbuds Pro',
    price: 'Rp250.000 - Rp600.000',
    category: 'Elektronik',
    subcategory: 'Audio',
    images: [
      'https://images.unsplash.com/photo-1590658268034-2383e8a4f9df',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1622560480654-2e4b1b1a6b41',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Earbuds nirkabel dengan suara premium dan teknologi <strong>active noise cancellation</strong>.</p><br>
      <h4>Fitur Unggulan:</h4>
      <ul>
        <li>Bluetooth 5.2 untuk koneksi stabil</li>
        <li>Baterai hingga 24 jam dengan casing</li>
        <li>Water-resistant IPX4</li>
      </ul><br>
      <p>Cocok untuk olahraga, perjalanan, dan penggunaan sehari-hari.</p>
    `,
  },
  {
    id: 2,
    name: 'Premium Dog Food 1kg',
    price: 'Rp50.000 - Rp100.000',
    category: 'Perlengkapan Rumah',
    subcategory: 'Pet Supplies',
    images: [
      'https://images.unsplash.com/photo-1601758260955-2e5a9a4d4a3b',
      'https://images.unsplash.com/photo-1589924741906-8a8f7f2a8e8f',
      'https://images.unsplash.com/photo-1597843786411-8b5f0b7b8b0c',
    ],
    description: `
      <h3>Keterangan Produk</h3>
      <p>Makanan anjing berkualitas tinggi dengan nutrisi seimbang untuk semua ras.</p><br>
      <h4>Varian Rasa:</h4>
      <ul>
        <li>Daging Sapi</li>
        <li>Ayam</li>
      </ul><br>
      <h4>Kandungan Nutrisi:</h4>
      <table>
        <tr><td>Protein</td><td>25%</td></tr>
        <tr><td>Lemak</td><td>12%</td></tr>
        <tr><td>Serat</td><td>4%</td></tr>
      </table><br>
      <p>Mendukung kesehatan tulang dan bulu anjing Anda.</p>
    `,
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    price: 'Rp1.200.000 - Rp2.000.000',
    category: 'Perlengkapan Rumah',
    subcategory: 'Furniture',
    images: [
      'https://images.unsplash.com/photo-1582719183515-64b7b0a50a0d',
      'https://images.unsplash.com/photo-1590587899744-5c7e8c0a8b0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Kursi kantor ergonomis dengan penyangga punggung untuk kenyamanan maksimal.</p><br>
      <h4>Fitur:</h4>
      <ul>
        <li>Adjustable height dan tilt</li>
        <li>Bahan mesh breathable</li>
        <li>Roda anti-slip</li>
      </ul><br>
      <p>Ideal untuk kerja dari rumah atau kantor.</p>
    `,
  },
  {
    id: 4,
    name: 'Smart Watch Fitness',
    price: 'Rp500.000 - Rp900.000',
    category: 'Elektronik',
    subcategory: 'Wearables',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
      'https://images.unsplash.com/photo-1559056199-641a63781cce',
      'https://images.unsplash.com/photo-1607936854278-5e66e63d02d7',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Jam tangan pintar dengan fitur pelacakan kesehatan dan notifikasi smartphone.</p><br>
      <h4>Spesifikasi:</h4>
      <ul>
        <li>Layar AMOLED 1.4 inci</li>
        <li>Monitor detak jantung dan SpO2</li>
        <li>Tahan air hingga 50 meter</li>
      </ul><br>
      <p>Cocok untuk gaya hidup aktif dan olahraga.</p>
    `,
  },
  {
    id: 5,
    name: 'Running Shoes Men',
    price: 'Rp400.000 - Rp700.000',
    category: 'Olahraga & Outdoor',
    subcategory: 'Sepatu',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
      'https://images.unsplash.com/photo-1600185365483-26d7a3b86a04',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd18f8f8',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Sepatu lari pria dengan desain ringan dan sol bantalan maksimal.</p><br>
      <h4>Material:</h4>
      <ul>
        <li>Upper: Mesh breathable</li>
        <li>Sole: EVA foam</li>
      </ul><br>
      <h4>Ukuran:</h4>
      <p>40 | 41 | 42 | 43 | 44</p><br>
      <p>Memberikan kenyamanan saat lari jarak jauh.</p>
    `,
  },
  {
    id: 6,
    name: 'Portable Bluetooth Speaker',
    price: 'Rp300.000 - Rp800.000',
    category: 'Elektronik',
    subcategory: 'Audio',
    images: [
      'https://images.unsplash.com/photo-1542182069-81f3c5a4f9f5',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1622560480654-2e4b1b1a6b41',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Speaker Bluetooth portabel dengan suara bass mendalam.</p><br>
      <h4>Fitur:</h4>
      <ul>
        <li>Tahan air IPX7</li>
        <li>Baterai hingga 15 jam</li>
        <li>Koneksi multi-device</li>
      </ul><br>
      <p>Sempurna untuk piknik atau pesta outdoor.</p>
    `,
  },
  {
    id: 7,
    name: 'Gaming Keyboard RGB',
    price: 'Rp350.000 - Rp600.000',
    category: 'Gaming & Hiburan',
    subcategory: 'Peripheral',
    images: [
      'https://images.unsplash.com/photo-1587829748823-f550f3122b0e',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1622560480654-2e4b1b1a6b41',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Keyboard mekanik dengan lampu RGB dan tombol responsif.</p><br>
      <h4>Fitur:</h4>
      <ul>
        <li>Switch mekanik blue/red</li>
        <li>Anti-ghosting keys</li>
        <li>Kustomisasi lampu RGB</li>
      </ul><br>
      <p>Cocok untuk gamer profesional dan kasual.</p>
    `,
  },
  {
    id: 8,
    name: 'Electric Kettle 1.7L',
    price: 'Rp200.000 - Rp400.000',
    category: 'Peralatan Dapur',
    subcategory: 'Elektronik',
    images: [
      'https://images.unsplash.com/photo-1602143407151-3b6f7a4f8b5f',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Ketel listrik dengan kapasitas besar dan desain modern.</p><br>
      <h4>Spesifikasi:</h4>
      <ul>
        <li>Daya: 1500W</li>
        <li>Material: Stainless steel</li>
        <li>Auto shut-off</li>
      </ul><br>
      <p>Mudah digunakan untuk kebutuhan dapur sehari-hari.</p>
    `,
  },
  {
    id: 9,
    name: 'Yoga Mat Premium',
    price: 'Rp150.000 - Rp300.000',
    category: 'Olahraga & Outdoor',
    subcategory: 'Fitness',
    images: [
      'https://images.unsplash.com/photo-1601925266748-373a9f61b7c3',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1622560480654-2e4b1b1a6b41',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Matras yoga dengan ketebalan ideal untuk kenyamanan saat berlatih.</p><br>
      <h4>Fitur:</h4>
      <ul>
        <li>Ketebalan: 6mm</li>
        <li>Anti-slip surface</li>
        <li>Mudah dibersihkan</li>
      </ul><br>
      <p>Cocok untuk yoga, pilates, dan latihan lainnya.</p>
    `,
  },
  {
    id: 10,
    name: 'Smart Home Security Camera',
    price: 'Rp500.000 - Rp1.000.000',
    category: 'Elektronik',
    subcategory: 'Smart Home',
    images: [
      'https://images.unsplash.com/photo-1516321318423-4b6a0d3f0e6f',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1622560480654-2e4b1b1a6b41',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Kamera keamanan pintar dengan resolusi tinggi dan koneksi Wi-Fi.</p><br>
      <h4>Fitur:</h4>
      <ul>
        <li>Resolusi 1080p</li>
        <li>Night vision</li>
        <li>Motion detection</li>
      </ul><br>
      <p>Kontrol melalui aplikasi smartphone.</p>
    `,
  },
  {
    id: 11,
    name: 'Stainless Steel Water Bottle',
    price: 'Rp100.000 - Rp250.000',
    category: 'Olahraga & Outdoor',
    subcategory: 'Aksesoris',
    images: [
      'https://images.unsplash.com/photo-1602143407151-3b6f7a4f8b5f',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Botol air stainless steel dengan desain tahan bocor.</p><br>
      <h4>Spesifikasi:</h4>
      <ul>
        <li>Kapasitas: 750ml</li>
        <li>Insulasi termal 12 jam</li>
        <li>BPA-free</li>
      </ul><br>
      <p>Cocok untuk bepergian atau olahraga.</p>
    `,
  },
  {
    id: 12,
    name: 'Wireless Charger 15W',
    price: 'Rp150.000 - Rp350.000',
    category: 'Elektronik',
    subcategory: 'Aksesoris',
    images: [
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1622560480654-2e4b1b1a6b41',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Charger nirkabel cepat dengan desain minimalis.</p><br>
      <h4>Fitur:</h4>
      <ul>
        <li>Fast charging 15W</li>
        <li>Kompatibel dengan Qi-enabled devices</li>
        <li>Anti-slip pad</li>
      </ul><br>
      <p>Mudah digunakan untuk semua jenis smartphone.</p>
    `,
  },
  {
    id: 13,
    name: 'Air Purifier Compact',
    price: 'Rp800.000 - Rp1.500.000',
    category: 'Perlengkapan Rumah',
    subcategory: 'Elektronik',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1622560480654-2e4b1b1a6b41',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Purifier udara kompak untuk ruangan hingga 20 m².</p><br>
      <h4>Fitur:</h4>
      <ul>
        <li>Filter HEPA H13</li>
        <li>3 tingkat kecepatan</li>
        <li>Mode malam senyap</li>
      </ul><br>
      <p>Menjaga udara tetap bersih dan sehat.</p>
    `,
  },
  {
    id: 14,
    name: 'Backpack Anti-Theft',
    price: 'Rp300.000 - Rp600.000',
    category: 'Aksesoris',
    subcategory: 'Tas',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1622560480654-2e4b1b1a6b41',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Tas ransel dengan fitur anti-maling dan kompartemen laptop.</p><br>
      <h4>Fitur:</h4>
      <ul>
        <li>Resleting tersembunyi</li>
        <li>Port USB charging</li>
        <li>Tahan air</li>
      </ul><br>
      <p>Cocok untuk perjalanan dan penggunaan sehari-hari.</p>
    `,
  },
  {
    id: 15,
    name: 'Electric Toothbrush',
    price: 'Rp200.000 - Rp500.000',
    category: 'Kesehatan & Kecantikan',
    subcategory: 'Perawatan Pribadi',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1622560480654-2e4b1b1a6b41',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Sikat gigi elektrik dengan teknologi pembersihan mendalam.</p><br>
      <h4>Fitur:</h4>
      <ul>
        <li>3 mode sikat</li>
        <li>Timer 2 menit</li>
        <li>Baterai tahan 30 hari</li>
      </ul><br>
      <p>Untuk senyum yang lebih cerah setiap hari.</p>
    `,
  },
  {
    id: 16,
    name: 'Portable Power Bank 10000mAh',
    price: 'Rp150.000 - Rp300.000',
    category: 'Elektronik',
    subcategory: 'Aksesoris',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1622560480654-2e4b1b1a6b41',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Power bank ringkas dengan kapasitas besar untuk pengisian cepat.</p><br>
      <h4>Spesifikasi:</h4>
      <ul>
        <li>Kapasitas: 10000mAh</li>
        <li>Output: USB-C dan USB-A</li>
        <li>Fast charging 18W</li>
      </ul><br>
      <p>Sempurna untuk perjalanan jauh.</p>
    `,
  },
  {
    id: 17,
    name: 'Non-Stick Frying Pan 24cm',
    price: 'Rp100.000 - Rp250.000',
    category: 'Peralatan Dapur',
    subcategory: 'Cookware',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1622560480654-2e4b1b1a6b41',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Wajan anti-lengket untuk memasak mudah dan sehat.</p><br>
      <h4>Fitur:</h4>
      <ul>
        <li>Lapisan anti-lengket PFOA-free</li>
        <li>Pegangan tahan panas</li>
        <li>Cocok untuk semua kompor</li>
      </ul><br>
      <p>Ideal untuk masakan sehari-hari.</p>
    `,
  },
  {
    id: 18,
    name: 'Foldable Travel Umbrella',
    price: 'Rp50.000 - Rp150.000',
    category: 'Aksesoris',
    subcategory: 'Travel',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1622560480654-2e4b1b1a6b41',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Payung lipat ringan dan tahan angin untuk bepergian.</p><br>
      <h4>Fitur:</h4>
      <ul>
        <li>Material tahan air</li>
        <li>Desain anti-angin</li>
        <li>Ukuran kompak saat dilipat</li>
      </ul><br>
      <p>Cocok untuk musim hujan.</p>
    `,
  },
  {
    id: 19,
    name: 'LED Desk Lamp',
    price: 'Rp200.000 - Rp400.000',
    category: 'Perlengkapan Rumah',
    subcategory: 'Elektronik',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1622560480654-2e4b1b1a6b41',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Lampu meja LED dengan pengaturan cahaya yang fleksibel.</p><br>
      <h4>Fitur:</h4>
      <ul>
        <li>3 tingkat kecerahan</li>
        <li>Port USB untuk charging</li>
        <li>Desain adjustable</li>
      </ul><br>
      <p>Cocok untuk belajar atau bekerja.</p>
    `,
  },
  {
    id: 20,
    name: 'Nokia Wireless Gaming Headset',
    price: 'Rp600.000 - Rp1.200.000',
    category: 'Gaming & Hiburan',
    subcategory: 'Audio',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1614631447677-1c7e6a4f8b5f',
      'https://images.unsplash.com/photo-1622560480654-2e4b1b1a6b41',
    ],
    description: `
      <h3>Deskripsi Produk</h3>
      <p>Headset gaming nirkabel dengan suara surround 7.1.</p><br>
      <h4>Fitur:</h4>
      <ul>
        <li>Mikrofon noise-cancelling</li>
        <li>Baterai hingga 18 jam</li>
        <li>Kompatibel dengan PC dan konsol</li>
      </ul><br>
      <p>Memberikan pengalaman gaming imersif.</p>
    `,
  },
];