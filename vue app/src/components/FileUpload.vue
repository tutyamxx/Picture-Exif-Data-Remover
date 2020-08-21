<template>
    <div>
        <form id="Upload-Form" @submit.prevent="photoSubmit" enctype="multipart/form-data">
            <div>
                <input type="file" id="Picture-Upload" name="PictureUpload" ref="ResetFileUpload" @change="PreviewPicture" accept="image/jpeg">
            </div>

            <div v-if="previewImageFile.length > 0">
                <div id="Preview-Box">
                    <h3>Picture Preview</h3>
                    <img class="Image-Preview" :src="previewImageFile">
                </div>

                <div v-if="bFileUploaded === false">
                    <button id="Button-Remove-Exif">Upload File</button>
                </div>
            </div>
        </form>

        <RemoveEXIF :imageFile="imageFile" :imageFileName="imageFileName" :bFileUploaded="bFileUploaded" :response_message="response_message" />
    </div>
</template>

<script>
import axios from 'axios';
import RemoveEXIF from './RemoveEXIF.vue';

export default
{
    name: 'FileUpload',

    components:
    {
        RemoveEXIF
    },

    data()
    {
        return {
            previewImageFile: "",
            imageFile: "",
            imageFileName: "",
            bFileUploaded: false,
            response_message: "",
        }
    },

    methods:
    {
        ResetFileUpload()
        {
            const FileInput = this.$refs.ResetFileUpload;
            FileInput.type = "text";
            FileInput.type = "file";

            this.imageFile = "";
            this.previewImageFile = "",
            this.bFileUploaded = false;
        },

        PreviewPicture: function(event)
        {
            let EInput = event.target;

            if(EInput.files && EInput.files[0])
            {
                const szImageFile = EInput.files[0];

                if(szImageFile.type.split("/")[0] !== "image")
                {
                    this.ResetFileUpload();
                    alert("Sorry, you can upload images only!");

                    return;
                }

                if(szImageFile.type.split("/")[1] !== "jpg" && szImageFile.type.split("/")[1] !== "jpeg")
                {
                    this.ResetFileUpload();
                    alert("Sorry, not a valid JPG image!");

                    return;
                }

                const FileReader = new window.FileReader();

                this.imageFileName = EInput.files[0].name;
                this.imageFile = EInput.files[0];

                FileReader.onload = (e) => { this.previewImageFile = e.target.result; }
                FileReader.readAsDataURL(EInput.files[0]);
            }

            else
            {
                this.ResetFileUpload();
                return;
            }
        },

        photoSubmit: async function()
        {
            const formData = new FormData();
            formData.append("picture", this.imageFile);

            try
            {
                await axios(
                {
                    method: "POST",
                    url: "http://localhost:5000/upload",
                    data: formData

                }).then(async (res) =>
                {
                    this.response_message = await res.data.message;
                    this.bFileUploaded = true;
                });
            }

            catch(error)
            {
                console.log(error);

                this.bFileUploaded = false;
                this.imageFileName = "";
                this.response_message = "Failed to upload the file with this error -->" + error.message;
            }
        }
    }
};
</script>

<style>
@import '../assets/style.css';
</style>
