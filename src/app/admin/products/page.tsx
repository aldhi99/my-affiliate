'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeftIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

interface ImageFile {
  id: string;
  filename: string;
  created_at: string;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  price_start: string;
  price_end: string;
  category: string;
  subcategory: string;
  description: string;
  url_tiktok: string;
  url_shopee: string;
  url_tokopedia: string;
  image_file: ImageFile[];
}

interface PaginationInfo {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [pagination, setPagination] = useState<PaginationInfo>({
    current_page: Number(searchParams.get('page')) || 1,
    total_pages: 1,
    total_items: 0,
    items_per_page: 10,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = async (page: number = 1, search: string = '') => {
    try {
      setIsLoading(true);
      setError(null);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: pagination.items_per_page.toString(),
        ...(search && { search }),
      });
      console.log('Fetching products with params:', queryParams.toString());
      const response = await fetch(`http://localhost:3000/api/produk?${queryParams}`);
      const result = await response.json();
      
      console.log('API Response:', JSON.stringify(result.data.items.slice(0, 2), null, 2));
      
      if (!result.status) {
        throw new Error(result.message || 'Failed to fetch products');
      }
      
      setProducts(result.data.items);
      setPagination({
        current_page: result.data.current_page,
        total_pages: result.data.total_pages,
        total_items: result.data.total_items,
        items_per_page: result.data.items_per_page,
      });

      // Update URL with search params
      const newSearchParams = new URLSearchParams();
      if (search) newSearchParams.set('search', search);
      if (page > 1) newSearchParams.set('page', page.toString());
      const newUrl = newSearchParams.toString() ? `?${newSearchParams.toString()}` : '';
      router.replace(newUrl, { scroll: false });
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error instanceof Error ? error.message : 'Failed to load products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    const search = searchParams.get('search') || '';
    fetchProducts(page, search);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(1, searchQuery);
  };

  const handlePageChange = (page: number) => {
    fetchProducts(page, searchQuery);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/produk/${productToDelete.id}`, {
        method: 'DELETE',
      });

      console.log('Delete response status:', response.status);
      const responseText = await response.text();
      console.log('Delete raw response:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Error parsing delete response:', parseError);
        throw new Error('Invalid response from server');
      }

      console.log('Delete parsed response:', result);

      if (!result.status) {
        throw new Error(result.message || 'Failed to delete product');
      }

      // Refresh the products list
      fetchProducts(pagination.current_page, searchQuery);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading && products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading products</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all products in your store including their name, category and subcategory.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/admin/products/add"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Product
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <form onSubmit={handleSearch} className="max-w-lg">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </form>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price Range
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subcategory
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => {
                  console.log('Rendering product:', JSON.stringify(product, null, 2));
                  return (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Rp {Number(product.price_start).toLocaleString()} - Rp {Number(product.price_end).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.subcategory}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.total_pages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {(pagination.current_page - 1) * pagination.items_per_page + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {Math.min(pagination.current_page * pagination.items_per_page, pagination.total_items)}
              </span>{' '}
              of{' '}
              <span className="font-medium">{pagination.total_items}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    page === pagination.current_page
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.total_pages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <ArrowLeftIcon className="h-5 w-5 transform rotate-180" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && productToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          {/* Background overlay with blur */}
          <div className="fixed inset-0 bg-gray-100/75 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>

          {/* Modal panel */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                      Delete Product
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete &ldquo;{productToDelete.name}&rdquo;? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleDeleteConfirm}
                    disabled={isDeleting}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setProductToDelete(null);
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 