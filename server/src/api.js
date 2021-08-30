import {Task} from './models';
const DEFAULT_QUANTITY = 3;

export function getTasks( size = DEFAULT_QUANTITY) {
  console.log("getting tasks", size);
  return Task.find({}).limit(Number(size)).lean();
}

export function maskAsComplete(taskId)  {
  return Task.findOneAndUpdate({_id: taskId}, {status: 'COMPLETED'});
}
