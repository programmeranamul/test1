import HomePageHeader from "./../components/Home/HomePageHeader";
import HomePageCards from "./../components/Home/HomePageCards";
import HomeFilter from "./../components/Home/HomeFilter";
import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "./../data/BackEndData";
import { toast } from "react-toastify";

function HomePage() {
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [copyProducts, setCopyProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState("")
  // const [banner, setBanner] = useState("")
  const token = JSON.parse(localStorage.getItem("token"));

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API + "/v1/get-product", {
        headers: { Authorization: `bearer ${token}` },
      });
      setProducts(res?.data);
      setCopyProducts(res?.data);
      setLoading(false);
    } catch (e) {
      toast.error(e.response.data.error || "Reload This Page!");
      setLoading(false);
    }
  };

const getBanner = async() => {
  try{
    const res = await axios.get(API + "/v1/get-banner", {
      headers: { Authorization: `bearer ${token}` },
    });

    setBanner(res?.data?.message[0]?.bannerUrl)
    console.log(res?.data?.message[0])
  }catch(e){
    console.log(e);
  }
}

console.log("banner", banner);


  useEffect(() => {
    getProduct();
    getBanner()
  }, []);

  const handelSort = () => {
    setProducts((pre) => pre.reverse());
  };

  return (
    <>
      <HomePageHeader
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        products={products}
        setProducts={setProducts}
        copyProducts={copyProducts}
        handelSort={handelSort}
      />
      <div className="container">
        <div className="banner-conatiner">
<img src={banner} alt=""  />
        </div>
      </div>
      <HomePageCards products={products} loading={loading} />
      <div className="container">
        <HomeFilter
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          copyProducts={copyProducts}
          products={products}
          setProducts={setProducts}
        />
      </div>
    </>
  );
}   


export default HomePage;
