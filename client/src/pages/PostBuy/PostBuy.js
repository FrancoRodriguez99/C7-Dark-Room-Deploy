import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function PostBuy() {
  const [searchParams] = useSearchParams();
  const payment_id = searchParams.get("payment_id");
  useEffect(() => {
    async function t() {
      const a = await fetch(
        `https://deploy-api-c7-dark-room.onrender.com/api/mercadopago/checkPurchase/${payment_id}`,
        {
          method: "GET",
        }
      )
        .then((a) => a.json())
        .then((a) => console.log(a));
    }
    t();
  }, [payment_id]);

  return <div></div>;
}
