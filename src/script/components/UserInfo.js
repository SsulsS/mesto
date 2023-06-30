export default class UserInfo {
  constructor({ profileNameSelector, profileActivitySelector, profileAvatarSelector }) {
    this._userNameElement = document.querySelector(profileNameSelector);
    this._userActivityElement = document.querySelector(profileActivitySelector);
    this._profileAvatarElement = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userActivity: this._userActivityElement.textContent,
    }
  }

  setUserInfo({ userName, userActivity}) {
    this._userNameElement.textContent = userName;
    this._userActivityElement.textContent = userActivity;
  }

  setUserAvatar({ userAvatarLink }) {
    this._profileAvatarElement.src = userAvatarLink;
  }

  saveUserId(userId) {
    this._userId = userId;
  }

  getUserId() {
    return this._userId;
  }
}
