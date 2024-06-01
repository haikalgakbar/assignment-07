import Cookies from "js-cookie";

// export const sessionService = () => {
//   async function checkSession() {
//     const response = await fetch(
//       `${import.meta.env.VITE_BASE_API_URL}/api/v1/auth/session`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           token: Cookies.get("token"),
//         }),
//       }
//     );

//     // if (!response.ok) throw new Error("Network error.");

//     const result = await response;

//     return result;
//   }

//   return {
//     checkSession,
//   };
// };

export const sessionService = {
  isValidUser: async () => {
    return await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/auth/session?type=user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: Cookies.get("token"),
        }),
      }
    );
  },
  isValidAdmin: async () => {
    return await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/auth/session?type=admin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: Cookies.get("token"),
        }),
      }
    );
  },
  removeSession: async () => {
    return await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/auth/session`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: Cookies.get("token"),
        }),
      }
    );
  },
};
