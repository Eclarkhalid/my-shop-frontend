import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Form() {
  const { data: session } = useSession()
  if (session) {
    return <>

      <div class="mx-auto max-w-xl p-4 border shadow-xl h-[400px] my-10">
        <form action="" class="space-y-5">
          <div class="grid grid-cols-12 gap-5">
            <div class="col-span-6">
              <label for="example7" class="mb-1 block text-sm font-medium text-text">Email</label>
              <input type="email" id="example7" class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder={session.user.email} />
            </div>
            <div class="col-span-6">
              <label for="example8" class="mb-1 block text-sm font-medium text-text">Full Name</label>
              <input type="text" id="example8" class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder={session.user.name} />
            </div>
            <div class="col-span-12">
              <label for="example9" class="mb-1 block text-sm font-medium text-text">Address</label>
              <input type="text" id="example9" class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="1864 Main Street" />
            </div>
            <div class="col-span-6">
              <label for="example10" class="mb-1 block text-sm font-medium text-text">City</label>
              <input type="text" id="example10" class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="" />
            </div>
            <div class="col-span-4">
              <label for="example11" class="mb-1 block text-sm font-medium text-text">State</label>
              <input type="text" id="example12" class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="" />
            </div>
            <div class="col-span-2">
              <label for="example12" class="mb-1 block text-sm font-medium text-text">Zip</label>
              <input type="text" id="example12" class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="" />
            </div>
            <div class="col-span-12 text-center">
              <Link
                href="#"
                className="disabled block rounded bg-gray-700 px-5 py-3 text-md text-gray-100 transition hover:bg-gray-600"
              >
                Checkout
              </Link>
            </div>
          </div>
        </form>
      </div>

    </>
  }
}