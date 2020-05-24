import React, { useState } from "react";
import { Table, Button, Row, Col, Modal } from "react-bootstrap";
import addressData from "./addressData.json";
import { initialState, addressBookReducer } from "./addressBookReducer";
import { useImmerReducer } from "use-immer";
import { produce } from "immer";

const _initialState = { ...initialState, data: addressData };

const AddressBook = () => {
  let [state, dispatch] = useImmerReducer(addressBookReducer, _initialState);
  let [showDialog, setShowDialog] = useState(false);
  let [msg, setMsg] = useState("");
  const handleClose = () => {
    setShowDialog(false);
  };

  const doUpdate = (state) => {
    // Exclude deleted rows for updating.
    let editedCellphones = produce(state.editedCellphones, (draft) => {
      for (let id in draft) {
        const rowId = parseInt(id);
        if (state.deletedRowIds.indexOf(rowId) > -1) {
          delete draft[id];
        }
      }
    });

    const updateData = {
      deletedRowIds: state.deletedRowIds,
      editedCellphones,
    };
    setMsg("Updating data: \n" + JSON.stringify(updateData));
    setShowDialog(true);
  };

  return (
    <div>
      <h1>Address Book</h1>

      <Table striped bordered hover>
        <thead>
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
        </thead>
        <tbody>
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
              >
                {state.editingRowId === addr.id ? (
                  <input
                    value={addr.cellphone}
                    onChange={(evt) =>
                      dispatch({
                        type: "phone_changed",
                        payload: evt.target.value,
                      })
                    }
                  />
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
      </Table>
      <Row>
        <Col className="text-left p-5">
          <Button variant="danger" onClick={() => dispatch({ type: "delete" })}>
            Delete
          </Button>
        </Col>
        <Col className="text-right p-5">
          <Button
            variant="warning"
            className="mx-5"
            onClick={() => doUpdate(state)}
          >
            Update
          </Button>
          <Button variant="warning" onClick={() => dispatch({ type: "add" })}>
            Add
          </Button>
        </Col>
      </Row>

      <Modal show={showDialog} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{msg}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddressBook;
