import React, { useRef, useState, useEffect } from "react";
import "./form.css";
const Form = () => {
  const fecth_url_API = "https://frontend-take-home.fetchrewards.com/form";
  const [userInfo, setUserInfo] = useState([]);

  // Used useRef Hook to extract input Values
  const full_name_Ref = useRef(null);
  const email_Ref = useRef(null);
  const password_Ref = useRef(null);
  const occupations_Ref = useRef(null);
  const states_Ref = useRef(null);
  useEffect(() => {
    fetch(fecth_url_API)
      .then((resp) => resp.json())
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        return [error];
      });
  }, []);
  let occupationsArray = userInfo.occupations;
  let statesObject = userInfo.states;
  const statesArray = statesObject?.map((data) => data.name);
  console.log(statesArray);

  const handleRegistration = (e) => {
    const form = document.getElementById("form-reset");
    const errorEl = document.getElementById("errors");
    let Messages = [];
    e.preventDefault();
    const refs = {
      name: full_name_Ref.current.value,
      email: email_Ref.current.value,
      password: password_Ref.current.value,
      occupation: occupations_Ref.current.value,
      state: states_Ref.current.value,
    };

    if (refs.name.length < 1) {
      Messages.push("Full Name is required");
    }
    if (!refs.email.includes("@") && refs.email <= 5) {
      Messages.push("Invalid Email Need @");
    }
    if (refs.password <= 6) {
      Messages.push("Invalid password must be at least 6 characters");
    }
    if (refs.occupation === "occupations") {
      Messages.push("Please choose an occupation");
    }
    if (refs.state === "States") {
      Messages.push("Please choose a state");
    }
    if (Messages.length >= 1) {
      errorEl.innerText = Messages.join(`\n`);
    }

    if (Messages.length <= 0) {
      errorEl.innerText = "Thank you Your form have been Submitted";
      errorEl.style.color = "green";
      fetch(fecth_url_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(refs),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        });
    }

    form.reset();

    console.log(refs);
  };

  // Adding Tags options using a for Loop with occupation array

  let occupationsInput = document.getElementById("occupations");
  for (let i = 0; i < occupationsArray?.length; i++) {
    let option = document.createElement("option");
    let txt = document.createTextNode(occupationsArray[i]);
    option.appendChild(txt);
    occupationsInput.insertBefore(option, occupationsInput.lastChild);
  }

  // Adding Tags options using a for Loop with states Array

  let stateInput = document.getElementById("states");
  for (let i = 0; i < statesArray?.length; i++) {
    let option = document.createElement("option");
    let txt = document.createTextNode(statesArray[i]);
    option.appendChild(txt);
    stateInput.insertBefore(option, stateInput.lastChild);
  }

  return (
    <div className="form-container">
      <form id="form-reset" action="/" method="GET">
        <h1>Registration Form</h1>
        <input
          ref={full_name_Ref}
          type="text"
          placeholder="Full Name"
          htmlFor="full-name"
          required
        ></input>
        <input
          ref={email_Ref}
          type="email"
          placeholder="Email"
          htmlFor="email"
        />

        <input
          ref={password_Ref}
          type="password"
          placeholder="Password"
          htmlFor="password"
        />

        <select
          ref={occupations_Ref}
          id="occupations"
          name="occupations"
          defaultValue="Occupation"
        >
          <option value="occupations" defaultValue="Occupations">
            Occupations
          </option>
          ;
        </select>
        <select ref={states_Ref} id="states" name="states">
          <option value="States" defaultValue="States">
            States
          </option>
          ;
        </select>
        <button
          type="submit"
          className="btn-register"
          onClick={(e) => handleRegistration(e)}
        >
          Register Now
        </button>
        <div id="errors" className="errors_color"></div>
      </form>
    </div>
  );
};

export default Form;
