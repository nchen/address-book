const initialState = {
  data: [],
  selectAll: false,
  sortBy: "id",
  editingRowId: -1,
  editedCellphones: {},
  deletedRowIds: [],
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
      //  TODO:
      return state;
    case "delete":
      state.deletedRowIds.push(action.payload);
      return state;
    case "sort":
      state.sortBy = action.payload;
      return state;
    default:
      return state;
  }
};

export { initialState, addressBookReducer };
