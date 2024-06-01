import { z } from "zod";
import { useSetAtom } from "jotai";
import { userAtom } from "@/context/user";
import { userLoginSchema, userSignupSchema } from "@/interfaces/user";
import Cookies from "js-cookie";
import { sessionService } from "@/services/session";

export const useAuth = () => {
  const setUser = useSetAtom(userAtom);

  async function handleUserSignup(values: z.infer<typeof userSignupSchema>) {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) throw new Error("Network error.");
  }

  async function handleUserLogin(values: z.infer<typeof userLoginSchema>) {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) throw new Error("Network error.");

    const res = await response.json();
    Cookies.set("token", res.data.token);
    setUser(res.data.user);
    return res;
  }

  async function handleLogout() {
    sessionService.removeSession();
    setUser(null);
    Cookies.remove("token");
  }

  return {
    handleUserSignup,
    handleUserLogin,
    handleLogout,
  };
};

// const [user, setUser] = useAtom(userAtom);

// export const useAuth = {
//   handleUserSignup: async (values: z.infer<typeof userSignupSchema>) => {
//     const response = await fetch(
//       `${import.meta.env.VITE_BASE_API_URL}/api/v1/auth/signup`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       }
//     );

//     if (!response.ok) throw new Error("Network error.");
//   },

//   handleUserLogin: async (values: z.infer<typeof userLoginSchema>) => {
//     const response = await fetch(
//       `${import.meta.env.VITE_BASE_API_URL}/api/v1/auth/login`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       }
//     );

//     if (!response.ok) throw new Error("Network error.");

//     const data = await response.json();
//     console.log(data.user);
//     setUser(data.user);

//     return true;
//   },
// };
