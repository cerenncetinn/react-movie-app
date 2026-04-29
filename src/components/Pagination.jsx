import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Pagination({
  page,
  totalPages,
  setSearchParams,
  query,
}) {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "dark" ? "light" : "dark";

  return (
    <div className="container py-3">
      <div className="border p-3">
        <div className="d-flex justify-content-between align-items-center">
          <button
            className={`btn btn-outline-${textColor}`}
            onClick={() =>
              setSearchParams({ q: query, page: Number(page) - 1 })
            }
            disabled={page <= 1} //sayfa 1'den küçük veya eşit olduğunda geri butonunu devre dışı bırakıyoruz
          >
            Geri
          </button>
          <div className="d-flex align-items-center gap-2">
            <span className="mx-2">
              Sayfa{page}/{totalPages}
            </span>
          </div>
          <button
            className={`btn btn-outline-${textColor}`}
            onClick={() =>
              setSearchParams({ q: query, page: Number(page) + 1 })
            }
            disabled={page >= totalPages}
          >
            İleri
          </button>
        </div>
      </div>
    </div>
  );
}
