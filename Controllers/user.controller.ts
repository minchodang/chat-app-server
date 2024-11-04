import User from '../models/user';

interface SaveUserArguments {
  userName: string;
  sid: string;
}

// 필요한 경우 User 모델의 타입을 가져옵니다.
// import { UserType } from '../models/user';

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
};

export default userController;
