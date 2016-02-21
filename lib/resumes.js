
resumesStore = new FS.Store.GridFS("resumes");

Resumes = new FS.Collection("resumes", { 
  // stores: [new FS.Store.FileSystem("resumes", {path: "~/uploads"})]
  // if you don't specify a path, a cfs/files folder in your app container (bundle directory) will be used.
  stores: [resumesStore]
});


/* CERCLES REACTIFS GRAPH (temporary code) */
Circles = new Mongo.Collection('circles');


