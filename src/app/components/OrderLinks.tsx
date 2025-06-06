'use client';

import Image from 'next/image';
import ShopeeLogo from '../../../public/icon-png/shopee.png';
import TiktokShopLogo from '../../../public/icon-png/tiktok.png';
import TokopediaLogo from '../../../public/icon-png/tokopedia.png';

interface OrderLinksProps {
  urlTiktok?: string;
  urlShopee?: string;
  urlTokopedia?: string;
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  isFloating?: boolean;
  showTitle?: boolean;
}

const OrderLinks: React.FC<OrderLinksProps> = ({ 
  urlTiktok, 
  urlShopee,
  urlTokopedia,
  className = '', 
  iconSize = 'md',
  isFloating = false,
  showTitle = true
}) => {
  const iconClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const containerClasses = isFloating 
    ? 'flex justify-between items-center overflow-x-auto gap-2 pb-2'
    : 'grid grid-cols-5 md:grid-cols-7 gap-4';

  const floatingMobileClasses = !showTitle 
    ? 'fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-3 pb-0 shadow-lg z-[100] md:hidden flex justify-center items-center'
    : '';

  const linkClasses = !showTitle
    ? 'flex items-center justify-center gap-4 w-full max-w-md mx-auto'
    : containerClasses;

  return (
    <div className={`${className} ${floatingMobileClasses}`}>
      <p className="md:text-xl text-xs font-semibold text-foreground mb-1 md:w-[300px] w-[120px]">Order melalui:</p>
      <div className={linkClasses}>
        {urlShopee && (
          <a 
            href={urlShopee}
            target="_blank"
            rel="noopener noreferrer"
            className={`${!showTitle ? 'flex-1' : isFloating ? 'flex-shrink-0' : ''} p-2 rounded-lg hover:bg-hover-color transition-colors flex justify-center items-center`}
          >
            <Image className={iconClasses[iconSize]}
              src={ShopeeLogo} 
              alt="Shopee" 
              width={40} 
              height={40} 
              style={{ width: '35px', height: 'auto' }}
            />
          </a>
        )}

        {urlTokopedia && (
          <a 
            href={urlTokopedia}
            target="_blank"
            rel="noopener noreferrer"
            className={`${!showTitle ? 'flex-1' : isFloating ? 'flex-shrink-0' : ''} p-2 rounded-lg hover:bg-hover-color transition-colors flex justify-center items-center`}
          >
            <Image className={iconClasses[iconSize]}
              src={TokopediaLogo} 
              alt="Tokopedia" 
              width={40} 
              height={40} 
              style={{ width: '32px', height: 'auto' }}
            />
          </a>
        )}

        {urlTiktok && (
          <a 
            href={urlTiktok}
            target="_blank"
            rel="noopener noreferrer"
            className={`${!showTitle ? 'flex-1' : isFloating ? 'flex-shrink-0' : ''} p-2 rounded-lg hover:bg-hover-color transition-colors flex justify-center items-center`}
          >
            <Image className={iconClasses[iconSize]}
              src={TiktokShopLogo} 
              alt="TikTok Shop" 
              width={40} 
              height={40} 
              style={{ width: '35px', height: 'auto' }}
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default OrderLinks; 