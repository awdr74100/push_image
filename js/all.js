let firebaseConfig = {
  apiKey: 'AIzaSyBdQLw1hmincv9Ry3coO9szJkvma8GI4gE',
  authDomain: 'blog-image-storage.firebaseapp.com',
  databaseURL: 'https://blog-image-storage.firebaseio.com',
  storageBucket: 'blog-image-storage.appspot.com',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const selectBtn = document.querySelector('#selectBtn');
const upload = document.querySelector('#upload');
const fileName = document.querySelector('.fileName');
const fileStatus = document.querySelector('.fileStatus');
const imageUrl = document.querySelector('#imageUrl');
const uploadImg = document.querySelector('#uploadImg');
const copyBtn = document.querySelector('#copyBtn');
const loginBtn = document.querySelector('#loginBtn');
let file;
const signOut = document.querySelector('#signOut');

signOut.addEventListener('click', () => {
  firebase
    .auth()
    .signOut()
    .then(function(e) {
      console.log(e);
    })
    .catch(function(error) {
      console.log(e);
    });
});

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginCheckout();
});

selectBtn.addEventListener('change', (e) => {
  file = e.target.files[0];
  uploadImg.src = `./img/${e.target.files[0].name}`;
});

upload.addEventListener('click', (e) => {
  e.preventDefault();
  let nowTime = dateTime();
  const storageRef = storage.ref(`blog/${'Ia5NUqqhCWVFoYeV8CbKsyGfsFy2'}/${nowTime}-${file.name}`);
  storageRef
    .put(file)
    .then((e) => {
      fileName.textContent = `檔名：${e.metadata.name}`;
      fileStatus.textContent = `狀態：${e.state}`;
      return `${e.metadata.fullPath}`;
    })
    .then((file) => {
      storage
        .ref(`${file}`)
        .getDownloadURL()
        .then((url) => {
          imageUrl.value = url;
        });
    });
});

copyBtn.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#imageUrl').select();
  document.execCommand('copy');
});

function dateTime() {
  let date = new Date();
  let now = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${
    date.getDate() < 10 ? '0' : ''
  }${date.getDate()}`;
  return now;
}

function loginCheckout() {
  let email = 'test1234@gmail.com';
  let password = '75395100';

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((e) => {
      console.log(e);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user != null) {
    console.log(user);
  } else {
    console.log(user);
  }
});

// var user = firebase.auth().currentUser;
// console.log(user);
