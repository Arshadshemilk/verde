import React from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
    indexedFiles: number;
}

const EmptyState: React.FC<EmptyStateProps> = ({ indexedFiles }) => {
    const formatNumber = (num: number): string => {
        return num.toLocaleString();
    };

    const suggestions = [
        { query: 'docker compose postgres', icon: '🐳' },
        { query: 'PDF about machine learning', icon: '📚' },
        { query: 'files modified today', icon: '📅' },
        { query: '.env files in projects', icon: '🔐' },
    ];

    return (
        <motion.div
            className="empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="empty-state-icon"
                animate={{
                    boxShadow: [
                        '0 0 20px rgba(16, 185, 129, 0.2)',
                        '0 0 40px rgba(16, 185, 129, 0.4)',
                        '0 0 20px rgba(16, 185, 129, 0.2)',
                    ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                🌿
            </motion.div>
            <h2>Search your files with AI</h2>
            <p>
                {indexedFiles > 0
                    ? `${formatNumber(indexedFiles)} files indexed and ready to search`
                    : 'Indexing your files...'}
            </p>

            <motion.div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginTop: '32px',
                    width: '100%',
                    maxWidth: '400px',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <span
                    style={{
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                        marginBottom: '8px',
                    }}
                >
                    Try searching for:
                </span>
                {suggestions.map((suggestion, index) => (
                    <motion.button
                        key={suggestion.query}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-primary)',
                            borderRadius: '12px',
                            fontSize: '14px',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.15s ease',
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{
                            background: 'var(--bg-tertiary)',
                            borderColor: 'var(--border-secondary)',
                            color: 'var(--text-primary)',
                            x: 4,
                        }}
                    >
                        <span style={{ fontSize: '18px' }}>{suggestion.icon}</span>
                        <span>"{suggestion.query}"</span>
                    </motion.button>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default EmptyState;
