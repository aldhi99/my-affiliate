'use client';

import { useState, useEffect, useRef } from 'react';
import { products, categories } from '@/data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FiFilter, FiX } from 'react-icons/fi';
import FilterSidebar from '../components/FilterSidebar';

export default function ProductsList() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('id');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<number>(8);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const parsePrice = (price: string) => {
    return parseInt(price.replace(/[^0-9]/g, ''));
  };

  const filteredProducts = products.filter(product => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      (product.subcategory?.toLowerCase().includes(searchLower) ?? false);

    // Category filter
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || product.subcategory === selectedSubcategory;

    return matchesSearch && matchesCategory && matchesSubcategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return parsePrice(a.price.split(' - ')[0]) - parsePrice(b.price.split(' - ')[0]);
      case 'price-desc':
        return parsePrice(b.price.split(' - ')[0]) - parsePrice(a.price.split(' - ')[0]);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth >= 768) {
        setIsFilterOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setVisibleProducts((prev) => Math.min(prev + 12, filteredProducts.length));
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [filteredProducts.length]);

  // Reset subcategory when category changes
  useEffect(() => {
    setSelectedSubcategory('all');
  }, [selectedCategory]);

  // Get all unique subcategories based on selected category
  const subcategories = [...new Set(products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .map(p => p.subcategory)
    .filter((s): s is string => s !== undefined))];

  // Convert readonly categories to mutable array
  const mutableCategories = [...categories];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Produk Kami</h1>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <FiFilter />
            Filter
          </button>
        </div>
        
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedSubcategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={mutableCategories}
            subcategories={subcategories}
          />

          <div className="flex-1">
            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>

            {/* Active Filters */}
            {(searchQuery || selectedCategory !== 'all' || selectedSubcategory !== 'all') && (
              <div className="flex flex-wrap gap-2 items-center mb-6">
                <span className="text-sm text-gray-600">Filter aktif:</span>
                {searchQuery && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    Pencarian: {searchQuery}
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-blue-600"
                    >
                      <FiX size={16} />
                    </button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    Kategori: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="hover:text-blue-600"
                    >
                      <FiX size={16} />
                    </button>
                  </span>
                )}
                {selectedSubcategory !== 'all' && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    Subkategori: {selectedSubcategory}
                    <button
                      onClick={() => setSelectedSubcategory('all')}
                      className="hover:text-blue-600"
                    >
                      <FiX size={16} />
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedSubcategory('all');
                    setSortBy('id');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Reset semua filter
                </button>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.slice(0, visibleProducts).map((product) => (
                <Link 
                  href={`/produk/${product.slug}`} 
                  key={product.id}
                  className="transform transition-all duration-300 ease-in-out hover:scale-[1.02]"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4 pt-2">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-lg font-semibold line-clamp-2 h-[60px] transition-colors duration-200 hover:text-primary-color">
                          {product.name}
                        </h2>
                        <p className="text-gray-600 text-sm underline truncate-1-lines transition-colors duration-200">
                          {product.price}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-2 mt-2 transition-colors duration-200">
                          {product.description
                            .replace(/<[^>]*>/g, '')
                            .replace(/deskripsi produk/gi, '')                  
                            .replace(/keterangan produk/gi, '')               
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {visibleProducts < filteredProducts.length && (
              <div 
                ref={loadMoreRef} 
                className="w-full h-20 flex items-center justify-center mt-8"
              >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color transition-opacity duration-300"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 