import "./app.css";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRef } from "react";
import moment from "moment";

const App = () => {
  const [isInfoComplete, setInfo] = useState(false);
  const ref = useRef();
  const [estTime, setEstimateTime] = useState("");
  return (
    <div className="App">
      <div className="section">
        <div className="main">
          <div style={{ marginBottom: "8%" }}>
            <h1 className="companyTag">The Company</h1>
          </div>
          <div style={{ marginBottom: "4em" }}>
            <h2 className="calculatorTag">
              Shipping Time <br />
              <h2 className="calculatorTag">Calculator</h2>
            </h2>
          </div>
          <div>
            <Formik
              initialValues={{ date: "", type: "", quantity: "" }}
              validationSchema={Yup.object({
                date: Yup.date().required("Please specify a date"),
                quantity: Yup.number()
                  .min(1, "You must boy at least 1 item")
                  .max(100, "You can buy at most 100 item")
                  .required("You did not enter the quantity "),
                type: Yup.string().required(
                  "Please choose fabric type you need"
                ),
              })}
              onSubmit={(values, { resetForm }) => {
                setInfo(true);
                resetForm();
                let date = new Date(values.date);
                if (values.type === "Cotton" && values.quantity < 50) {
                  for (let i = 0; i < 2; i++) {
                    let prev = new Date(date);
                    prev = new Date(prev.setDate(prev.getDate() + 1));

                    if (prev.getDay() === 6) {
                      prev = new Date(prev.setDate(prev.getDate() + 2));
                    }
                    if (prev.getDay() === 0) {
                      prev = new Date(prev.setDate(prev.getDate() + 1));
                    }
                    if (
                      (prev.getMonth() === 6 && prev.getDate() === 4) ||
                      (prev.getMonth() === 11 && prev.getDate() === 25)
                    ) {
                      prev = new Date(prev.setDate(prev.getDate() + 1));
                    }

                    date = new Date(prev);
                    setEstimateTime(date);
                  }
                }
                if (values.type === "Cotton" && values.quantity >= 50) {
                  for (let i = 0; i < 3; i++) {
                    let prev = new Date(date);
                    prev = new Date(prev.setDate(prev.getDate() + 1));
                    if (prev.getDay() === 6) {
                      prev = new Date(prev.setDate(prev.getDate() + 2));
                    }
                    if (prev.getDay() === 0) {
                      prev = new Date(prev.setDate(prev.getDate() + 1));
                    }
                    if (
                      (prev.getMonth() === 6 && prev.getDate() === 4) ||
                      (prev.getMonth() === 11 && prev.getDate() === 25)
                    ) {
                      prev = new Date(prev.setDate(prev.getDate() + 1));
                    }
                    date = new Date(prev);
                    setEstimateTime(date);
                  }
                }
                if (values.type === "Linen" && values.quantity < 50) {
                  for (let i = 0; i < 4; i++) {
                    let prev = new Date(date);
                    prev = new Date(prev.setDate(prev.getDate() + 1));
                    if (prev.getDay() === 6) {
                      prev = new Date(prev.setDate(prev.getDate() + 2));
                    }
                    if (prev.getDay() === 0) {
                      prev = new Date(prev.setDate(prev.getDate() + 1));
                    }
                    if (
                      (prev.getMonth() === 6 && prev.getDate() === 4) ||
                      (prev.getMonth() === 11 && prev.getDate() === 25)
                    ) {
                      prev = new Date(prev.setDate(prev.getDate() + 1));
                    }
                    date = new Date(prev);
                    setEstimateTime(date);
                  }
                }
                if (values.type === "Linen" && values.quantity >= 50) {
                  for (let i = 0; i < 5; i++) {
                    let prev = new Date(date);
                    prev = new Date(prev.setDate(prev.getDate() + 1));
                    if (prev.getDay() === 6) {
                      prev = new Date(prev.setDate(prev.getDate() + 2));
                    }
                    if (prev.getDay() === 0) {
                      prev = new Date(prev.setDate(prev.getDate() + 1));
                    }
                    if (
                      (prev.getMonth() === 6 && prev.getDate() === 4) ||
                      (prev.getMonth() === 11 && prev.getDate() === 25)
                    ) {
                      prev = new Date(prev.setDate(prev.getDate() + 1));
                    }
                    date = new Date(prev);
                    setEstimateTime(date);
                  }
                }
              }}
            >
              {({
                handleChange,
                handleSubmit,
                values,
                handleReset,
                errors,
                touched,
                dirty,
                handleBlur,
              }) => (
                <form onSubmit={handleSubmit}>
                  <input
                    id="date"
                    name="date"
                    type="text"
                    ref={ref}
                    placeholder="OrderDate"
                    className="inputStyle"
                    value={values.date}
                    min={new Date().toJSON().slice(0, 10).replace(/-/g, "-")}
                    onChange={handleChange}
                    onFocus={() => (ref.current.type = "date")}
                    onBlur={() => (ref.current.type = "date")}
                    style={{ color: `${dirty ? "black" : ""}` }}
                  />
                  <select
                    name="type"
                    id="type"
                    className="selectInput"
                    onChange={handleChange}
                    value={values.type}
                    style={{
                      color: `${dirty ? "black" : ""}`,
                    }}
                  >
                    <option value="" hidden disabled selected>
                      Fabric Type
                    </option>
                    <option value="Cotton" label="Cotton" />
                    <option value="Linen" label="Linen" />
                  </select>

                  <input
                    id="quantity"
                    name="quantity"
                    onChange={handleChange}
                    type="text"
                    value={values.quantity}
                    placeholder="Quantity"
                    className="inputStyle"
                    style={{ color: `${dirty ? "black" : ""}` }}
                    errorMessage={errors.quantity}
                    onBlur={handleBlur}
                  />
                  <button className="buttonStyle" type="submit">
                    Calculate
                  </button>
                  <div style={{ marginTop: "1em" }}>
                    {errors.date && touched.date && (
                      <div className="alert alert-danger col-md-6">
                        {errors.date}
                      </div>
                    )}
                    {errors.type && touched.type && (
                      <div className="alert alert-danger col-md-6">
                        {errors.type}
                      </div>
                    )}
                    {errors.quantity && touched.quantity && (
                      <div className="alert alert-danger col-md-6">
                        {errors.quantity}
                      </div>
                    )}
                  </div>
                </form>
              )}
            </Formik>
            {isInfoComplete ? (
              <div className="textLight">
                Your Estimated Shipping Date is{"   "}
                <h3 className="textStrong">{moment(estTime).format("LL")}</h3>
              </div>
            ) : (
              <div className="textLight">
                Please enter your order information to estimate shipping date
              </div>
            )}
          </div>
        </div>
        <div className="colored"></div>
      </div>
    </div>
  );
};

export default App;
