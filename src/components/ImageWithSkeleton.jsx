import React, { useState } from 'react';

const ImageWithSkeleton = ({ 
  src, 
  alt, 
  className = '', 
  skeletonClassName = '',
  onError,
  fallbackIcon: FallbackIcon 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Skeleton Loader */}
      {isLoading && !hasError && (
        <div className={`absolute inset-0 skeleton-loader ${skeletonClassName}`}>
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%]"></div>
        </div>
      )}
      
      {/* Actual Image */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      
      {/* Fallback Icon */}
      {hasError && FallbackIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <FallbackIcon className="w-24 h-24 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default ImageWithSkeleton;
