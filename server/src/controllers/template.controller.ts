import { Request as ExpressRequest, Response } from 'express';

import User from '../models/user.model';
import { AppLogger } from '../logger';
import tokenService from '../services/token.service';
import UserRepository from '../repositories/User';
import TemplateModel from '../models/template.model';

declare interface Request<T, Cookie = unknown> extends ExpressRequest {
  body: T;
  cookie: Cookie;
}

class templateController {
  async getById(req: Request<any>, res: Response) {
    const { templateId } = req.params;
    try {
      const { template } = await TemplateModel.findById(templateId).exec();

      if (!template) {
        const message = `There is no template with id: ${templateId}`;
        AppLogger.error(message);
        return res.status(400).json({ message });
      }

      res.json({ template });
    } catch (e) {
      AppLogger.error(
        `Cannot get template with id: ${templateId}.w ${e.message}`,
      );
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
  async getAll(req: Request<any>, res: Response) {
    const { skip, size } = req.query;
    try {
      const templates = await TemplateModel.find({})
        .skip(Number(skip))
        .limit(Number(size))
        .exec();
      if (!templates) {
        const message = `There are no templates`;
        AppLogger.error(message);
        return res.status(200).json({ message });
      }
      const totalItems = await TemplateModel.find({}).countDocuments();
      res.json({ templates, totalItems });
    } catch (e) {
      AppLogger.error(`Cannot get templates: ${e.message}`);
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
  async create(req: Request<any>, res: Response) {
    try {
      const { poll: template } = req.body;
      if (template.pages.some((page) => page.questions.length === 0)) {
        const message = 'Cannot save template with empty page';
        AppLogger.error(message);
        return res.status(500).json({ message });
      }
      const newTemplate = new TemplateModel({
        template,
        updatedAt: new Date().toISOString(),
      });
      await newTemplate.save();
      res.status(201).json({ message: 'New template was created' });
    } catch (e) {
      AppLogger.error(`Cannot create new template: ${e.message}`);
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
  async update(req: Request<any>, res: Response) {
    const { templateId } = req.params;
    const { template } = req.body;

    if (template.pages.some((page) => page.questions.length === 0)) {
      const message = 'Cannot save poll with empty page';
      AppLogger.error(message);
      return res.status(500).json({ message });
    }
    try {
      await TemplateModel.findByIdAndUpdate(templateId, {
        template,
        updatedAt: new Date().toISOString(),
      });
      AppLogger.info('Template was successfully updated');
      return res.status(200).json({ message: 'Template was updated' });
    } catch (e) {
      AppLogger.error(`Cannot update template: ${e.message}`);
    }
  }
  async delete(req: Request<any>, res: Response) {
    const { templateId } = req.params;
    try {
      await TemplateModel.findByIdAndRemove(templateId);
      const message = 'Template was successfully deleted';
      AppLogger.info(message);
      return res.status(200).json({ message: 'Template was deleted' });
    } catch (e) {
      AppLogger.error(
        `Cannot delete template with id#${templateId}: ${e.message}`,
      );
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
}

export default new templateController();
