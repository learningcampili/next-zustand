import FeaturedList from "@/components/products/FeaturedList";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-2">
      <h1 className="text-3xl text-center mb-10">Next with Zustand</h1>
      <FeaturedList />
    </div>
  );
}
