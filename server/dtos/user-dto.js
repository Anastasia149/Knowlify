module.exports = class UserDto{
    email;
    id;
    isActivated;
    role;
    name;
    avatar;
    aboutMe;
    certificates;
    career;

    constructor(model){
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated ?? model.is_activated;
        this.role = model.role;
        this.name = model.name ?? '';
        this.avatar = UserDto.emptyToNull(model.avatar);
        this.aboutMe = UserDto.emptyToNull(model.about_me);
        this.certificates = UserDto.emptyToNull(model.certificates);
        this.career = UserDto.emptyToNull(model.career);
    }

    static emptyToNull(v) {
        if (v == null || v === '') {
            return null;
        }
        return v;
    }
}
