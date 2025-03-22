import { useSearchParams } from "react-router";

function Filter() {
  const [searchParms, setSearchParams] = useSearchParams();

  const currentFilter = searchParms.get("filter") || "all";

  function handleFilter(filter: any) {
    const validFilters = ["all", "Occupied", "Available", "Your Bookings"];
    if (validFilters.includes(filter)) {
      setSearchParams({ filter });
    }
  }

  return (
    <div className="flex justify-end gap-4 shadow-sm text-slate-600 px-4 border border-slate-200 bg-slate-50 max-w-7xl mx-auto">
      <Button
        filter="all"
        handleFilter={handleFilter}
        currentFilter={currentFilter}
      >
        All
      </Button>
      <Button
        filter="Your Bookings"
        handleFilter={handleFilter}
        currentFilter={currentFilter}
      >
        Your Bookings
      </Button>
      <Button
        filter="Occupied"
        handleFilter={handleFilter}
        currentFilter={currentFilter}
      >
        Occupied
      </Button>
      <Button
        filter="Available"
        handleFilter={handleFilter}
        currentFilter={currentFilter}
      >
        Available
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, currentFilter, children }: any) {
  const isActive = currentFilter === filter;

  return (
    <button
      aria-pressed={isActive}
      className={`px-4 py-2 rounded transition-colors ${
        isActive
          ? "bg-emerald-500 text-white"
          : "bg-slate-100 text-slate-600 hover:bg-sky-300 hover:text-slate-800"
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
