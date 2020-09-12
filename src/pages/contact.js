import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendEmail } from "../redux/actions/message-action";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  //   const sendMessage = useSelector(state => state.sendMessage);
  //   const { loading, error } = sendMessage;
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(sendEmail(email, message));
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="row justify-content-md-center">
          <h1>Nous contacter</h1>
        </div>
        <div>
          <fieldset className="col-md-4 form-group">
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Votre Email"
              onChange={e => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="col-md-4 form-group">
            <textarea
              name="message"
              id="message"
              type="text"
              cols="30"
              rows="5"
              placeholder="Ecrivez votre message..."
              onChange={e => setMessage(e.target.value)}
            />
          </fieldset>
        </div>
        <div className="row justify-content-md-center">
          <button type="submit" className="btn btn-primary btn-raised">
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
