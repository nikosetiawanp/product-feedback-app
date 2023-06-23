import IconCheck from "../assets/shared/icon-check.svg";

export default function SortByDropdown(props: {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortByIsActive: boolean;
  setSortByIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const sortById = (id: string) => {
    props.setSortBy(id);
  };
  const toggleSortBy = () => {
    props.setSortByIsActive((sortByIsActive) => !sortByIsActive);
  };

  return (
    <div className="sort-by-dropdown">
      <button
        onClick={() => {
          sortById("Most Upvotes");
          toggleSortBy();
        }}
      >
        Most Upvotes
        {props.sortBy === "Most Upvotes" && (
          <img className="icon-check" src={IconCheck} alt="icon-check" />
        )}
      </button>
      <hr />
      <button
        onClick={() => {
          sortById("Least Upvotes");
          toggleSortBy();
        }}
      >
        Least Upvotes
        {props.sortBy === "Least Upvotes" && (
          <img className="icon-check" src={IconCheck} alt="icon-check" />
        )}
      </button>
      <hr />

      <button
        onClick={() => {
          sortById("Most Comments");
          toggleSortBy();
        }}
      >
        Most Comments
        {props.sortBy === "Most Comments" && (
          <img className="icon-check" src={IconCheck} alt="icon-check" />
        )}
      </button>
      <hr />

      <button
        onClick={() => {
          sortById("Least Comments");
          toggleSortBy();
        }}
      >
        Least Comments
        {props.sortBy === "Least Comments" && (
          <img className="icon-check" src={IconCheck} alt="icon-check" />
        )}
      </button>
    </div>
  );
}
