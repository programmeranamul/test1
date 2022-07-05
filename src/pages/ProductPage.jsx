import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./../data/BackEndData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  let navigate = useNavigate();

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API + "/v1/get-product", {
        headers: { Authorization: `bearer ${token}` },
      });
      setProducts(res?.data);
      setLoading(false);
    } catch (e) {
      toast.error(e.response.data.error || "Reload This Page!");
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <section className="mt-5">
      <article className="container">
        <div className="d-flex justify-content-between">
          <div>
            <h5 className="position-relative">
              <b>Product List</b>
              {!loading && (
                <span className="badge bg-primary ms-2">{products.length}</span>
              )}
            </h5>
          </div>
          <div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate("/add-product")}
            >
              Add Product
            </button>
          </div>
        </div>
        <hr />

        {loading ? (
          <div className="text-center mt-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            {products.length < 1 ? (
              <div className="alert alert-danger" role="alert">
                No Product Found.
              </div>
            ) : (
              <div>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Pharmacy Name</th>
                        <th>Quantity</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((data, index) => (
                        <tr key={index}>
                          <td className={"my-row"}>{data.title}</td>
                          <td className={"my-row"}>{data.stock}</td>

                          {
                            <td className={"my-row"}>
                              <Link to={`/admin/product/${data?._id}`} className="btn btn-sm btn-danger">
                                Update
                              </Link>                             
                            </td>
                          }
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </article>
    </section>
  );
}

export default ProductPage;
