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
    case "load":
      state.data = action.payload;
      return state;
    case "select":
      state.data.forEach((row) => {
        if (row.id === action.payload) {
          row.selected = !(row.selected || false);
        }
      });
      return state;
    case "select_all":
      state.selectAll = !state.selectAll;
      state.data.forEach((row) => {
        row.selected = state.selectAll;
      });
      return state;
    case "edit":
      state.editingRowId = action.payload;
      return state;
    case "phone_changed":
      console.log(state.editingRowId, action.payload);
      state.editedCellphones[state.editingRowId] = action.payload;
      state.data.forEach((row) => {
        if (row.id === state.editingRowId) {
          row.cellphone = action.payload;
        }
      });
      return state;
    case "delete":
      for (let i = state.data.length - 1; i >= 0; i--) {
        const row = state.data[i];
        if (row.selected) {
          state.data.splice(i, 1);
          state.deletedRowIds.push(row.id);
        }
      }
      return state;
    case "add":
      state.adding = true;
      return state;
    case "add_input_changed":
      state.addedRow[action.payload.field] = action.payload.value;
      return state;
    case "sort":
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

export { initialState, addressBookReducer };
