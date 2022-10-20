import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProfileDetails } from "../../redux/actions/photosActions";
import { cleanProfileDetails } from "../../redux/slices/profileSlice";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import editIcon from "../../assets/🦆 icon _edit 2 outline_.png";
import galeryIcon from "../../assets/🦆 icon _image_.png";
import galeryIconBlack from "../../assets/🦆 icon _image_Black.png";
import gustanIcon from "../../assets/VectorHeart.png";
import gustanIconWhite from "../../assets/VectorHearWhite.png";
import bookmarkIcon from "../../assets/EOS_BOOKMARKS_FILLED.png";
import bookmarkIconBlack from "../../assets/EOS_BOOKMARKS_FILLEDBLACK.png";
import uploadIcon from "../../assets/iTETAH.tif_1_.png";
import nothing from "../../assets/Group 18.png";
import HomeCards from "../../components/HomeCards/HomeCards";

import "./Profije.css";

export default function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const details = useSelector((state) => state.profile.userData);
  useEffect(() => {
    dispatch(getProfileDetails(id));
    return () => dispatch(cleanProfileDetails());
  }, [dispatch, id]);

  const [galery, setGalery] = useState("galeria");

  const you = useSelector((state) => state.userLoged.currentUser);

  return (
    <div style={{ backgroundColor: "black", height: "100vh" }}>
      <Navbar />
      <div
        style={{
          backgroundColor: "black",
          height: "100vh",
          paddingTop: "108px",
        }}
      >
        <div
          className="profile-general"
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100vw",
          }}
        >
          {you._id === id ? (
            <div
              style={{
                textAlign: "center",
                background: "rgb(31,31,31)",
                color: "white",
                fontSize: "32px",
              }}
            >
              Mi perfil
            </div>
          ) : null}

          <div style={{ alignSelf: "center" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                alt="user"
                src={details.avatar}
                style={{
                  width: "240px",
                  height: "240px",
                  borderRadius: "100%",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              ></img>
              {you._id === id ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    gap: "10px",
                    marginRight: "30px",
                    marginTop: "30px",

                    width: "190px",
                    height: "43px",

                    background: "#FFFFFF",

                    border: "3px solid #6C4494",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                >
                  <img src={editIcon} alt="edit"></img>

                  <div
                    style={{
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "20px",
                      lineHeight: "23px",
                      /* Acento */

                      color: "#6C4494",

                      /* Inside auto layout */
                    }}
                    onClick={() => navigate("/profileEdit/" + you._id)}
                  >
                    Editar Perfil
                  </div>
                </div>
              ) : null}
            </div>
            <div
              style={{
                width: "1260px",
                height: "357px",

                background: "linear-gradient(0deg, #D9D9D9 20%, rgba(217, 217, 217, 0) 87.27%)",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "36px",
                    lineHeight: "42px",
                    marginLeft: "30px",

                    /* 2Fondo */

                    color: "#000000",
                  }}
                >
                  {details.name} {details.lastName}
                </div>
                <div
                  style={{
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    lineHeight: "19px",
                    textAlign: "center",
                    width: "240px",
                    color: "#686868",
                  }}
                >
                  {details.userType === "userPhotographer" ? "Fotógrafo" : "Amante de las Fotos!"}
                </div>
                {/* <div style={{ marginLeft: "30px" }}>
                  Argentina, Buenos Aires, CABA.
                </div> */}
              </div>
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  justifyContent: "space-between",
                  marginTop: "3em",
                  marginBottom: "3em",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    marginLeft: "40px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "16px",
                      lineHeight: "29px",
                    }}
                  >
                    Seguidores
                  </div>
                  <div
                    style={{
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "20px",
                      lineHeight: "23px",
                    }}
                  >
                    {details.followers ? details.followers.length : null}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "16px",
                      lineHeight: "29px",
                    }}
                  >
                    Seguidos
                  </div>
                  <div
                    style={{
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "20px",
                      lineHeight: "23px",
                    }}
                  >
                    {details.followed ? details.followed.length : null}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "16px",
                      lineHeight: "29px",
                    }}
                  >
                    Publicaciones
                  </div>
                  <div
                    style={{
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "20px",
                      lineHeight: "23px",
                    }}
                  >
                    {details.publications ? details.publications.length : null}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "60%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px 20px",
                      gap: "10px",
                      width: "162px",
                      height: "43px",
                      background: galery === "galeria" ? "black" : "white",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => setGalery("galeria")}
                  >
                    <img alt="galeria" src={galery === "galeria" ? galeryIcon : galeryIconBlack}></img>
                    <div
                      style={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "20px",
                        lineHeight: "23px",
                        color: galery === "galeria" ? "white" : "black",
                      }}
                    >
                      Galeria
                    </div>
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "182px",
                      height: "43px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px 20px",
                      gap: "10px",
                      background: galery === "liked" ? "#000000" : "#FFFFFF",
                      border: "3px solid #000000",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => setGalery("liked")}
                  >
                    <img alt="gustan" src={galery === "liked" ? gustanIconWhite : gustanIcon}></img>
                    <div
                      style={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "20px",
                        lineHeight: "23px",
                        color: galery !== "liked" ? "#000000" : "#FFFFFF",
                      }}
                    >
                      Me Gustan
                    </div>
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      boxSizing: "border-box",
                      width: "162px",
                      height: "43px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px 20px",
                      gap: "10px",
                      border: "3px solid #000000",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: "20px",
                      background: galery === "saved" ? "black" : "white",
                    }}
                    onClick={() => setGalery("saved")}
                  >
                    <img alt="bookmark" src={galery === "saved" ? bookmarkIcon : bookmarkIconBlack}></img>{" "}
                    <div
                      style={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "20px",
                        lineHeight: "23px",
                        color: galery === "saved" ? "white" : "black",
                      }}
                    >
                      Guardados
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px 20px",
                    marginRight: "30px",
                    gap: "10px",
                    width: "190px",
                    height: "43px",

                    background: "#6C4494",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                >
                  <Link to="/publish" className="profile-btn-upload-img">
                    <div
                      style={{
                        display: "flex",
                        columnGap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <img alt="upload" src={uploadIcon}></img>{" "}
                      <div
                        style={{
                          fontFamily: "Roboto",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "20px",
                          lineHeight: "23px",
                          color: "#FFFFFF",
                        }}
                      >
                        Subir Foto
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderRadius: "20px" }}>
            <div className="galery-container">
              {galery === "galeria" ? (
                details.publications ? (
                  details.publications.length > 0 ? (
                    details.publications.map((x) => (
                      <HomeCards
                        x={{
                          ...x,
                          photographer: {
                            _id: details._id,
                            avatar: details.avatar,
                            name: details.name,
                            lastName: details.lastName,
                          },
                        }}
                        key={x._id}
                      />
                    ))
                  ) : (
                    <img alt="nothing" src={nothing}></img>
                  )
                ) : (
                  <img alt="nothing" src={nothing}></img>
                )
              ) : galery === "liked" ? (
                details.liked.length > 0 ? (
                  details.liked.map((x) => (
                    <HomeCards
                      x={{
                        ...x,
                        photographer: {
                          _id: details._id,
                          avatar: details.avatar,
                          name: details.name,
                          lastName: details.lastName,
                        },
                      }}
                      key={x._id}
                    />
                  ))
                ) : (
                  <img alt="nothing" src={nothing}></img>
                )
              ) : details.favorites.length > 0 ? (
                details.favorites.map((x) => (
                  <HomeCards
                    x={{
                      ...x,
                      photographer: {
                        _id: details._id,
                        avatar: details.avatar,
                        name: details.name,
                        lastName: details.lastName,
                      },
                    }}
                    key={x._id + "saved"}
                  />
                ))
              ) : (
                <img alt="nothing" src={nothing}></img>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
