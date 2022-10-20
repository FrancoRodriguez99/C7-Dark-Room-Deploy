import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { cleanCart } from "../../redux/slices/cartSlice";

export default function PostBuy() {
  const [searchParams] = useSearchParams();
  const payment_id = searchParams.get("payment_id");
  const dispatch = useDispatch();
  useEffect(() => {
    async function t() {
      const a = await fetch(`https://deploy-api-c7-dark-room.onrender.com/api/mercadopago/checkPurchase/${payment_id}`, {
        method: "GET",
      })
        .then((a) => a.json())
        .then((a) => a);
      if (a.estado === "approved") {
        dispatch(cleanCart());
        window.location.href = "https://darkroom-client.vercel.app";
      } else {
        window.location.href = "https://darkroom-client.vercel.app";
      }
    }

    t();
  }, []);

  return <div></div>;
}
