export default class UserInfo {
    constructor(configInfo) {
        this._profileName = document.querySelector(configInfo.profileNameSelector);
        this._profileDescription = document.querySelector(configInfo.profileDescriptionSelector);
        this._profileAvatar = document.querySelector(configInfo.profileAvatarSelector);
    }

    getUserInfo() {
        return {
            username: this._profileName.textContent,
            description: this._profileDescription.textContent
        }
    }

    setUserInfo({ avatar, username, description }) {
        this._profileAvatar.src = avatar;
        this._profileName.textContent = username;
        this._profileDescription.textContent = description;
    }
}