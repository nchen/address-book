import React from "react";
import addressData from "./addressData.json";
import { initialState, addressBookReducer } from "./addressBookReducer";
import { useImmerReducer } from "use-immer";

const _initialState = { ...initialState, data: addressData };

const doUpdate = (state) => {
  const updateData = {
    deletedRowIds: state.deletedRowIds,
    editedCellphones: state.editedCellphones
  }
  alert('Updating data: \n' + JSON.stringify(updateData));
};

const AddressBook = () => {
  let [state, dispatch] = useImmerReducer(addressBookReducer, _initialState);

  return (
    <div>
      <table border="1" cellPadding="5">
        <tbody>
          <tr>
            <th rowSpan="2">
              <input
                type="checkbox"
                checked={state.selectAll}
                onChange={() => dispatch({ type: "select_all" })}
              />
            </th>
            <th
              rowSpan="2"
              onClick={() => dispatch({ type: "sort", payload: "id" })}
            >
              ID
            </th>
            <th
              rowSpan="2"
              onClick={() => dispatch({ type: "sort", payload: "name" })}
            >
              Name
            </th>
            <th
              rowSpan="2"
              onClick={() => dispatch({ type: "sort", payload: "location" })}
            >
              Location
            </th>
            <th
              rowSpan="2"
              onClick={() => dispatch({ type: "sort", payload: "office" })}
            >
              Office
            </th>
            <th colSpan="2">Phone</th>
          </tr>
          <tr>
            <th
              onClick={() => dispatch({ type: "sort", payload: "officePhone" })}
            >
              Office
            </th>
            <th
              onClick={() => dispatch({ type: "sort", payload: "cellphone" })}
            >
              Home
            </th>
          </tr>
          {state.data.map((addr) => (
            <tr key={addr.id}>
              <td>
                <input
                  type="checkbox"
                  checked={addr.selected || false}
                  onChange={() =>
                    dispatch({ type: "select", payload: addr.id })
                  }
                />
              </td>
              <td>{addr.id}</td>
              <td>{addr.name}</td>
              <td>{addr.location}</td>
              <td>{addr.office}</td>
              <td>{addr.officePhone}</td>
              <td
                onDoubleClick={() =>
                  dispatch({ type: "edit", payload: addr.id })
                }
                onChange={(evt) =>
                  dispatch({ type: "phone_changed", payload: evt.target.value })
                }
              >
                {state.editingRowId === addr.id ? (
                  <input value={addr.cellphone} />
                ) : (
                  addr.cellphone
                )}
              </td>
            </tr>
          ))}
          {state.adding ? (
            <tr>
              <td></td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      <div>
        <button onClick={() => dispatch({ type: "delete" })}>Delete</button>
        <button onClick={() => doUpdate(state)}>Update</button>
        <button onClick={() => dispatch({ type: "add" })}>Add</button>
      </div>
    </div>
  );
};

export default AddressBook;
