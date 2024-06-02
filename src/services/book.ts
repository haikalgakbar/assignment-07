import Cookies from "js-cookie";

export const bookService = {
  getBooks: async (q: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/books${q}`
    );

    if (!response.ok) throw new Error("Network error.");

    return response.json();
  },
  getBook: async (id: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/books/${id}`
    );

    if (!response.ok) throw new Error("Network error.");

    return response.json();
  },
  getBorrowedBooks: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/books/borrowed`
    );

    return await response.json();
  },
  borrowBook: async (bookId: string, userId: string) => {
    return await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/books/${bookId}/borrow`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          borrower: userId,
          book: bookId,
          token: Cookies.get("token"),
        }),
      }
    );
  },
  returnBook: async (bookId: string, userId: string) => {
    return await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/books/${bookId}/return`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          borrower: userId,
          book: bookId,
          token: Cookies.get("token"),
        }),
      }
    );
  },
};
