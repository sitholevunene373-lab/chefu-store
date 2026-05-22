'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';

const categories = [
  { id: 'productivity', name: 'Productivity', emoji: '💼' },
  { id: 'development', name: 'Development', emoji: '💻' },
  { id: 'games', name: 'Games', emoji: '🎮' },
  { id: 'utilities', name: 'Utilities', emoji: '🔧' },
  { id: 'creative', name: 'Creative', emoji: '🎨' },
  { id: 'communication', name: 'Communication', emoji: '💬' },
];

export function CategoryGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/browse?category=${category.id}`}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Card className="cursor-pointer hover:bg-accent hover:border-primary/30 transition-all duration-200">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <div className="text-3xl">{category.emoji}</div>
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
