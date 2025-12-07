import React from 'react';
import { motion } from 'framer-motion';
import { FilterType } from '../types';

interface QuickFiltersProps {
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

const filters: { type: FilterType; label: string; icon: string }[] = [
    { type: 'all', label: 'All', icon: '✨' },
    { type: 'code', label: 'Code', icon: '💻' },
    { type: 'document', label: 'Docs', icon: '📄' },
    { type: 'folder', label: 'Folders', icon: '📁' },
    { type: 'image', label: 'Images', icon: '🖼️' },
    { type: 'video', label: 'Videos', icon: '🎬' },
    { type: 'audio', label: 'Audio', icon: '🎵' },
    { type: 'archive', label: 'Archives', icon: '📦' },
];

const QuickFilters: React.FC<QuickFiltersProps> = ({ activeFilter, onFilterChange }) => {
    return (
        <motion.div
            className="quick-filters"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
        >
            {filters.map((filter, index) => (
                <motion.button
                    key={filter.type}
                    className={`filter-chip ${activeFilter === filter.type ? 'active' : ''}`}
                    onClick={() => onFilterChange(filter.type)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.03, type: 'spring', stiffness: 500 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span>{filter.icon}</span>
                    <span>{filter.label}</span>
                </motion.button>
            ))}
        </motion.div>
    );
};

export default QuickFilters;
