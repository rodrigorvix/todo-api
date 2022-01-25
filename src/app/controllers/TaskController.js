import * as Yup from 'yup'

import Task from '../models/Task';

class TaskController {
  async index(req, res) {
    
    const tasks = await Task.findAll({
      where: { user_id: req.userId, check: false },
    })
    return res.json(tasks)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation failed.' });
  }

  const { description } = req.body;

    const tasks = await Task.create({
     user_id: req.userId,
     description,
    })

    return res.json(tasks);
  }

  async update(req, res) {
    const { task_id } = req.params

    const task = await Task.findByPk(task_id)

    if (!task) {
      return res.status(400).json({ error: 'Task does not exists.' });
    }

    if(task.user_id !== req.userId){
      return res.status(401).json({ error: 'Task does not belong to this user.' })
    }

    await task.update(req.body);

    return res.json(task);
  }

  async delete(req, res) {
    const { task_id } = req.params

    const task = await Task.findByPk(task_id)

    if (!task) {
      return res.status(400).json({ error: 'Task does not exists.' });
    }

    if(task.user_id !== req.userId){
      return res.status(401).json({ error: 'Task does not belong to this user.' })
    }

    await task.destroy();

    return res.send();
  }
}

export default new TaskController()