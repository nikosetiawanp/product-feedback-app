import IconCheck from "../assets/shared/icon-check.svg";

export default function SortByDropdown(props: {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}) {
  const sortById = (id: string) => {
    props.setSortBy(id);
  };

  return (
    <div className="sort-by-dropdown">
      <button id="most-upvotes" onClick={() => sortById("Most Upvotes")}>
        Most Upvotes
        {props.sortBy === "Most Upvotes" && (
          <img className="icon-check" src={IconCheck} alt="icon-check" />
        )}
      </button>
      <hr />
      <button id="least-upvotes" onClick={() => sortById("Least Upvotes")}>
        Least Upvotes
        {props.sortBy === "Least Upvotes" && (
          <img className="icon-check" src={IconCheck} alt="icon-check" />
        )}
      </button>
      <hr />

      <button id="most-comments" onClick={() => sortById("Most Comments")}>
        Most Comments
        {props.sortBy === "Most Comments" && (
          <img className="icon-check" src={IconCheck} alt="icon-check" />
        )}
      </button>
      <hr />

      <button id="least-comments" onClick={() => sortById("Least Comments")}>
        Least Comments
        {props.sortBy === "Least Comments" && (
          <img className="icon-check" src={IconCheck} alt="icon-check" />
        )}
      </button>
    </div>
  );
}
