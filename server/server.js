
Resumes.allow({ // http://stackoverflow.com/a/27581124
  insert: function () {
    // add custom authentication code here
    return true;
  },
  update: function () {
    return true;
  },
  download: function () {
    return true;
  },
  remove: function () {
  	return true;
  }
});