import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './components/SearchBar';
import QuickFilters from './components/QuickFilters';
import ResultsList from './components/ResultsList';
import EmptyState from './components/EmptyState';
import Header from './components/Header';
import Footer from './components/Footer';
import { FileResult, FilterType } from './types';
import { mockResults } from './mockData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
        },
    },
};

function App() {
    const [query, setQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [results, setResults] = useState<FileResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [indexedFiles, setIndexedFiles] = useState(0);

    // Simulated file indexing progress
    useEffect(() => {
        const interval = setInterval(() => {
            setIndexedFiles((prev) => {
                if (prev >= 245892) {
                    clearInterval(interval);
                    return 245892;
                }
                return prev + Math.floor(Math.random() * 1000);
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Search logic (mock for now)
    useEffect(() => {
        if (query.length === 0) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(() => {
            let filtered = mockResults.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.path.toLowerCase().includes(query.toLowerCase())
            );

            if (activeFilter !== 'all') {
                filtered = filtered.filter((item) => item.type === activeFilter);
            }

            setResults(filtered);
            setSelectedIndex(0);
            setIsSearching(false);
        }, 150);

        return () => clearTimeout(timer);
    }, [query, activeFilter]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter' && results.length > 0) {
                e.preventDefault();
                const selected = results[selectedIndex];
                console.log('Opening file:', selected.path);
                // TODO: Implement file opening via IPC
            } else if (e.key === 'Escape') {
                setQuery('');
                setResults([]);
            }
        },
        [results, selectedIndex]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <div className="app-container">
            {/* Ambient glow effects */}
            <div className="ambient-glow top-left" />
            <div className="ambient-glow bottom-right" />

            <Header />

            <motion.main
                className="main-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="search-section" variants={itemVariants}>
                    <SearchBar
                        query={query}
                        onChange={setQuery}
                        isSearching={isSearching}
                    />
                    <QuickFilters
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                    />
                </motion.div>

                <motion.div className="results-section" variants={itemVariants}>
                    <AnimatePresence mode="wait">
                        {query.length === 0 ? (
                            <EmptyState key="empty" indexedFiles={indexedFiles} />
                        ) : results.length === 0 && !isSearching ? (
                            <motion.div
                                key="no-results"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="empty-state"
                            >
                                <div className="empty-state-icon">🔍</div>
                                <h2>No results found</h2>
                                <p>Try a different search term or adjust your filters</p>
                            </motion.div>
                        ) : (
                            <ResultsList
                                key="results"
                                results={results}
                                selectedIndex={selectedIndex}
                                onSelect={setSelectedIndex}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.main>

            <Footer indexedFiles={indexedFiles} />
        </div>
    );
}

export default App;
