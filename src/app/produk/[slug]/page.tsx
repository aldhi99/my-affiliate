import { Metadata } from 'next';
import { getProducts, Product } from '@/data/products';
import ProductClient from './ProductClient';
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import conn from '@/lib/connection';

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
    // Check if there's already a visit from this IP for this product today
    const checkQuery = `
      SELECT id FROM product_visits 
      WHERE product_id = ? 
      AND ip_address = ? 
      AND DATE(created_at) = CURDATE()
      LIMIT 1
    `;
    
    const [existingVisits] = await conn.query(checkQuery, [productId, ipAddress]);
    
    // If a visit already exists for today, don't record a new one
    if (Array.isArray(existingVisits) && existingVisits.length > 0) {
      console.log('Visit already recorded for today');
      return;
    }

    const platform = detectPlatform(userAgent);
    const visitId = uuidv4();

    const insertQuery = `
      INSERT INTO product_visits (
        id,
        product_id,
        platform,
        user_agent,
        ip_address
      ) VALUES (?, ?, ?, ?, ?)
    `;

    const values = [visitId, productId, platform, userAgent, ipAddress];
    await conn.query(insertQuery, values);
  } catch (error) {
    console.error('Error recording visit:', error);
    // Don't throw error to prevent breaking the page load
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  try {
    const { items: products } = await getProducts();
    const product = products.find((p: Product) => p.slug === params.slug);

    if (!product) {
      return {
        title: 'Produk Tidak Ditemukan',
        description: 'Maaf, produk yang Anda cari tidak ditemukan.'
      };
    }

    // Clean HTML tags from description
    const cleanDescription = product.description
      .replace(/<[^>]*>/g, '')
      .replace(/deskripsi produk/gi, '')
      .replace(/keterangan produk/gi, '')
      .trim();

    // Get first image as og image
    const firstImage = product.image_file[0]?.filename 
      ? `${product.image_file[0].filename}`
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
    // Get product data
    const { items: products } = await getProducts();
    const product = products.find((p: Product) => p.slug === params.slug);

    if (!product) {
      return <ProductClient params={params} />;
    }

    // Get request headers for visit tracking
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'unknown';
    const forwardedFor = headersList.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

    // Record visit asynchronously
    recordVisit(product.id, userAgent, ipAddress);

    return <ProductClient params={params} />;
  } catch (error) {
    console.error('Error in product page:', error);
    return <ProductClient params={params} />;
  }
} 