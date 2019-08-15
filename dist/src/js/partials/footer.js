export default class {
    constructor() {
        this.headerContainer = document.querySelector('.footer');
    }

    changeTheme(theme) {
        this.headerContainer.setAttribute('data-theme', theme)
    }
}
