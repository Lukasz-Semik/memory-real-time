export const routes = {
  homePage: () => '/',
  dashboardPage: () => '/dashboard',
  inviteFriend: () => '/dashboard/invite-friend',
  friends: () => '/dashboard/friends',
  game: (gameId = ':gameId') => `/dashboard/game/${gameId}`,
  signUpPage: () => '/sign-up',
  confirmUserPage: () => '/confirm-user',
};
