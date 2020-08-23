const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const exifremove = require("exifremove");
const fs = require("fs");
const { join } = require("path");

// --| Basic express server with things enabled
const app = express();
const port = process.env.PORT || 5000;

app.use(fileUpload(
{
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// --| Upload the file on the server
app.post("/upload", async (req, res) =>
{
    try
    {
        // --| Check if is an empty file submission
        if(!req.files)
        {
            return res.status(204).send({ message: "No file provided" });
        }

        else
        {
            // --| Get the file and move it to uploads folder
            let UploadedPicture = req.files.picture;
            UploadedPicture.mv('./uploads/' + UploadedPicture.name);

            // --| Return a response wit a success upload message and picture information
            res.status(200).send(
            {
                message: "File successfully uploaded",

                data:
                {
                    name: UploadedPicture.name,
                    mimetype: UploadedPicture.mimetype,
                    size: UploadedPicture.size
                }
            });
        }
    }

    // --| Something went wrong, return a 500 status with error message
    catch(err)
    {
        console.log(err.message)
        return res.status(500).send(err.message);
    }
});

// --| Download the file from the server using specified request param
app.get("/download/:filename", (req, res) =>
{
    // --| Get the filename from request parameter
    const szRequestedFileName = req.params.filename.toString();

    // --| Get the filetype
    const szFileType = szRequestedFileName.split(".").pop();

    // --| Server uploads folder
    const szUploadsFolderPath = join(__dirname, "/uploads");

    // --| Uploaded file path
    const szUploadedPath = join(szUploadsFolderPath, szRequestedFileName);

    if(fs.access(szUploadedPath, fs.constants.F_OK | fs.constants.R_OK, (error) =>
    {
        if(error)
        {
            return res.status(404).send("File is missing, try again?");
        }

        // --| Read the picture path from the uploads folder
        const szReadPicturePath = fs.readFileSync(szUploadedPath);

        // --| Remove EXIF data from the image
        let CleanedImage = exifremove.remove(szReadPicturePath);

        // --| Original filename but adding "_no_EXIF" at the end  + file extension
        const CleanedImageFileNamePath = szRequestedFileName.substring(0, szRequestedFileName.lastIndexOf(".")) + "_no_EXIF." + szFileType;

        // --| Create a new picture using the buffer with no EXIF data using original filename but adding "_no_EXIF" at the end  + file extension
        fs.writeFile(join(szUploadsFolderPath, CleanedImageFileNamePath), CleanedImage, (error) =>
        {
            if(error)
            {
                console.log(error.message);
            }

            // --| Delete the original uploaded picture from the server after the new photo without EXIF data has been created
            fs.unlink(join(szUploadsFolderPath, szRequestedFileName), (error) =>
            {
                if(error)
                {
                    console.log(error.message);
                }

                // --| Send the new image download attachment to Vue front end app
                res.download(join(szUploadsFolderPath, CleanedImageFileNamePath));

                // --| Delete the file after 20 seconds
                setTimeout(() =>
                {
                    fs.unlink(join(szUploadsFolderPath, CleanedImageFileNamePath), (error) =>
                    {
                        if(error)
                        {
                            console.log(error.message);
                        }
                    });

                }, 20000);
            });
        });
    }));
});

// --| Log the info on server startup
app.listen(port, () => console.log(`Server runs and is listening on port ${port}.`));