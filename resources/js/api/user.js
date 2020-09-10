import request from '@/utils/request';
import Resource from '@/api/resource';

class UserResource extends Resource {
  constructor() {
    super('users');
  }

  permissions(id) {
    return request({
      url: '/' + this.uri + '/' + id + '/permissions',
      method: 'get',
    });
  }

  updatePermission(id, permissions) {
    return request({
      url: '/' + this.uri + '/' + id + '/permissions',
      method: 'put',
      data: permissions,
    });
  }

  sendNotification(data) {
    return request({
      url: '/' + this.uri + '/' + data.id + '/notify',
      method: 'post',
      data: data,
    });
  }

  reInvite(id) {
    return request({
      url: '/' + this.uri + '/' + id + '/re-invite',
      method: 'get',
    });
  }
}

export { UserResource as default };
