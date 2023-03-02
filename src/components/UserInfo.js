// The UserInfo class is responsible for rendering information about the user on the page.
// it takes an object with the selectors of two elements into the constructor: one containing the user's name, and another containing the user's job

export class UserInfo {
  constructor({ nameSelector, jobSelector, userAvatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(userAvatarSelector);
  }

  // public method which returns an object with information about the user
  // this method will be handy for cases when it's necessary to display the user data in the open form
  getUserInfo() {
    return {
      nameInput: this._profileName.textContent,
      jobInput: this._profileJob.textContent,
      avatar: this._avatarElement.src,
    };
  }

  // public method which takes new user data and adds it on the page
  setUserInfo({ nameInput, jobInput }) {
    this._profileName.textContent = nameInput;
    this._profileJob.textContent = jobInput;
  }

  // methods for api change avatar
  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
