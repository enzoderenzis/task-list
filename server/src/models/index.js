import {db} from '../db';
import TaskSchema from  './Task';


const Task = db.model('tasks', TaskSchema);

export {
  Task,
}
