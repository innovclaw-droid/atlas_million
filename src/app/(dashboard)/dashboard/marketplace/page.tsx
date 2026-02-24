import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Store, Search, Star, Download, Zap } from "lucide-react";

const categories = [
  "All",
  "Listings",
  "Lead Gen",
  "Email",
  "Social Media",
  "Market Analysis",
  "Client Scripts",
];

const promptPacks = [
  {
    id: "1",
    title: "Luxury Listing Description Pack",
    category: "Listings",
    prompts: 15,
    price: 2900,
    rating: 4.9,
    reviews: 47,
    description: "15 premium prompts for high-end property descriptions that sell.",
    popular: true,
  },
  {
    id: "2",
    title: "Lead Gen Email Sequence",
    category: "Lead Gen",
    prompts: 10,
    price: 1900,
    rating: 4.8,
    reviews: 32,
    description: "10-email drip sequence for nurturing buyer and seller leads.",
    popular: true,
  },
  {
    id: "3",
    title: "Social Media Content Calendar",
    category: "Social Media",
    prompts: 30,
    price: 3900,
    rating: 4.7,
    reviews: 28,
    description: "30 days of real estate social media posts, stories, and reel scripts.",
    popular: false,
  },
  {
    id: "4",
    title: "Open House Follow-Up Scripts",
    category: "Client Scripts",
    prompts: 8,
    price: 1500,
    rating: 4.9,
    reviews: 55,
    description: "8 proven follow-up scripts for converting open house visitors to clients.",
    popular: false,
  },
  {
    id: "5",
    title: "CMA Report Generator",
    category: "Market Analysis",
    prompts: 5,
    price: 2400,
    rating: 4.6,
    reviews: 19,
    description: "AI prompts that generate client-ready comparative market analysis reports.",
    popular: false,
  },
  {
    id: "6",
    title: "Starter Pack (FREE)",
    category: "All",
    prompts: 5,
    price: 0,
    rating: 4.8,
    reviews: 124,
    description: "5 essential prompts to get started: listing, email, social, bio, and market report.",
    popular: true,
  },
];

function formatPrice(cents: number) {
  if (cents === 0) return "Free";
  return `$${(cents / 100).toFixed(0)}`;
}

export default async function MarketplacePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Prompt Marketplace</h1>
          <p className="text-gray-600">
            Ready-to-use AI prompts designed specifically for real estate agents.
          </p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search prompts..."
            className="pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 w-64"
          />
        </div>
      </div>

      {/* Subscription banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">
              Get unlimited access to all prompts
            </h2>
            <p className="text-blue-100 text-sm">
              Subscribe for $29/mo and unlock the entire library — new packs added monthly.
            </p>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shrink-0">
            Subscribe — $29/mo
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap bg-white border border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600 transition"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prompt Packs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promptPacks.map((pack) => (
          <div
            key={pack.id}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-blue-200 hover:shadow-md transition group cursor-pointer"
          >
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
              <Store className="w-12 h-12 text-blue-600/30" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                  {pack.category}
                </span>
                {pack.popular && (
                  <span className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Popular
                  </span>
                )}
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-blue-600 transition">
                {pack.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{pack.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-medium">{pack.rating}</span>
                  </div>
                  <span className="text-gray-400">({pack.reviews})</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{pack.prompts} prompts</span>
                </div>
                <span
                  className={`font-bold ${
                    pack.price === 0 ? "text-green-600" : "text-gray-900"
                  }`}
                >
                  {formatPrice(pack.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
