import IllustrationEmpty from "../assets/suggestions/illustration-empty.svg";
import ButtonAddFeedback from "./ButtonAddFeedback";
export default function NoFeedback() {
  return (
    <div className="no-feedback-container">
      <img src={IllustrationEmpty} alt="illustration-empty" />
      <h2>There is no feedback yet.</h2>
      <p>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <ButtonAddFeedback />
    </div>
  );
}
