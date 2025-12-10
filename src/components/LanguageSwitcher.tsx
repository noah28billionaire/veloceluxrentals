import React, { useState, useEffect, useRef } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'EN', flag: '🇬🇧' },
  { code: 'es', name: 'ES', flag: '🇪🇸' },
  { code: 'fr', name: 'FR', flag: '🇫🇷' },
  { code: 'ar', name: 'AR', flag: '🇸🇦' },
  { code: 'de', name: 'DE', flag: '🇩🇪' }
];

const GOOGLE_TRANSLATE_API_KEY = 'AIzaSyBmUfJEDx-8BQCrSLJ7EjZtLPg53EWBzmM';
const GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]);
  const [isTranslating, setIsTranslating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const originalTexts = useRef<Map<HTMLElement, string>>(new Map());

  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang);
      if (lang) {
        setCurrentLang(lang);
        if (savedLang !== 'en') {
          translatePage(savedLang);
        }
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTextNodes = (element: HTMLElement): HTMLElement[] => {
    const textNodes: HTMLElement[] = [];
    const excludedTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'OBJECT'];
    const excludedIds = ['language-switcher'];

    const walk = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim();
        if (text && text.length > 0 && node.parentElement) {
          const parent = node.parentElement;
          if (
            !excludedTags.includes(parent.tagName) &&
            !excludedIds.includes(parent.id) &&
            !parent.closest('#language-switcher') &&
            !parent.hasAttribute('data-no-translate')
          ) {
            textNodes.push(parent);
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        if (
          !excludedTags.includes(element.tagName) &&
          !excludedIds.includes(element.id) &&
          !element.closest('#language-switcher')
        ) {
          Array.from(node.childNodes).forEach(walk);
        }
      }
    };

    walk(element);
    return textNodes;
  };

  const translatePage = async (targetLang: string) => {
    if (targetLang === 'en') {
      restoreOriginalTexts();
      return;
    }

    setIsTranslating(true);

    try {
      const body = document.body;
      const elements = getTextNodes(body);

      const textsToTranslate: string[] = [];
      const elementMap: HTMLElement[] = [];

      elements.forEach(element => {
        const text = element.textContent?.trim();
        if (text && text.length > 0) {
          if (!originalTexts.current.has(element)) {
            originalTexts.current.set(element, text);
          }
          textsToTranslate.push(text);
          elementMap.push(element);
        }
      });

      if (textsToTranslate.length === 0) {
        setIsTranslating(false);
        return;
      }

      const batchSize = 100;
      for (let i = 0; i < textsToTranslate.length; i += batchSize) {
        const batch = textsToTranslate.slice(i, i + batchSize);
        const batchElements = elementMap.slice(i, i + batchSize);

        const response = await fetch(`${GOOGLE_TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: batch,
            target: targetLang,
            format: 'text'
          }),
        });

        if (!response.ok) {
          throw new Error('Translation failed');
        }

        const data = await response.json();

        if (data.data && data.data.translations) {
          data.data.translations.forEach((translation: any, index: number) => {
            const element = batchElements[index];
            if (element && translation.translatedText) {
              element.textContent = translation.translatedText;
            }
          });
        }
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const restoreOriginalTexts = () => {
    originalTexts.current.forEach((originalText, element) => {
      if (element && element.textContent !== originalText) {
        element.textContent = originalText;
      }
    });
  };

  const handleLanguageSelect = async (language: Language) => {
    setCurrentLang(language);
    setIsOpen(false);
    localStorage.setItem('selectedLanguage', language.code);
    await translatePage(language.code);
  };

  return (
    <div id="language-switcher" ref={dropdownRef} style={styles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.trigger}
        aria-label="Select language"
        disabled={isTranslating}
      >
        <span style={styles.flag}>{currentLang.flag}</span>
        <span style={styles.code}>{currentLang.name}</span>
        <svg
          style={{
            ...styles.arrow,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {isOpen && (
        <div style={styles.dropdown}>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language)}
              style={{
                ...styles.option,
                backgroundColor: currentLang.code === language.code ? '#D4A017' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (currentLang.code !== language.code) {
                  e.currentTarget.style.backgroundColor = '#D4A017';
                }
              }}
              onMouseLeave={(e) => {
                if (currentLang.code !== language.code) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={styles.flag}>{language.flag}</span>
              <span style={styles.optionText}>{language.name}</span>
            </button>
          ))}
        </div>
      )}

      {isTranslating && (
        <div style={styles.loadingOverlay}>
          <div style={styles.spinner}></div>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    display: 'inline-block',
    zIndex: 9999,
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    background: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(192, 192, 192, 0.3)',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  flag: {
    fontSize: '18px',
    lineHeight: '1',
  },
  code: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  arrow: {
    transition: 'transform 0.3s ease',
    color: '#fff',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: '0',
    minWidth: '120px',
    background: '#111',
    border: '1px solid rgba(192, 192, 192, 0.3)',
    borderRadius: '6px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
    animation: 'fadeIn 0.2s ease',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '10px 14px',
    background: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s ease',
    outline: 'none',
  },
  optionText: {
    fontSize: '14px',
    fontWeight: '500',
  },
  loadingOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid #D4A017',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  #language-switcher button:hover {
    border-color: rgba(212, 160, 23, 0.5) !important;
  }
`;

if (!document.head.querySelector('#language-switcher-styles')) {
  styleSheet.id = 'language-switcher-styles';
  document.head.appendChild(styleSheet);
}

export default LanguageSwitcher;
