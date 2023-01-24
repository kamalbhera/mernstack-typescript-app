import { statistcTransform } from './../helpers/statistcTransform';
import { Request as ExpressRequest, Response } from 'express';

import { AppLogger } from '../logger';
import ResultModel from '../models/result.model';
import PollModel from '../models/poll.model';

declare interface Request<T, Cookie = unknown> extends ExpressRequest {
  body: T;
  cookie: Cookie;
}

class resultController {
  async create(req: Request<any>, res: Response) {
    try {
      const { pollId, userId, result, params } = req.body;
      if (result.pages.length === 0) {
        const message = 'Cannot save poll with empty results';
        AppLogger.error(message);
        return res.status(500).json({ message });
      }
      const { isAnonymous } = params;
      const saveResults = () => {
        if (isAnonymous) {
          return new ResultModel({ poll: pollId, result });
        }
        return new ResultModel({ poll: pollId, user: userId, result });
      };
      const newResult = saveResults();
      await newResult.save();
      const totalResults = await ResultModel.find({
        poll: pollId,
      }).countDocuments();
      await PollModel.updateOne({ _id: pollId }, { $set: { totalResults } });
      const message = `Results have been saved for poll with id:${pollId}`;
      AppLogger.info(message);
      res.status(201).json({ message });
    } catch (e) {
      AppLogger.error(`Cannot save results for poll: ${e.message}`);
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
  async getResultByResultId(req: Request<any>, res: Response) {
    try {
      const { resultId } = req.params;

      const results = await ResultModel.findById(resultId).exec();
      if (!results) {
        const message = `There are no results for poll with id: ${resultId}`;
        AppLogger.info(message);
        return res.status(400).json({ message });
      }
      res.json({ results });
    } catch (e) {
      AppLogger.error(`Cannot get results for poll. ${e.message}`);
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
  async getResultsByPollId(req: Request<any>, res: Response) {
    try {
      const { pollId } = req.params;

      const results = await ResultModel.find({ poll: pollId })
        .select({ _id: 1, createdAt: 1 })
        .populate({ path: 'user', model: 'users', select: 'name' })
        .exec();
      if (!results) {
        const message = `There are no results for poll with id: ${pollId}`;
        AppLogger.info(message);
        return res.status(400).json({ message });
      }
      
      res.json({ results });
    } catch (e) {
      AppLogger.error(`Cannot get results for poll. ${e.message}`);
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
  async getStatisticResults(req: Request<any>, res: Response) {
    try {
      const { pollId } = req.params;
      const results = await ResultModel.find({ poll: pollId }).exec();
      const { poll } = await PollModel.findById(pollId).exec();
      if (!results) {
        const message = `There are no results for poll with id: ${pollId}`;
        AppLogger.info(message);
        return res.status(400).json({ message });
      }
      const order = poll.pages.map((p) => p.questions.map((q) => q.title));
      const newResults = statistcTransform(results);
      const a = {
        ...newResults,
        pages: newResults.pages.map((r, i) => {
          return {
            ...r,
            answers: r.answers.sort(
              (first: any, second: any) =>
                order[i].indexOf(first.title) - order[i].indexOf(second.title),
            ),
          };
        }),
      };
      res.json({ statistic: a });
    } catch (e) {
      AppLogger.error(`Cannot get results for poll. ${e.message}`);
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
}

export default new resultController();
