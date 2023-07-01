export default function LoginPage() {
  return (
    <div className="login-register-page">
      <form className="login-register-container">
        <h1>Login</h1>
        {/* EMAIL */}
        <label htmlFor="email">Email</label>
        <p>Please enter your email</p>
        <input type="email" id="email" name="email" />
        {/* PASSWORD */}
        <label htmlFor="username">Password</label>
        <p>Please enter your password</p>
        <input type="text" id="username" name="username" />
        {/* BUTTONS */}
        <button>Register</button>
        <span>
          Don't have an account? <a href="./register">Register</a>
        </span>
      </form>
    </div>
  );
}
