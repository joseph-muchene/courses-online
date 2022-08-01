import React from "react";

function UserAccount() {
  return (
    <div>
      <div className="container">
        <form>
          <div className="mt-3">
            <label htmlFor="email" className="my-3">
              Email
            </label>
            <input
              type="email"
              name=""
              id=""
              value="ngugimuchene@gmail.com"
              className="form-control"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="email" className="my-3">
              password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id=""
              value=""
            />
          </div>

          <div className="mt-3">
            <label htmlFor="email" className="my-3">
              confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              value=""
              className="form-control"
            />
          </div>
          <div className="mt-3">
            <input type="submit" value="Save" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserAccount;
