//reducer takes 2 arguments, state of the container and an action
function reducer(state = [], action) {
  switch (action.type) {
    case "ALL_MESSAGES": {
      console.log("payload", action.payload); //check your state in the  redux store at this step
      return action.payload;
    }
    default:
      return state;
  }
}

export default reducer;
