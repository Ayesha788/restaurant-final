"use client";
import React, { useState, useEffect } from "react";
import { Food } from "../../type";
import { fetchFoods } from "@/sanity.query";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { Button } from "../../components/ui/button"; // shadcn button
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons for pagination

const Ourshop = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [sortByPriceOrder, setSortByPriceOrder] = useState<string>("Ascending");
  const [viewMode, setViewMode] = useState<string>("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const getFoods = async () => {
      const data = await fetchFoods();
      setFoods(data);
      setFilteredFoods(data);
    };
    getFoods();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const filtered = foods.filter((food) => {
      const matchesCategory =
        selectedCategory.length === 0 ||
        selectedCategory.some((category) =>
          food.category.toLowerCase().includes(category.toLowerCase())
        );

      const matchesSearch = food.name
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    // Sort by price order (ascending or descending)
    if (sortByPriceOrder === "Ascending") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortByPriceOrder === "Descending") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredFoods(filtered);
  }, [selectedCategory, foods, debouncedSearchQuery, sortByPriceOrder]);

  const filterByCategory = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategory((prev) => [...prev, category]);
    } else {
      setSelectedCategory((prev) => prev.filter((item) => item !== category));
    }
  };

  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFoods = filteredFoods.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div>
        <section
          className="bg-cover bg-center h-64 flex items-center justify-center"
          style={{ backgroundImage: "url('/images/bg.png')" }}
        >
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold">Our Shop</h2>
            <p className="pt-2">
              <Link href="/" className="text-yellow-400">
                Home
              </Link>{" "}
              › Shop
            </p>
          </div>
        </section>
        <div className="container mt-16 mb-16 flex flex-col md:flex-row gap-8 mx-auto px-4">
          <div className="md:w-[984px] w-full">
            <div className="flex flex-col md:flex-row gap-3 ml-4 w-[317px]">
              <div className="flex w-[332px]">
                <label htmlFor="Sort By" className="mt-2 text-[20px] w-[81px]">
                  Sort By
                </label>
                <select
                  className="opacity-70 rounded border border-gray-400 w-[236px] text-[18px] h-12"
                  value={sortByPriceOrder}
                  onChange={(e) => setSortByPriceOrder(e.target.value)}
                >
                  <option value="Ascending">Price: Low to High</option>
                  <option value="Descending">Price: High to Low</option>
                </select>
              </div>
              <div className="flex md:w-[236px] gap-2">
                <label htmlFor="Show" className="mt-2 text-[20px] w-[64px]">
                  Show
                </label>
                <select
                  className="opacity-70 rounded border border-gray-400 md:w-[236px] text-[18px] h-12"
                  onChange={(e) => setViewMode(e.target.value)}
                >
                  <option value="grid">Grid View</option>
                  <option value="list">List View</option>
                </select>
              </div>
            </div>

            {/* Display filtered foods */}
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6"
                  : "flex flex-col gap-6 mt-6"
              }`}
            >
              {currentFoods.map((food: Food) => (
                <div
                  key={food.id}
                  className={`${
                    viewMode === "grid"
                      ? "bg-white shadow-md hover:shadow-lg transition rounded-lg overflow-hidden"
                      : "flex bg-white shadow-md hover:shadow-lg transition rounded-lg p-4"
                  }`}
                >
                  {/* Image Section */}
                  <div
                    className={`${
                      viewMode === "grid"
                        ? "w-full h-40 md:h-56 bg-gray-200 relative"
                        : "w-40 h-40 bg-gray-200 relative"
                    }`}
                  >
                    <Image
                      src={food.image_url}
                      alt={food.name}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info Section */}
                  <div
                    className={`${
                      viewMode === "grid" ? "p-4" : "flex flex-col justify-between pl-4"
                    }`}
                  >
                    <h3 className="text-lg font-semibold">{food.name}</h3>
                    <div className="flex items-center gap-2">
                      {food.originalPrice && food.originalPrice !== food.price && (
                        <p className="text-gray-500 line-through">
                          RS: {food.originalPrice}
                        </p>
                      )}
                      <p className="text-orange-500 font-medium">
                        RS: {food.price}
                      </p>
                    </div>

                    {/* Availability */}
                    <p
                      className={`${
                        food.available ? "text-green-500" : "text-red-500"
                      } text-sm font-semibold`}
                    >
                      {food.available ? "Available" : "Unavailable"}
                    </p>

                    <Link href={`shop/products/${food.id}`}>
                      <button className="mt-2 w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                        Show Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="mr-2" />
                Previous
              </Button>
              <p>
                Page {currentPage} of {totalPages}
              </p>
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="ml-2" />
              </Button>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-[312px] md:h-[418px] bg-gray-50 p-6 rounded-lg shadow-lg">
            <div className="flex w-full h-[46px] mb-4">
              <input
                type="text"
                placeholder="Search Product"
                className="w-full p-3 bg-[#ebe2d5] rounded-lg text-gray-600 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <CiSearch size={20} className="ml-2 mt-2 text-gray-500" />
            </div>

            {/* Show "No Results" Message */}
            {debouncedSearchQuery && filteredFoods.length === 0 && (
              <p className="text-red-500 text-sm font-semibold">
                No items match your search. Try different keywords.
              </p>
            )}

            <h2 className="font-helvetica text-[20px] font-bold mt-4 mb-2">
              Categories
            </h2>
            <ul className="space-y-2">
              {["Sandwich", "Pizza", "Drink", "Dessert", "Burger"].map(
                (category) => (
                  <li key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={category}
                      onChange={(e) =>
                        filterByCategory(e.target.value, e.target.checked)
                      }
                      checked={selectedCategory.includes(category)}
                      className="h-4 w-4"
                    />
                    <label className="font-helvetica text-[18px]">{category}</label>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ourshop;
