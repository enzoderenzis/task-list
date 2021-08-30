import { Schema } from '../db';

const TaskSchema = Schema({
  title: { type: String },
  status: {
    type: String,
    enum : ['NEW','COMPLETED'],
    default: 'NEW'
  }
});

export default TaskSchema;
