// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { DatabasePrimitive as Db } from "bidding-db-client"

import sleep from "./sleep"
import dns from "dns"

// Ensure localhost resolves to ipv4 address first on node v17+
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const serverURL = 'http://localhost:1337/rest';

const openConnections = {};
const destroyAliveConnections = function () {
  for (const socketId in openConnections) {
    try {
      openConnections[socketId].destroy();
      delete openConnections[socketId];
    } catch (e) {
      /* */
    }
  }
};

beforeAll(async () => {
  Db.initialize('UE3zFgZ3HDvjQtV7aRUQyf0ktow9843o0G16rxMd4jWbOPg');
  Db.CoreManager.set('SERVER_URL', serverURL);
  Db.CoreManager.set('MASTER_KEY', 'qwkALaufN8wQV8LBMPb6VD4KvxjNDsJU');
  Db.User.enableUnsafeCurrentUser(); //parse.current on node
  Db.Object.enableSingleInstance(); // should be disabled in server env
});

beforeEach(async () => {
  await Db.Cloud.run("clearTestDB", {useMasterKey:true})
})

afterEach(async () => {
  await Db.User.logOut();
  // Connection close events are not immediate on node 10+... wait a bit
  await sleep(0);
  if (Object.keys(openConnections).length > 0) {
    console.warn('There were open connections to the server left after the test finished');
  }
  Db.Storage._clear();
  destroyAliveConnections();
});
