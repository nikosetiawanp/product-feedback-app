import IconCheck from "../assets/shared/icon-check.svg";

export default function StatusDropdown(props: {
  statusInput: string;
  setStatusInput: React.Dispatch<React.SetStateAction<string>>;
  statusDropdownIsActive: boolean;
  setStatusDropdownIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const toggleStatusDropdown = () => {
    props.setStatusDropdownIsActive(
      (statusDropdownIsActive) => !statusDropdownIsActive
    );
  };

  return (
    <div className="status-dropdown">
      <button
        type="button"
        onClick={() => {
          props.setStatusInput("Suggestion");
          toggleStatusDropdown();
        }}
      >
        Suggestion
        {props.statusInput === "Suggestion" && (
          <img src={IconCheck} alt="icon-check" />
        )}
      </button>
      <hr />
      <button
        type="button"
        onClick={() => {
          props.setStatusInput("Planned");
          toggleStatusDropdown();
        }}
      >
        Planned
        {props.statusInput === "Planned" && (
          <img src={IconCheck} alt="icon-check" />
        )}
      </button>
      <hr />
      <button
        type="button"
        onClick={() => {
          props.setStatusInput("In-Progress");
          toggleStatusDropdown();
        }}
      >
        In-Progress
        {props.statusInput === "In-Progress" && (
          <img src={IconCheck} alt="icon-check" />
        )}
      </button>
      <hr />
      <button
        type="button"
        onClick={() => {
          props.setStatusInput("Live");
          toggleStatusDropdown();
        }}
      >
        Live
        {props.statusInput === "Live" && (
          <img src={IconCheck} alt="icon-check" />
        )}
      </button>
    </div>
  );
}
