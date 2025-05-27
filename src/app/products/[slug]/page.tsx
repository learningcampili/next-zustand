import { getProductBySlug } from "@/actions/product-actions";
import Button from "@/components/button/Button";
import ProductDetails from "@/components/products/ProductDetails";
import Image from "next/image";
import React from "react";

interface ProductDetailPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
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
      <div className="flex flex-col items-center justify-center w-full">
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

        <Button
          href={origin}
          title="Volver"
          variant="primary"
          size="md"
          type="button"
        />
      </div>

      {/* Product Details */}
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailPage;
