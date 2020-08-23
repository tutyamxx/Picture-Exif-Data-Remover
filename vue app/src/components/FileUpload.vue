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
                    <button id="Button-Remove-Exif" :disabled="bButtonDisabled">{{ buttonText }}</button>
                </div>
            </div>
        </form>

        <RemoveEXIF :imageFile="imageFile" :imageFileName="imageFileName" :bFileUploaded="bFileUploaded" :response_message="response_message" :applicationURL="applicationURL" />
    </div>
</template>

<script>
import axios from 'axios';
import RemoveEXIF from './RemoveEXIF.vue';

const BUTTON_STATUS =
{
    ButtonUploading: 'Uploading photo',
    ButtonUpload: 'Upload Photo'
};

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
            buttonText: BUTTON_STATUS.ButtonUpload,
            bButtonDisabled: false,

            // --| Get app location environment protocol + app location address + server port
            applicationURL: window.location.protocol + "//" + window.location.hostname
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
            this.bButtonDisabled = false;
            this.buttonText = BUTTON_STATUS.ButtonUpload;
        },

        PreviewPicture: function(event)
        {
            let EInput = event.target;

            if(EInput.files && EInput.files[0])
            {
                const szImageFile = EInput.files[0];

                if(szImageFile.type.split("/")[0] !== "image" || szImageFile.type.split("/")[1] !== "jpg" && szImageFile.type.split("/")[1] !== "jpeg")
                {
                    this.ResetFileUpload();
                    alert("Sorry, you can upload valid JPEG images only!");

                    return;
                }

                if(this.bFileUploaded === true)
                {
                    this.bFileUploaded = false;
                }

                const FileReader = new window.FileReader();

                this.imageFileName = EInput.files[0].name;
                this.imageFile = EInput.files[0];

                FileReader.onloadend = (e) => { this.previewImageFile = e.target.result; }
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
                this.buttonText = BUTTON_STATUS.ButtonUploading;
                this.bButtonDisabled = true;

                await axios(
                {
                    method: "POST",
                    url: `${this.applicationURL}:5000/upload`,
                    data: formData

                }).then(async (res) =>
                {
                    this.response_message = await res.data.message;
                    this.bFileUploaded = true;
                    this.buttonText = BUTTON_STATUS.ButtonUpload;
                    this.bButtonDisabled = false;
                });
            }

            catch(error)
            {
                console.log(error.message);

                this.bFileUploaded = false;
                this.imageFileName = "";
                this.buttonText = BUTTON_STATUS.ButtonUpload;
                this.bButtonDisabled = false;
                this.response_message = error.message;
            }
        }
    }
};
</script>

<style>
@import '../assets/style.css';
</style>
