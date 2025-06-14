import { Metadata } from 'next';
import { getProductsBySlug } from '@/data/products';
import { headers } from 'next/headers';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '@/app/components/Footer';
import ProductView from './ProductView';

interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Helper function to detect platform from user agent
function detectPlatform(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes('android')) return 'android';
  if (ua.includes('iphone') || ua.includes('ipad')) return 'ios';
  if (ua.includes('mobile')) return 'mobile';
  return 'web';
}

// Helper function to record visit
async function recordVisit(productId: string, userAgent: string, ipAddress: string) {
  try {
    
    const platform = detectPlatform(userAgent);

    const submitData = {
      product_id: productId,
      user_agent: userAgent,
      ip_address: ipAddress,
      platform: platform
    };

    const urlApi = `${process.env.NEXT_PUBLIC_URL_API}/product/visit`;
    await fetch(urlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData),
    });

  } catch (error) {
    console.error('Error recording visit:', error);
    // Don't throw error to prevent breaking the page load
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  try {
    const product = await getProductsBySlug(params.slug);

    // Clean HTML tags from description
    const cleanDescription = product.description
      .replace(/<[^>]*>/g, '')
      .replace(/deskripsi produk/gi, '')
      .replace(/keterangan produk/gi, '')
      .trim();

    // Get first image as og image
    const firstImage = product.images[0]?.filename 
      ? `${product.images[0].filename}`
      : '/logo.png';

    return {
      title: product.name,
      description: cleanDescription,
      openGraph: {
        title: product.name,
        description: cleanDescription,
        images: [
          {
            url: firstImage,
            width: 800,
            height: 800,
            alt: product.name
          }
        ],
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: cleanDescription,
        images: [firstImage],
      },
      alternates: {
        canonical: `/produk/${product.slug}`
      }
    };
  } catch {
    return {
      title: 'Error',
      description: 'Terjadi kesalahan saat memuat data produk.'
    };
  }
}

export default async function Page({ params }: PageProps) {
  try {
    const product = await getProductsBySlug(params.slug);
    
    // Get request headers for visit tracking
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'unknown';
    const forwardedFor = headersList.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

    // Record visit asynchronously
    recordVisit(product.id, userAgent, ipAddress);

    return <ProductView product={product} />;
    
  } catch (error) {
    console.error('Error in product page:', error);
    return <ProductNotFound />;
  }
} 

// Komponen terpisah untuk tampilan "Produk Tidak Ditemukan"
function ProductNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Produk Tidak Ditemukan</h1>
          <p className="text-lg text-secondary-color mb-8">
            Maaf, produk yang Anda cari tidak ditemukan.
          </p>
          <Link 
            href="/produk" 
            className="inline-block bg-primary-color text-white px-6 py-3 rounded-lg hover:bg-primary-color/90 transition-colors"
          >
            Kembali ke Daftar Produk
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}