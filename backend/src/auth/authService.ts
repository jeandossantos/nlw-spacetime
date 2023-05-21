import { z as zod } from 'zod';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../user/UserRepository';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async authenticate(code: string) {
    const mySchema = zod.object({
      code: zod.string(),
    });

    const { code: githubCode } = mySchema.parse({ code });

    const accessTokenResponse = await axios.post(
      `https://github.com/login/oauth/access_token`,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: githubCode,
        },
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const { access_token } = accessTokenResponse.data;

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userSchema = zod.object({
      id: zod.number(),
      name: zod.string(),
      login: zod.string(),
      avatar_url: zod.string().url(),
    });

    let userInfo = userSchema.parse(userResponse.data);

    let user = await this.userRepository.getByGithubId(userInfo.id);

    if (!user) {
      user = await this.userRepository.create({
        login: userInfo.login,
        name: userInfo.name,
        githubId: userInfo.id,
        avatarUrl: userInfo.avatar_url,
      });
    }

    return {
      token: jwt.sign(
        { sub: user.id, name: user.name, avatarUrl: user.avatarUrl },
        process.env.APP_SECRET!,
        {
          expiresIn: '7d',
        }
      ),
    };
  }
}
