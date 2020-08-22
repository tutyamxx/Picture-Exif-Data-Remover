<template>
    <div>
        <div v-if="bFileUploaded === true">
            <p id="Message-Received">{{ response_message }}</p>
            <a id="Download-Link" v-bind:href="'http://localhost:5000/download/' + imageFileName" download><button id="Button-Remove-Exif">Remove EXIF Data</button></a>
        </div>
    </div>
</template>

<script>
export default
{
    name: 'RemoveEXIF',

    props:
    [
        'imageFile',
        'imageFileName',
        'bFileUploaded',
        'response_message'
    ]
};
</script>

<style>
@import '../assets/style.css';
</style>
