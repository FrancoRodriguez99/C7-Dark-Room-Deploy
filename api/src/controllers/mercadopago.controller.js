const mercadopago = require("mercadopago");
require("dotenv").config();
var request = require("request");
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});
const shoppingSchema = require("../models/shopping");
const user = require("../models/users");
const publication = require("../models/publication");
const retos = require("../models/challenges");
const cobros = require("../models/cobros");

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
      success: "https://darkroom-client.vercel.app/postBuy",
      pending: "https://darkroom-client.vercel.app/postBuy",
      failure: "https://darkroom-client.vercel.app/postBuy",
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

const buyFromPhone = async (req, res) => {
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
      success: "https://auth.expo.io/@juanfranco/Dark-Room",
      pending: "https://auth.expo.io/@juanfranco/Dark-Room",
      failure: "https://auth.expo.io/@juanfranco/Dark-Room",
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
  if (paymentid === null) {
    res.status(200).json({ estado: "error" });
  } else {
    const a = await request(`https://api.mercadopago.com/v1/payments/${paymentid}/?access_token=${process.env.MP_ACCESS_TOKEN}`, async function (e, r, b) {
      const a = JSON.parse(b);
      array = [];
      const check = await shoppingSchema.find({ transaction_id: paymentid });
      if (check.length === 0) {
        for (let i = 0; i < a.additional_info.items.length; i++) {
          const boleta = shoppingSchema({
            photo_id: a.additional_info.items[i].id,
            photo_url: a.additional_info.items[i].picture_url,
            photo_price: a.additional_info.items[i].unit_price,
            buyer_id: a.external_reference,
            payment_status: a.status,
            date_approved: a.date_approved,
            payment_method: a.payment_method_id,
            cashed_out: false,
            transaction_id: paymentid,
          });

          array.push(a.additional_info.items[i].id);
          await boleta.save();
          await publication.findByIdAndUpdate(a.additional_info.items[i].id, { $push: { sales: boleta._id } });
        }

        await user.findByIdAndUpdate(a.external_reference, { $push: { bought: array } });
        const comprobante = await shoppingSchema.find({ buyer_id: a.external_reference, date_approved: a.date_approved });

        res.status(200).json({ comprobante, estado: a.status });
      } else {
        const comprobante = await shoppingSchema.find({ buyer_id: a.external_reference, date_approved: a.date_approved });
        res.status(200).json({ comprobante, estado: a.status });
      }
    });
  }
};

const soldStats = async (req, res) => {
  const { idUser } = req.params;

  const comprobantes = await shoppingSchema.find().populate("photo_id");
  const challenge = await retos.find({ ends: { $lt: new Date(Date.now()) } }).populate("participants");
  var arrayChallenge = [];
  challenge.forEach((element) => {
    var array = [...element.participants];
    array = array.sort((a, b) => b.challengeLikes.length - a.challengeLikes.length);
    if (array[0].photographer.toString() === idUser) arrayChallenge.push(element);
  });

  const arrayComprobante = comprobantes.filter((x) => x.photo_id.photographer.toString() === idUser);
  res.status(200).json({ arrayComprobante, arrayChallenge });
};

const whitdrawFunds = async (req, res) => {
  const { idUser } = req.params;
  const { total, publicationsSales, retosSales, dataToPay } = req.body;

  try {
    const userPhoto = await user.findById(idUser);
    const nuevoCobro = await cobros({
      total,
      retosSales,
      publicacionesSales: publicationsSales,
      photographer: userPhoto._id,
      banco: dataToPay.banco,
      alias: dataToPay.alias,
      cbu: dataToPay.cbu,
    });
    await nuevoCobro.save();

    const courier = CourierClient({
      authorizationToken: process.env.COURIER_KEY,
    });

    const { requestId } = await courier.send({
      message: {
        to: {
          data: {
            name: "Solicitud de retirar Ganancias",
          },
          email: "emaildarkroom@gmail.com",
        },
        template: "JY1YJBA57S4E2TN58MA35YENXBZ5",
        data: {
          nombreFotografo: userPhoto.name,
          ganaciasTotal: total,
          link: "link",
        },
      },
    });

    res.status(200).json({ estado: "ok" });
  } catch (e) {
    res.status(400).json({ e });
  }
};

module.exports = {
  buy,
  checkPurchase,
  soldStats,
  whitdrawFunds,
  buyFromPhone,
};
