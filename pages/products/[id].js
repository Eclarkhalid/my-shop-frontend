import { CartContext } from "@/lib/CartContext";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import toast from "react-hot-toast";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext)
  if (product) {
    return (
      <section className="mt-20 md:mt-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image section */}
          <div className="lg:aspect-h-2 lg:aspect-w-2 lg:rounded-lg overflow-hidden px-4 md:px-2">
            <img
              src={product.images[0]}
              alt={product.images[0]}
              className="w-full h-full md:h-[90vh] object-cover object-center border border-primary rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid lg:grid-cols-1 lg:gap-y-4 px-2 gap-2 md:gap-0 md:px-2">
            {product.images.slice(1, 3).map((image, index) => (
              <div
                key={index}
                className="lg:aspect-h-2 lg:aspect-w-3 lg:overflow-hidden lg:rounded-lg "
              >
                <img
                  src={image}
                  alt={image}
                  className="w-full h-full md:h-[44vh] object-cover object-center border rounded-lg border-secondary p-4"
                />
              </div>
            ))}
          </div>

          {/* Product info */}
          <div className="p-4 lg:p-8 border">
            <h1 className="text-3xl font-semibold text-gray-900">{product.title}</h1>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Description</h2>
              <p className="mt-2 text-gray-700">{product.description}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Details</h2>
              <p className="mt-2 text-gray-700 list-disc list-inside">
                {product?.details}
              </p>
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 my-3">
              <div>
                <label className="text-text font-semibold">Brand</label>
                <p className="mt-2 text-accent list-disc list-inside">
                  {product?.brand}
                </p>
              </div>

              <div>
                <label className="text-text font-semibold">Gender</label>
                <p className="mt-2 text-accent list-disc list-inside">
                  {product?.gender}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 my-3">
              <div>
                <label className="text-text font-semibold">Sizes</label>
                <p className="mt-2 text-accent list-disc list-inside">
                  {product?.sizes}
                </p>
              </div>

              <div>
                <label className="text-text font-semibold">Colors</label>
                <p className="mt-2 text-accent list-disc list-inside">
                  {product?.colors}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Price</h2>
              <p className="mt-2 text-primary font-semibold text-lg">
                Ksh {formatPrice(product.price)}
              </p>
            </div>
            <div className="w-full">
              <button
                className="bg-primary text-white py-2 px-4 mt-4 rounded-md hover:bg-primary-dark w-full"
                onClick={() => {addProduct(product._id);
                  toast.success('Item added to cart!!')}}
              >
                Add to Cart
              </button>
            </div>




          </div>
        </div>
      </section>
    );
  }

  return <p>Product not found.</p>;
}


export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
