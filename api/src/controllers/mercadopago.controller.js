const mercadopago = require("mercadopago");
require("dotenv").config();
var request = require("request");
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});
const shoppingSchema = require("../models/shopping");

const buy = async (req, res) => {
  const data = req.body;
  var buyMe = [];
  data.items.forEach((element) => {
    buyMe.push({
      title: element.title,
      unit_price: parseInt(element.price),
      quantity: 1,
      picture_url: element.url,
      id: element._id,
    });
  });

  var preference = {
    items: buyMe,
    auto_return: "approved",
    external_reference: data.userId,
    back_urls: {
      success: "http://192.168.1.67:3000/postBuy",
      pending: "http://192.168.1.67:3000/postBuy",
      failure: "http://192.168.1.67:3000/postBuy",
    },
  };

  try {
    var q = "";
    // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso

    await mercadopago.preferences
      .create(preference)
      .then((response) => (q = response.body.init_point))
      .catch((e) => console.log(e));
    res.status(200).json(q);
  } catch (error) {}
};

const checkPurchase = async (req, res) => {
  const { paymentid } = req.params;
  const a = await request(
    `https://api.mercadopago.com/v1/payments/${paymentid}/?access_token=${process.env.MP_ACCESS_TOKEN}`,
    async function (e, r, b) {
      const a = JSON.parse(b);

      a.additional_info.items.forEach((x) => {
        const boleta = shoppingSchema({
          photo_id: x.id,
          photo_url: x.picture_url,
          photo_price: x.unit_price,
          buyer_id: a.external_reference,
          payment_status: a.status,
          date_approved: a.date_approved,
          payment_method: a.payment_method_id,
        });
        boleta.save();
      });
    }
  );

  const comprobante = await shoppingSchema.find();

  res.status(200).json({ comprobante });
};

module.exports = {
  buy,
  checkPurchase,
};
