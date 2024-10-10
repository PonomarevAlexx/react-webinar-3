export default {
  /**
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comment/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        console.log(res.data.result)
        // Коммент загружен успешно
        dispatch({ type: 'comment/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comment/load-error' });
        console.error(e)
      }
    };
  },

//   post: data => {
//     return async (dispatch, getState, services) => {
//         // Сброс комментариев и установка признака ожидания загрузки
//         dispatch({ type: 'comment/post-start' });
  
//         try {
//           const res = await services.api.request({
//             url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
//           });
//           // Коммент загружен успешно
//           dispatch({ type: 'comment/post-success', payload: { data: res.data.result } });
//         } catch (e) {
//           //Ошибка загрузки
//           dispatch({ type: 'comment/post-error' });
//         }
//       };
//   }
};
