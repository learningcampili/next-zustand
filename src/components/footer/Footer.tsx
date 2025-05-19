import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="  flex bg-gray-900 text-blue-300   py-8 gap-10 justify-center g items-center text-xs ">
      <Link href="/" className="mx-5 hover:text-white">
        <span className={`antialiased font-bold`}>Next-Zustand </span>
        <span>
          &#169; Todos los derechos reservados ​{new Date().getFullYear()}
        </span>
      </Link>
      {/* <Link href="/" className="mx-5 hover:text-white">
        Privacidad & legal
      </Link>
      <Link href="/" className="mx-5  hover:text-white">
        Ubicaciones
      </Link> */}
    </div>
  );
};
