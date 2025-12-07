import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
    return (
        <motion.header
            className="header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            <div className="logo">
                <motion.div
                    className="logo-icon"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    🌿
                </motion.div>
                <span className="logo-text">Verde</span>
            </div>

            <div className="header-actions">
                <motion.button
                    className="header-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Refresh index"
                >
                    🔄
                </motion.button>
                <motion.button
                    className="header-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Settings"
                >
                    ⚙️
                </motion.button>
                <motion.button
                    className="header-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="AI Settings"
                >
                    🤖
                </motion.button>
            </div>
        </motion.header>
    );
};

export default Header;
