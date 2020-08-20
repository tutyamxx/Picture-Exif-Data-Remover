<template>
    <div>
        <div v-if="bFileUploaded === true">
            <a id="Download-Link" v-bind:href="'http://localhost:5000/download/' + imageFileName" download><button button id="Button-Remove-Exif">Remove EXIF Data</button></a>
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
        'response_message',
        'bFileUploaded',
        'imageFileName'
    ]
};
</script>

<style>
@import '../assets/style.css';
</style>
