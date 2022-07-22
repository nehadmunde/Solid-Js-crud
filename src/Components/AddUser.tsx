import { Component, createSignal } from "solid-js";
import { For } from "solid-js";
import axios from "axios";
const AddUser: Component = () => {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [phone, setPhone] = createSignal("");
  const [role, setRole] = createSignal("");

  const handleSubmit = async (event: Event): void => {
    event.preventDefault();
    const dataToSubmit = {
      name: name(),
      email: email(),
      phone: phone(),
      role: role(),
    };
    console.log(`submitting`, dataToSubmit);
    await axios
      .post("http://localhost:9001/solid-js", dataToSubmit)
      .then((res) => {
        alert("Record Saved");
        // console.log("post", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div class="container row">
      <div class="col-md-8 offset-3 mt-4">
        <h1>Add User</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              User Name
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Abc"
              id="name"
              name="name"
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Email-Id
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="exaple@gmail.com"
              name="email"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Phone No.
            </label>
            <input
              type="tel"
              class="form-control"
              id="email"
              name="phone"
              pattern="[0-9]{10}"
              placeholder="9503816224"
              onChange={(e) => setPhone(e.currentTarget.value)}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Select Role
            </label>
            <select
              name="role"
              class="form-select"
              onChange={(e) => setRole(e.currentTarget.value)}
              aria-label="Default select example"
            >
              <option selected>Open this select menu</option>
              <option value="Trainee">Trainee</option>
              <option value="Jr. Developer">Jr. Developer</option>
              <option value="Sr. Developer">Sr. Developer</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
