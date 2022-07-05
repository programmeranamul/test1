import { FaSearch, FaBriefcaseMedical } from "react-icons/fa";
import style from "../../styles/home/home_page_header.module.css";
import { useState, useEffect } from "react";
import logo from "../../image/logo.jpeg"

function HomePageHeader({
  showFilter,
  setShowFilter,
  products,
  setProducts,
  copyProducts,
}) {
  const [mList, setMLits] = useState([]);

  useEffect(() => {
    setMLits(products);
  }, [products]);

  const haldelSearc = (e) => {
    const query = e.target.value.trimStart();
    if (query) {
      const mProduct = copyProducts.filter((el) =>
        el.title.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(mProduct);
    } else {
      setProducts(copyProducts);
    }
  };

  const mSort = () => {
    const sortList = mList.reverse();
    setProducts(sortList);
  };
  return (
    <section className={style.section}>
      <article className="container">
        <div className={style.section_wrapper}>
          <div ><img className={style.logo} src={logo} alt=""/></div>
          <div className={style.right}>
            <div>
              <div class="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Here"
                  onChange={(e) => haldelSearc(e)}
                />
                <span className="input-group-text" id="basic-addon2">
                  <FaSearch />
                </span>
              </div>
            </div>
            {/* <div>
              <FaSortAlphaDown onClick={() => mSort()} />
            </div> */}
            <div>
              <FaBriefcaseMedical onClick={() => setShowFilter(!showFilter)} />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default HomePageHeader;
