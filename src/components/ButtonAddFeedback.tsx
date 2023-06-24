export default function ButtonAddFeedback() {
  return (
    <button
      className="button-add-feedback"
      onClick={() => (window.location.href = "new-feedback")}
    >
      + Add Feedback
    </button>
  );
}
