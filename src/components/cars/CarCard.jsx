import { Link } from "react-router-dom";

export function CarCard({ car, searchParams }) {
  return (
    <Link
      to={`/cars/${car.id}${searchParams ? `?${searchParams}` : ""}`}
      className="group block rounded-2xl overflow-hidden 
      border border-black/10 bg-white shadow-sm
      hover:shadow-xl transition-all duration-300
      dark:bg-white/5 dark:border-white/10"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={car.images[0]}
          alt={car.name}
          className="h-48 w-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* TYPE BADGE */}
        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full 
        bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/10">
          {car.type}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">

        {/* TITLE + PRICE */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-semibold text-black dark:text-white">
              {car.brand}
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              {car.name}
            </p>
          </div>

          <div className="text-sm font-semibold text-black dark:text-white">
            ${car.dailyPrice}
            <span className="text-xs text-zinc-500">/day</span>
  <br />
  <div className="mt-2 inline-flex items-center gap-1 rounded-xl border border-black/20 dark:border-white/10  bg-black/10 dark:bg-white/5  px-2 py-1 text-xs text-zinc-10 backdrop-blur">
              <span aria-hidden="true">★</span>
              <span>{car.rating.toFixed(1)}</span>
            </div>
            
          </div>



        </div>

        {/* RATING */}
       {/* <div className="mt-1 inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-100/85 backdrop-blur">
              <span aria-hidden="true">★</span>
              <span>{car.rating.toFixed(1)}</span>
            </div> */}

        {/* TAGS */}
        <div className="flex flex-wrap gap-2">
          {car.highlights.slice(0, 3).map((item) => (
            <span
              key={item}
              className="px-3 py-1 rounded-full text-xs 
              bg-black/5 text-black 
              dark:bg-white/10 dark:text-white"
            >
              {item}
            </span>
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-2">
          <span>
            {car.seats} seats • {car.transmission}
          </span>
          <span className="text-violet-500 font-medium ">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}