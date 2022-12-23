// The UserInfo class is responsible for rendering information about the user on the page.
// it takes an object with the selectors of two elements into the constructor: one containing the user's name, and another containing the user's job

export class UserInfo {
  constructor({ nameInput, jobInput }) {
    this._profileName = document.querySelector(".profile__name");
    this._profileJob = document.querySelector(".profile__job");

    this._profileName.textContent = nameInput;
    this._profileJob.textContent = jobInput;
  }

  // public method which returns an object with information about the user
  // this method will be handy for cases when it's necessary to display the user data in the open form
  getUserInfo() {
    return {
      nameInput: this._profileName.textContent,
      jobInput: this._profileJob.textContent,
    };
  }

  // public method which takes new user data and adds it on the page
  setUserInfo({ nameInput, jobInput }) {
    this._profileName.textContent = nameInput;
    this._profileJob.textContent = jobInput;
  }
}
