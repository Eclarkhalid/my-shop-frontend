import { useContext, useEffect, useState } from "react"
import { CartContext } from "../components/CartContext"
import axios from "axios";
import Link from "next/link";

export default function Cart() {
  const { cartProducts, removeProduct, addProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          setProducts(response.data);
        })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

  let subTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    subTotal = total + total / 1000;
  }

  function increaseProduct(id) {
    addProduct(id);
  }

  function decreaseProduct(id) {
    removeProduct(id);
  }
  function deleteCart(id) {
    clearCart();
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return <>

    <section className="flex justify-between max-md:flex-col items-center">
      <div className=" w-2/3  px-4 py-8 sm:px-6 sm:py-12">
        <div className=" ">
          <header className="text-center flex justify-between w-full">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
          </header>

          {!products?.length ? (
            <p className="my-6 text-center ">Your cart is empty</p>
          ) : (
            <>
              {products?.length > 0 && products.map(product => (
                <div key={product._id} className="mt-8">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4 justify-between">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="h-16 w-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-md text-gray-900">{product.title}</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-text">
                          <p>ksh .{cartProducts.filter(id => id === product._id).length * product.price}</p>
                        </dl>
                      </div>

                      <div>
                        <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border "
                            onClick={() => decreaseProduct(product._id)}
                          >
                            -
                          </button>

                          <input
                            type="number"
                            id="Quantity"
                            value={cartProducts.filter(id => id === product._id).length}
                            className="h-10 w-16 rounded border border-secondary text-primary font-bold text-center [-moz-appearance:_textfield] sm:text-md [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"


                          />

                          <button
                            type="button"
                            className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border"
                            onClick={() => increaseProduct(product._id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>


                </div>
              ))

              }

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-md text-gray-700">
                    <div className="flex justify-end text-red-400 border-b mb-3">
                      <button onClick={deleteCart}>Clear Cart</button>

                    </div>
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>Ksh. {formatPrice(total)}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>VAT</dt>
                      <dd>ksh. {formatPrice(total / 1000)}</dd>
                    </div>

                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>Ksh. {formatPrice(subTotal)}</dd>

                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <Link
                      href="#"
                      className="block rounded bg-gray-700 px-5 py-3 text-md text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        {/* 
        <div class="mx-auto px-6 max-w-2xl">
          <form action="" class="space-y-5">
            <div class="grid grid-cols-12 gap-5">
              <div class="col-span-6">
                <label for="example7" class="mb-1 block text-md font-medium text-gray-700">Email</label>
                <input type="email" id="example7" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="you@email.com" />
              </div>
              <div class="col-span-6">
                <label for="example8" class="mb-1 block text-md font-medium text-gray-700">Password</label>
                <input type="password" id="example8" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="you@email.com" />
              </div>
              <div class="col-span-12">
                <label for="example9" class="mb-1 block text-md font-medium text-gray-700">Address</label>
                <input type="text" id="example9" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="1864 Main Street" />
              </div>
              <div class="col-span-6">
                <label for="example10" class="mb-1 block text-md font-medium text-gray-700">City</label>
                <input type="text" id="example10" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="" />
              </div>
              <div class="col-span-4">
                <label for="example11" class="mb-1 block text-md font-medium text-gray-700">State</label>
                <select id="example11" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50">
                  <option value="">Choose</option>
                  <option value="">State01</option>
                  <option value="">State02</option>
                  <option value="">State03</option>
                </select>
              </div>
              <div class="col-span-2">
                <label for="example12" class="mb-1 block text-md font-medium text-gray-700">Zip</label>
                <input type="text" id="example12" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="" />
              </div>
              <div class="col-span-12 flex items-center space-x-2">
                <input type="checkbox" id="example13" class="h-4 w-4 rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400" />
                <label for="example13" class="text-md font-medium text-gray-700">Remember me</label>
              </div>
              <div class="col-span-12">
                <button type="button" class="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-md font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300">Submit</button>
              </div>
            </div>
          </form>
        </div> */}

      </div>
    </section>
  </>
}