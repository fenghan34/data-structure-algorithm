const importAll = (r: any) => r.keys().forEach(r)
importAll(require.context('./', false, /\.t?j?s$/))
