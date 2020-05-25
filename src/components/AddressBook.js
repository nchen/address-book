import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import addressData from "../assets/data/addressData.json";
import {
  AddressBookActionTypes,
  initialState,
  addressBookReducer,
} from "../addressBookReducer";
import { useImmerReducer } from "use-immer";
import { produce } from "immer";
import { useTranslation } from "react-i18next";

const _initialState = { ...initialState, data: addressData };

const AddressBook = () => {
  let { t, i18n } = useTranslation();
  let [state, dispatch] = useImmerReducer(addressBookReducer, _initialState);

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
      addedRow: state.addedRow,
    };
    alert("Updating data: \n" + JSON.stringify(updateData));
  };

  return (
    <div>
      <div className="text-right mt-3 mx-5">
        {t("switch_lang")}
        <Button
          onClick={() =>
            i18n.changeLanguage(i18n.language === "en" ? "zh" : "en")
          }
        >
          {i18n.language === "en" ? "简体中文" : "English"}
        </Button>
      </div>
      <h1>{t("address_book_title")}</h1>

      <Table striped bordered hover className="table-sm mx-2">
        <thead>
          <tr>
            <th rowSpan="2">
              <input
                type="checkbox"
                checked={state.selectAll}
                onChange={() =>
                  dispatch({ type: AddressBookActionTypes.SELECT_ALL })
                }
              />
            </th>
            <th
              rowSpan="2"
              onClick={() =>
                dispatch({ type: AddressBookActionTypes.SORT, payload: "id" })
              }
            >
              {t("id")}
            </th>
            <th
              rowSpan="2"
              onClick={() =>
                dispatch({ type: AddressBookActionTypes.SORT, payload: "name" })
              }
            >
              {t("name")}
            </th>
            <th
              rowSpan="2"
              onClick={() =>
                dispatch({
                  type: AddressBookActionTypes.SORT,
                  payload: "location",
                })
              }
            >
              {t("location")}
            </th>
            <th
              rowSpan="2"
              onClick={() =>
                dispatch({
                  type: AddressBookActionTypes.SORT,
                  payload: "office",
                })
              }
            >
              {t("office")}
            </th>
            <th colSpan="2">{t("phone")}</th>
          </tr>
          <tr>
            <th
              onClick={() =>
                dispatch({
                  type: AddressBookActionTypes.SORT,
                  payload: "officePhone",
                })
              }
            >
              {t("office")}
            </th>
            <th
              onClick={() =>
                dispatch({
                  type: AddressBookActionTypes.SORT,
                  payload: "cellphone",
                })
              }
            >
              {t("home")}
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
                    dispatch({
                      type: AddressBookActionTypes.SELECT,
                      payload: addr.id,
                    })
                  }
                />
              </td>
              <td>{addr.id}</td>
              <td>{addr.name}</td>
              <td>{addr.location}</td>
              <td>{addr.office}</td>
              <td>{addr.officePhone}</td>
              <td
                title={t("double_click_to_edit")}
                onDoubleClick={() =>
                  dispatch({
                    type: AddressBookActionTypes.EDIT,
                    payload: addr.id,
                  })
                }
              >
                {state.editingRowId === addr.id ? (
                  <input
                    value={addr.cellphone}
                    onChange={(evt) =>
                      dispatch({
                        type: AddressBookActionTypes.PHONE_CHANGED,
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
              <td></td>
              <td>
                <input
                  onChange={(evt) =>
                    dispatch({
                      type: AddressBookActionTypes.ADD_INPUT_CHANGED,
                      payload: { field: "name", value: evt.target.value },
                    })
                  }
                />
              </td>
              <td>
                <input
                  onChange={(evt) =>
                    dispatch({
                      type: AddressBookActionTypes.ADD_INPUT_CHANGED,
                      payload: { field: "location", value: evt.target.value },
                    })
                  }
                />
              </td>
              <td>
                <input
                  onChange={(evt) =>
                    dispatch({
                      type: AddressBookActionTypes.ADD_INPUT_CHANGED,
                      payload: { field: "office", value: evt.target.value },
                    })
                  }
                />
              </td>
              <td>
                <input
                  onChange={(evt) =>
                    dispatch({
                      type: AddressBookActionTypes.ADD_INPUT_CHANGED,
                      payload: {
                        field: "officePhone",
                        value: evt.target.value,
                      },
                    })
                  }
                />
              </td>
              <td>
                <input
                  onChange={(evt) =>
                    dispatch({
                      type: AddressBookActionTypes.ADD_INPUT_CHANGED,
                      payload: { field: "cellphone", value: evt.target.value },
                    })
                  }
                />
              </td>
            </tr>
          ) : null}
        </tbody>
      </Table>
      <Row>
        <Col className="text-left p-5">
          <Button
            variant="danger"
            onClick={() => dispatch({ type: AddressBookActionTypes.DELETE })}
          >
            {t("delete")}
          </Button>
        </Col>
        <Col className="text-right p-5">
          <Button
            variant="warning"
            className="mx-5"
            onClick={() => doUpdate(state)}
          >
            {t("update")}
          </Button>
          <Button
            variant="warning"
            onClick={() => dispatch({ type: AddressBookActionTypes.ADD })}
          >
            {t("add")}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddressBook;
