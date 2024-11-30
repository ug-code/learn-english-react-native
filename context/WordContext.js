import React, { createContext, useState, useMemo } from 'react';

export const WordContext = createContext();

export const WordProvider = ({ children }) => {
    const [words, setWords] = useState([]);

    const addWord = (newWord) => {
        setWords((prevWords) => [...prevWords, newWord]);
    };

    const toggleLearned = (index) => {
        setWords((prevWords) =>
            prevWords.map((word, i) =>
                i === index ? { ...word, learned: !word?.learned } : word
            )
        );
    };

    // `value` prop'unu `useMemo` ile optimize et
    const value = useMemo(
        () => ({ words, addWord, toggleLearned }),
        [words] // Sadece `words` değiştiğinde referans değişir
    );

    return (
        <WordContext.Provider value={value}>{children}</WordContext.Provider>
    );
};
