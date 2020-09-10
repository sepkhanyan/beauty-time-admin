import Resource from '@/api/resource';
import request from '@/utils/request';

class CategoryResource extends Resource {
  constructor() {
    super('categories');
  }

  sort(data) {
    return request({
      url: '/' + this.uri + '/sort',
      method: 'post',
      data: data,
    });
  }
}

export { CategoryResource as default };
