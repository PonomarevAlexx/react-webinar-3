/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cartList: [],
      costAllGods: 0,
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление в корзину
   * @param item {Object}
   */
  addItemToCartList(item) {
    const itemIndex = this.state.cartList.findIndex(itemList => itemList.code === item.code);

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };

      this.setState({
        ...this.state,
        cartList: [...this.state.cartList, newItem],
      });
    } else {
      const newCartList = this.state.cartList.map((cartItem, index) => {
        if (itemIndex === index) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        } else {
          return cartItem;
        }
      });

      this.setState({
        ...this.state,
        cartList: newCartList,
      });
    }

    this.setCostAllGods();
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItemFromCartList(code) {
    this.setState({
      ...this.state,
      cartList: this.state.cartList.filter(item => item.code !== code),
    });

    this.setCostAllGods();
  }

  setCostAllGods() {
    this.setState({
      ...this.state,
      costAllGods: this.state.cartList.reduce((acc, item) => acc + item.price * item.quantity, 0),
    });
  }
}

export default Store;
