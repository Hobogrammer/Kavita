import {test, expect} from '@playwright/test';
import { User } from "src/app/_models/user";

test.describe('Home Page', () => {
  let user: User;

  test.beforeEach(async ({page}) => {
  });

  test('should display user name in navigation bar', async ({page}) => {
  });
});
