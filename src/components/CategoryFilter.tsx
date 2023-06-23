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
        onClick={() => setCategory("")}
        className={props.categoryFilter === "" ? "active" : "inactive"}
      >
        All
      </button>
      <button
        onClick={() => setCategory("ui")}
        className={props.categoryFilter === "ui" ? "active" : "inactive"}
      >
        UI
      </button>
      <button
        onClick={() => setCategory("ux")}
        className={props.categoryFilter === "ux" ? "active" : "inactive"}
      >
        UX
      </button>
      <button
        onClick={() => setCategory("enhancement")}
        className={
          props.categoryFilter === "enhancement" ? "active" : "inactive"
        }
      >
        Enhancement
      </button>
      <button
        onClick={() => setCategory("bug")}
        className={props.categoryFilter === "bug" ? "active" : "inactive"}
      >
        Bug
      </button>
      <button
        onClick={() => setCategory("feature")}
        className={props.categoryFilter === "feature" ? "active" : "inactive"}
      >
        Feature
      </button>
    </div>
  );
}
