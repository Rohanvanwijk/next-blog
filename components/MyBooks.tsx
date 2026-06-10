"use client";
import Data from "../data/books.json";
import { debounce } from "../utils/string";
import { useState } from "react";

export default function MyBooks() {
  const [searchTerm, setSearchTerm] = useState<string[]>([]);
  const onInput = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input value:", event.target.value);
    if (event.target.value.trim() === "") {
      setSearchTerm([]);
      return;
    }
    setSearchTerm(
      Data.books.filter((book) =>
        book.toLowerCase().includes(event.target.value.toLowerCase()),
      ),
    );
  }, 500);
  return (
    <div className="w-full bg-gray-50 p-4 mb-4 rounded-md">
      <h1>Search books</h1>
      <input
        name="search"
        type="text"
        placeholder="Search by title or author"
        className="border p-2 mb-4 w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        onInput={onInput}
        list="books"
      />

      {searchTerm?.length > 0 ? (
        <datalist id="books">
          {Data.books.map((book, index) => (
            <option key={index} value={book} />
          ))}
        </datalist>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}
