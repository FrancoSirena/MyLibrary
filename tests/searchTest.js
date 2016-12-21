module.exports = {
  'Search and Add Test' : function (browser) {
    browser
      .url('localhost:3000')
      .waitForElementVisible('body', 1000)
      .setValue('#bookTitle', 'Lord of The Rings')
      .waitForElementVisible('#btnAddQueue', 1000)
      .click('#btnAddQueue')
      .pause(1000)
      .assert.visible('#bookShelf')
      .end();
  }
};
