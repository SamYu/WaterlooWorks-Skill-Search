import User from '../schemas/user';

export const createUser = async (user) => {
    const newUser = new User(user);
    newUser.setPassword(user.password);
    return newUser.save();
};

export const getUserById = async (id) => (
    User.findById(id)
        .then((user) => {
            if (!user) return null;
            return user;
        })
);
