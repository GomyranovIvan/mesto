export default class UserInfo {
    constructor(configInfo) {
       this._profileName = document.querySelector(configInfo.profileNameSelector);
       this._profileDescription = document.querySelector(configInfo.profileDescriptionSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            description: this._profileDescription.textContent
        }
    }

    setUserInfo(userInfo) {
       this._profileName.textContent = userInfo.name;
       this._profileDescription.textContent = userInfo.description;
    }
}