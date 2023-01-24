import { Request as ExpressRequest, Response } from 'express';

import User from '../models/user.model';
import { AppLogger } from '../logger';
import PollModel from '../models/poll.model';
import ResultModel from '../models/result.model';

declare interface Request<T, Cookie = unknown> extends ExpressRequest {
  body: T;
  cookie: Cookie;
}

class pollController {
  async getById(req: Request<any>, res: Response) {
    const { pollId } = req.params;
    try {
      const { poll } = await PollModel.findById(pollId).exec();

      if (!poll) {
        const message = `There is no poll with id: ${pollId}`;
        AppLogger.error(message);
        return res.status(400).json({ message });
      }
      const { params } = poll;
      
      if (params.isRandomOrder) {
        res.json({
          poll: {
            ...poll,
            pages: poll.pages.map((page) => ({
              ...page,
              questions: page.questions.sort(() => Math.random() - 0.5),
            })),
          },
        });
        return;
      }
      res.json({ poll });
    } catch (e) {
      AppLogger.error(`Cannot get poll id: ${pollId}: ${e.message}`);
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
  async getAll(req: Request<any>, res: Response) {
    const { skip, size, userId } = req.query;
    try {
      const polls = await PollModel.find({ user: userId.toString() })
        .skip(Number(skip))
        .limit(Number(size))
        .exec();
      const totalItems = await PollModel.find({
        user: userId.toString(),
      }).countDocuments();
      const totalResults = await PollModel.find({
        user: userId.toString(),
        totalResults: { $gt: 0 },
      }).countDocuments();
      if (!polls.length) {
        const message = `There are no polls for user with id: ${userId}`;
        AppLogger.error(message);
        return res.json({ polls, totalItems });
      }
      res.status(200).json({ polls, totalItems, totalResults });
    } catch (e) {
      AppLogger.error(`Cannot get polls}: ${e.message}`);
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
  async create(req: Request<any>, res: Response) {
    try {
      const { userId, poll } = req.body;
      if (poll.pages.some((page) => page.questions.length === 0)) {
        const message = 'Cannot save poll with empty page';
        AppLogger.error(message);
        return res.status(500).json({ message });
      }
      const newPoll = new PollModel({
        user: userId,
        poll,
        updatedAt: new Date().toISOString(),
      });
      await newPoll.save();

      const totalPolls = await PollModel.find({
        user: userId,
      }).countDocuments();
      await User.updateOne({ _id: userId }, { $set: { totalPolls } });

      res.status(201).json({ message: 'New poll was created' });
    } catch (e) {
      AppLogger.error(`Cannot create new poll: ${e.message}`);
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
  async update(req: Request<any>, res: Response) {
    const { pollId } = req.params;
    const { poll } = req.body;
    if (poll.pages.some((page) => page.questions.length === 0)) {
      const message = 'Cannot save poll with empty page';
      AppLogger.error(message);
      return res.status(500).json({ message });
    }
    try {
      await PollModel.findByIdAndUpdate(pollId, {
        poll,
        updatedAt: new Date().toISOString(),
      });
      const message = 'Poll was successfully updated';
      AppLogger.info(message);
      return res.status(200).json({ message: 'Poll was updated' });
    } catch (e) {
      AppLogger.error(`Cannot update poll with id#${pollId}: ${e.message}`);
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
  async delete(req: Request<any>, res: Response) {
    const { pollId } = req.params;
    try {
      await PollModel.findByIdAndRemove(pollId);
      const message = 'Poll was successfully deleted';
      try {
        await ResultModel.find({ poll: pollId }).deleteMany();
        const message = `Results for poll with id:${pollId} were successfully deleted`;
        AppLogger.info(message);
      } catch (e) {
        AppLogger.error(
          `Cannot delete results for poll with id#${pollId}: ${e.message}`,
        );
      }
      AppLogger.info(message);
      return res.status(200).json({ message: 'Poll was deleted' });
    } catch (e) {
      AppLogger.error(`Cannot delete poll with id#${pollId}: ${e.message}`);
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
}

export default new pollController();
