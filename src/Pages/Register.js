import Navbar from "../Component/Navbar";
import RegisterForm from "../Component/RegisterForm";

function Register() {
  return (
    <>
      <Navbar />
      <div className="containe">
        <div className="row">
          {" "}
          <div className="col-md-6">
            <img
              className="w-100"
              src="https://images.pexels.com/photos/4144177/pexels-photo-4144177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center my-3 h3 ">Start Learning</h1>
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
