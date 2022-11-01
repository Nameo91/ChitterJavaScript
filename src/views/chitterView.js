class ChitterView {
  constructor(model, client, user) {
    this.model = model;
    this.client = client;
    this.user = user;
    
    this.signUpForm();
    this.closeForm();

    this.submitSignUp();

    this.mainContainerEl = document.querySelector('#main-container');
    // this.logInButton = document.querySelector('#log-in-btn');
    // this.createPeepButton = document.querySelector('#add-peep-btn');
    
    // this.logInButton.addEventListener('click', () => {
    //   this.logIn();
    // });

    // this.createPeepButton.addEventListener('click', () => {
    //   this.createPeep();
    // });
  }
  
  //display all peeps 
  displayPeeps() {
    const allPeeps = this.model.getPeeps();

    allPeeps.forEach((peep) => {
      const peepsEl = document.getElementById("peeps");
      const peepTemplate = peepsEl.content.cloneNode(true);

      const timestamp = peep.updated_at;
      peepTemplate.getElementById('peep-writer').textContent = '@' + peep.user.handle;
      peepTemplate.getElementById('peep-time').textContent = this.#formatTime(timestamp);
      peepTemplate.getElementById('peep-date').textContent = this.#formatDate(timestamp);
      peepTemplate.getElementById('peep-body').textContent = peep.body;
      this.mainContainerEl.append(peepTemplate);  
    });
  }
  
  // calls api data to display all peeps
  displayPeepsFromAPI() {
    this.client.loadPeeps((response) => {
      this.model.setPeep(response);
      this.displayPeeps();
    });
  }
  
  // add new peep to an array of peep model
  addNewPeep(newPeep) {
    this.model.addPeep(newPeep);
  }
  
  // pop up sign up form
  signUpForm() {
    const signupButton = document.querySelector('#show-signup-btn');
    signupButton.addEventListener('click', () => {
      document.querySelector(".popup").classList.add("active");
    });
  }
  
  // close the pop up form
  closeForm() {
    const closeButton = document.querySelector('.close-btn');
    closeButton.addEventListener('click', () => {
      document.querySelector(".popup").classList.remove("active")
    })
  }

  submitSignUp() {
    const signupButton = document.querySelector('#sign-up');
    signupButton.addEventListener('click', () => {
      this.signUp();
    });
  }

  signUp() {
    const username = document.querySelector('#new-username').value;
    const password = document.querySelector('#new-password').value;

    this.client.createUser(username, password, (response) => {
      const userId = response.id;
      const handle = response.handle;
      this.user.setUser(userId, handle);

      this.signUpMessage(handle);
      this.displayPeeps();
    });
  }

  // logIn() {
  //   const username = document.querySelector('#username-input').value;
  //   const password = document.querySelector('#password-input').value;

  //   this.client.newSession(username, password, (response) => {
  //     const userId = response.id;
  //     const handle = response.handle;
  //     this.user.setSession(userId, handle);

  //     this.logInMessage(username);
  //     this.displayPeeps();
  //   });
  // }
  
  // createPeep() { 
  //   const userId = this.user.getSession.user_id;
  //   const sessionKey = this.user.getSession.session_key;
  //   const peepInput = document.querySelector('#peep-input').value; 

  //   this.client.addPeep(userId, sessionKey, peepInput, (response) => {

  //     this.addNewPeep(response);
  //     this.displayPeeps();
  //   });
  // }

  signUpMessage(username) {
    document.querySelector('#new-username').value = '';
    document.querySelector('#new-password').value = '';

    document.querySelector('.sign-up-message').textContent = `Hello, ${username}. Thank you for joining us`
  }

  // logInMessage(username) {
  //   const logInEl = document.querySelector('#log-in');
  //   document.querySelector('#username-input').value = '';
  //   document.querySelector('#password-input').value = '';

  //   const loginMessageEl = document.createElement('p');
  //   loginMessageEl.className = 'log-in-message';
  //   loginMessageEl.textContent = `Hello ${username}! Make your peep`;

  //   logInEl.append(loginMessageEl);
  // }
  
  //private function
  #formatTime(updatedAt) {
    let time = updatedAt.substr(11, 8);
    return time;
  }

  #formatDate(updatedAt) {
    const date = updatedAt.substr(0, 10);
    return date;
  }
}

module.exports = ChitterView;
