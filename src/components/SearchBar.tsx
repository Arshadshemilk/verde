import React from 'react';
import { motion } from 'framer-motion';

interface SearchBarProps {
    query: string;
    onChange: (value: string) => void;
    isSearching: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onChange, isSearching }) => {
    return (
        <div className="search-wrapper">
            <motion.div
                className="search-container"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
                <motion.div
                    className="search-icon"
                    animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 1, repeat: isSearching ? Infinity : 0, ease: 'linear' }}
                >
                    {isSearching ? '⟳' : '🔍'}
                </motion.div>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search files... try 'docker compose with postgres' or 'PDF about DINOv3'"
                    value={query}
                    onChange={(e) => onChange(e.target.value)}
                    autoFocus
                />
                <div className="search-shortcut">
                    <kbd>Ctrl</kbd>
                    <span>+</span>
                    <kbd>Space</kbd>
                </div>
            </motion.div>
        </div>
    );
};

export default SearchBar;
