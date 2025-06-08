'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { getProducts, Product, categories } from '@/data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiFilter, FiX, FiSearch } from 'react-icons/fi';
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

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
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
  }, [products, searchQuery, selectedCategory, selectedSubcategory, sortBy]);

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

              

              {/* Search Bar */}
              <div className="mb-8">
                <div className="mx-auto">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      // Reset to first page when searching
                      setVisibleProducts(8);
                    }}
                    className="relative"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari produk, kategori, atau deskripsi..."
                        className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                      />
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiSearch className="h-5 w-5 text-gray-400" />
                      </div>
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            setVisibleProducts(8);
                          }}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          <FiX className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </form>
                </div>
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