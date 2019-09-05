function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

async function search(req, res) {
  const { text } = req.query;
  const { db } = req.app.locals;

  const regex = new RegExp(escapeRegex(text), 'gi');
  const users = await db.users.find({ 
      $or: [
        { name: regex },
        { email: regex },
        { handle: regex },
      ],
    })
    .project({ 
      _id: 0,
      name: 1,
      handle: 1,
      location: 1,
      followingCount: 1,
      followerCount: 1
    })
    .toArray()
    .catch(() => []);
  
  res.send({ users });
}

module.exports = {
  search,
};