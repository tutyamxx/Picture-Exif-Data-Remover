# Picture EXIF Remover

<p align="center">
  <img src="https://github.com/tutyamxx/Picture-Exif-Data-Remover/blob/master/exifremoverv1.gif" width="100%" height="100%"><br/>
</p>

# How to

1. Upload a photo taken with a smart device
2. Remove the [EXIF](https://en.wikipedia.org/wiki/Exif) data (GPS location etc) from your photo by clicking the `Remove EXIF Data` button
3. It will prompt a download with the same file name and type, but without the pesky EXIF data.
4. Save it to your device
5. Check if there is any EXIF data left using this [EXIF Data Viewer](https://exifdata.com/index.php)

**You need both of these applications to run in the same time (Vue App and the Server) in order to work!**

# How to run the entire project (please make sure you followed [the installation guide](#installation))
 - Open a terminal in `vue app` directory and type ⬇️

| Command  | Information |
| ------------- | ------------- |
| npm run start  | Starts the front end app and the server in the same time  |

# Installation

## 🌎 Setup for front end application
```
npm install
```

### Compiles and minifies for production (use this only when you are using it for production deployment)
```
npm run build
```

### Run your unit tests (use this only if you want to run the tests)
```
npm run test:unit
```


## 🖥️ Setup for the server

### Install server dependencies
```
npm install
```
