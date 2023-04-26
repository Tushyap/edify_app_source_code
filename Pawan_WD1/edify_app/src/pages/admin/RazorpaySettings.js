import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/Api";

const RazorpaySettings = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [keyId, setKeyId] = useState("");
  const [keyIdError, setKeyIdError] = useState("");

  const [keySecret, setKeySecret] = useState("");
  const [keySecretError, setKeySecretError] = useState("");

  const validateKeyId = () => {
    let result = false;
    if (keyId?.trim().length < 3) {
      setKeyIdError("Please enter key_id.");
    } else {
      setKeyIdError("");
      result = true;
    }
    return result;
  };

  const validateKeySecret = () => {
    let result = false;
    if (keySecret?.trim().length < 3) {
      setKeySecretError("Please enter key_secret.");
    } else {
      setKeySecretError("");
      result = true;
    }
    return result;
  };

  const getRazorpaySettings = async () => {
    try {
      const response = await api.get("admin/razorpay-settings/");

      if (response.status === 200) {
        setKeyId(response.data?.key_id);
        setKeySecret(response.data?.key_secret);
        setError(null);
      } else {
        setError("An error occured while fetching settings!");
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getRazorpaySettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = validateKeyId() && validateKeySecret();

    let data = {
      key_id: keyId,
      key_secret: keySecret,
    };

    if (isValid) {
      try {
        let response = await api.put("admin/razorpay-settings/", data);

        if (response.status === 200) {
          setSuccess("Settings updated.");
          setError("");
        } else {
          setError("Something went wrong while updating the settings!");
        }
      } catch (error) {
        alert(error);
        setError(error.message);
      }
    }
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={"/admin-dashboard"}>Admin Dashboard</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Razorpay Settings
          </li>
        </ol>
      </nav>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <form className={`row g-3`} onSubmit={handleSubmit}>
        <div className="col-md-12">
          <div className="form-floating">
            <input
              type="text"
              className={`form-control ${
                keyIdError.length > 0 ? "is-invalid" : ""
              }`}
              id="floatingInputFirstName"
              placeholder="First Name"
              defaultValue={keyId}
              onChange={(e) => setKeyId(e.target.value)}
              onBlur={validateKeyId}
            />
            <label htmlFor="floatingInputFirstName">Key Id</label>
            <div className="invalid-feedback">{keyIdError}</div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-floating">
            <input
              type="text"
              className={`form-control ${
                keySecretError.length > 0 ? "is-invalid" : ""
              }`}
              id="floatingInputFirstName"
              placeholder="First Name"
              defaultValue={keySecret}
              onChange={(e) => setKeySecret(e.target.value)}
              onBlur={validateKeySecret}
            />
            <label htmlFor="floatingInputFirstName">Key Secret</label>
            <div className="invalid-feedback">{keySecretError}</div>
          </div>
        </div>

        <div className="col-12 text-center">
          <button type="submit" className={`my-3 btn btn-primary `}>
            Save Settings
          </button>
        </div>
      </form>
    </>
  );
};

export default RazorpaySettings;
