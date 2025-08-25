import React, { useState } from 'react';
import { cleanDescriptionText } from '../utils/textUtils';

interface TruncatedTextProps {
  text: string;
  maxLength?: number;
  className?: string;
  showMoreText?: string;
  showLessText?: string;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({
  text,
  maxLength = 200,
  className = '',
  showMoreText = 'Show more',
  showLessText = 'Show less'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) {
    return null;
  }

  // Clean the text for better readability
  const cleanText = cleanDescriptionText(text);
  
  if (!cleanText) {
    return null;
  }

  const shouldTruncate = cleanText.length > maxLength;
  const displayText = isExpanded || !shouldTruncate 
    ? cleanText 
    : cleanText.slice(0, maxLength).trim() + '...';

  if (!shouldTruncate) {
    return <p className={className}>{cleanText}</p>;
  }

  return (
    <div className={className}>
      <p className="inline">
        {displayText}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 text-primary hover:text-primary-dark font-medium text-sm underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 rounded"
          type="button"
        >
          {isExpanded ? showLessText : showMoreText}
        </button>
      )}
    </div>
  );
};

export default TruncatedText;
