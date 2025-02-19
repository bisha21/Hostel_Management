import { useSearchParams } from 'react-router';

function Filter() {
  const [searchParms, setSearchParams] = useSearchParams();

  const currentFilter = searchParms.get('filter') || 'all';

  function handleFilter(filter:any) {
    const validFilters = ['all', 'Occupied', 'Available'];
    if (validFilters.includes(filter)) {
      setSearchParams({ filter });
    }
  }

  return (
    <div className="flex justify-end gap-4 shadow-xl text-teal-300 px-4 border max-w-7xl mx-auto">
      <Button
        filter="all"
        handleFilter={handleFilter}
        currentFilter={currentFilter}
      >
        All
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

function Button({ filter, handleFilter, currentFilter, children }:any) {
  const isActive = currentFilter === filter;

  return (
    <button
      aria-pressed={isActive}
      className={`px-4 py-2 ${
        isActive
          ? 'bg-primary-400 text-white'
          : 'bg-primary-800 hover:bg-primary-400'
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
