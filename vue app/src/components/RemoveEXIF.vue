<template>
    <div>
        <div v-if="bFileUploaded === true">
            <p id="Message-Received">{{ response_message }}</p>
            <a id="Download-Link" target="_blank" v-bind:href="`${this.applicationURL}:5000/download/` + imageFileName" download><button id="Button-Remove-Exif">Remove EXIF Data</button></a>
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
        'response_message',
        'applicationURL'
    ]
};
</script>

<style>
@import '../assets/style.css';
</style>
