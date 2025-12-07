import React from 'react';
import { motion } from 'framer-motion';
import { FileResult } from '../types';

interface ResultsListProps {
    results: FileResult[];
    selectedIndex: number;
    onSelect: (index: number) => void;
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '—';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
};

const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
};

const getFileIcon = (type: FileResult['type']): string => {
    const icons: Record<FileResult['type'], string> = {
        folder: '📁',
        code: '💻',
        document: '📄',
        image: '🖼️',
        video: '🎬',
        audio: '🎵',
        archive: '📦',
        other: '📎',
    };
    return icons[type];
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.04,
        },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 25,
        },
    },
};

const ResultsList: React.FC<ResultsListProps> = ({ results, selectedIndex, onSelect }) => {
    return (
        <>
            <div className="results-header">
                <span className="results-count">{results.length} results</span>
                <button className="results-sort">
                    <span>📅</span>
                    <span>Modified</span>
                    <span>↓</span>
                </button>
            </div>
            <motion.div
                className="results-list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {results.map((result, index) => (
                    <motion.div
                        key={result.id}
                        className={`result-item ${index === selectedIndex ? 'selected' : ''}`}
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.15 }
                        }}
                        onClick={() => onSelect(index)}
                        layout
                    >
                        <div className={`result-icon type-${result.type}`}>
                            {getFileIcon(result.type)}
                        </div>
                        <div className="result-content">
                            <div className="result-name">
                                <h3>{result.name}</h3>
                                {result.extension && (
                                    <span className="result-badge">.{result.extension}</span>
                                )}
                            </div>
                            <div className="result-path">{result.path}</div>
                            <div className="result-meta">
                                <span>
                                    <span>📊</span>
                                    {formatFileSize(result.size)}
                                </span>
                                <span>
                                    <span>🕐</span>
                                    {formatDate(result.modified)}
                                </span>
                            </div>
                        </div>
                        <div className="result-actions">
                            <motion.button
                                className="result-action-btn"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="Open file"
                            >
                                ↗️
                            </motion.button>
                            <motion.button
                                className="result-action-btn"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="Show in folder"
                            >
                                📂
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
};

export default ResultsList;
