import React, { useState, useReducer } from "react";
import addressData from "./addressData.json";
import { initialState, addressBookReducer } from "./addressBookReducer";
import { produce } from "immer";
import { useImmerReducer } from "use-immer";

const _initialState = { ...initialState, data: addressData };

const sortBy = (data, column) => {
  return produce(data, (draft) => {
    console.log("Ordering by: ", column);
    draft.sort((a, b) => {
      if (a[column] < b[column]) {
        return -1;
      } else if (a[column] > b[column]) {
        return 1;
      }
      return 0;
    });
  });
};

const AddressBook = () => {
  let [state, dispatch] = useImmerReducer(addressBookReducer, _initialState);

  // let [column, setColumn] = useState("id");
  const data = sortBy(state.data, state.sortBy);
  // let [editingRow, setEditingRow] = useState(-1);

  return (
    <table border="1" cellPadding="5">
      <tbody>
        <tr>
          <th rowSpan="2">
            <input
              type="checkbox"
              checked={state.selectAll}
              onClick={() => dispatch({ type: "select_all" })}
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
          <th onClick={() => dispatch({ type: "sort", payload: "cellphone" })}>
            Home
          </th>
        </tr>
        {data.map((addr) => (
          <tr key={addr.id}>
            <td>
              <input
                type="checkbox"
                checked={addr.selected || false}
                onClick={() => dispatch({ type: "select", payload: addr.id })}
              />
            </td>
            <td>{addr.id}</td>
            <td>{addr.name}</td>
            <td>{addr.location}</td>
            <td>{addr.office}</td>
            <td>{addr.officePhone}</td>
            <td
              onDoubleClick={() => dispatch({ type: "edit", payload: addr.id })}
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
      </tbody>
    </table>
  );
};

export default AddressBook;
