import { CartProduct } from "@/store/cart--store";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "@/actions/product.actions";

export default async function Home() {
  const products: CartProduct[] = await getAllProducts();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full  py-2">
      <h1 className="text-3xl mb-10">Next with Zustand</h1>

      <div className="flex flex-wrap gap-5">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
