export class UserInfo {
  constructor(form, infoname, infojob, avatar) {
    this.form = form;
    this.infoname = infoname;
    this.infojob = infojob;
    this.avatar = avatar;
  }

  setUserInfo(name, job) {
      this.form.name.value = name;
      this.form.job.value = job;
  }

  updateUserInfo(name, job, avatarUrl) {
    this.infoname.textContent = name;
    this.infojob.textContent = job;
    this.avatar.style.backgroundImage = `url(${avatarUrl})`
  }
}
