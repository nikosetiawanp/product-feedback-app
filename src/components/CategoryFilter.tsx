export default function CategoryFilter(props: {
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const setCategory = (category: string) => {
    props.setCategoryFilter(category);
  };

  return (
    <div className="category">
      <button
        onClick={() => setCategory("All")}
        className={props.categoryFilter === "All" ? "active" : "inactive"}
      >
        All
      </button>
      <button
        onClick={() => setCategory("UI")}
        className={props.categoryFilter === "UI" ? "active" : "inactive"}
      >
        UI
      </button>
      <button
        onClick={() => setCategory("UX")}
        className={props.categoryFilter === "UX" ? "active" : "inactive"}
      >
        UX
      </button>
      <button
        onClick={() => setCategory("Enhancement")}
        className={
          props.categoryFilter === "Enhancement" ? "active" : "inactive"
        }
      >
        Enhancement
      </button>
      <button
        onClick={() => setCategory("Bug")}
        className={props.categoryFilter === "Bug" ? "active" : "inactive"}
      >
        Bug
      </button>
      <button
        onClick={() => setCategory("Feature")}
        className={props.categoryFilter === "Feature" ? "active" : "inactive"}
      >
        Feature
      </button>
    </div>
  );
}
