import StoreModule from '../module';

class CategoryState extends StoreModule {
  initState() {
    return {
      categories: [],
    };
  }

  async setCategories() {
    const res = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await res.json();

    this.setState(
      {
        categories: json.result.items,
      },
      'Получили список категорий',
    );
  }
}

export default CategoryState;
