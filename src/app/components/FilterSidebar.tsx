'use client';

import { FiX } from 'react-icons/fi';

interface FilterSidebarProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (subcategory: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  categories: string[];
  subcategories: string[];
}

export default function FilterSidebar({
  isFilterOpen,
  setIsFilterOpen,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  sortBy,
  setSortBy,
  categories,
  subcategories,
}: FilterSidebarProps) {
  return (
    <div className={`fixed top-[72px] left-0 h-[calc(100vh-72px)] w-70 bg-white shadow-lg transform transition-transform duration-900 ease-in-out z-40 ${
      isFilterOpen ? 'translate-x-0' : '-translate-x-full'
    } md:relative md:top-0 md:h-auto md:translate-x-0 md:shadow-none md:w-65`}>
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filter</h2>
          <button 
            onClick={() => setIsFilterOpen(false)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-72px)] md:h-auto">
        {/* Category Filter */}
        <div>
          <h3 className="font-medium mb-2">Kategori</h3>
          <select 
            className="w-full border rounded-lg px-3 py-2 bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Semua</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Subcategory Filter */}
        <div>
          <h3 className="font-medium mb-2">Subkategori</h3>
          <select 
            className="w-full border rounded-lg px-3 py-2 bg-white"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="all">Semua</option>
            {subcategories.map(subcategory => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div>
          <h3 className="font-medium mb-2">Urutkan</h3>
          <select 
            className="w-full border rounded-lg px-3 py-2 bg-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-asc">Harga: Rendah ke Tinggi</option>
            <option value="price-desc">Harga: Tinggi ke Rendah</option>
            <option value="name-asc">Nama: A ke Z</option>
            <option value="name-desc">Nama: Z ke A</option>
          </select>
        </div>
      </div>
    </div>
  );
} 