import { Request, Response } from 'express';
import { FixMeLater } from '..';

function escapeRegex(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export const search: FixMeLater = async (req: Request, res: Response) => {
  const { text } = req.query;
  const { db } = res.app.locals;

  const regex = new RegExp(escapeRegex(String(text)), 'gi');
  const users = await db.users
    .find({
      $or: [{ name: regex }, { email: regex }, { handle: regex }],
    })
    .project({
      _id: 0,
      name: 1,
      handle: 1,
      location: 1,
      followingCount: 1,
      followerCount: 1,
    })
    .toArray()
    .catch(() => []);

  res.send({ users });
};
