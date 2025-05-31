import { Metadata } from 'next'
import ProductsList from './ProductsList'

export const metadata: Metadata = {
  title: 'Daftar Produk',
  description: 'Temukan berbagai produk berkualitas dengan harga terbaik. Belanja online aman, nyaman dan terpercaya dengan pengiriman cepat ke seluruh Indonesia.',
  openGraph: {
    title: 'Daftar Produk - dPinus Shop',
    description: 'Temukan berbagai produk berkualitas dengan harga terbaik. Belanja online aman, nyaman dan terpercaya dengan pengiriman cepat ke seluruh Indonesia.',
    type: 'website'
  },
  alternates: {
    canonical: '/produk'
  }
}

export default function ProductsPage() {
  return <ProductsList />
} 