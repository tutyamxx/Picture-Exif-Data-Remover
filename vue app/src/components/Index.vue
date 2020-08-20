<template>
    <div>
        <div id="app">
            <img alt="App Logo" src="@/assets/no-gps.png" width="100"  height="100">
        </div>

        <h1>Picture EXIF Remover (Remove GPS data from pictures)</h1>

        <FileUpload />
    </div>
</template>

<script>
import FileUpload from '@/components/FileUpload.vue';
import RemoveEXIF from '@/components/RemoveEXIF.vue';

export default
{
    name: 'Index',
    components:
    {
        FileUpload,
        RemoveEXIF
    }
};
</script>

<style>
@import '../assets/style.css';
</style>
