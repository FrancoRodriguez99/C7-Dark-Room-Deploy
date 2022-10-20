import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProfileDetails, uploadPhotoToCloudinary } from "../../redux/actions/photosActions";
import { cleanProfileDetails } from "../../redux/slices/profileSlice";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import editIcon from "../../assets/🦆 icon _edit 2 outline_.png";

import './ProfileEdit.css';

export default function ProfileEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const details = useSelector((state) => state.profile.userData);
  const you = useSelector((state) => state.userLoged.currentUser);
  
  useEffect(() => {
    dispatch(getProfileDetails(id));
    return () => dispatch(cleanProfileDetails());
  }, [dispatch, id]);  
  
  const [input, setInput] = useState({
        name: '',
        lastName: '',
        avatar: '',
        userType: ''
    })

console.log('input', input)

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        // dispatch(postDog(input))
        alert('Se actualizaron las datos!!!')

        setInput({
            name: '',
            lastName: '',
            avatar: '',
            userType: ''
        })
        navigate("/profile/" + you._id)
    }

    // const [inputImage, setInputImage] = useState(null);

	async function handleImage(e) {
		console.log(e.target.files)
		const response = uploadPhotoToCloudinary(e);
		const avatarImg = await response();
        console.log('avatarImg', avatarImg)
		// setInputImage(avatarImg);        
	}

  return (
    <div className="profile-edit-container">

        <div className="profile-navbar">        
            <Navbar />
        </div>
      
        <div className="profile-edit-title">
          <p>Editar Mi perfil</p>
        </div>

        <div className="profile-edit-block">

            <div className="profile-edit-card">
                <div className="avatar-block">
                    <img
                        alt="user"
                        src={details.avatar}
                        className="profile-edit-avatar"
                    ></img>
                    <div className="edit-icon">
                        {/* <img src={editIcon} alt="edit-img" onClick={() => console.log('editando')} className="edit-icon-img"/> */}
                        <div className="avatar-input-upload" id="avatar_uploadPhoto">
                            <input
                                name="avatar_uploadPhoto"
                                multiple="multiple"
                                type="file"
                                accept="image/png,image/jpeg"
                                onChange={(e) => handleImage(e)}
                            ></input>
					    </div>
                    </div>
                </div>
                
                <div className="profile-edit-dates">
                    <form className="profile-edit-form" onSubmit={(e)=>handleSubmit(e)}>

                        <div className='profile-edit-box'>
                            <label className='labels'>Nombre:</label>
                            <input
                                className='input-profile-edit'
                                type="text"
                                value= {input.name}
                                name= 'name'
                                placeholder={details.name}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <div className='profile-edit-box'>
                            <label className='labels'>Apellido:</label>
                            <input
                                className='input-profile-edit'
                                type="text"
                                value= {input.lastName}
                                name= 'lastName'
                                placeholder={details.lastName}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <div className='profile-edit-box'>
                            <label className='labels'>Tipo de Usuario:</label>
                            <select 
                                className='dropdown' 
                                onChange={(e) => handleChange(e)} 
                                value= {input.userType}
                                name= 'userType'
                                
                            >
                                {/* <option value="default" disabled selected>Selecciona Tipo</option> */}
                                <option value="userPhotographer">Fotógrafo</option>
                                <option value="userDefault">Usuario</option>
                            </select>
                        </div>

                    </form>
                </div>

            </div>
        </div>

        <div className="profile-edit-submit">
            <button className="profile-edit-btn-submit" onClick={e=>handleSubmit(e)}>
                Guardar Cambios    
            </button>
        </div>

        <Footer />
    </div>    
  );
}
