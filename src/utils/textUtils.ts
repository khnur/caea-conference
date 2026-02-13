/**
 * Utility functions for text processing and cleaning
 */

/**
 * Cleans up description text by removing formatting artifacts and improving readability
 * @param text - The raw text to clean
 * @returns Cleaned and formatted text
 */
export const cleanDescriptionText = (text: string): string => {
  if (!text || typeof text !== 'string') {
    return '';
  }

  let cleanedText = text;

  // Remove strange prefixes like "+P", "+", "★", etc. - be very aggressive
  cleanedText = cleanedText.replace(/[+*★☆•]\s*[A-Z]?\s*/g, '');
  
  // Remove +P patterns anywhere in the text with various spacing
  cleanedText = cleanedText.replace(/\s*\+P\s*/g, ' ');
  cleanedText = cleanedText.replace(/\+P/g, '');
  
  // Remove other common artifacts
  cleanedText = cleanedText.replace(/\s*\+\s*[A-Z]\s*/g, ' ');

  // Fix character-level spacing issues using a more comprehensive approach
  // This handles cases like "o v e r a l l   G D P   a n d   o u t p u t   p e r   w o r k e r"
  
  // More aggressive approach to fix spaced-out characters
  // This is a common issue in PDF text extraction where words get spaced out
  
  // Step 1: Fix very long sequences of spaced characters
  // Look for patterns like "i n v e s t i g a t e s   t h e   s i g n i f i c a n c e"
  cleanedText = cleanedText.replace(/(\b[a-z]\s+){3,}[a-z](\s+[a-z])*\b/gi, (match) => {
    // Split by spaces and check if most parts are single characters
    const parts = match.trim().split(/\s+/);
    const singleCharParts = parts.filter(part => part.length === 1 && /[a-z]/i.test(part));
    
    // If more than 70% are single characters, it's likely a spaced-out word
    if (singleCharParts.length / parts.length > 0.7 && parts.length >= 3) {
      return parts.join('');
    }
    return match;
  });
  
  // Step 2: Handle remaining shorter sequences
  cleanedText = cleanedText.replace(/\b([a-z])\s+([a-z])\s+([a-z])\b/gi, (match) => {
    const parts = match.trim().split(/\s+/);
    // Only join if ALL parts are single characters (more conservative for short sequences)
    if (parts.every(part => part.length === 1 && /[a-z]/i.test(part))) {
      return parts.join('');
    }
    return match;
  });
  
  // Step 3: Handle mixed patterns with punctuation
  cleanedText = cleanedText.replace(/\b([a-z])\s+([a-z])\s+([a-z])\s+([a-z])(\s+[a-z])*\s*[.,]?/gi, (match) => {
    const cleanMatch = match.replace(/[.,]$/, ''); // Remove trailing punctuation
    const punctuationMatch = match.match(/[.,]$/);
    const punctuation = punctuationMatch ? punctuationMatch[0] : '';
    const parts = cleanMatch.trim().split(/\s+/);
    
    if (parts.every(part => part.length === 1 && /[a-z]/i.test(part))) {
      return parts.join('') + punctuation;
    }
    return match;
  });

  // Replace multiple whitespace characters with single space
  cleanedText = cleanedText.replace(/\s+/g, ' ');

  // Fix common formatting issues where words are concatenated (like "companiesThe")
  cleanedText = cleanedText.replace(/([a-z])([A-Z][a-z])/g, '$1 $2');

  // Fix cases like "Kazakhstan'scompanies" -> "Kazakhstan's companies"
  cleanedText = cleanedText.replace(/([a-z])'s([A-Z])/g, "$1's $2");

  // Fix numbers followed by letters without space
  cleanedText = cleanedText.replace(/(\d)([A-Z][a-z])/g, '$1 $2');

  // Fix missing spaces after periods in abbreviations or sentences
  cleanedText = cleanedText.replace(/\.([A-Z])/g, '. $1');

  // Fix missing spaces before "This" when it starts a new sentence
  cleanedText = cleanedText.replace(/([a-z])This\s/g, '$1 This ');
  
  // Fix cut-off words at the end that might be incomplete
  cleanedText = cleanedText.replace(/\s+[A-Z][a-z]{1,4}$/, '');
  
  // Fix incomplete words that are clearly cut off (like "Inflat" or "I n f l a t" -> should be removed)
  cleanedText = cleanedText.replace(/\s+(Inflat|Econom|Develop|Analyz|Examin)(\s|$)/g, ' ');
  
  // Handle spaced-out incomplete words like "I n f l a t"
  cleanedText = cleanedText.replace(/\s+([I]\s+[n]\s+[f]\s+[l]\s+[a]\s+[t]|[E]\s+[c]\s+[o]\s+[n]\s+[o]\s+[m]|[D]\s+[e]\s+[v]\s+[e]\s+[l]\s+[o]\s+[p])(\s|$)/gi, ' ');

  // Clean up any remaining non-word characters at the start
  cleanedText = cleanedText.replace(/^\s*[^\w]*\s*/, '');

  // Ensure proper sentence structure - capitalize first letter
  cleanedText = cleanedText.replace(/^[a-z]/, (match) => match.toUpperCase());

  // Final cleanup of any remaining multiple spaces
  cleanedText = cleanedText.replace(/\s+/g, ' ');

  // Trim whitespace
  return cleanedText.trim();
};

/**
 * Truncates text to a specified length while preserving word boundaries
 * @param text - The text to truncate
 * @param maxLength - Maximum length in characters
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  const cleanText = cleanDescriptionText(text);
  
  if (cleanText.length <= maxLength) {
    return cleanText;
  }
  
  // Find the last space before the max length to avoid cutting words
  const truncated = cleanText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > maxLength * 0.8) { // Only use word boundary if it's not too far back
    return truncated.substring(0, lastSpaceIndex).trim() + '...';
  }
  
  return truncated.trim() + '...';
};
