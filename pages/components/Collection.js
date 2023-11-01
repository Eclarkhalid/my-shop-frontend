import Link from "next/link";
// Utility function to format price with a comma for thousands
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Collection({ product }) {
  if(product) {
    return <>
    <section>
      <div class="max-w-screen-2xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header class="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            New Collection
          </h2>

          <p className="max-w-lg mx-auto mt-4 text-gray-500">
            Explore our latest arrivals and elevate your style with our exclusive new collection. 
          </p>

        </header>

        <div>
          <div className="max-w-screen-2xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
              <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
                <div className="max-w-md mx-auto text-center lg:text-left">
                  <header>
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">{product.title}</h2>

                    <p className="mt-4 text-gray-500">
                      {product.description}
                    </p>
                    <p className="mt-1 text-lg text-primary">ksh. {formatPrice(product.price)}</p>
                  </header>

                  <Link
                    href="/products"
                    className="inline-block px-12 py-3 mt-8 text-md font-medium text-text transition  border border-accent rounded hover:text-primary duration-75 hover:border-primary focus:outline-none focus:ring"
                  >
                    Shop All
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-2 lg:py-8">
                <ul className="grid grid-cols-2 gap-4">
                  <li>
                    <div className="block group">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="object-cover w-full rounded aspect-square"
                      />
                    </div>
                  </li>

                  <li>
                    <div  className="block group">
                      <img
                        src={product.images[1]}
                        alt=""
                        className="object-cover w-full rounded aspect-square"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  }
  return null;
}