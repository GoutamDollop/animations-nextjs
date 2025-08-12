import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterEffectProps {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
  cursor?: boolean;
  cursorClassName?: string;
}

export default function TypewriterEffect({
  words,
  className = '',
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
  loop = true,
  cursor = true,
  cursorClassName = ''
}: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[currentWordIndex];
    
    if (isWaiting) {
      const waitTimer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayBetweenWords);
      return () => clearTimeout(waitTimer);
    }

    if (!isDeleting && currentText === currentWord) {
      if (loop || currentWordIndex < words.length - 1) {
        setIsWaiting(true);
      }
      return;
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, isDeleting, isWaiting, words, typeSpeed, deleteSpeed, delayBetweenWords, loop]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <motion.span
        key={currentText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="inline-block"
      >
        {currentText}
      </motion.span>
      
      {cursor && (
        <motion.span
          className={`inline-block w-0.5 h-[1em] bg-current ml-1 ${cursorClassName}`}
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
}

// Advanced Typewriter with Character-by-Character Animation
interface AdvancedTypewriterProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  showCursor?: boolean;
}

export function AdvancedTypewriter({
  text,
  className = '',
  delay = 0,
  speed = 0.05,
  showCursor = true
}: AdvancedTypewriterProps) {
  const letters = text.split('');

  return (
    <div className={`inline-flex ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + index * speed,
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
      
      {showCursor && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-current ml-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            delay: delay + letters.length * speed,
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
}

// Typewriter with Highlight Effect
interface TypewriterHighlightProps {
  words: { text: string; highlight?: boolean }[];
  className?: string;
  speed?: number;
}

export function TypewriterHighlight({
  words,
  className = '',
  speed = 0.08
}: TypewriterHighlightProps) {
  return (
    <div className={className}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className={`inline-block mr-2 ${
            word.highlight 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold' 
              : ''
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: wordIndex * speed,
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {word.text.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: wordIndex * speed + letterIndex * 0.02,
                duration: 0.3
              }}
              className="inline-block"
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </div>
  );
}
