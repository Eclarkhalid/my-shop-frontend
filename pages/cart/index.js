import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../lib/CartContext"
import axios from "axios";
import Link from "next/link";
import Spinner from "../components/Spinner";
import { signIn, signOut, useSession } from "next-auth/react"
import Form from "../components/Form";

export default function Cart() {
  const { cartProducts, removeProduct, addProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession()

  useEffect(() => {
    setLoading(true);
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          setProducts(response.data);
          setLoading(false)
        })
    } else {
      setProducts([]);
      setLoading(false)
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

  if (session) {
    return <>

      <section className="flex justify-between max-md:flex-col items-center md:space-x-6 ">
        <div className=" md:w-2/3  px-4">
          <div className=" pl-4 mt-16 md:mt-6 ">
            <header className="text-center flex justify-between w-full">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
            </header>
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <Spinner />
              </div>
            ) :
              !products?.length ? (
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
                            <h3 className="text-md text-text max-w-md">{product.title}</h3>

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
                    <div className=" max-w-md space-y-4">
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
                          class="group flex items-center justify-between gap-4 rounded-lg border border-current px-4 py-2 text-orange-600 transition-colors hover:bg-orange-600 focus:outline-none focus:ring active:bg-orange-500"
                          href="/products"
                        >
                          <span class="font-medium transition-colors group-hover:text-white">
                            Continue shopping
                          </span>

                          <span
                            class="shrink-0 rounded-full border border-orange-600 bg-white p-2 group-active:border-orange-500"
                          >
                            <svg
                              class="h-4 w-4 rtl:rotate-180"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
        {!products.length ? (
          ''
        ) : (
          <div className="md:1/3 mt-16 md:mt-6">
            <header className="text-center flex justify-between w-full">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Shipping details</h1>
            </header>
            <Form />
          </div>
        )}

      </section>
    </>
  }

  return <>
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">

        <p className="mt-4 text-text text-2xl">You should sign Up to view cart Items</p>

        <button
          onClick={() => signIn('google')}
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-text bg-primary rounded hover:bg-primary focus:outline-none focus:ring"
        >
          Login / Register
        </button>
      </div>
    </div>
  </>
}