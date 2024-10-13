// Начальное состояние
export const initialState = {
  data: [],
  count: 0,
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comment/load-start':
      return { ...state, data: {}, waiting: true };

    case 'comment/load-success':
      return {
        ...state,
        data: action.payload.data,
        count: action.payload.data.count,
        waiting: false,
      };

    case 'comment/load-error':
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    case 'comment/post-success':
      console.log('hi', action.payload.data, state.data);
      return {
        ...state,
        data: [...state.data, action.payload.data],
        count: state.count + 1,
        waiting: false,
      };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
