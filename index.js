const storageKey = 'STORAGE_KEY';
const submitAction = document.getElementById('form-data-user');

// cek storage apakah sudah ada
function checkForStorage() {
    return typeof (Storage) !== 'undefined';
}

// fungsi ini berguna untuk membuat item storage, membuat nilai awalnya serta untuk memodifikasi nilai pada item storage-nya juga.
function putUserList(data) {
    if (checkForStorage()) {
      let userData = [];
      if (localStorage.getItem(storageKey) !== null) {
        userData = JSON.parse(localStorage.getItem(storageKey));
      }
      userData.unshift(data);
      if (userData.length > 5) {
        userData.pop();
      }
      localStorage.setItem(storageKey, JSON.stringify(userData));
    }
}

// Fungsi ini mengembalikan nilai array dari localStorage ketika sudah memiliki nilai sebelumnya melalui JSON.parse(). Namun, jika item storage yang kita ambil masih kosong, fungsi ini akan mengembalikan nilai array kosong.
function getUserList() {
    if (checkForStorage()) {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } else {
      return [];
    }
}


// fungsi untuk merender data user pada tabel HTML
function renderUserList() {
    const userData = getUserList();
    const userList = document.querySelector('#user-list-detail');
    userList.innerHTML = '';
    for (let user of userData) {
      let row = document.createElement('tr');
      row.innerHTML = '<td>' + user.nama + '</td>';
      row.innerHTML += '<td>' + user.umur + '</td>';
      row.innerHTML += '<td>' + user.domisili + '</td>';
      userList.appendChild(row);
    }
}

// event listener ke tombol submit untuk mengambil semua data yang sudah di-input ke semua field di form
submitAction.addEventListener('submit', function (event) {
    const inputNama = document.getElementById('nama').value;
    const inputUmur = document.getElementById('umur').value;
    const inputDomisili = document.getElementById('domisili').value;
    const newUserData = {
      nama: inputNama,
      umur: inputUmur,
      domisili: inputDomisili,
    }
    putUserList(newUserData);
    renderUserList();
});

// event listener ke objek window untuk event "load"
window.addEventListener('load', function () {
    if (checkForStorage) {
      if (localStorage.getItem(storageKey) !== null) {
        renderUserList();
      }
    } else {
      alert('Browser yang Anda gunakan tidak mendukung Web Storage');
    }
});
