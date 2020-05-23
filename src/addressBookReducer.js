const initialState = {
  data: [],
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
    case "edit":
      state.editingRowId = action.payload;
      return state;
    case "phone_changed":
      console.log(state.editingRowId, action.payload)
      state.editedCellphones[state.editingRowId] = action.payload;
      state.data.forEach(row => {
        if (row.id === state.editingRowId) {
          row.cellphone = action.payload;
        }
      })
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
