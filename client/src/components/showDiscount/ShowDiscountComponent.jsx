import { useEffect, useState } from "react";
import { getTop3Discounts } from "../../apis/admin/admin.transetion.api";

const discountBannerContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};
const discountContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "600px",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  color: "white",
  width: "100%",

  position: "relative",
};

const descriptionStyle = {
  position: "absolute",
  top: "10%",
  left: "0%",
  textAlign: "left",
  color: "black",
};

export default function ShowDiscountComponent() {
  const [top3Discounts, setTop3Discounts] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const getTop3DiscountsData = async () => {
    const response = await getTop3Discounts();
    setTop3Discounts(response.data);
  };

  useEffect(() => {
    getTop3DiscountsData();
    const interval = setInterval(() => {
      setCurrentBannerIndex(
        (prevIndex) => (prevIndex + 1) % top3Discounts.length
      );
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={discountBannerContainerStyle}>
      {top3Discounts.map((discount, index) => (
        <div
          key={discount._id}
          style={{
            ...discountContainerStyle,
            backgroundImage: `url(${discount.image})`,
            display: index === currentBannerIndex ? "block" : "none",
          }}
        >
          <div style={descriptionStyle}>
            <h1
              style={{
                fontSize: "60px",
                fontWeight: "bold",
                backgroundColor: "white",
                padding: "10px",
              }}
            >
              {discount.name}
            </h1>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "red",
                backgroundColor: "white",
                padding: "10px",
              }}
            >
              {discount.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
