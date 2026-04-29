import { use, useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import { hasMinLength, isEmail } from "../utils/validations";

export default function LoginState() {
  const { theme } = useContext(ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const initialValues = { email: "", password: "" };
  // const [values, setValues] = useState(initialValues);

  // const [isEdited, setIsEdited] = useState({ email: false, password: false });

  const {
    value: emailValue,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
    isEdited: isEmailEdited,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value)); // email geçerli değilse true, geçerli ise false döner. email düzenlenmiş ve geçerli değilse geçersiz kabul ediyoruz.

  const {
    value: passwordValue,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
    //isEdited: isPasswordEdited,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 5));

  // const emailIsInValid = isEmailEdited && !isEmail(emailValue); // email geçerli değilse true, geçerli ise false döner. email düzenlenmiş ve geçerli değilse geçersiz kabul ediyoruz.
  // const passwordIsInValid = isPasswordEdited && !hasMinLength(passwordValue, 5); // password geçerli değilse true, geçerli ise false döner. password düzenlenmiş ve uzunluğu 5 karakterden az ise geçersiz kabul ediyoruz.

  // function handleInputBlur(e) {
  //   const name = e.target.name;

  //   setIsEdited((prev) => ({
  //     ...prev,
  //     [name]: true,
  //   }));
  // }

  // function handleInputChange(e) {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });

  //   setIsEdited((prev) => ({
  //     ...prev,
  //     [name]: false,
  //   }));
  // }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (emailHasError || passwordHasError) {
      return;
    }
    console.log({ email: emailValue, password: passwordValue });
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
              <form onSubmit={handleFormSubmit}>
                <Input
                  labeltext="Email"
                  type="email"
                  name="email"
                  id="email"
                  value={emailValue}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  error={emailHasError && "Geçerli e-mail giriniz"}
                />
                <Input
                  labeltext="Password"
                  type="password"
                  name="password"
                  id="password"
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  error={
                    passwordHasError && "Parola en az 5 karakter olmalıdır"
                  }
                />
                {/* 
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    value={values.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    name="email"
                    className="form-control"
                    id="email"
                  />
                  {emailIsInValid && (
                    <div className="invalid-feedback d-block">
                      Geçerli e-mail giriniz{" "}
                    </div>
                  )}
                </div> */}
                {/* <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    value={values.password}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    name="password"
                    className="form-control"
                    id="password"
                  />
                  {passwordIsInValid && (
                    <div className="invalid-feedback d-block">
                      Parola en az 5 karakter olmalıdır
                    </div>
                  )}
                </div> */}
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
