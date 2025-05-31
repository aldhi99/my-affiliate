import { Metadata } from 'next';
import { products } from '@/data/products';
import ProductClient from './ProductClient';

interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

type Props = PageProps;

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const product = products.find((p) => p.id === parseInt(params.id))
  
  if (!product) {
    return {
      title: 'Produk Tidak Ditemukan',
      description: 'Maaf, produk yang Anda cari tidak ditemukan.'
    }
  }

  // Clean HTML tags from description
  const cleanDescription = product.description
    .replace(/<[^>]*>/g, '')
    .replace(/deskripsi produk/gi, '')
    .replace(/keterangan produk/gi, '')
    .trim()
  
  // Get first image as og image
  const firstImage = product.images[0]

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
      canonical: `/produk/${product.id}`
    }
  }
}

export default function Page({ params }: Props) {
  return <ProductClient params={params} />;
}