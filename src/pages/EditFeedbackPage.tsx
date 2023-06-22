import IconArrowLeft from "../assets/shared/icon-arrow-left.svg";
import IconArrowDown from "../assets/shared/icon-arrow-down.svg";
import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconNewFeedback from "../assets/shared/icon-new-feedback.svg";
import { useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";

export default function EditFeedbackPage() {
  return (
    <section className="edit-feedback-page">
      <form className="edit-feedback" action="submit"></form>
    </section>
  );
}
