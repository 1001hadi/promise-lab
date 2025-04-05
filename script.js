// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  // return the promise with resolve and reject
  // validate the given ID
  // create specific variables for selected data bases
  // query each database and assign the created variables to them
  // create try and catch block
  // declare obj var to put the data to gather
  // check the data, if the type of data is not matched assign them to null
  // if data base has error show error in catch

  return new Promise((res, rej) => {
    if (typeof id !== "number" || id < 1 || id > 10) {
      rej(`Please enter valid number between 1 to 10.`);
      return;
    }
    let dbName;
    let specificDb;
    let vaultData;

    central(id)
      .then((dataName) => {
        dbName = dataName;
        return dbs[dbName](id);
      })
      .then((specificData) => {
        specificDb = specificData;
        return vault(id);
      })
      .then((vaultDb) => {
        vaultData = vaultDb;
      });

    try {
      const resultObj = {
        id: id,
        name: vaultData.name,
        username: specificDb.username,
        email: vaultData.email,
        address: vaultData.address,
        phone: vaultData.phone,
        website: specificDb.website,
        company: specificDb.company,
      };
    } catch (err) {
      console.log(err);
    }
  });
}
