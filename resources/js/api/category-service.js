import Resource from '@/api/resource';
import request from '@/utils/request';

class CategoryServiceResource extends Resource {
  constructor() {
    super('category-services');
  }

  sort(data) {
    return request({
      url: '/' + this.uri + '/sort',
      method: 'post',
      data: data,
    });
  }
}

export { CategoryServiceResource as default };
