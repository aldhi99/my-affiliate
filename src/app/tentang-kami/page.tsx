'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
    <div className="px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Tentang Kami</h1>
        
        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Visi Kami</h2>
            <p className="text-gray-600 leading-relaxed">
              Menjadi platform e-commerce terpercaya yang menghubungkan pelanggan dengan produk berkualitas
              dan memberikan pengalaman berbelanja yang aman, nyaman, dan memuaskan.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Misi Kami</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Menyediakan produk berkualitas dengan harga kompetitif</li>
              <li>Memberikan pelayanan pelanggan yang terbaik</li>
              <li>Menjaga keamanan dan kenyamanan dalam bertransaksi</li>
              <li>Mendukung UMKM lokal dalam pengembangan bisnis</li>
              <li>Menerapkan teknologi terkini untuk pengalaman berbelanja yang lebih baik</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Nilai-Nilai Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Integritas</h3>
                <p className="text-gray-600">Menjunjung tinggi kejujuran dan transparansi dalam setiap aspek bisnis</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Inovasi</h3>
                <p className="text-gray-600">Terus berinovasi untuk memberikan solusi terbaik bagi pelanggan</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Kepuasan Pelanggan</h3>
                <p className="text-gray-600">Mengutamakan kepuasan dan kenyamanan pelanggan dalam setiap layanan</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Kolaborasi</h3>
                <p className="text-gray-600">Berkolaborasi dengan berbagai pihak untuk menciptakan ekosistem e-commerce yang sehat</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
} 