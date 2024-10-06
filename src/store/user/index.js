import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      name: '',
      phone: '',
      email: '',
      token: '',
      waiting: false,
      successfully: false,
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
        throw new Error(error.data.issues[0].message);
      }

      const json = await res.json();
      this.setState({
        name: json.result?.user.profile.name,
        phone: json.result?.user.profile.phone,
        email: json.result?.user.email,
        token: json.result?.token,
        waiting: false,
        successfully: true,
        error: '',
      });

      localStorage.setItem('token', json.result?.token);
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        successfully: false,
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

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error.message);
      }

      this.setState({
        name: '',
        phone: '',
        email: '',
        token: '',
        waiting: false,
        successfully: false,
        error: '',
      });

      localStorage.removeItem('token');
    } catch (error) {
      this.setState({
        waiting: false,
        successfully: false,
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

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error.message);
      }

      const json = await res.json();
      this.setState({
        name: json.result.profile.name,
        phone: json.result.profile.phone,
        email: json.result.email,
        token: token,
        waiting: false,
        successfully: true,
        error: '',
      });
    } catch (e) {
      this.setState({
        waiting: false,
      });
      console.error(e);
    }
  }

  deleteError() {
    this.setState({
      ...this.getState(),
      error: '',
    });
  }
}

export default UserState;
