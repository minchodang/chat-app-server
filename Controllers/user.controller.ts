import User from '../models/user';

interface SaveUserArguments {
  userName: string;
  sid: string;
}

const userController = {
  saveUser: async ({ sid, userName }: SaveUserArguments) => {
    let user = await User.findOne({ name: userName });

    if (!user) {
      user = new User({
        name: userName,
        token: sid,
        online: true,
      });
    }

    user.token = sid;
    user.online = true;
    await user.save();
    return user;
  },
  checkUser: async ({ sid }: Pick<SaveUserArguments, 'sid'>) => {
    const user = await User.findOne({ token: sid });
    if (!user) throw new Error('user not found');
    return user;
  },
};

export default userController;
