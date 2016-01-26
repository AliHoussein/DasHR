
resumesStore = new FS.Store.GridFS("resumes");

ResumesCollection = new FS.Collection("resumes", { 
  // stores: [new FS.Store.FileSystem("resumes", {path: "~/uploads"})]
  // if you don't specify a path, a cfs/files folder in your app container (bundle directory) will be used.
  stores: [resumesStore]
});
