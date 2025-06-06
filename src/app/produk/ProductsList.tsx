'use client';

import { useState, useEffect, useRef } from 'react';
import { getProducts, Product, categories } from '@/data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiFilter, FiX } from 'react-icons/fi';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('id');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<number>(8);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products without pagination
        const result = await getProducts(1, 1000); // Get a large number to fetch all products
        setProducts(result.items);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        return parsePrice(a.price_start) - parsePrice(b.price_start);
      case 'price-desc':
        return parsePrice(b.price_start) - parsePrice(a.price_start);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return parseInt(b.id) - parseInt(a.id); // Default sort by newest
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

  // Convert readonly categories
  const mutableCategories = [...categories];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary-color border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-1">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Sidebar */}
            <FilterSidebar
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubcategory={selectedSubcategory}
              setSelectedSubcategory={setSelectedSubcategory}
              categories={mutableCategories}
              subcategories={subcategories}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Button */}
              <div className="md:hidden mb-4">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FiFilter className="mr-2" />
                  Filter & Urutkan
                </button>
              </div>

              {/* Active Filters */}
              <div className="mb-6">
                {(searchQuery || selectedCategory !== 'all' || selectedSubcategory !== 'all' || sortBy !== 'id') && (
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-gray-500">Filter aktif:</span>
                    {searchQuery && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Pencarian: {searchQuery}
                        <button
                          onClick={() => setSearchQuery('')}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedCategory !== 'all' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Kategori: {selectedCategory}
                        <button
                          onClick={() => setSelectedCategory('all')}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedSubcategory !== 'all' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Subkategori: {selectedSubcategory}
                        <button
                          onClick={() => setSelectedSubcategory('all')}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {sortBy !== 'id' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Urutan: {sortBy === 'price-asc' ? 'Harga: Rendah ke Tinggi' : 
                                sortBy === 'price-desc' ? 'Harga: Tinggi ke Rendah' :
                                sortBy === 'name-asc' ? 'Nama: A-Z' : 'Nama: Z-A'}
                        <button
                          onClick={() => setSortBy('id')}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
                        >
                          <FiX className="w-3 h-3" />
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
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.slice(0, visibleProducts).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load More Trigger */}
              {visibleProducts < filteredProducts.length && (
                <div 
                  ref={loadMoreRef}
                  className="h-20 flex items-center justify-center mt-8"
                >
                  <div className="w-8 h-8 border-4 border-primary-color border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* No Results */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada produk ditemukan</h3>
                  <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian Anda</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 