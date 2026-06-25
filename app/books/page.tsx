"use client";

import * as React from "react";
import { DUMMY_BOOKS } from "@/lib/dummy-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Search, Book, User, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredBooks = DUMMY_BOOKS.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl"
          >
            Explore Library Catalog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
          >
            Search and discover your next favorite book from our curated
            collection.
          </motion.p>
        </div>

        {/* Search Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative max-w-lg mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
            <Input
              type="text"
              placeholder="Search by title, author, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-12 w-full text-base bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </motion.div>

        {/* Grid of Books */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="h-full flex flex-col justify-between bg-white dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden group">
                  <CardHeader className="space-y-3 pb-4">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                        {book.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-medium text-sm">
                        <User className="h-3.5 w-3.5" />
                        <span>{book.author}</span>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-4">
                      {book.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-4 pb-6 flex gap-3 border-t border-zinc-100 dark:border-zinc-800/50 mt-auto px-6">
                    <Button className="flex-1 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-xl py-5 font-semibold text-sm">
                      Borrow Now
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl py-5 font-semibold text-sm"
                    >
                      Summary
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 space-y-4"
          >
            <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 dark:text-zinc-600 mx-auto">
              <Book className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                No books found
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs mx-auto">
                We couldn't find any books matching "{searchQuery}". Try
                refining your search term.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
