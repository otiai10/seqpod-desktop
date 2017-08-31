import {Model} from 'chomex';

export default class Job extends Model {
  static list() {
    return super.list().reverse();
  }
  status() {
    if (this.errors.length) return 'error';
    return 'completed';
  }
}
