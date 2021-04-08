const importAll = (r: any) => r.keys().forEach(r);
importAll(require.context("./", true, /\.js$/));
