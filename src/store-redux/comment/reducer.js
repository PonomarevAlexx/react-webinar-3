// Начальное состояние
export const initialState = {
  items: [],
  count: 0,
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comment/load-start':
      return { ...state, data: {}, waiting: true };

    case 'comment/load-success':
      const { items, count } = action.payload;
      return {
        ...state,
        items,
        count,
        waiting: false,
      };

    case 'comment/load-error':
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    case 'comment/post-success':
      console.log('hi', action.payload.data, state.data);
      return {
        ...state,
        items: [...state.items, action.payload],
        count: state.count + 1,
        waiting: false,
      };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
