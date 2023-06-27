export default class UserInfo {
  constructor({ profileNameSelector, profileActivitySelector }) {
    this._userNameElement = document.querySelector(profileNameSelector);
    this._userActivityElement = document.querySelector(profileActivitySelector);
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
}
