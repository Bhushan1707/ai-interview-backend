const { InterviewSession, InterviewResult } = require('../models');

const getUserSessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const sessions = await InterviewSession.findAll({
      where: { userId },
      include: [{ model: InterviewResult, as: 'results' }],
      order: [['createdAt', 'DESC']]
    });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { topicId, maxScore } = req.body;
    const session = await InterviewSession.create({
      userId,
      topicId,
      maxScore: maxScore || 0,
      totalScore: 0,
      completedAt: new Date()
    });
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const submitAnswer = async (req, res) => {
  try {
    const { questionId, userAnswer, grade, pointsEarned } = req.body;
    
    const result = await InterviewResult.create({
      sessionId: req.params.sessionId,
      questionId,
      userAnswer,
      grade,
      pointsEarned: pointsEarned || 0
    });

    const session = await InterviewSession.findByPk(req.params.sessionId);
    if (session) {
      session.totalScore = (session.totalScore || 0) + (pointsEarned || 0);
      await session.save();
    }

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUserSessions,
  createSession,
  submitAnswer,
};
