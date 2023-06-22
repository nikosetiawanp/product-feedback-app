import IconCheck from "../assets/shared/icon-check.svg";

export default function CategoryDropdown(props: {
  categoryInput: string;
  setCategoryInput: React.Dispatch<React.SetStateAction<string>>;
  categoryDropdownIsActive: boolean;
  setCategoryDropdownIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const toggleCategoryDropdown = () => {
    props.setCategoryDropdownIsActive(
      (categoryDropdownIsActive) => !categoryDropdownIsActive
    );
  };
  return (
    <div className="category-dropdown">
      <button
        type="button"
        onClick={() => {
          props.setCategoryInput("Feature");
          toggleCategoryDropdown();
        }}
      >
        Feature
        {props.categoryInput === "Feature" && (
          <img src={IconCheck} alt="icon-check" />
        )}
      </button>
      <hr />
      <button
        type="button"
        onClick={() => {
          props.setCategoryInput("UI");
          toggleCategoryDropdown();
        }}
      >
        UI
        {props.categoryInput === "UI" && (
          <img src={IconCheck} alt="icon-check" />
        )}
      </button>
      <hr />
      <button
        type="button"
        onClick={() => {
          props.setCategoryInput("UX");
          toggleCategoryDropdown();
        }}
      >
        UX
        {props.categoryInput === "UX" && (
          <img src={IconCheck} alt="icon-check" />
        )}
      </button>
      <hr />
      <button
        type="button"
        onClick={() => {
          props.setCategoryInput("Enhancement");
          toggleCategoryDropdown();
        }}
      >
        Enhancement
        {props.categoryInput === "Enhancement" && (
          <img src={IconCheck} alt="icon-check" />
        )}
      </button>
      <hr />
      <button
        type="button"
        onClick={() => {
          props.setCategoryInput("Bug");
          toggleCategoryDropdown();
        }}
      >
        Bug
        {props.categoryInput === "Bug" && (
          <img src={IconCheck} alt="icon-check" />
        )}
      </button>
    </div>
  );
}
