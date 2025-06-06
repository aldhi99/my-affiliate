import { Metadata } from 'next';
import { getProducts } from '@/data/products';
import ProductClient from './ProductClient';

interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  try {
    const products = await getProducts();
    const product = products.find((p) => p.slug === params.slug);

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

export default function Page({ params }: PageProps) {
  return <ProductClient params={params} />;
} 