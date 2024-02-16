export const isAdmin = (req) => {
  const currentUser = req.user;
  return currentUser && currentUser.role === 'admin';
};

export const isUser = (req) => {
  const currentUser = req.user;
  return currentUser && currentUser.role === 'usuario';
};
