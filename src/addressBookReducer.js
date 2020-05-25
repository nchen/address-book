// Action types used by address book component, 
// which can be dispatched to the addressBookReducer.
const AddressBookActionTypes = {
  LOAD: "load", // Load initial address book data. (Currently this action is not used as the data is loaded from JSON file directly)
  SELECT: "select", // Select a row.
  SELECT_ALL: "select_all", // Select all rows.
  EDIT: "edit", // Begin editing cellphone number of a row.
  PHONE_CHANGED: "phone_changed", // Phone number changed.
  DELETE: "delete", // Delete button clicked.
  ADD: "add", // Add button clicked.
  ADD_INPUT_CHANGED: "add_input_changed", // Triggered when an input in the adding form changed.
  SORT: "sort", // Column header clicked on sorting.
};

const initialState = {
  data: [],
  selectAll: false,
  sortBy: "id",
  editingRowId: -1,
  editedCellphones: {},
  deletedRowIds: [],
  addedRow: {},
  adding: false,
};

const addressBookReducer = function (state, action) {
  switch (action.type) {
    case AddressBookActionTypes.LOAD:
      state.data = action.payload;
      return state;
    case AddressBookActionTypes.SELECT:
      state.data.forEach((row) => {
        if (row.id === action.payload) {
          row.selected = !(row.selected || false);
        }
      });
      return state;
    case AddressBookActionTypes.SELECT_ALL:
      state.selectAll = !state.selectAll;
      state.data.forEach((row) => {
        row.selected = state.selectAll;
      });
      return state;
    case AddressBookActionTypes.EDIT:
      state.editingRowId = action.payload;
      return state;
    case AddressBookActionTypes.PHONE_CHANGED:
      console.log(state.editingRowId, action.payload);
      state.editedCellphones[state.editingRowId] = action.payload;
      state.data.forEach((row) => {
        if (row.id === state.editingRowId) {
          row.cellphone = action.payload;
        }
      });
      return state;
    case AddressBookActionTypes.DELETE:
      for (let i = state.data.length - 1; i >= 0; i--) {
        const row = state.data[i];
        if (row.selected) {
          state.data.splice(i, 1);
          state.deletedRowIds.push(row.id);
        }
      }
      return state;
    case AddressBookActionTypes.ADD:
      state.adding = true;
      return state;
    case AddressBookActionTypes.ADD_INPUT_CHANGED:
      state.addedRow[action.payload.field] = action.payload.value;
      return state;
    case AddressBookActionTypes.SORT:
      const column = action.payload;
      state.sortBy = column;
      state.data.sort((a, b) => {
        if (a[column] < b[column]) {
          return -1;
        } else if (a[column] > b[column]) {
          return 1;
        }
        return 0;
      });
      return state;
    default:
      return state;
  }
};

export { AddressBookActionTypes, initialState, addressBookReducer };
