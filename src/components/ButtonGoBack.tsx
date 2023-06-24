import IconArrowLeft from "../assets/shared/icon-arrow-left.svg";
export default function ButtonGoBack() {
  return (
    <button className="go-back" type="button" onClick={() => history.back()}>
      <img src={IconArrowLeft} alt="icon-arrow-left" /> &nbsp; Go back
    </button>
  );
}
