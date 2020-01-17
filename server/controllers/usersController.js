import passport from 'passport';
import { createUser, getUserById } from '../views/usersView';
import User from '../schemas/user';

export const registerUser = async (req, res) => {
    const { body: { user } } = req;
    if (!user.email) {
        return res.status(400).json({
            error: 'Email is required',
        });
    }
    if (!user.password) {
        return res.status(400).json({
            errors: {
                error: 'Password is required',
            },
        });
    }
    User.findOne({ email: user.email }, async (err, result) => {
        if (result) {
            return res.status(400).json({
                error: 'Email is taken',
            });
        }
        try {
            const newUser = await createUser(user);
            return res.status(201).json({
                user: newUser.toAuthJSON(),
            });
        } catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    });
};

export const loginUser = async (req, res, next) => {
    const { body: { user } } = req;
    if (!user.email) {
        return res.status(400).json({
            error: 'Email is required',
        });
    }
    if (!user.password) {
        return res.status(400).json({
            error: 'Password is required',
        });
    }
    return passport.authenticate(
        'local',
        { session: false },
        (err, passportUser, info) => {
            if (err) {
                return next(err);
            }
            if (passportUser) {
                const authUser = passportUser;
                authUser.token = passportUser.generateJWT();
                return res.json({ user: authUser.toAuthJSON() });
            }
            return res.status(400).send(info);
        },
    )(req, res, next);
};

export const currentUser = async (req, res) => {
    const { payload: { id } } = req;
    const curUser = await getUserById(id);
    if (!curUser) {
        return res.sendStatus(401);
    }
    return res.json({ user: curUser.toAuthJSON() });
};

export const logout = async (req, res) => {
    req.logout();
    res.redirect('/');
};
