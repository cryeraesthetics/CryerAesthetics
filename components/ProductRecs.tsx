import type { ProductRec } from "@/data/skinTypes";

export default function ProductRecs({ products }: { products: ProductRec[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {products.map((product) => (
        <div
          key={product.category}
          className="rounded-xl border border-sand-200 bg-cream-50 p-5"
        >
          <h3 className="font-semibold text-cocoa-800">{product.category}</h3>
          <p className="mt-1 text-sm text-cocoa-600">
            Look for: {product.lookFor}
          </p>
          <a
            href="https://greenenvee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-sage-600 hover:underline"
          >
            Shop on GreenEnvee →
          </a>
        </div>
      ))}
    </div>
  );
}
