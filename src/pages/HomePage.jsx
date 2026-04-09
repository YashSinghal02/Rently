import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../redux/hooks.js";
import { fetchCars, selectCars, selectCarsStatus } from "../redux/cars/carsSlice.js";
import { CarCard } from "../components/cars/CarCard.jsx";
import { SkeletonCard } from "../components/common/SkeletonCard.jsx";
import { Button } from "../components/common/Button.jsx";
import { toISODateInput } from "../utils/dateUtils.js";

const addDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
};

const splitWords = (text) =>
  text.split(" ").map((w, i) => ({ id: `${w}-${i}`, w }));

export function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cars = useAppSelector(selectCars);
  const status = useAppSelector(selectCarsStatus);

  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState(toISODateInput(addDays(1)));
  const [returnDate, setReturnDate] = useState(toISODateInput(addDays(4)));

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-hero-word]"));
    if (!nodes.length) return;

    gsap.fromTo(
      nodes,
      { y: 14, opacity: 0, filter: "blur(6px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.04,
      }
    );
  }, []);

  // ✅ SHOW ALL CARS (FIXED)
  const featured = useMemo(() => {
    return [...cars].sort((a, b) => b.rating - a.rating);
  }, [cars]);

  const bookingQuery = useMemo(() => {
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (pickupDate) params.set("pickup", pickupDate);
    if (returnDate) params.set("return", returnDate);
    return params.toString();
  }, [location, pickupDate, returnDate]);

  const onSearch = (e) => {
    e.preventDefault();

    const p = new Date(pickupDate);
    const r = new Date(returnDate);

    if (!location.trim()) {
      toast.error("Please enter a location");
      return;
    }

    if (r < p) {
      toast.error("Return date must be after pickup date");
      return;
    }

    navigate(`/cars?location=${location}&pickup=${pickupDate}&return=${returnDate}`);
  };

  return (
    <div className="space-y-14">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 glass">

        {/* glow bg */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.18),transparent_50%)]" />

        <div className="relative container-page py-14 grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div className="space-y-6">

            <div className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full border border-white/10 bg-white/5">
              ⚡ Premium cars. Instant booking.
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight text-black dark:text-white">
              Drive with{" "}
              <span className="text-violet-500">
                {splitWords("premium comfort").map(({ id, w }) => (
                  <span key={id} data-hero-word className="inline-block mr-2">
                    {w}
                  </span>
                ))}
              </span>
            </h1>

            <p className="text-zinc-600 dark:text-zinc-300 max-w-lg">
              Book premium cars in seconds. Choose your ride, select dates, and enjoy a seamless rental experience.
            </p>

            <div className="flex gap-3">
              <Button onClick={() => navigate("/cars")}>
                Explore Cars
              </Button>

              <Button
                variant="ghost"
                onClick={() => toast("Smooth animations powered by GSAP ✨")}
              >
                Experience UI
              </Button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="glass-navbar rounded-3xl p-6 space-y-4">

            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Find your perfect car
              </h3>
              <p className="text-sm text-zinc-500">
                Search by location and dates
              </p>
            </div>

            <form className="space-y-4" onSubmit={onSearch}>

              <input
                className="focus-ring w-full rounded-xl px-4 py-3 bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10"
                placeholder="Enter location (e.g. Delhi)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="focus-ring rounded-xl px-3 py-3 bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10"
                />
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="focus-ring rounded-xl px-3 py-3 bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10"
                />
              </div>

              <Button type="submit" className="w-full">
                Search Cars
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="container-page space-y-6">

        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Featured Vehicles
            </h2>
            <p className="text-sm text-zinc-500">
              Handpicked cars for best experience
            </p>
          </div>

          <Button
            variant="secondary"
            className="hidden md:inline-flex"
            onClick={() => navigate("/cars")}
          >
            View All
          </Button>
        </div>

        {/* ✅ MODERN AUTO GRID */}
        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">

          {status === "loading"
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : featured.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  searchParams={bookingQuery || undefined}
                />
              ))}
        </div>

      </section>
    </div>
  );
}