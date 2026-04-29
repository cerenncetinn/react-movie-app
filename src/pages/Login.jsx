import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const initialValues ={email: "", password: ""};
  // const [values, setValues] = useState(initialValues);

  const email = useRef();
  const password = useRef();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // function handleInputChange(e) {
  //   // const name = e.target.name;
  //   // const value = e.target.value;

  //   setValues({
  //     ...values, [name]: value,
  //   });
  // }

  function handleFormSubmit(e) {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    const emailVal = email.current.value;
    const passwordVal = password.current.value;

    const emailIsInValid = !emailVal.includes("@"); // email geçerli değilse true, geçerli ise false döner. email'in içinde "@" karakteri yoksa geçersiz kabul ediyoruz.
    const passwordIsValid = passwordVal.length < 5; // password geçerli değilse true, geçerli ise false döner. password'ün uzunluğu 5 karakterden az ise geçersiz kabul ediyoruz.

    if (emailIsInValid) {
      setEmailError(true);
      return; // email geçersizse formun submit edilmesini engellemek için return ile fonksiyondan çıkıyoruz. Böylece password kontrolüne geçmeden önce email hatasını gösterebiliriz.
    }
    if (passwordIsValid) {
      setPasswordError(true);
      return;
    }
    console.log({ email: emailVal, password: passwordVal });

    email.current.value = ""; // uncontrolled componentlarda inputları temizlemek için ref kullanarak value'ya erişip boş string atarız.
    password.current.value = "";
  }

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-7 mx-auto">
          <div className={`card border ${cardColor}`}>
            <div className="card-header">
              <h3 className="card-title">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit} noValidate>
                {/*noValidate, formun HTML5 doğrulamasını devre dışı bırakır. Böylece kendi doğrulama mantığımızı kullanabiliriz. */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    // value={values.email}
                    // onChange={handleInputChange}
                    ref={email}
                    name="email"
                    className="form-control"
                    id="email"
                  />
                  {emailError && (
                    <div className="invalid-feedback d-block">
                      Geçerli e-mail giriniz{" "}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    // value={values.password}
                    // onChange={handleInputChange}
                    ref={password}
                    name="password"
                    className="form-control"
                    id="password"
                  />
                  {passwordError && (
                    <div className="invalid-feedback d-block">
                      Parola en az 5 karakter olmalıdır
                    </div>
                  )}
                </div>
                <button className={`btn btn-outline-${btnColor}`}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
