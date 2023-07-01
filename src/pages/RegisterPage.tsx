export default function RegisterPage() {
  return (
    <div className="login-register-page">
      <form className="login-register-container">
        <h1>Register</h1>
        {/* EMAIL */}
        <label htmlFor="email">Email</label>
        <p>Please enter your email</p>
        <input type="email" id="email" name="email" />
        {/* NAME */}
        <label htmlFor="name">Name</label>
        <p>Please enter your full name</p>
        <input type="text" id="name" name="name" />
        {/* USERNAME */}
        <label htmlFor="username">Username</label>
        <p>Please enter your username</p>
        <input type="text" id="username" name="username" />
        {/* PASSWORD */}
        <label htmlFor="username">Password</label>
        <p>Please enter your password</p>
        <input type="text" id="username" name="username" />
        {/* BUTTONS */}
        <button>Register</button>
        <span>
          Already have an account? <a href="./login">Login</a>
        </span>
      </form>
    </div>
  );
}
