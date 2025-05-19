import { getProductBySlug } from "@/actions/product.actions";
import Button from "@/components/button/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaPinterest, FaTwitter } from "react-icons/fa6";
import { FiMinus, FiPlus } from "react-icons/fi";

interface ProductDetailPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ProductDetailPage = async ({
  params,
  searchParams,
}: ProductDetailPageProps) => {
  const origin = (await searchParams)?.origin ?? "/";

  const slug = (await params).slug;
  const product = await getProductBySlug(slug);

  return (
    <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center justify-center">
      {/* Product Image */}
      <div className="flex flex-col items-center justify-center">
        <Image
          src={
            product.imageUrl ? product.imageUrl : "https://placehold.co/400/png"
          }
          alt="Pulsera con Qr"
          width={400}
          height={400}
          priority
          style={{ objectFit: "cover" }}
        />
        <div className="flex justify-center space-x-4 mt-4">
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <FaFacebook className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <FaTwitter className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <FaPinterest className="h-5 w-5" />
          </button>
        </div>
        <Button
          href={origin[0]}
          title="volver"
          variant="primary"
          size="md"
          className="w-full"
          type="button"
        />
      </div>

      {/* Product Details */}
      <div>
        <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
        <div className="flex items-baseline mb-4">
          {product.isOnSale && product.discount ? (
            <>
              <span className="text-xl font-medium mr-2">
                ${product.price * (1 - product.discount / 100)}
              </span>
              <span className="text-gray-500 line-through text-sm">
                ${product.price}
              </span>
            </>
          ) : (
            <span className="text-xl font-medium">${product.price}</span>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <button className="border rounded-md p-2">
              <FiMinus className="h-4 w-4" />
            </button>
            <input
              type="text"
              value="1"
              className="w-12 text-center mx-2 border-0"
              readOnly
            />
            <button className="border rounded-md p-2">
              <FiPlus className="h-4 w-4" />
            </button>
          </div>

          <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded">
            Agregar al carrito
          </button>
          <p className="text-sm mt-2">
            <Link href="/carrito" className="text-gray-600 hover:underline">
              Ver carrito
            </Link>
          </p>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-sm font-medium mb-4">Medios de envío</h3>
          <div className="flex mb-2">
            <input
              type="text"
              placeholder="Tu código postal"
              className="flex-1 border rounded-l-md px-3 py-2 text-sm"
            />
            <button className="bg-white border border-l-0 rounded-r-md px-4 py-2 text-sm">
              Calcular
            </button>
          </div>
          <button className="text-sm text-gray-600 hover:underline">
            No sé mi código postal
          </button>
        </div>

        <div className="border-t pt-6 mt-6">
          <h3 className="text-sm font-medium mb-2">Pulsera con Qr</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
