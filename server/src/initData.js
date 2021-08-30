import {Task} from './models';
import callFakeApi from './fake.api';


export default async function initSchema() {
    const count = await Task.countDocuments({});
    if(count == 0) {
      console.log('no documents.... insert 50...');
      const tasks = await callFakeApi(50);
      await Task.insertMany(tasks.map(t => ({ title: t.title })));
    }
};
