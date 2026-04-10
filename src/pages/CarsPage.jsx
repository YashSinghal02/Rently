import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../redux/hooks.js";
import {
  fetchCars,
  selectCars,
  selectCarsStatus,
} from "../redux/cars/carsSlice.js";
import { CarCard } from "../components/cars/CarCard.jsx";
import { SkeletonCard } from "../components/common/SkeletonCard.jsx";
import { Button } from "../components/common/Button.jsx";

const sorters = {
  recommended: (a, b) => b.rating - a.rating,
  priceLow: (a, b) => a.dailyPrice - b.dailyPrice,
  priceHigh: (a, b) => b.dailyPrice - a.dailyPrice,
  rating: (a, b) => b.rating - a.rating,
};

export function CarsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const cars = useAppSelector(selectCars);
  const status = useAppSelector(selectCarsStatus);

  const queryLocation = searchParams.get("location") || "";
  const queryPickup = searchParams.get("pickup") || "";
  const queryReturn = searchParams.get("return") || "";

  const [type, setType] = useState("All");
  const [brand, setBrand] = useState("All");
  const [minPrice, setMinPrice] = useState(40);
  const [maxPrice, setMaxPrice] = useState(140);
  const [sort, setSort] = useState("recommended");

  useEffect(() => {
    if (!cars.length && status !== "loading") {
      dispatch(fetchCars());
    }
  }, [dispatch, cars.length, status]);

  const types = useMemo(
    () => ["All", ...new Set(cars.map((c) => c.type))],
    [cars]
  );

  const brands = useMemo(
    () => ["All", ...new Set(cars.map((c) => c.brand))],
    [cars]
  );

  const searchQueryString = useMemo(() => {
    const params = new URLSearchParams();
    if (queryLocation) params.set("location", queryLocation);
    if (queryPickup) params.set("pickup", queryPickup);
    if (queryReturn) params.set("return", queryReturn);
    return params.toString();
  }, [queryLocation, queryPickup, queryReturn]);

  const filtered = useMemo(() => {
    const min = Math.min(minPrice, maxPrice);
    const max = Math.max(minPrice, maxPrice);

    return cars
      .filter((c) => type === "All" || c.type === type)
      .filter((c) => brand === "All" || c.brand === brand)
      .filter((c) => c.dailyPrice >= min && c.dailyPrice <= max)
      .sort(sorters[sort] || sorters.recommended);
  }, [cars, type, brand, minPrice, maxPrice, sort]);

  const clear = () => {
    setType("All");
    setBrand("All");
    setMinPrice(40);
    setMaxPrice(140);
    setSort("recommended");
    toast.success("Filters reset");
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-white">
            Car listing
          </h1>

          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {queryLocation
              ? `Premium cars available in ${queryLocation}`
              : "Explore premium rental cars with smart filters"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="hidden sm:inline-flex"
          >
            New Search
          </Button>

          <Button variant="ghost" onClick={clear}>
            Clear
          </Button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-6 lg:grid-cols-[300px,1fr] items-start">

        {/* ✅ FIXED FILTER PANEL */}
        <aside
          className="rounded-3xl p-5 space-y-5 h-fit 
          lg:sticky lg:top-24 lg:z-10
          border border-black/10 dark:border-white/10
          bg-white/70 dark:bg-white/5 backdrop-blur-xl"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Filters
            </h3>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {filtered.length} results
            </span>
          </div>

          {/* PRICE */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Price range
            </p>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(+e.target.value)}
                className="input"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(+e.target.value)}
                className="input"
              />
            </div>
          </div>

          {/* TYPE */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Car type
            </p>
            <select value={type} onChange={(e) => setType(e.target.value)} className="input border-zinc-200 dark:border-white/10 bg-white dark:bg-[#1f2229] text-zinc-900 dark:text-white">
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* BRAND */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Brand
            </p>
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="input border-zinc-200 dark:border-white/10 bg-white dark:bg-[#1f2229] text-zinc-900 dark:text-white">
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* SORT */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Sort by
            </p>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="input border-zinc-200 dark:border-white/10 bg-white dark:bg-[#1f2229] text-zinc-900 dark:text-white">
              <option value="recommended">Recommended</option>
              <option value="priceLow">Price Low → High</option>
              <option value="priceHigh">Price High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </aside>

        {/* CAR GRID */}
        <section className="space-y-6">

          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            {status === "loading"
              ? "Loading cars..."
              : filtered.length
              ? "Best cars for you"
              : "No cars found"}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {status === "loading" ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            ) : filtered.length ? (
              filtered.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  searchParams={searchQueryString || undefined}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10 border border-black/10 dark:border-white/10 rounded-3xl">
                <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                  No cars found
                </p>
                <Button className="mt-4" onClick={clear}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}