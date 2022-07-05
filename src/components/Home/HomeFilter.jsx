import style from "../../styles/home/home_filter.module.css";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "./../../data/BackEndData";

function HomeFilter({
  showFilter,
  setShowFilter,
  copyProducts,
  products,
  setProducts,
}) {
  const [comanys, setComapnys] = useState([]);
  const [cloneCompany, setCloneComapnys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  const getComapny = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API + "/v1/company", {
        headers: { Authorization: `bearer ${token}` },
      });
      setComapnys(res?.data?.company);
      setCloneComapnys(res?.data?.company);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.error || "Reload and Try Again!");
    }
  };

  useEffect(() => {
    getComapny();
  }, []);

  const handelCompanySearch = (e) => {
    const query = e.target.value.trimStart();
    if (query) {
      console.log(query);
      const mCompany = comanys.filter((el) =>
        el.name.toLowerCase().includes(query.toLowerCase())
      );
      setComapnys(mCompany);
    } else {
      setComapnys(cloneCompany);
    }
  };

  const handelChecked = (e) => {
    console.log(e.target.value);
    const val = e.target.value;
    if (val) {
      const mProduct = copyProducts.filter((el) => el.companyName === val);
      setProducts(mProduct);
    } else {
      setProducts(copyProducts);
    }
    setShowFilter(false);
  };

  return (
    <div className={`${showFilter ? style.show : ""} ${style.section}`}>
      <div className="container">
        <div className={style.wrapper}>
          <div className={style.header}>
            <h5 className="fw-6 mb-0">Filter By</h5>
            <div
              className={style.close}
              onClick={() => setShowFilter(!showFilter)}
            >
              <MdClose />
            </div>
          </div>
          <div className={style.searcharea}>
            <p className={style.company}>
              <b>Company</b>
            </p>
            <div className={style.input_box}>
              <input
                type="text"
                placeholder="Search Company"
                onChange={(e) => handelCompanySearch(e)}
              />
            </div>
          </div>
          <div>
            <div className={`form-check ${style.my_check}`}>
              <label className="form-check-label" htmlFor="re">
                <b>Clear Select </b>
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                value={""}
                id={"re"}
                onChange={(e) => handelChecked(e)}
              />
            </div>
            {comanys?.map((data, index) => (
              <div key={data?._id} className={`form-check ${style.my_check}`}>
                <label className="form-check-label" htmlFor={data}>
                  <b>{data?.name}</b>
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={data?.name}
                  id={data}
                  onChange={(e) => handelChecked(e)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeFilter;
