import React, { useState, useEffect } from "react";
import style from "../styles/ProductEditPage/ProductEditPage.module.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API } from "./../data/BackEndData";
import SingleFileUpload from "./../components/common/SingleFileUpload";
import { Routes, useNavigate, useParams } from 'react-router-dom';

function ProductEditPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  let { id } = useParams();
  let navigate = useNavigate();

  const [selectedImage, setSelectedImg] = useState(null);
  const [imgErr, setImgErr] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [companys, setComapnys] = useState([]);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const [product, setProduct] = useState(null)

  const onSubmit = async (data) => {
    data.mainPrice = parseFloat(data.mainPrice);
    data.discount = parseFloat(data.discount);
    data._id = product?._id
    data.productImage = imgUrl;
  
    setLoading(true);
    try {
      const res = await axios.patch(API + "/v1/update-product", data, {
        headers: { Authorization: `bearer ${token}` },
      });
      setLoading(false);
      toast.success("Product Updated");
      setImgErr("");
      setImgUrl("");
      reset();
      return navigate("/product");
     
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error(e.response.data.error || "Something Wrong. Try Again!");
    }
  };

  const handelUpload = (file) => {
    if (
      file.type == "image/jpeg" ||
      file.type == "image/jpg" ||
      file.type == "image/png"
    ) {
      setSelectedImg(file);
      setImgErr(false);
    } else {
      setImgErr(true);
      return;
    }
  };

  const getCompany = async () => {
    setCompanyLoading(true);
    try {
      const res = await axios.get(API + "/v1/company", {
        headers: { Authorization: `bearer ${token}` },
      });
      setComapnys(res?.data?.company);
      console.log("company", res.data);
      setCompanyLoading(false);
    } catch (e) {
      setCompanyLoading(false);
      toast.error(e.response.data.error || "Reload and Try Again!");
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  
  const getProduct = async( ) => {
    try{
        const res = await axios.get(API + "/v1/get-product/"+id, {
            headers: { Authorization: `bearer ${token}` },
          });
          setProduct(res?.data);
          console.log(res);
         
          
    }catch(e){
        toast.error(e.response.data.error || "Reload and Try Again!");
    }
  }

  useEffect(() => {  
    getProduct()    
  }, [])
  useEffect(() => {  
    let defaultValues = {};
    defaultValues.title = product?.title;
    defaultValues.mainPrice = product?.mainPrice;
    defaultValues.discount = product?.discount;
    defaultValues.stock = product?.stock;
    defaultValues.hide = product?.hide;
    defaultValues.companyName = product?.companyName;
    setImgUrl(product?.productImage)
    reset({ ...defaultValues }); 
  }, [product])





  return (
    <section className="py-5">
      <article className="container">
        <h4 className="text-center">
          <b>Update Product Details</b>
        </h4>
        <hr />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Product Name
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Product Name"
                {...register("title", { required: true })}
              />
              {errors.title?.type === "required" && (
                <span className="text-danger">Product Name is required</span>
              )}
            </div>
             {/* <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Main Price
              </label>
              <input
                type="number"
                class="form-control"
                placeholder="Price"
                {...register("mainPrice", { required: true })}
              />
              {errors.mainPrice?.type === "required" && (
                <span className="text-danger">Price is required</span>
              )}
            </div> */}
             <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Main Price
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Price"
                {...register("mainPrice", { required: true,  pattern: /\d+/g })}
              />
              {errors.mainPrice?.type === "required" && (
                <span className="text-danger">Price is required</span>
              )}
              {errors.mainPrice?.type === "pattern" && (
                <span className="text-danger">Inavalide Price</span>
              )}
            </div>
            {/* <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Discount
              </label>
              <input
                type="number"
                class="form-control"
                placeholder="Discount"
                {...register("discount", { required: true })}
              />
              {errors.discount?.type === "required" && (
                <span className="text-danger">Disount is required</span>
              )}
            </div> */}
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Discount
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Discount"
                {...register("discount", { required: true , pattern: /\d+/g})}
              />
              {errors.discount?.type === "required" && (
                <span className="text-danger">Disount is required</span>
              )}
              {errors.mainPrice?.type === "pattern" && (
                <span className="text-danger">Inavalide Disount</span>
              )}
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Stock
              </label>
              <input
                type="number"
                class="form-control"
                placeholder="Stock"
                {...register("stock", { required: true })}
              />
              {errors.stock?.type === "required" && (
                <span className="text-danger">Stock is required</span>
              )}
            </div>
            <div className="mb-3 d-none">
              <label for="exampleInputEmail1" class="form-label">
                Sell Type
              </label>
              <select
                className="form-select"
                {...register("sellType", { required: true })}
              >
                <option value="recent">Recent</option>
                <option value="flash">Flash</option>
                <option value="tranding">Tranding</option>
              </select>
              {errors.sellType?.type === "required" && (
                <span className="text-danger">Sell Type is required</span>
              )}
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Company Name
              </label>
              <select
                className="form-select"
                {...register("companyName", { required: true })}
              >
                {companyLoading ? (
                  <option value="">--Please wait--</option>
                ) : (
                  companys.map((data) => (
                    <option key={data?.name} value={data?.name}>
                      {data?.name}
                    </option>
                  ))
                )}
              </select>
              {errors.companyName?.type === "required" && (
                <span className="text-danger">Company Name Required</span>
              )}
            </div> 

            {/* Th---------------------- */}
            <div className="mb-4">
              <label htmlFor="formFileLg" className="form-label">
                Product Photo
              </label>
              <input
                className="form-control form-control-lg"
                id="formFileLg"
                type="file"
                onChange={(e) => handelUpload(e.target.files[0])}
              />
              {imgErr && (
                <span className="text-danger">This image is not accepted.</span>
              )}
              {!imgUrl && (
                <span className="text-danger">Upload Product Image</span>
              )}
              {selectedImage && (
                <SingleFileUpload file={selectedImage} setImgUrl={setImgUrl} />
              )}
            </div>
            {/* Th---------------------- */}

            <div className="mb-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  {...register("hide")}
                />
                <label class="form-check-label" htmlFor="flexCheckDefault">
                  Hide Product
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading ? true : false}
              class="btn btn-primary"
            >
              {loading ? "Loading . . ." : "Submit"}
            </button>
          </form>
        </div>
      </article>
    </section>
  );
}

export default ProductEditPage;
