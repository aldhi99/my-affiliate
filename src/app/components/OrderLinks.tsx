'use client';

import Image from 'next/image';
import ShopeeLogo from '../../../public/icon-png/shopee.png';
import TiktokShopLogo from '../../../public/icon-png/tiktok.png';
import TokopediaLogo from '../../../public/icon-png/tokopedia.png';

interface OrderLinksProps {
  productName: string;
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  isFloating?: boolean;
}

const OrderLinks: React.FC<OrderLinksProps> = ({ 
  productName, 
  className = '', 
  iconSize = 'md',
  isFloating = false 
}) => {
  const iconClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const containerClasses = isFloating 
    ? 'flex justify-between items-center overflow-x-auto gap-2 pb-2'
    : 'grid grid-cols-5 md:grid-cols-7 gap-4';

  return (
    <div className={className}>
      <p className="text-lg font-semibold text-foreground mb-1">Order melalui:</p>
      <div className={containerClasses}>
        {/* Shopee */}
        <a 
          href={`https://shopee.co.id/search?keyword=${encodeURIComponent(productName)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${isFloating ? 'flex-shrink-0' : 'flex flex-col items-center'} p-2 rounded-lg hover:bg-hover-color transition-colors`}
        >
          <Image className={iconClasses[iconSize]}
            src={ShopeeLogo} 
            alt="Shopee" 
            width={40} 
            height={40} 
            style={{ width: '35px', height: 'auto' }}
          />
          
        </a>

        {/* Tokopedia */}
        <a 
          href={`https://www.tokopedia.com/search?q=${encodeURIComponent(productName)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${isFloating ? 'flex-shrink-0' : 'flex flex-col items-center'} p-2 rounded-lg hover:bg-hover-color transition-colors`}
        >
          <Image className={iconClasses[iconSize]}
            src={TokopediaLogo} 
            alt="Tokopedia" 
            width={40} 
            height={40} 
            style={{ width: '32px', height: 'auto' }}
          />
        </a>

        {/* TikTok Shop */}
        <a 
          href={`https://shop.tiktok.com/search?q=${encodeURIComponent(productName)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${isFloating ? 'flex-shrink-0' : 'flex flex-col items-center'} p-2 rounded-lg hover:bg-hover-color transition-colors`}
        >
          <Image className={iconClasses[iconSize]}
            src={TiktokShopLogo} 
            alt="TikTok Shop" 
            width={40} 
            height={40} 
            style={{ width: '35px', height: 'auto' }}
          />
        </a>

      </div>
    </div>
  );
};

export default OrderLinks; 