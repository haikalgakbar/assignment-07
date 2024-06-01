export const bookService = {
  getBooks: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/books`
    );

    if (!response.ok) throw new Error("Network error.");

    return response.json();
  },
  getBook: async (id: string) => {
    console.log("getBook called");
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/books/${id}`
    );

    if (!response.ok) throw new Error("Network error.");

    return response.json();
  },
  borrowBook: async (id: string, curentQty: number) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/books/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qty: curentQty - 1 }),
      }
    );

    if (!response.ok) throw new Error("Network error.");
  },
};
