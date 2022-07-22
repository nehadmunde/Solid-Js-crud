import { Component, createEffect, createSignal } from "solid-js";
import axios from "axios";
import { render } from "solid-js/web";
import { For } from "solid-js";

const DisplayUser: Component = () => {
  //   const [state: Accessor<T>, setState: Setter<T>] = createSignal<T>(
  //  value: T,
  //  options?: { name?: string, equals?: false | ((prev: T, next: T) => boolean) }
  const [updatedata, setUpdateData] = createSignal([]);
  //update

  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [phone, setPhone] = createSignal("");
  const [role, setRole] = createSignal("");
  const [data, setData] = createSignal([]);
  const [flag, setFlag] = createSignal(0);

  createEffect(() => {
    axios
      .get("http://localhost:9001/solid-js")
      .then((res) => {
        // console.log("data from createEffect", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    flag();
  });

  const handleEdit = async (i: Event): void => {
    console.log("Data from Edit ", i);
    await axios
      .get(`http://localhost:9001/solid-js/edit/${i}`)
      .then((res) => {
        setUpdateData(res.data);

        console.log(updatedata());
        // alert("Record Deleted Sucesfully.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = async (i: Event): void => {
    //i.preventDefault();
    const dataToSubmit = {
      name: name() || updatedata().name,
      email: email() || updatedata().email,
      phone: phone() || updatedata().phone,
      role: role() || updatedata().role,
    };
    console.log(`submitting`, dataToSubmit);
    console.log("updated id=", updatedata()._id);

    await axios
      .put(
        `http://localhost:9001/solid-js/edit/${updatedata()._id}`,
        dataToSubmit
      )
      .then((res) => {
        console.log(res.data);
        setFlag(flag() + 1);
        console.log("update", flag());
        alert(`Record of ${updatedata().name} is updated`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (i: Event): void => {
    console.log("Data from Delete ", i);
    await axios
      .delete(`http://localhost:9001/solid-js/delete/${i}`)
      .then((res) => {
        // console.log(res.data);
        setFlag(flag() + 1);
        console.log("delete", flag());
        alert("Record Deleted Sucesfully.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="container row">
      <div class="col-md-10 offset-2  mt-4">
        <h1>View User</h1>
        <hr />
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <For each={data()} fallback={<div>Loading...</div>}>
              {(user, i) => (
                <tr>
                  <td>{i() + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => handleEdit(user._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>{" "}
                    <button
                      type="button"
                      onClick={() => handleDelete(user._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>

        {/* <!-- Button trigger modal --> */}

        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit User Details
                </h5>

                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form onSubmit={() => handleUpdate(updatedata()._id)}>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      User Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      name="name"
                      value={updatedata().name}
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
                      name="email"
                      value={updatedata().email}
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
                      value={updatedata().phone}
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
                      value={updatedata().role}
                      onChange={(e) => setRole(e.currentTarget.value)}
                      aria-label="Default select example"
                    >
                      <option>Open this select menu</option>
                      <option value="Trainee">Trainee</option>
                      <option value="Jr. Developer">Jr. Developer</option>
                      <option value="Sr. Developer">Sr. Developer</option>
                    </select>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={handleUpdate}
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayUser;
