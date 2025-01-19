function Filter() {
  
  function handleFilter(filter) {
    console.log(filter);
  }
  return (
    <div className="flex justify-end gap-4  shadow-xl text-teal-300 px-4 border max-w-7xl mx-auto" >
      <Button
        filter="all"
        handleFilter={handleFilter}
      >
        All
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
      >
        Small
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
      >
        Medium
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
      >
        Large
      </Button>
    </div>
  );
}
function Button({ filter, handleFilter,  children }) {
  return (
    <button
      className={`px-4 py-2 bg-primary-800 hover:bg-primary-400`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
export default Filter;
