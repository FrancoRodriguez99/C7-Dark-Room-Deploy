import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function PostBuy() {
  const [searchParams] = useSearchParams();
  const payment_id = searchParams.get("payment_id");
  useEffect(() => {
    async function t() {
      const a = await fetch(
        `http://192.168.1.67:9000/api/mercadopago/checkPurchase/${payment_id}`,
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
