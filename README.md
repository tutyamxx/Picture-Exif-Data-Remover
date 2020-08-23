# Picture EXIF Remover

<p align="center">
  <img src="https://github.com/tutyamxx/Picture-Exif-Data-Remover/blob/master/exifremoverv1.gif" width="620" height="500"><br/>
</p>

* Still a work in progress, but it works fine for now

1. Upload a photo taken with a smart device
2. Remove the [EXIF](https://en.wikipedia.org/wiki/Exif) data (GPS location etc) from your photo by clicking the `Remove EXIF Data` button
3. It will prompt a download with the same file name and type, but without the pesky EXIF data.
4. Save it to your device

**You need both of these applications to run in the same time (Vue App and the Server) in order to work!**

# For Vue Front End App
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Express Server Setup

## Install server dependencies
```
npm install
```

## Run the server
```
node index.js
```

It will display a console log with the following message if it's running `Server runs and is listening on port 5000.`
