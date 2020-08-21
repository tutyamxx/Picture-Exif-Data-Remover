<template>
    <Index />
</template>

<script>
import Index from '@/components/Index.vue';
import FileUpload from '@/components/FileUpload.vue';
import RemoveEXIF from '@/components/RemoveEXIF.vue';

export default
{
    name: 'App',
    components:
    {
        Index,
        FileUpload,
        RemoveEXIF
    }
}
</script>

<style>
@import '../src/assets/style.css';
</style>
