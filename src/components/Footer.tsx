import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
    indexedFiles: number;
}

const Footer: React.FC<FooterProps> = ({ indexedFiles }) => {
    const formatNumber = (num: number): string => {
        return num.toLocaleString();
    };

    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
        >
            <div className="footer-left">
                <div className="footer-item">
                    <motion.div
                        className="footer-dot"
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span>Ready</span>
                </div>
                <div className="footer-item">
                    <span>📁</span>
                    <span>{formatNumber(indexedFiles)} files indexed</span>
                </div>
                <div className="footer-item">
                    <span>🤖</span>
                    <span>Local AI: Ollama</span>
                </div>
            </div>

            <div className="footer-right">
                <div className="shortcuts-hint">
                    <div className="shortcut">
                        <kbd>↑↓</kbd>
                        <span>Navigate</span>
                    </div>
                    <div className="shortcut">
                        <kbd>Enter</kbd>
                        <span>Open</span>
                    </div>
                    <div className="shortcut">
                        <kbd>Esc</kbd>
                        <span>Clear</span>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
