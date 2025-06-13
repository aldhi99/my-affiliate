'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
  BoldIcon,
  ItalicIcon,
  ListBulletIcon,
  LinkIcon,
  PhotoIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from '@heroicons/react/24/outline';
import ProductImageUpload from '@/app/components/ProductImageUpload';
import toast from 'react-hot-toast';

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

interface FormErrors {
  name?: string;
  price_start?: string;
  price_end?: string;
  category?: string;
  subcategory?: string;
  description?: string;
  url_tiktok?: string;
  url_shopee?: string;
  url_tokopedia?: string;
}

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  error?: string;
}

const RichTextEditor = ({ content, onChange, error }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'leading-relaxed',
          },
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-indigo-600 hover:text-indigo-500 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[400px] leading-relaxed',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={`border rounded-lg ${error ? 'border-red-300' : 'border-gray-300'} shadow-sm bg-white`}>
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('bold') ? 'bg-gray-200' : ''
          }`}
          title="Bold"
        >
          <BoldIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('italic') ? 'bg-gray-200' : ''
          }`}
          title="Italic"
        >
          <ItalicIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('bulletList') ? 'bg-gray-200' : ''
          }`}
          title="Bullet List"
        >
          <ListBulletIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('link') ? 'bg-gray-200' : ''
          }`}
          title="Add Link"
        >
          <LinkIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('Enter image URL');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Add Image"
        >
          <PhotoIcon className="h-5 w-5" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Undo"
        >
          <ArrowUturnLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Redo"
        >
          <ArrowUturnRightIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6">
        <EditorContent 
          editor={editor} 
          className="[&_.ProseMirror]:min-h-[400px] [&_.ProseMirror]:py-2 [&_.ProseMirror]:leading-relaxed [&_.ProseMirror]:focus:outline-none" 
        />
      </div>
      {error && <p className="px-6 pb-4 text-sm text-red-600">{error}</p>}
    </div>
  );
};

const initialFormData: Partial<Product> = {
  name: '',
  price_start: '',
  price_end: '',
  category: '',
  subcategory: '',
  description: '',
  url_tiktok: '',
  url_shopee: '',
  url_tokopedia: '',
};

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Product>>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);

  const validateForm = (data: Partial<Product>): FormErrors => {
    const errors: FormErrors = {};
    
    if (!data.name?.trim()) {
      errors.name = 'Product name is required';
    }
    
    if (!data.price_start?.trim()) {
      errors.price_start = 'Starting price is required';
    } else if (isNaN(Number(data.price_start)) || Number(data.price_start) < 0) {
      errors.price_start = 'Starting price must be a positive number';
    }
    
    if (!data.price_end?.trim()) {
      errors.price_end = 'Ending price is required';
    } else if (isNaN(Number(data.price_end)) || Number(data.price_end) < 0) {
      errors.price_end = 'Ending price must be a positive number';
    }
    
    if (data.price_start && data.price_end && Number(data.price_start) > Number(data.price_end)) {
      errors.price_end = 'Ending price must be greater than starting price';
    }
    
    if (!data.category?.trim()) {
      errors.category = 'Category is required';
    }
    
    if (!data.subcategory?.trim()) {
      errors.subcategory = 'Subcategory is required';
    }
    
    if (!data.description?.trim()) {
      errors.description = 'Description is required';
    }

    // URL validation (optional fields)
    if (data.url_tiktok && !isValidUrl(data.url_tiktok)) {
      errors.url_tiktok = 'Invalid TikTok URL';
    }
    if (data.url_shopee && !isValidUrl(data.url_shopee)) {
      errors.url_shopee = 'Invalid Shopee URL';
    }
    if (data.url_tokopedia && !isValidUrl(data.url_tokopedia)) {
      errors.url_tokopedia = 'Invalid Tokopedia URL';
    }

    return errors;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDescriptionChange = (content: string) => {
    setFormData((prev) => ({ ...prev, description: content }));
    if (formErrors.description) {
      setFormErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      console.log('Submitting product data:', JSON.stringify(formData, null, 2));
      
      const apiUrl = process.env.NEXT_PUBLIC_URL_API + `/product/add`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Invalid response from server');
      }

      console.log('Parsed response:', result);

      if (!result.status) {
        throw new Error(result.message || 'Failed to create product');
      }

      // Set the product ID for image upload
      setProductId(result.data.id);

      // Show success toast
      toast.success('Product created successfully!');

      // Redirect to products list
      router.push(`/admin/products/${result.data.id}/edit`);
    } catch (error) {
      console.error('Error creating product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create product. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-900 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Products
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white">
          <h1 className="text-2xl font-semibold text-gray-900">Add New Product</h1>
          <p className="mt-1 text-sm text-gray-500">Fill in the product information below</p>
        </div>

        {error && (
          <div className="mx-8 mt-6 rounded-lg bg-red-50 p-4 border border-red-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-8 py-6">
          <div className="space-y-8">
            {/* Basic Information Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors h-12 px-4 ${
                      formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter product name"
                    required
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Starting Price</label>
                    <div className="mt-1 relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">Rp</span>
                      </div>
                      <input
                        type="number"
                        name="price_start"
                        value={formData.price_start}
                        onChange={handleInputChange}
                        className={`block w-full pl-12 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors h-12 ${
                          formErrors.price_start ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="0"
                        required
                        min="0"
                      />
                    </div>
                    {formErrors.price_start && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.price_start}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ending Price</label>
                    <div className="mt-1 relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">Rp</span>
                      </div>
                      <input
                        type="number"
                        name="price_end"
                        value={formData.price_end}
                        onChange={handleInputChange}
                        className={`block w-full pl-12 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors h-12 ${
                          formErrors.price_end ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="0"
                        required
                        min="0"
                      />
                    </div>
                    {formErrors.price_end && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.price_end}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Category Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Category Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors h-12 px-4 ${
                      formErrors.category ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter category"
                    required
                  />
                  {formErrors.category && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                  <input
                    type="text"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors h-12 px-4 ${
                      formErrors.subcategory ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter subcategory"
                    required
                  />
                  {formErrors.subcategory && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.subcategory}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Product Description</h2>
              <div className="mt-1">
                <RichTextEditor
                  content={formData.description || ''}
                  onChange={handleDescriptionChange}
                  error={formErrors.description}
                />
              </div>
            </div>

            {/* Marketplace Links Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Marketplace Links</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">TikTok URL</label>
                  <input
                    type="url"
                    name="url_tiktok"
                    value={formData.url_tiktok}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors h-12 px-4 ${
                      formErrors.url_tiktok ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="https://tiktok.com/..."
                  />
                  {formErrors.url_tiktok && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.url_tiktok}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Shopee URL</label>
                  <input
                    type="url"
                    name="url_shopee"
                    value={formData.url_shopee}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors h-12 px-4 ${
                      formErrors.url_shopee ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="https://shopee.co.id/..."
                  />
                  {formErrors.url_shopee && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.url_shopee}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tokopedia URL</label>
                  <input
                    type="url"
                    name="url_tokopedia"
                    value={formData.url_tokopedia}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors h-12 px-4 ${
                      formErrors.url_tokopedia ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="https://tokopedia.com/..."
                  />
                  {formErrors.url_tokopedia && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.url_tokopedia}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Add Image Upload Section */}
            {productId && (
              <div className="bg-gray-50 rounded-lg p-6">
                <ProductImageUpload
                  productId={productId}
                  onImagesUpdated={(images) => {
                    setFormData(prev => ({
                      ...prev,
                      image_file: images
                    }));
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 