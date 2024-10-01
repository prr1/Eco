import {useContext ,useEffect} from "react";
import "./login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../Contexts/loginContext";


function Login() {

  let [currentUser,error,userLoginStatus,loginUser,logoutUser] = useContext(loginContext)

  //navigate
  const navigate = useNavigate();

  //use form hook
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //adding new user
  let handleSubmitUser = (userCredObj) => {
    
      loginUser(userCredObj)
   
  };

  useEffect(()=>{
    if(userLoginStatus===true) {
      navigate('/user-profile')}
  },[userLoginStatus])

  return (
    <div className="add-user mx-auto">
     <p className='display-5 text-center'>Login</p>
     {error.length!==0 && (<p className="display-5 text-danger text-center">{error}</p>)}
      {/* add user form */}
      <div className="row">
        <div className="mx-auto col-11 col-sm-8 col-md-6">
          <form onSubmit={handleSubmit(handleSubmitUser)}>
            {/* username */}
            <div className="mb-3">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                {...register("username", { required: true })}
              />
              {/* validation errors for name */}
              {errors.username?.type === "required" && (
                <p className="text-danger fw-bold fs-5">
                  * Username is required
                </p>
              )}
            </div>
            {/* password */}
            <div className="mb-3">
              <label htmlFor="name">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                {...register("password", { required: true })}
              />
              {/* validation errors for name */}
              {errors.password?.type === "required" && (
                <p className="text-danger fw-bold fs-5">
                  * Password is required
                </p>
              )}
            </div>
           
           
            {/* submit button */}
            <button type="submit" className="btn add-user-btn btn-success float-end fs-5 h-50 mb-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;