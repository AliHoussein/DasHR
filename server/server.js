
ResumesCollection.allow({
  insert: function () {
    // add custom authentication code here
    return true;
  },
  update: function () {
    return true;
  },
  download: function () {
    return true;
  }
});