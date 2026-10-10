
import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-slate-100 text-slate-800">

    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 hidden w-64 bg-slate-900 text-white lg:block">
      <div class="flex h-full flex-col">

        <div class="border-b border-slate-700 px-6 py-6">
          <h1 class="text-2xl font-bold">RegionalBox</h1>
          <p class="mt-1 text-sm text-slate-400">Subscription Dashboard</p>
        </div>

        <nav class="flex-1 px-4 py-6">
          <a href="#" class="mb-2 flex items-center rounded-lg bg-slate-700 px-4 py-3 text-sm font-medium">
            Dashboard
          </a>

          <a href="#" class="mb-2 flex items-center rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800">
            Products
          </a>

          <a href="#" class="mb-2 flex items-center rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800">
            Categories
          </a>

          <a href="#" class="mb-2 flex items-center rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800">
            Analytics
          </a>
        </nav>

        <div class="border-t border-slate-700 px-6 py-5">
          <p class="text-xs text-slate-400">RegionalBox Admin</p>
          <p class="mt-1 text-sm font-medium">Dashboard Manager</p>
        </div>

      </div>
    </aside>


    <!-- Main Content -->
    <main class="lg:ml-64">
    <div class="bg-slate-900 px-5 py-4 text-white lg:hidden">
  <h1 class="text-xl font-bold">RegionalBox</h1>
  <p class="text-sm text-slate-300">Subscription Dashboard</p>
</div>

      <!-- Header -->
      <header class="border-b border-slate-200 bg-white px-5 py-5 shadow-sm sm:px-8">
        <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p class="text-sm font-medium text-slate-500">Overview</p>
            <h2 class="text-2xl font-bold text-slate-900">
              Subscription Box Dashboard
            </h2>
          </div>

          <div class="rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-600">
            Live Data
          </div>
        </div>
      </header>


      <!-- Dashboard Content -->
      <section class="p-5 sm:p-8">

        <!-- Intro -->
        <div class="mb-7">
          <h3 class="text-xl font-semibold text-slate-900">
            Product Overview
          </h3>

          <p class="mt-1 text-sm text-slate-500">
            Monitor products and inventory data from the connected REST API.
          </p>
        </div>


        <!-- Summary Cards -->
        <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-slate-500">Total Products</p>
            <p id="totalProducts" class="mt-2 text-3xl font-bold text-slate-900">0</p>
            <p class="mt-2 text-xs text-slate-400">API product records</p>
          </div>

          <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-slate-500">Average Price</p>
            <p id="averagePrice" class="mt-2 text-3xl font-bold text-slate-900">$0.00</p>
            <p class="mt-2 text-xs text-slate-400">Across displayed products</p>
          </div>

          <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-slate-500">In Stock</p>
            <p id="inStock" class="mt-2 text-3xl font-bold text-slate-900">0</p>
            <p class="mt-2 text-xs text-slate-400">Currently available</p>
          </div>

          <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-slate-500">Average Rating</p>
            <p id="averageRating" class="mt-2 text-3xl font-bold text-slate-900">0.0</p>
            <p class="mt-2 text-xs text-slate-400">Customer rating</p>
          </div>

        </div>


        <!-- Search and Filter -->
        <div class="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h3 class="font-semibold text-slate-900">Product Data</h3>
              <p class="text-sm text-slate-500">
                Search and filter available products.
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row">

              <input
                id="searchInput"
                type="text"
                placeholder="Search products..."
                class="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />

             <select
  id="categoryFilter"
  class="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
>
  <option value="all">All Categories</option>
</select>

            </div>

          </div>


          <!-- Product Table -->
          <div class="mt-6 overflow-x-auto">

            <table class="w-full min-w-[700px] text-left text-sm">

              <thead class="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th class="px-4 py-3 font-semibold">Product</th>
                  <th class="px-4 py-3 font-semibold">Category</th>
                  <th class="px-4 py-3 font-semibold">Price</th>
                  <th class="px-4 py-3 font-semibold">Stock</th>
                  <th class="px-4 py-3 font-semibold">Rating</th>
                </tr>
              </thead>

              <tbody id="productTableBody" class="divide-y divide-slate-100">
              <tr>
              <td colspan="5" class="px-4 py-10 text-center text-slate-500">
               Loading products...
               </td>
              </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>

    </main>

  </div>
