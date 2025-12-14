export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const setUser = (user) => {
  const normalizedUser = {
    _id: user._id || user.id, // normalize here
    username: user.username,
    email: user.email,
  };

  localStorage.setItem("user", JSON.stringify(normalizedUser));
};


export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};



export const removeUser = () => localStorage.removeItem('user');