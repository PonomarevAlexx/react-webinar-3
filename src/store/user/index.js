import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      name: '',
      phone: '',
      email: '',
      token: '',
      waiting: false,
      error: '',
    };
  }

  async logIn(login, password) {
    this.setState({
      waiting: true,
    });

    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error.message);
      }

      const json = await res.json();

      this.setState({
        name: json.result?.user.username,
        phone: json.result?.user.profile.phone,
        email: json.result?.user.email,
        token: json.result?.token,
        waiting: false,
        error: '',
      });

      localStorage.setItem('token', json.result?.token);
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: error.message,
      });
      console.error(error.message);
    }
  }

  async logOut() {
    this.setState({
      waiting: true,
    });
    const token = this.getState().token || localStorage.getItem('token');

    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      this.setState({
        name: '',
        phone: '',
        email: '',
        token: '',
        waiting: false,
        error: '',
      });

      localStorage.removeItem('token');
    } catch (error) {
      this.setState({
        waiting: false,
      });
      console.error(error);
    }
  }

  async getUser() {
    const token = this.getState().token || localStorage.getItem('token');
    this.setState({
      waiiting: true,
    });
    try {
      const res = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      const json = await res.json();
      this.setState({
        name: json.result.user.username,
        phone: json.result.user.profile.phone,
        email: json.result.user.email,
        token: json.result.token,
        waiting: false,
        error: '',
      });
    } catch (e) {
      this.setState({
        waiting: false,
      });
      console.error(e);
    }
  }
}

export default UserState;
