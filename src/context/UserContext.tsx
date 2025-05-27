// // context/UserContext.tsx
// "use client";

// import { getUser } from "@/actions/users-actions";
// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";

// type User = {
//   id: string;
//   role: string;
// };

// type UserContextType = {
//   user: User | null;
//   refreshUser: () => Promise<void>;
//   setUser: (user: User | null) => void;
// };

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser debe usarse dentro de UserProvider");
//   }
//   return context;
// };

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [, setLoading] = useState(true);

//   const refreshUser = async () => {
//     try {
//       const res = await getUser();
//       if (res.success) {
//         setUser(res.data); // No necesitas hacer .json()
//       } else {
//         setUser(null);
//       }
//     } catch {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     refreshUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, refreshUser, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