`
let products = []

async function fetchProducts() {
  const tableBody = document.querySelector('#productTableBody')

  tableBody.innerHTML = `
    <tr>
      <td colspan="5" class="px-4 py-10 text-center text-slate-500">
        Loading products...
      </td>
    </tr>
  `

  try {
    //const response = await fetch('https://dummyjson.com/invalid-products-endpoint')
    const response = await fetch('https://dummyjson.com/products')

    if (!response.ok) {
      throw new Error('Failed to fetch product data.')
    }

    const data = await response.json()

    if (!Array.isArray(data.products)) {
      throw new Error('Product data is unavailable.')
    }

    products = data.products

const categories = [
  ...new Set(
    products
      .map(product => product.category)
      .filter(Boolean)
  )
].sort()

categoryFilter.innerHTML = `
  <option value="all">All Categories</option>
  ${categories.map(category => `
    <option value="${category}">${category}</option>
  `).join('')}
`

applyFilters()

  } catch (error) {
    console.error('API Error:', error)

    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="px-4 py-10 text-center">
          <p class="font-semibold text-red-600">
            Unable to load products.
          </p>

          <p class="mt-2 text-sm text-slate-500">
            Please check your internet connection and try again.
          </p>

          <button
            id="retryButton"
            class="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Retry
          </button>
        </td>
      </tr>
    `

    document.querySelector('#retryButton').addEventListener('click', fetchProducts)
  }
}

function renderProducts(productList) {
  const tableBody = document.querySelector('#productTableBody')

  if (productList.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="px-4 py-10 text-center text-slate-500">
          No products found. Try a different search or category.
        </td>
      </tr>
    `
    return
  }

  tableBody.innerHTML = productList.map(product => `
    <tr class="hover:bg-slate-50">

      <td class="px-4 py-4 font-medium text-slate-900">
        ${product.title}
      </td>

      <td class="px-4 py-4 text-slate-500">
        ${product.category}
      </td>

      <td class="px-4 py-4 text-slate-700">
        $${Number(product.price).toFixed(2)}
      </td>

      <td class="px-4 py-4 text-slate-700">
        ${product.stock ?? 'N/A'}
      </td>

      <td class="px-4 py-4 text-slate-700">
        ${Number.isFinite(product.rating) ? product.rating : 'N/A'}
      </td>

    </tr>
  `).join('')
}
function updateStatistics(productList) {
  const totalElement = document.querySelector('#totalProducts')
  const priceElement = document.querySelector('#averagePrice')
  const stockElement = document.querySelector('#inStock')
  const ratingElement = document.querySelector('#averageRating')

  totalElement.textContent = productList.length

  const averagePrice = productList.length
    ? productList.reduce((sum, product) => sum + (Number(product.price) || 0), 0) / productList.length
    : 0

  const inStock = productList.filter(
    product => Number(product.stock) > 0
  ).length

  const ratedProducts = productList.filter(
    product => Number.isFinite(product.rating)
  )

  const averageRating = ratedProducts.length
    ? ratedProducts.reduce((sum, product) => sum + product.rating, 0) / ratedProducts.length
    : 0

  priceElement.textContent = `$${averagePrice.toFixed(2)}`
  stockElement.textContent = inStock
  ratingElement.textContent = averageRating.toFixed(1)
}
const searchInput = document.querySelector('#searchInput')
const categoryFilter = document.querySelector('#categoryFilter')

searchInput.addEventListener('input', applyFilters)
categoryFilter.addEventListener('change', applyFilters)

function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase()
  const selectedCategory = categoryFilter.value

  const filteredProducts = products.filter(product => {
    const title = (product.title || '').toLowerCase()
    const category = (product.category || '').toLowerCase()
    const brand = (product.brand || '').toLowerCase()

    const matchesSearch =
      title.includes(searchTerm) ||
      category.includes(searchTerm) ||
      brand.includes(searchTerm)

    const matchesCategory =
      selectedCategory === 'all' ||
      category === selectedCategory

    return matchesSearch && matchesCategory
  })
  updateStatistics(filteredProducts)
  renderProducts(filteredProducts)
}

fetchProducts()