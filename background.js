// background.js
let db = null;
let user = "default";

function getCurrentChannel() {
  const splitedLocation = window.location.href.split("/");
  return splitedLocation[splitedLocation[splitedLocation.length - 1]];
}

function createDatabase() {
  const channel = getCurrentChannel();
  const request = window.indexedDB.open(user);

  request.onerror = function (event) {
    console.log("Problem opening DB.");
  };

  request.onupgradeneeded = function (event) {
    db = event.target.result;

    let objectStore = db.createObjectStore(channel, {
      keyPath: "id",
    });

    objectStore.transaction.oncomplete = function (event) {
      console.log("ObjectStore Created.");
    };
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("DB OPENED.");

    db.onerror = function (event) {
      console.log("FAILED TO OPEN DB.");
    };
  };
}

function insertRecords(record) {
  if (db) {
    const channel = getCurrentChannel();
    const insertTransaction = db.transaction(channel, "readwrite");
    const objectStore = insertTransaction.objectStore(channel);

    insertTransaction.oncomplete = function () {
      console.log("ALL INSERT TRANSACTIONS COMPLETE.");
    };

    insertTransaction.onerror = function () {
      console.log("PROBLEM INSERTING RECORDS.");
    };

    let request = objectStore.add(record);

    request.onsuccess = function (event) {
      console.log("Added: ", event.target.result);
    };
  }
}

function getRecord() {
  if (db) {
    const channel = getCurrentChannel();
    const getTransaction = db.transaction(channel, "readonly");
    const objectStore = getTransaction.objectStore(channel);

    getTransaction.oncomplete = function () {
      console.log("ALL GET TRANSACTIONS COMPLETE.");
    };

    getTransaction.onerror = function () {
      console.log("PROBLEM GETTING RECORDS.");
    };

    let request = objectStore.get(id);

    request.onsuccess = function (event) {
      console.log("Get: ", event.target.result);
    };
  }
}

function getRecords() {
  if (db) {
    const channel = getCurrentChannel();
    const getTransaction = db.transaction(channel, "readonly");
    const objectStore = getTransaction.objectStore(channel);

    getTransaction.oncomplete = function () {
      console.log("ALL GET TRANSACTIONS COMPLETE.");
    };

    getTransaction.onerror = function () {
      console.log("PROBLEM GETTING RECORDS.");
    };

    let request = objectStore.openCursor();

    request.onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        const value = objectStore.get(cursor.key);
        value.onsuccess = (event) => {
          console.log(event.target.result);
        };
        cursor.continue();
      }
      console.log("Get: ", request);
    };
  }
}
