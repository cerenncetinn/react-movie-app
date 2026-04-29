import { useContext, useRef } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Register() {
  const { theme } = useContext(ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const initialValues ={email: "", password: ""};
  // const [values, setValues] = useState(initialValues);

  function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target); // formun submit eventinden gelen e.target ile form elementine erişip FormData objesi oluştururuz. FormData, form verilerini kolayca yönetmemizi sağlar.

    console.log(formData.get("name")); // FormData objesinden name alanının değerini alır ve konsola yazdırır.
    console.log(formData.get("email"));
    console.log(formData.get("password"));
    console.log(formData.get("repassword"));
    console.log(formData.getAll("hobbies")); // FormData objesinden hobbies alanının tüm değerlerini alır ve konsola yazdırır. (checkboxlar için getAll kullanılır çünkü birden fazla değer olabilir.)

    const hobbies = formData.getAll("hobbies"); // hobbies alanındaki tüm değerleri alır ve hobbies değişkenine atar.
    const data = Object.fromEntries(formData.entries()); // FormData objesindeki tüm verileri bir nesneye dönüştürür. entries() metodu, FormData içindeki tüm anahtar-değer çiftlerini döndürür ve Object.fromEntries() bu çiftleri bir nesne haline getirir. Böylece form verilerini tek bir nesne olarak yönetebiliriz.
    data.hobbies = hobbies; // hobbies alanındaki tüm değerleri data nesnesine ekler. Çünkü getAll ile aldığımız hobbies bir dizi olduğu için doğrudan formData.get("hobbies") ile alamayız, bu yüzden ayrı bir değişkende tutup data nesnesine ekliyoruz.
    console.log(data);
  }

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-7 mx-auto">
          <div className={`card border ${cardColor}`}>
            <div className="card-header">
              <h3 className="card-title">Register</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    // value={values.email}
                    // onChange={handleInputChange}

                    name="email"
                    className="form-control"
                    id="email"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        // value={values.password}
                        // onChange={handleInputChange}

                        name="password"
                        className="form-control"
                        id="password"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Re-Password
                      </label>
                      <input
                        type="password"
                        name="repassword"
                        className="form-control"
                        id="repassword"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="hobbies" className="form-label">
                      Hobbies
                    </label>
                    <div className={`card card-body border ${cardColor}`}>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="hobbies"
                          id="cars"
                          className="form-check-input"
                          value="cars"
                        />
                        <label htmlFor="hobbies" className="form-check-label">
                          Cars
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="hobbies"
                          id="books"
                          className="form-check-input"
                          value="books"
                        />
                        <label htmlFor="books" className="form-check-label">
                          Books
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="hobbies"
                          id="movies"
                          className="form-check-input"
                          value="movies"
                        />
                        <label htmlFor="movies" className="form-check-label">
                          Movies
                        </label>
                      </div>
                    </div>
                  </div>
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
