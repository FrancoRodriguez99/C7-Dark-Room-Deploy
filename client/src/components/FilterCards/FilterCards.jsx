import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDataForFiltering } from "../../redux/actions/photosActions";

export default function FilterCards() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    priceRange: { min: null, max: null, pay: null },
    ubication: null,
    reto: null,
    title: null,
    caract: null,
  });

  useEffect(() => {
    dispatch(getDataForFiltering(filter));
  }, [filter, dispatch]);

  function handlePrice(e) {
    switch (e.target.id) {
      case "filter_pay/free/all":
        setFilter({
          ...filter,
          priceRange: {
            ...filter.priceRange,
            pay:
              filter.priceRange.pay === null
                ? true
                : filter.priceRange.pay === true
                ? false
                : null,
          },
        });
        break;
      case "filter_price_min":
        setFilter({
          ...filter,
          priceRange: {
            ...filter.priceRange,
            min: e.target.value.length > 0 ? e.target.value : null,
          },
        });
        break;
      case "filter_price_max":
        setFilter({
          ...filter,
          priceRange: {
            ...filter.priceRange,
            max: e.target.value.length > 0 ? e.target.value : null,
          },
        });
        break;
      default:
        break;
    }
  }

  function handleUbication(e) {}

  function handleReto(e) {}

  function handleTitle(e) {
    setFilter({
      ...filter,
      title: e.target.value.length > 0 ? e.target.value : null,
    });
  }
  return (
    <div>
      <div>
        <input
          type="button"
          id="filter_pay/free/all"
          value={
            filter.priceRange.pay
              ? "Pago"
              : filter.priceRange.pay === null
              ? "Todo"
              : "Gratis"
          }
          onClick={(e) => handlePrice(e)}
        ></input>
        <input
          id="filter_price_min"
          type="number"
          onChange={(e) => handlePrice(e)}
        ></input>
        <input
          id="filter_price_max"
          type="number"
          onChange={(e) => handlePrice(e)}
        ></input>
      </div>
      <input onChange={(e) => handleUbication(e)}></input>
      <input onChange={(e) => handleReto(e)}></input>
      <input onChange={(e) => handleTitle(e)}></input>
    </div>
  );
}
