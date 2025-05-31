import Header from './components/Header';
import Footer from './components/Footer';
import NewProductsMarquee from './components/NewProductsMarquee';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="section bg-background relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
                Temukan Produk Modern untuk Gaya Hidup Anda
              </h1>
              <p className="text-xl text-secondary-color mb-8 leading-relaxed">
                Dapatkan produk eksklusif dan modern dari brand ternama, tersedia di platform favorit Anda. Tingkatkan gaya hidup Anda dengan belanja yang mudah dan cepat!
              </p>
              <div className="flex justify-center gap-4">
                <a href="#products" className="btn">
                  Belanja Sekarang
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* New Products Marquee Section */}
        <NewProductsMarquee />

        {/* Features Section */}
        <section className="section bg-hover-color">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
                  <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17l6-6 4 4 8-8M21 21H3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Barang Viral & Murah</h3>
                <p className="text-secondary-color">Temukan barang-barang viral, unik, dan kekinian dengan harga super terjangkau! Update koleksi kamu sebelum kehabisan!</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
                  <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Koleksi Premium</h3>
                <p className="text-secondary-color">Temukan produk eksklusif dari brand-brand ternama. Belanja mudah di Shopee, Tokopedia, dan TikTok Shop — kapan saja, di mana saja.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
                  <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Pengiriman Cepat</h3>
                <p className="text-secondary-color">Pesanan Anda diproses kilat dan dikirim aman langsung ke depan pintu rumah. Belanja tanpa ribet, tanpa lama!</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
                  <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Transaksi Aman</h3>
                <p className="text-secondary-color">Nikmati kemudahan pembayaran dengan sistem terenkripsi. Privasi terjaga, belanja pun jadi lebih tenang.</p>
              </div>
              
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}