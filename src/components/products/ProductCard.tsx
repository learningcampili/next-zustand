"use client";
import { CartProduct } from "@/store/cart-store";
//import Button from "./button/Button";
import { BsQrCode } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: CartProduct }) => {
  //const addProductTocart = useCartStore((state) => state.addProductTocart);

  return (
    <div
      key={product.id}
      className="flex flex-col items-center justify-center w-[300px] h-[300px] py-2 border-2 border-gray-500 rounded-lg"
    >
      <Link href={`/products/${product.slug}?origin=/`}>
        {!product.imageUrl && <BsQrCode size={150} />}
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={160}
            height={160}
            style={{ objectFit: "cover" }}
            priority
          />
        )}
        <h2 className="text-center text-md font-bold mt-2">{product.name}</h2>
        {/* <Button
        size="sm"
        title="Add to cart"
        onClick={() => addProductTocart({ ...product, quantity: 1 })}
      /> */}
      </Link>
    </div>
  );
};

export default ProductCard;
