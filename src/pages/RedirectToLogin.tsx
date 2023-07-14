import SpinnerDark from "../assets/shared/spinner-dark.svg";

export default function RedirectToLogin() {
  window.location.href = "./login";
  return (
    <div className="redirect-to-login-page">
      <img src={SpinnerDark} alt="spinner-dark" />
    </div>
  );
}
